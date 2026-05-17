import { useEffect } from "react";
import "./index.scss";
import { Mask } from "antd-mobile";
import closeIcon from "@/assets/Basic/close.png";
interface SynthesisSuccessPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const SynthesisSuccessPopup: React.FC<SynthesisSuccessPopupProps> = ({
  visible,
  closeChange,
}) => {
  useEffect(() => {}, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
       <div className="SynthesisSuccessPopupPage">
        <div className="SynthesisSuccessPopupContent">
          <div className="cardSuccessBox">
            <div className="img"></div>
            <div className="endInfo">
              <div className="endInfoTop">
                <div className="leftTxt">HEMRES</div>
                <div className="rightType1">普通</div>
              </div>
              <div className="endInfoEnd">#00563178</div>
            </div>
          </div>
          <div className="btnBox" onClick={()=>closeChange()}>继续合成</div>
        </div>
      </div>
    </Mask>
  );
};
export default SynthesisSuccessPopup;
