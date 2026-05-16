import { useEffect, useState } from "react";
import "./index.scss";
import { Popup, Switch, Button } from "antd-mobile";
import { Input } from "antd";
import closeIcon from "@/assets/Basic/close.png";
interface RedeemPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const RedeemPopup: React.FC<RedeemPopupProps> = ({ visible, closeChange }) => {
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
          <div className="title">赎回本金</div>
          <img
            src={closeIcon}
            className="closeIcon"
            onClick={() => closeChange()}
          ></img>
        </div>
        <div className="inputBox marginTop24">
          <div className="inputHint">
            <div className="leftTxt">当前本金</div>
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
            <div className="leftTxt">赎回本金</div>
          </div>
          <div className="inputOption">
            <Input
              placeholder="请输入"
              className="inputClass"
              value={jiHuoAmount}
              onChange={(e) => setJiHuoAmount(e.target.value)}
            ></Input>
            <span className="typeAmount">USDT</span>
            <div className="blockLine"></div>
            <span className="allTxt">全部</span>
          </div>
        </div>
        <div className="optionBox">
          <div className="optionItem">
            <span className="spnLeft">
              · 赎回后剩余本金需要缴纳相应权益激活金,才能继续享用受相应的收益率。
            </span>
          </div>
          <div className="optionItem">
            <span className="spnLeft">
               · 不缴纳权益激活金，将只能享受最低收益率0.6%:
            </span>
          </div>
        </div>

        <div className="endBox">
          <div className="endOption">
            <span className="leftTxt">实际到账:</span>
            <span className="rightTxt">0.00 USDT</span>
          </div>
          <Button className="btn">确认赎回</Button>
        </div>
      </div>
    </Popup>
  );
};
export default RedeemPopup;
