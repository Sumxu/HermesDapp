import { useEffect, useState } from "react";
import "./index.scss";
import { Popup, Switch, Button } from "antd-mobile";
import { Input } from "antd";
import closeIcon from "@/assets/Basic/close.png";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import ContractSend from "@/Hooks/ContractSend.ts";
import ContractList from "@/Contract/Contract.ts";
import { storage } from "@/Hooks/useLocalStorage";
import { fromWei, Totast, toWei } from "@/Hooks/Utils";
interface RechargePopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const RechargePopup: React.FC<RechargePopupProps> = ({
  visible,
  closeChange,
}) => {
  const [benJinAmount, setBenJinAmount] = useState<string>("");
  const [jiHuoAmount, setJiHuoAmount] = useState<string>("");
  const [aiAmount, setAiAmount] = useState<string>("");
  const [isOpenAi, setIsOpenAi] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [walletAddressAmount, setWalletAddressAmount] = useState<bigint>(0n);
  const walletAddress = storage.get("address");
  const initUsdtAmount = async () => {
    const result = await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "balanceOf",
      params: [walletAddress],
    });
    setWalletAddressAmount(result.value);
  };
  const submitClick = async () => {
    //判断钱包余额是否足够
    const amount = toWei(jiHuoAmount, 18);
    console.log("amount--", amount);
    if (walletAddressAmount < amount) {
      return Totast("余额不足", "error");
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
        methodsName: "recharge",
        params: [amount],
      });
      if (result.value) {
        Totast("充值成功", "success"); // 检查授权或者授权时发生了错误，请检查网络后重新尝试
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
      <div className="ReinvestmentPopupPage">
        <div className="headerTopOption">
          <div className="title">充值余额</div>
          <img
            src={closeIcon}
            className="closeIcon"
            onClick={() => closeChange()}
          ></img>
        </div>
        <div className="inputBox">
          <div className="inputHint">
            <div className="leftTxt">充值金额</div>
            <div className="rightTxtOption">
              <span className="rightTxt">钱包余额</span>
              <span className="rightAmount">
                {fromWei(walletAddressAmount, 18)}USDT
              </span>
            </div>
          </div>
          <div className="inputOption">
            <Input
              placeholder="请输入"
              className="inputClass"
              value={jiHuoAmount}
              onChange={(e) => setJiHuoAmount(e.target.value)}
            ></Input>
            <span className="typeAmount">USDT</span>
            {/* <div className="blockLine"></div>
            <span className="allTxt">全部</span> */}
          </div>
        </div>

        <div className="endBox">
          <Button
            className="btn"
            loading={btnLoading}
            onClick={() => submitClick()}
          >
            确认充值
          </Button>
        </div>
      </div>
    </Popup>
  );
};
export default RechargePopup;
