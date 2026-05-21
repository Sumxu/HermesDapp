import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import SynthesisPopup from "./components/SynthesisPopup";
import SynthesisSuccessPopup from "./components/SynthesisSuccessPopup";
import { useEffect, useState } from "react";
import NoData from "@/components/NoData";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { InfiniteScroll } from "antd-mobile";
import { Spin } from "antd";
import { Totast } from "@/Hooks/Utils";

interface listItem {
  name: string;
  img: string;
  number: string;
}
interface Compound {
  name: string; //名称
  img: string; //图片
  number: string; //编号
}
const Nft: React.FC = () => {
  const [nftNum, setNftNum] = useState<number>(0); //nft数量
  const [debrisNum, setDebrisNum] = useState<number>(0); //nft碎片
  const [list, setList] = useState<listItem[]>([]);
  const [synthesisPopupShow, setSynthesisPopupShow] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [compoundResult, setCompoundResult] = useState<Compound>();
  const [synthesisSuccessPopupShow, setSynthesisSuccessPopupShow] =
    useState<boolean>(false);

  const openSynthesisPopupClick = () => {
    if(nftNum<20){
      return Totast('NFT碎片不足','info')
    }
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
  const initData = async () => {
    const result = await NetworkRequest({
      Url: "nft/account",
      Method: "get",
    });
    if (result.success) {
      setNftNum(result.data.data.nft);
      setDebrisNum(result.data.data.debris);
    }
  };
  const initList = async () => {
    setList([])
    const result = await NetworkRequest({
      Url: "nft/list",
      Method: "post",
      Data: {
        size: 10,
        current: 1,
      },
    });
    if (result.success) {
      setList((prevList) => [...prevList, ...result.data.data.records]);
      setTotal(result.data.data.total);
      if (result.data.data.records.length == 10) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
    }
  };
  const loadMoreAction = async () => {
    const nexPage = current + 1;
    setCurrent(nexPage);
    await NetworkRequest({
      Url: "nft/list",
      Method: "get",
      Data: {
        current: nexPage,
        size: 10,
      },
    }).then((res) => {
      if (res.success) {
        setList((prevList) => [...prevList, ...res.data.data.records]);
        if (res.data.data.records.length == 10) {
          setIsMore(true);
        } else {
          setIsMore(false);
        }
      }
    });
    setPageLoading(false);
  };
  const successChange = (data) => {
    setSynthesisPopupShow(false);
    setCompoundResult(data);
    openSynthesisSuccessPopupClick();
  };
  useEffect(() => {
    initData();
    initList();
  }, []);
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
            <div className="txt">{nftNum}</div>
            <div className="txt">{debrisNum}</div>
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
        <div className="nftBox">
          <div className="nftListBox">
            {pageLoading && (
              <div className="assetDetailSpinBox">
                <Spin />
              </div>
            )}
            
            {!pageLoading && list.length == 0 ? (
              <NoData />
            ) : (
              list.map((item, index) => {
                return (
                  <div className="nftItem" key={index}>
                    <img src={item.img} className="img"></img>
                    <div className="endInfo">
                      <div className="endOption">
                        <div className="leftTitle">{item.name}</div>
                      </div>
                      <div className="numOption">#{item.number}</div>
                    </div>
                  </div>
                );
              })
              
            )}
          </div>
          <InfiniteScroll
            loadMore={loadMoreAction}
            hasMore={isMore}
          ></InfiniteScroll>
        </div>
      </div>
      <SynthesisPopup
        successChange={(data) => successChange(data)}
        visible={synthesisPopupShow}
        closeChange={() => synthesisPopupCloseChange()}
      ></SynthesisPopup>
      <SynthesisSuccessPopup
        info={compoundResult}
        visible={synthesisSuccessPopupShow}
        closeChange={() => synthesisSuccessPopupCloseChange()}
      ></SynthesisSuccessPopup>
    </div>
  );
};
export default Nft;
