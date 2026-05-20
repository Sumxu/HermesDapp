import { useEffect, useState } from "react";
import "./index.scss";
import { Popup, Switch, Button } from "antd-mobile";
import { Input } from "antd";
import closeIcon from "@/assets/Basic/close.png";
import { storage } from "@/Hooks/useLocalStorage";
import { fromWei, Totast, toWei } from "@/Hooks/Utils";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import ContractSend from "@/Hooks/ContractSend.ts";
import ContractList from "@/Contract/Contract.ts";
import { ethers } from "ethers";
interface ChfpPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const ChfpPopup: React.FC<ChfpPopupProps> = ({ visible, closeChange }) => {
  const [benJinAmount, setBenJinAmount] = useState<string>("");
  const [jiHuoAmount, setJiHuoAmount] = useState<string>("");
  const [aiAmount, setAiAmount] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [walletAddressAmount, setWalletAddressAmount] = useState<bigint>(0n);
  const walletAddress = storage.get("address");
  const [isOpenAi, setIsOpenAi] = useState<boolean>(false);
  const allAmountClick = () => {
    const allAmountNum = fromWei(walletAddressAmount, 18);
    if (!ruleAmount(Number(allAmountNum))) {
      return Totast("输入金额有误!", "error");
    }
    benJinAmountChange(allAmountNum);
  };
  const benJinAmountChange = (e) => {
    setBenJinAmount(e);
    setJiHuoAmount(e * 0.2);
  };
  /**
   * 校验规则是否是最小100最大1000 是100的整数倍
   */
  const ruleAmount = (value) => {
    let result = {
      status: false,
      txt: "",
    };
    // 空值校验（根据业务需求可调整是否必须）
    if (value === "" || value == null) {
      result.txt = "请输入金额";
      return result;
    }

    // 转为数字
    const num = Number(value);

    // 是否为有效数字
    if (isNaN(num) || !isFinite(num)) {
      result.txt = "请输入有效的数字金额";
      return result;
    }

    // 必须是 100 的整数倍
    if (num % 100 !== 0) {
      result.txt = "金额必须是100的整数倍";
      return result;
    }

    // 范围校验
    if (num < 100) {
      result.txt = "金额不能小于100";
      return result;
    }

    if (num > 1000) {
      result.txt = "金额不能大于1000";
      return result;
    }
    result.status = true;
    return result; // 校验通过
  };
  const initUsdtAmount = async () => {
    const result = await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "balanceOf",
      params: [walletAddress],
    });
    setWalletAddressAmount(result.value);
  };
  const submitClick = async () => {
    //校验输入的金额
    const ruleResult = ruleAmount(benJinAmount);
    if (!ruleResult.status) {
      return Totast(ruleResult.txt, "error");
    }
    //判断余额是否足够
    if (
      Number(fromWei(walletAddressAmount, 18)) <
      Number(benJinAmount) + Number(jiHuoAmount)
    ) {
      return Totast("钱包余额不足", "error");
    }
    const amount = toWei(
      (Number(benJinAmount) + Number(jiHuoAmount)).toFixed(4),
      18,
    );
    //开始授权 进行购买
    let applyAmount: bigint = 0n;
    let isApply = false;
    setBtnLoading(true);
    await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "allowance",
      params: [walletAddress, ContractList["investment"].address],
    }).then((res) => {
      if (res.value) {
        applyAmount = res.value;
      }
    });
    if (applyAmount < amount) {
      await ContractSend({
        tokenName: "USDTToken",
        methodsName: "approve",
        params: [
          ContractList["investment"].address,
          amount,  
        ],
      }).then((res) => {
        if (res.value) {
          isApply = true;
        } else {
          return;
        }
      });
    } else {
      isApply = true;
    }
    if (!isApply) {
      return;
    }
    try {
      const result = await ContractSend({
        tokenName: "investment",
        methodsName: "deposit",
        params: [toWei(benJinAmount,18)],
      });
      if (result.value) {
        Totast("购买成功", "success"); // 检查授权或者授权时发生了错误，请检查网络后重新尝试
        closeChange()
      }
    } finally {
      // 无论成功或失败，都需要关闭加载状态
      setBtnLoading(false);
      
    }
  };
  useEffect(() => {
    initUsdtAmount();
  }, []);
  return (
    <Popup
      position="bottom"
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
      visible={visible}
      onMaskClick={() => closeChange()}
    >
      <div className="ChfpPopupPage">
        <div className="headerTopOption">
          <div className="title">开启理财</div>
          <img
            src={closeIcon}
            className="closeIcon"
            onClick={() => closeChange()}
          ></img>
        </div>
        <div className="inputBox marginTop24">
          <div className="inputHint">
            <div className="leftTxt">投入金额</div>
            <div className="rightTxtOption">
              <span className="rightTxt">钱包余额:</span>
              <span className="rightAmount">
                {fromWei(walletAddressAmount, 18)}
              </span>
            </div>
          </div>
          <div className="inputOption">
            <Input
              placeholder="输入大于100的整数倍"
              value={benJinAmount}
              onChange={(e) => benJinAmountChange(e.target.value)}
              className="inputClass"
            ></Input>
            <span className="typeAmount">USDT</span>
            <div className="blockLine"></div>
            <span className="allTxt" onClick={() => allAmountClick()}>
              全部
            </span>
          </div>
        </div>
        <div className="inputBox">
          <div className="inputHint">
            <div className="leftTxt">激活金(20%)</div>
          </div>
          <div className="inputOption">
            <Input
              disabled
              placeholder="请输入"
              className="inputClass"
              value={jiHuoAmount}
              onChange={(e) => setJiHuoAmount(e.target.value)}
            ></Input>
            <span className="typeAmount">USDT</span>
          </div>
        </div>

        {/* <div className="hintTxts">
          开启后每日将自动追投首投金额的10%，直至追投账户的余额不够为止
        </div> */}
        {isOpenAi && (
          <div className="openAiInputBox">
            <div className="inputOption">
              <Input
                placeholder="请输入"
                className="inputClass"
                value={aiAmount}
                onChange={(e) => setAiAmount(e.target.value)}
              ></Input>
              <span className="typeAmount">USDT</span>
            </div>
          </div>
        )}
        {isOpenAi && (
          <div className="aiHintBox">*追投金额将存入追投账户备份</div>
        )}
        <div className="endBox">
          <div className="endOption">
            <span className="leftTxt">需支付：</span>
            <span className="rightTxt">
              {Number(benJinAmount) + Number(jiHuoAmount)} USDT
            </span>
          </div>
          <Button
            className="btn"
            onClick={() => submitClick()}
            loading={btnLoading}
          >
            确认开启并支付
          </Button>
        </div>
      </div>
    </Popup>
  );
};
export default ChfpPopup;
