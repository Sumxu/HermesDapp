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
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
      visible={visible}
      onMaskClick={() => closeChange()}
    >
      <div className="ChfpPopupPage">
        <div className="headerTopOption">
          <div className="title">开启智能理财</div>
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
        <div className="isOpenAiBox">
          <span className="leftTxt">是否开启Ai追投</span>
          <Switch
            value={isOpenAi}
            onChange={(e) => setIsOpenAi(e)}
            style={{
              "--checked-color": "#1DD274",
              "--height": "20px",
              "--width": "40px",
            }}
          />
        </div>
        <div className="hintTxts">
          开启后每日将自动追投首投金额的10%，直至追投账户的余额不够为止
        </div>
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
            <span className="rightTxt">0.00 USDT</span>
          </div>
          <Button className="btn">确认开启并支付</Button>
        </div>
      </div>
    </Popup>
  );
};
export default ChfpPopup;
