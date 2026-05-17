import { useEffect, useState } from "react";
import "./index.scss";
import { Popup, Switch, Button } from "antd-mobile";
import { Input } from "antd";
import closeIcon from "@/assets/Basic/close.png";
interface ReinvestmentPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const RedeemPopup: React.FC<ReinvestmentPopupProps> = ({ visible, closeChange }) => {
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
      <div className="ReinvestmentPopupPage">
        <div className="headerTopOption">
          <div className="title">追投账户充值</div>
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
                <span className="rightAmount">3500.00USDT</span>
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
            <div className="blockLine"></div>
            <span className="allTxt">全部</span>
          </div>
        </div>

        <div className="endBox">
          <Button className="btn">确认充值</Button>
        </div>
      </div>
    </Popup>
  );
};
export default RedeemPopup;
