import { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Popup, Switch, Button } from "antd-mobile";
import { Input } from "antd";
import closeIcon from "@/assets/Basic/close.png";
import { storage } from "@/Hooks/useLocalStorage.ts";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import { fromWei, Totast, toWei } from "@/Hooks/Utils.ts";
import ContractSend from "@/Hooks/ContractSend.ts";
import ContractList from "@/Contract/Contract.ts";
interface ChfpPopupProps {
  principal: bigint;
  insurancePaid: bigint;
  visible: boolean;
  closeChange: () => void;
}
const ChfpPopup: React.FC<ChfpPopupProps> = ({
  principal,
  insurancePaid,
  visible,
  closeChange,
}) => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [benJinAmount, setBenJinAmount] = useState<string>("");
  const walletAddress = storage.get("address");
  const [jiHuoAmount, setJiHuoAmount] = useState<string>("");
  const [aiAmount, setAiAmount] = useState<string>("");
  const [isOpenAi, setIsOpenAi] = useState<boolean>(false);
  const [walletAddressAmount, setWalletAddressAmount] = useState<bigint>(0n);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const initUsdtAmount = async () => {
    const result = await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "balanceOf",
      params: [walletAddress],
    });
    setWalletAddressAmount(result.value);
  };
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
    //不能是本金
    if (num == Number(fromWei(principal, 18))) {
      result.txt = "不能是本金金额";
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
  const jiHuoAmountChange = (e) => {
    setJiHuoAmount(e);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    // 防抖
    debounceRef.current = setTimeout(() => {
      const ruleResult = ruleAmount(e);

      if (!ruleResult.status) {
        Totast(ruleResult.txt, "error");
      }
    }, 500);
  };
  const needPayAmount = () => {
    return toWei(jiHuoAmount || "0", 18) - principal;
  };
  const needPayInsurancePaid = () => {
    const insurancePaidAmount = toWei(jiHuoAmount, 18);
    console.log("insurancePaidAmount--", insurancePaidAmount);
    console.log("insurancePaidAmount2--", (insurancePaidAmount * 20n) / 100n);
    const amount = (insurancePaidAmount * 20n) / 100n - insurancePaid;
    return amount;
  };

  const submitClick = async () => {
    const amount = needPayAmount() + needPayInsurancePaid();
    //校验输入的金额
    const ruleResult = ruleAmount(jiHuoAmount);
    if (!ruleResult.status) {
      return Totast(ruleResult.txt, "error");
    }
    //判断余额是否足够
    if (walletAddressAmount < amount) {
      return Totast("钱包余额不足", "error");
    }

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
        params: [ContractList["investment"].address, amount],
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
        methodsName: "upgrade",
        params: [toWei(jiHuoAmount, 18)],
      });
      if (result.value) {
        Totast("升级成功", "success"); // 检查授权或者授权时发生了错误，请检查网络后重新尝试
        closeChange();
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
      visible={visible}
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
      onMaskClick={() => closeChange()}
    >
      <div className="ChfpPopupPage">
        <div className="headerTopOption">
          <div className="title">升级智能本金</div>
          <img
            src={closeIcon}
            className="closeIcon"
            onClick={() => closeChange()}
          ></img>
        </div>
        <div className="inputBox marginTop24">
          <div className="inputHint">
            <div className="leftTxt">当前本金</div>
            <div className="rightTxtOption">
              <span className="rightTxt">钱包余额:</span>
              <span className="rightAmount">
                {fromWei(walletAddressAmount, 18)}
              </span>
            </div>
          </div>
          <div className="inputOption">
            <Input
              placeholder="请输入"
              value={fromWei(principal, 18)}
              disabled={true}
              className="inputClass"
            ></Input>
            <span className="typeAmount">USDT</span>
          </div>
        </div>
        <div className="inputBox">
          <div className="inputHint">
            <div className="leftTxt">升级后本金</div>
          </div>
          <div className="inputOption">
            <Input
              placeholder="请输入"
              className="inputClass"
              value={jiHuoAmount}
              onInput={(e) => jiHuoAmountChange(e.target.value)}
            ></Input>
            <span className="typeAmount">USDT</span>
          </div>
        </div>
        <div className="optionBox">
          <div className="optionItem">
            <span className="spnLeft">需补本金:</span>
            <span className="spnRight">
              {jiHuoAmount ? fromWei(needPayAmount(), 18) : 0.0}USDT
            </span>
          </div>
          <div className="optionItem">
            <span className="spnLeft">需补充权益激活金:</span>
            <span className="spnRight">
              {jiHuoAmount ? fromWei(needPayInsurancePaid(), 18) : 0.0}USDT
            </span>
          </div>
          <div className="optionItem">
            <span className="spnLeft">合计:</span>
            <span className="spnRight">
              {" "}
              {jiHuoAmount
                ? fromWei(needPayAmount() + needPayInsurancePaid(), 18)
                : 0.0}
              USDT
            </span>
          </div>
        </div>

        <div className="endBox">
          <div className="endOption">
            <span className="leftTxt">需支付：</span>
            <span className="rightTxt">
              {jiHuoAmount
                ? fromWei(needPayAmount() + needPayInsurancePaid(), 18)
                : 0.0}{" "}
              USDT
            </span>
          </div>
          <Button
            className="btn"
            loading={btnLoading}
            onClick={() => submitClick()}
          >
            确认升级
          </Button>
        </div>
      </div>
    </Popup>
  );
};
export default ChfpPopup;
