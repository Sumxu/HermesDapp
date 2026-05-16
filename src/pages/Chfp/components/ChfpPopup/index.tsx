import { useEffect, useState } from "react";
import "./index.scss";
import { Popup, Switch, Button } from "antd-mobile";
import { Input } from "antd";
import closeIcon from "@/assets/Basic/close.png";
interface ChfpPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const ChfpPopup: React.FC<ChfpPopupProps> = ({ visible, closeChange }) => {
  const [benJinAmount, setBenJinAmount] = useState<string>("");
  const [jiHuoAmount, setJiHuoAmount] = useState<string>("");
  const [aiAmount, setAiAmount] = useState<string>("");
  const [isOpenAi, setIsOpenAi] = useState<boolean>(false);
  useEffect(() => {}, []);
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
            <div className="leftTxt">升级后本金</div>
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
        <div className="optionBox">
          <div className="optionItem">
            <span className="spnLeft">需补本金:</span>
            <span className="spnRight">0.00USDT</span>
          </div>
          <div className="optionItem">
            <span className="spnLeft">需补充权益激活金:</span>
            <span className="spnRight">0.00USDT</span>
          </div>
          <div className="optionItem">
            <span className="spnLeft">合计:</span>
            <span className="spnRight">0.00USDT</span>
          </div>
        </div>

        <div className="endBox">
          <div className="endOption">
            <span className="leftTxt">需支付：</span>
            <span className="rightTxt">0.00 USDT</span>
          </div>
          <Button className="btn">确认升级</Button>
        </div>
      </div>
    </Popup>
  );
};
export default ChfpPopup;
