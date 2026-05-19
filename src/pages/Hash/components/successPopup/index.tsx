import { useEffect } from "react";
import "./index.scss";
import { Mask } from "antd-mobile";
import errorIcon from "@/assets/Guessing/errorIcon.png";
import checkIcon from '@/assets/Basic/checkIcon.png'
interface HintPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const SuccessPopup: React.FC<HintPopupProps> = ({ visible, closeChange }) => {
  useEffect(() => {}, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
      <div className="NoPopupPage">
        <div className="HintPopupContent">
          <div className="headerTop">
            <img
              src={checkIcon}
              className="closeIcon"
              onClick={() => closeChange()}
            ></img>
          </div>
          <div className="txtsOption">参与成功 3s</div>
        </div>
      </div>
    </Mask>
  );
};
export default SuccessPopup;
