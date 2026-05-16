import { useEffect, useState } from "react";
import "./index.scss";
import { Button, Mask } from "antd-mobile";
import closeIcon from "@/assets/Basic/close.png";
import { Input } from "antd";
import { Popup } from "antd-mobile";
interface ActiveGoldPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const ActivateGoldPopup: React.FC<ActiveGoldPopupProps> = ({
  visible,
  closeChange,
}) => {
  const [benJinAmount, setBenJinAmount] = useState<string>("");
  const [jiHuoAmount, setJiHuoAmount] = useState<string>("");
  useEffect(() => {}, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
      <div className="ActivateGoldPopupPage">
        <div className="HintPopupContent">
          <div className="headerTop">
            <div className="title">补缴权益激活金</div>
            <img
              src={closeIcon}
              className="closeIcon"
              onClick={() => closeChange()}
            ></img>
          </div>
          <div className="inputBox marginTop24">
            <div className="inputHint">
              <div className="leftTxt">剩余本金</div>
              <div className="rightTxtOption">
                <span className="rightTxt">钱包余额:</span>
                <span className="rightAmount">32999</span>
              </div>
            </div>
            <div className="inputOption">
              <Input
                placeholder="请输入"
                value={benJinAmount}
                onChange={(e) => setBenJinAmount(e.target.value)}
                className="inputClass"
              ></Input>
              <span className="typeAmount">USDT</span>
            </div>
          </div>
          <div className="inputBox">
            <div className="inputHint">
              <div className="leftTxt">激活金(20%)</div>
            </div>
            <div className="inputOption">
              <Input
                placeholder="请输入"
                className="inputClass"
                value={jiHuoAmount}
                onChange={(e) => setJiHuoAmount(e.target.value)}
              ></Input>
              <span className="typeAmount">USDT</span>
            </div>
          </div>
          <div className="endBox">
            <div className="leftTxt">需支付：</div>
            <div className="rightTxt">180.00 USDT</div>
          </div>
          <Button className="btnOption">确认</Button>
          <div className="endHintTxt">
            补缴后，即可享受<span className="endSpn"> 0.8%</span> 的收益率
          </div>
        </div>
      </div>
    </Mask>
  );
};
export default ActivateGoldPopup;
