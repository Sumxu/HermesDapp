import { useEffect } from "react";
import "./index.scss";
import { Mask } from "antd-mobile";
import closeIcon from "@/assets/Basic/close.png";
interface SynthesisSuccessPopupProps {
  visible: boolean;
  info: {};
  closeChange: () => void;
}
const SynthesisSuccessPopup: React.FC<SynthesisSuccessPopupProps> = ({
  visible,
  info,
  closeChange,
}) => {
  useEffect(() => {}, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
      <div className="SynthesisSuccessPopupPage">
        <div className="SynthesisSuccessPopupContent">
          <div className="cardSuccessBox">
            <img src={info?.img} className="img" />
            <div className="endInfo">
              <div className="endInfoTop">
                <div className="leftTxt">{info?.name}</div>
              </div>
              <div className="endInfoEnd">#{info?.number}</div>
            </div>
          </div>
          <div className="btnBox" onClick={() => closeChange()}>
            继续合成
          </div>
        </div>
      </div>
    </Mask>
  );
};
export default SynthesisSuccessPopup;
