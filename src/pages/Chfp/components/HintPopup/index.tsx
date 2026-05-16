import { useEffect } from "react";
import "./index.scss";
import { Mask } from "antd-mobile";
import closeIcon from "@/assets/Basic/close.png";
interface HintPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const HintPopup: React.FC<HintPopupProps> = ({ visible, closeChange }) => {
  useEffect(() => {}, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
      <div className="HintPopupPage">
        <div className="HintPopupContent">
          <div className="headerTop">
            <div className="title">如何提升收益率？</div>
            <img src={closeIcon} className="closeIcon" onClick={()=>closeChange()}></img>
          </div>
          <div className="txtsOption">· 每日可追加 10% 投资额，收益率提</div>
          <div className="txtsOption">
            · 当投资额达到首投金额的 5.5 倍 时，日化收益率达到封顶
            1.5%（约第45次追加后达到封顶值）。
          </div>
        </div>
      </div>
    </Mask>
  );
};
export default HintPopup;
