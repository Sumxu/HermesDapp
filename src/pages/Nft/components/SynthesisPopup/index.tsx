import { useEffect, useState } from "react";
import "./index.scss";
import { Mask } from "antd-mobile";
import closeIcon from "@/assets/Basic/close.png";
import { Button } from "antd";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { Totast } from "@/Hooks/Utils";
interface SynthesisPopupProps {
  visible: boolean; //
  closeChange: () => void;
  successChange: (val) => void;
}
const SynthesisPopup: React.FC<SynthesisPopupProps> = ({
  visible,
  closeChange,
  successChange,
}) => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const sumbitClick = async () => {
    try {
      setBtnLoading(true);
      const result = await NetworkRequest({
        Url: "nft/compound",
        Method: "get",
      });
      if (result.success) {
        Totast("合成成功", "success");
        successChange(result.data.data);
      }
    } catch (error) {
    } finally {
      setBtnLoading(false);
    }
  };
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
          <Button
            className="btnBox"
            onClick={() => sumbitClick()}
            loading={btnLoading}
          >
            确认合成
          </Button>
        </div>
      </div>
    </Mask>
  );
};
export default SynthesisPopup;
