import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import SynthesisPopup from "./components/SynthesisPopup";
import SynthesisSuccessPopup from "./components/SynthesisSuccessPopup";
import { useState } from "react";
const Nft: React.FC = () => {
  const [synthesisPopupShow, setSynthesisPopupShow] = useState<boolean>(false);
  const [synthesisSuccessPopupShow, setSynthesisSuccessPopupShow] =
    useState<boolean>(false);

  const openSynthesisPopupClick = () => {
    setSynthesisPopupShow(true);
  };
  const synthesisPopupCloseChange = () => {
    setSynthesisPopupShow(false);
  };

  const openSynthesisSuccessPopupClick = () => {
    setSynthesisSuccessPopupShow(true);
  };
  const synthesisSuccessPopupCloseChange = () => {
    setSynthesisSuccessPopupShow(false);
  };
  return (
    <div className="NftPage">
      <HeaderTop title="NFT资产" backgroundColor="#000" />
      <div className="nftContentPage">
        <div className="headerNftTopBox">
          <div className="headerNftTopOption">
            <div className="txt">我的NFT</div>
            <div className="txt">NFT碎片</div>
          </div>
          <div className="numOption">
            <div className="txt">8</div>
            <div className="txt">24</div>
          </div>
          <div className="btnOption" onClick={() => openSynthesisPopupClick()}>
            去合成
          </div>
        </div>

        <div
          className="nftTxtBox"
          onClick={() => openSynthesisSuccessPopupClick()}
        >
          NFT列表
        </div>
        <div className="nftListBox">
          <div className="nftItem">
            <div className="img"></div>
            <div className="endInfo">
              <div className="endOption">
                <div className="leftTitle">Hhhh</div>
                <div className="rightType1">普通</div>
              </div>
              <div className="numOption">#000102312312</div>
            </div>
          </div>
          <div className="nftItem">
            <div className="img"></div>
            <div className="endInfo">
              <div className="endOption">
                <div className="leftTitle">Hhhh</div>
                <div className="rightType1">普通</div>
              </div>
              <div className="numOption">#000102312312</div>
            </div>
          </div>
          <div className="nftItem">
            <div className="img"></div>
            <div className="endInfo">
              <div className="endOption">
                <div className="leftTitle">Hhhh</div>
                <div className="rightType1">普通</div>
              </div>
              <div className="numOption">#000102312312</div>
            </div>
          </div>
        </div>
      </div>
      <SynthesisPopup
        visible={synthesisPopupShow}
        closeChange={() => synthesisPopupCloseChange()}
      ></SynthesisPopup>
      <SynthesisSuccessPopup
        visible={synthesisSuccessPopupShow}
        closeChange={() => synthesisSuccessPopupCloseChange()}
      ></SynthesisSuccessPopup>
    </div>
  );
};
export default Nft;
