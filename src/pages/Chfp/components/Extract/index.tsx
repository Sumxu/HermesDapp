import { useEffect, useState } from "react";
import "./index.scss";
import { Popup, Switch, Button } from "antd-mobile";
import { Input } from "antd";
import closeIcon from "@/assets/Basic/close.png";
import { storage } from "@/Hooks/useLocalStorage.ts";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { formatAddress, Totast } from "@/Hooks/Utils";
import ContractSend from "@/Hooks/ContractSend.ts";

interface ExtractPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
interface withDrawConfig {
  fee: number;
  dayLimit: number;
  minAmount: number;
}
const ExtractPopup: React.FC<ExtractPopupProps> = ({
  visible,
  closeChange,
}) => {
  const walletAddress = storage.get("address");

  const [benJinAmount, setBenJinAmount] = useState<string>("");
  const [jiHuoAmount, setJiHuoAmount] = useState<string>("");
  const [aiAmount, setAiAmount] = useState<string>("");
  const [withDrawConfig, setWithDrawConfig] = useState<withDrawConfig>();
  const [accountUsdt, setAccountUsdt] = useState<number>(0);
  const [accountHz, setAccountHz] = useState<number>(0);
  const [hzPrice, setHzPrice] = useState<number>(0);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const initData = async () => {
    const result = await NetworkRequest({
      Url: "account/getWithdrawConfig",
      Method: "get",
    });
    if (result.success) {
      setWithDrawConfig(result.data.data);
    }
  };
  const allAmountChange = () => {
    setJiHuoAmount(accountUsdt.toString());
    const hzAmount = calcHzFee(accountUsdt, hzPrice, withDrawConfig?.fee);
    setBenJinAmount(hzAmount.toString());
  };
  const initAccountUsdt = async () => {
    const result = await NetworkRequest({
      Url: "account/getUsdt",
      Method: "get",
    });
    if (result.success) {
      setAccountUsdt(result.data.data);
    }
  };
  const initAccountHz = async () => {
    const result = await NetworkRequest({
      Url: "account/getHz",
      Method: "get",
    });
    if (result.success) {
      setAccountHz(result.data.data);
    }
  };

  const initHzAmount = async () => {
    const result = await NetworkRequest({
      Url: "account/getPrice",
      Method: "get",
    });
    if (result.success) {
      setHzPrice(result.data.data);
    }
  };
  const calcHzFee = (
    withdrawAmount: number,
    hzPrice: number,
    feeRate = 0.05,
  ) => {
    return (withdrawAmount * feeRate) / hzPrice;
  };
  const jiHuoAmountChange = (e) => {
    setJiHuoAmount(e);
    const hzAmount = calcHzFee(e, hzPrice, withDrawConfig?.fee);
    setBenJinAmount(hzAmount.toString());
  };
  const sumbitClick = async () => {
    //判断输入的余额是否足够
    if (accountUsdt < Number(jiHuoAmount)) {
      return Totast("账户余额USDT不足!", "info");
    }
    //判断hz手续费是否足够
    if (accountHz < Number(benJinAmount)) {
      return Totast("账户余额HZ不足!", "info");
    }
    if (Number(jiHuoAmount) < withDrawConfig?.minAmount) {
      return Totast(`提现最小金额为${withDrawConfig?.minAmount}!`, "info");
    }
    setBtnLoading(true);
    const result = await NetworkRequest({
      Url: "account/withdraw",
      Method: "get",
      Data: {
        amount: jiHuoAmount,
      },
    });
    console.log("result==", result);
    if (result.success) {
      withDrawFn(result.data.data);
    } else {
      setBtnLoading(false);
    }
  };
  const withDrawFn = async (data) => {
    console.log("data=", data);
    try {
      console.log([walletAddress, data.nonce, data.amount, data.signature]);
      const result = await ContractSend({
        tokenName: "PricePoolABI",
        methodsName: "withdraw",
        params: [
          walletAddress,
          data.nonce,
          data.amount,
          data.signature,
        ],
      });
      if (result.value) {
        Totast("提现成功", "success"); // 检查授权或者授权时发生了错误，请检查网络后重新尝试
        closeChange();
      }
    } finally {
      // 无论成功或失败，都需要关闭加载状态
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    initData();
    initAccountUsdt();
    initAccountHz();
    initHzAmount();
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
      <div className="ExtractPopupPage">
        <div className="headerTopOption">
          <div className="title">账户提现</div>
          <img
            src={closeIcon}
            className="closeIcon"
            onClick={() => closeChange()}
          ></img>
        </div>
        <div className="inputBox">
          <div className="inputHint">
            <div className="leftTxt">提现金额</div>
            <div className="rightTxtOption">
              <span className="rightTxt">账户余额</span>
              <span className="rightAmount">{accountUsdt}USDT</span>
            </div>
          </div>
          <div className="inputOption">
            <Input
              placeholder="请输入"
              className="inputClass"
              value={jiHuoAmount}
              onChange={(e) => jiHuoAmountChange(e.target.value)}
            ></Input>
            <span className="typeTAmount">USDT</span>
            <div className="blockLine"></div>
            <span className="allTxt" onClick={() => allAmountChange()}>
              全部
            </span>
          </div>
        </div>

        <div className="inputBox">
          <div className="inputHint">
            <div className="leftTxt">手续费({withDrawConfig?.fee * 100}%)</div>
            <div className="rightTxtOption">
              <span className="rightTxt">账户余额</span>
              <span className="rightAmount">{accountHz}HZ</span>
            </div>
          </div>
          <div className="inputOption">
            <Input
              placeholder="请输入"
              disabled
              className="inputClass"
              value={benJinAmount}
              onChange={(e) => setBenJinAmount(e.target.value)}
            ></Input>
            <span className="typeAmount">HZ</span>
          </div>
        </div>
        <div className="hintOptionEx">
          <span className="hitTxt">提取至已绑定钱包</span>
          <span className="hitWallet">{formatAddress(walletAddress)}</span>
        </div>
        <div className="endBox">
          <Button
            onClick={() => sumbitClick()}
            className="btn"
            loading={btnLoading}
          >
            确认提取
          </Button>
        </div>
      </div>
    </Popup>
  );
};
export default ExtractPopup;
