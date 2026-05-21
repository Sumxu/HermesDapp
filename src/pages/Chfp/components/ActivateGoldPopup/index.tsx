import { useEffect, useState } from "react";
import "./index.scss";
import { Button, Mask } from "antd-mobile";
import closeIcon from "@/assets/Basic/close.png";
import { Input } from "antd";
import { Popup } from "antd-mobile";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { Totast } from "@/Hooks/Utils";
interface ActiveGoldPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
interface withDrawConfig {
  fee: number;
  dayLimit: number;
  minAmount: number;
}
const ActivateGoldPopup: React.FC<ActiveGoldPopupProps> = ({
  visible,
  closeChange,
}) => {
  const [benJinAmount, setBenJinAmount] = useState<string>("");
  const [jiHuoAmount, setJiHuoAmount] = useState<string>("");
  const [withDrawConfig, setWithDrawConfig] = useState<withDrawConfig>();
  const [accountUsdt, setAccountUsdt] = useState<number>(0);

  const initData = async () => {
    const result = await NetworkRequest({
      Url: "account/getWithdrawConfig",
      Method: "get",
    });
    console.log("result==", result);
    if (result.success) {
      setWithDrawConfig(result.data.data);
    }
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
  useEffect(() => {
    initData();
    initAccountUsdt();
  }, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
      <div className="ActivateGoldPopupPage">
        <div className="HintPopupContent">
          <div className="headerTop">
            <div className="title">提现</div>
            <img
              src={closeIcon}
              className="closeIcon"
              onClick={() => closeChange()}
            ></img>
          </div>
          <div className="inputBox marginTop24">
            <div className="inputHint">
              <div className="rightTxtOption">
                <span className="rightTxt">提现余额:</span>
                <span className="rightAmount">{accountUsdt}</span>
              </div>
            </div>
            <div className="inputOption">
              <Input
                placeholder="请输入提现金额"
                value={benJinAmount}
                onChange={(e) => setBenJinAmount(e.target.value)}
                className="inputClass"
              ></Input>
              <span className="typeAmount">USDT</span>
            </div>
          </div>
          <div className="inputBox">
            <div className="inputHint">
              <div className="leftTxt">需支付HZ</div>
            </div>
            <div className="inputOption">
              <Input
                placeholder="请输入"
                disabled
                className="inputClass"
                value={jiHuoAmount}
                onChange={(e) => setJiHuoAmount(e.target.value)}
              ></Input>
              <span className="typeAmount">HZ</span>
            </div>
          </div>
          <div className="endBox">
            <div className="leftTxt">需支付：</div>
            <div className="rightTxt">180.00 USDT</div>
          </div>
          <Button className="btnOption">确认</Button>
          <div className="endHintTxt">
          提现需扣除<span className="endSpn"> 5%</span>等价的HZ
          </div>
        </div>
      </div>
    </Mask>
  );
};
export default ActivateGoldPopup;
