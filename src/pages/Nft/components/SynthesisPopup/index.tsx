import { useEffect } from "react";
import "./index.scss";
import { Mask } from "antd-mobile";
import closeIcon from "@/assets/Basic/close.png";
interface SynthesisPopupProps {
  visible: boolean; //
  closeChange: () => void;
}
const SynthesisPopup: React.FC<SynthesisPopupProps> = ({
  visible,
  closeChange,
}) => {
  useEffect(() => {}, []);
  return (
    <Mask visible={visible} onMaskClick={() => closeChange()}>
         <div className="SynthesisPopupPage">
        <div className="SynthesisPopupContent">
          <div className="SynthesisHeaderTop">
            <div className="title">NFT合成</div>
            <img
              src={closeIcon}
              className="closeIcon"
              onClick={() => closeChange()}
            ></img>
          </div>
          <div className="numberBox">
            <div className="numTxt">20</div>
            <div className="hintTxt">需消耗NFT碎片</div>
          </div>
          <div className="hintTxtBox">合成后可获得一张NFT卡牌</div>
          <div className="btnBox">确认合成</div>
        </div>
      </div>
    </Mask>
  );
};
export default SynthesisPopup;
