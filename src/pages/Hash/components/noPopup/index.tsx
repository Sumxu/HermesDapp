import { useEffect } from "react";
import "./index.scss";
import { Mask } from "antd-mobile";
import errorIcon from "@/assets/Guessing/errorIcon.png";
interface HintPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const NoPopup: React.FC<HintPopupProps> = ({ visible, closeChange }) => {
  useEffect(() => {}, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
      <div className="NoPopupPage">
        <div className="HintPopupContent">
          <div className="headerTop">
            <img src={errorIcon} className="closeIcon" onClick={()=>closeChange()}></img>
          </div>
          <div className="txtsOption">封盘中</div>
        </div>
      </div>
    </Mask>
  );
};
export default NoPopup;
