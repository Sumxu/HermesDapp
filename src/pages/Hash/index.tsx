import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Input } from "antd";
import { Switch, Button, ProgressCircle, Slider } from "antd-mobile";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import rightIcon from "@/assets/Draw/rightIcon.png";
import downIcon from "@/assets/Guessing/downIcon.png";
import OneBlock from "@/assets/Guessing/OneBlock.png";
import TwoBlock from "@/assets/Guessing/TwoBlock.png";
import query from "@/assets/Chfp/query.png";
import NoPopup from "./components/noPopup/index";
import SuccessPopup from "./components/successPopup/index";
import { useNavigate } from "react-router-dom";

import {
  asgetBlockNumber,
  hashResult,
  getAsgetBlockByNumber,
  Totast,
} from "@/Hooks/Utils";
import { Spin } from "antd";
interface pastItem {
  blockNum: string;
  type: string;
  hashArr: Array;
  hashIndex: string;
}
interface lotteryInfo {
  totalLotteryDebris: number; //累计获取nft碎片
  totalLotteryHz: number; //累计获取hz奖励
}
interface lotteryConfig {
  odds: number; //倍数
  minAmount: number; //最小投注
  maxAmount: number; //最大投注
  giveDebris: number; //投入多少可获得nft碎片
}
const Hash: React.FC = () => {
  const navigate = useNavigate();
  const [noPopupShow, setNoPopupShow] = useState<boolean>(false);
  const [successPopupShow, setSuccessPopupShow] = useState<boolean>(false);
  const [lastBlockNum, setLastBlockNum] = useState<number>(0);
  const [lashHash, setLastHash] = useState<string>("");
  const [hashArr, setHashArr] = useState<string[]>([]); //hash数组
  const [hashCheckStr, setHashCheckStr] = useState<string>("");
  const [hashType, setHashType] = useState<string>("");
  const [isPastShow, setIsPastShow] = useState<boolean>(false);
  const [pastList, setPashList] = useState<pastItem[]>([]);
  const [pastLoading, setPastLoading] = useState<boolean>(false);
  const [lotteryInfo, setLotteryInfo] = useState<lotteryInfo>();
  const [lotteryConfig, setLotteryConfig] = useState<lotteryConfig>();
  const [hzAmount, setHzAmount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [checkType, setCheckType] = useState<number>(1); //1单 2双
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const noPopupChange = () => {
    setNoPopupShow(false);
  };
  const noPopupOpenClick = () => {
    setNoPopupShow(true);
  };
  const successPopupChange = () => {
    setSuccessPopupShow(false);
  };
  const successPopupOpenClick = () => {
    setSuccessPopupShow(true);
  };
  const openPastChange = (val) => {
    setIsPastShow(!isPastShow);
    if (val == false) {
      initHashArr();
    }
  };
  const getPrevBlocks = (currentBlock: number, count = 5) => {
    return Array.from({ length: count }, (_, index) => {
      return currentBlock - (index + 1);
    });
  };
  const checkChange = (val) => {
    setCheckType(val);
  };
  const openBsc = (item) => {
    const url = `https://bscscan.com/block/${item.blockNumber}`;
    window.open(url, "_blank");
  };
  const sumbitClick = async () => {
    if (amount == 0) {
      return Totast("参与金额不能为0", "info");
    }
    if (hzAmount < amount) {
      return Totast("余额不足", "info");
    }
    try {
      setBtnLoading(true);
      const result = await NetworkRequest({
        Url: "lottery/ante",
        Method: "post",
        Data: {
          type: checkType,
          amount,
        },
      });
      if (result.success) {
        Totast("参与成功", "info");
        initData();
        initConfig();
        initLotteryInfo();
        GetHzAmount();
      }
    } catch (error) {
    } finally {
      setBtnLoading(false);
    }
  };
  const initHashArr = async () => {
    try {
      setPastLoading(true);
      //得到当前期数的前五区块号
      const blockInfo = await asgetBlockNumber();
      const blockList = getPrevBlocks(blockInfo?.number);
      const pastList = await Promise.all(
        blockList.map(async (item, index) => {
          const blockInfoItem = await getAsgetBlockByNumber(blockList[index]);
          console.log("blockInfoItem--", blockInfoItem);
          const hashRsultInfo = await hashResult(blockInfoItem?.hash);
          return {
            blockNum: blockList[index],
            type: hashRsultInfo.type,
            hashArr: hashRsultInfo.arr,
            hashIndex: hashRsultInfo.number,
          };
        }),
      );
      setPashList(pastList);
    } catch (error) {
    } finally {
      setPastLoading(false);
    }
  };
  const initData = async () => {
    const blockInfo = await asgetBlockNumber();
    setLastHash(blockInfo?.hash);
    setLastBlockNum(blockInfo?.number);
    const hashRsultInfo = await hashResult(blockInfo?.hash);
    setHashArr(hashRsultInfo.arr);
    setHashType(hashRsultInfo.type);
    setHashCheckStr(hashRsultInfo.number);
  };
  const initLotteryInfo = async () => {
    const result = await NetworkRequest({
      Url: "lottery/info",
      Method: "get",
    });
    if (result.success) {
      setLotteryInfo(result.data.data);
    }
  };
  const initConfig = async () => {
    const result = await NetworkRequest({
      Url: "lottery/config",
      Method: "post",
    });
    if (result.success) {
      setLotteryConfig(result.data.data);
    }
  };
  const GetHzAmount = async () => {
    const result = await NetworkRequest({
      Url: "account/getHz",
      Method: "get",
    });
    if (result.success) {
      setHzAmount(result.data.data);
    }
  };
  useEffect(() => {
    initData();
    initConfig();
    initLotteryInfo();
    GetHzAmount();
  }, []);
  return (
    <div className="HashPage">
      <HeaderTop title="哈希竞猜" backgroundColor="none"></HeaderTop>
      <div className="HashContentPage">
        <div className="hashInfoBox">
          <div className="hashInfoOption">
            <div className="leftOption">
              <div className="topTxt">上期开奖区块</div>
              <div className="endOption">
                <img src={OneBlock} className="icon"></img>
                <div className="endNum">{lastBlockNum - 1}</div>
                <div
                  className="endBtn"
                  onClick={() =>
                    openBsc({
                      blockNumber: lastBlockNum,
                    })
                  }
                >
                  验证
                </div>
              </div>
            </div>
            <div className="rightOption">
              <div className="topTxt">即将开奖区块</div>
              <div className="endOption">
                <img src={TwoBlock} className="icon"></img>
                <div className="endNum">{lastBlockNum}</div>
              </div>
            </div>
          </div>
          <div className="hashEndTxt">
            <div className="centerOption">
              ....
              {hashArr.map((item, index) => {
                if (index === hashCheckStr) {
                  return (
                    <span key={index} className="spnTxt">
                      {item}
                    </span>
                  );
                }
                return <span key={index}>{item}</span>; // 或直接 return item
              })}
              [{hashType}]
            </div>
            <div
              className="fixedRightOption"
              onClick={() => openPastChange(isPastShow)}
            >
              <div className="listOption">往期记录</div>
              <img src={downIcon} className="icon"></img>
            </div>
            {isPastShow && (
              <div className="listAbsoluteBox">
                <div className="headerTopOption">
                  <div className="topItem">开奖区块</div>
                  <div className="topItem">开奖结果</div>
                  <div className="topItem">区块哈希</div>
                  <div className="topItem">操作</div>
                </div>
                <div className="listBox">
                  {pastLoading ? (
                    <div className="myTeamSpinBox">
                      <Spin />
                    </div>
                  ) : (
                    pastList.map((item, index) => {
                      return (
                        <div className="listOption" key={index}>
                          <div className="numTxt">{item.blockNum}</div>
                          <div className="resultTxt">{item.type}</div>
                          <div className="num">
                            ...
                            {item.hashArr.map((arrItem, arrIndex) => {
                              if (arrIndex == item.hashIndex) {
                                return (
                                  <span key={arrIndex} className="spnTxt">
                                    {arrItem}
                                  </span>
                                );
                              }
                              return <span key={arrIndex}>{arrItem}</span>;
                            })}
                          </div>
                          <div className="btnBlock">
                            <div
                              className="btn"
                              onClick={() =>
                                openBsc({
                                  blockNumber: item.blockNum,
                                })
                              }
                            >
                              点击验证
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hashPlayBox">
          <div className="titleOption">
            <div className="leftOption">
              BNB单双·1:{lotteryConfig?.odds ? lotteryConfig?.odds : "-"}
            </div>
            <div className="rightOption" onClick={()=>navigate('/GameRule')}>
              <img src={query} className="icon"></img>
              <span className="spx">游戏规则</span>
            </div>
          </div>
          <div className="playOption">
            <div
              className={`typePlay ${checkType == 1 ? "typePlayCheck" : ""}`}
              onClick={() => checkChange(1)}
            >
              <div className="typeTxt">单</div>
              <div className="typeBlock">
                <img src={HTOKEN} className="icon"></img>
                <span className="spnTxt">{checkType == 1 ? amount : 0}</span>
              </div>
            </div>

            <div
              onClick={() => checkChange(2)}
              className={`typePlay ${checkType == 2 ? "typePlayCheck" : ""}`}
            >
              <div className="typeTxt">双</div>
              <div className="typeBlock">
                <img src={HTOKEN} className="icon"></img>
                <span className="spnTxt">{checkType == 2 ? amount : 0}</span>
              </div>
            </div>
          </div>

          <div className="joinBox">
            <div className="leftTxt">参与金额</div>
            <div className="rightOption">
              <span className="title">账户余额:</span>
              <span className="amount">{hzAmount}HZ</span>
            </div>
          </div>
          <div className="sliderBox">
            <Slider
              step={100}
              min={lotteryConfig?.minAmount}
              max={lotteryConfig?.maxAmount}
              ticks
              popover
              onAfterChange={(value) => setAmount(value)}
            />
          </div>
          {/* <div className="amountListBox"> */}
          {/* <div className="itemAmount itemAmountCheck">100</div>
            <div className="itemAmount">200</div>
            <div className="itemAmount">500</div>
            <div className="itemAmount">1000</div>
            <div className="itemAmount">2000</div> */}
          {/* </div> */}
          {/* <div className="inputAmountBox">
            <Input placeholder="自定义金额" className="inputClass"></Input>
          </div> */}
        </div>
        <div className="awardBox">
          <div className="awardOption">
            <div className="awardTitle">我的奖励</div>
            <div className="awardRight" onClick={()=>navigate('/JoinList')}>
              <span className="spn">更多记录</span>
              <img src={rightIcon} className="icon"></img>
            </div>
          </div>
          <div className="awardListBox">
            <div className="awardItem" >
              <div className="title">{lotteryInfo?.totalLotteryHz}</div>
              <div className="hintTxt">累计奖励 HZ</div>
              <div className="btnOption" onClick={()=>navigate('/AwardList')}>记录</div>
            </div>
            <div className="awardItem">
              <div className="title">{lotteryInfo?.totalLotteryDebris}</div>
              <div className="hintTxt">累计获得NFT碎片</div>
              <div className="btnOption" onClick={()=>navigate('/Nft')}>去合成</div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixedEndBox">
        <div className="leftEndOption">
          <div className="needPayTxt">需支付</div>
          <div className="needPayNum">{amount}HZ</div>
        </div>
        <Button
          className="rightBtn"
          loading={btnLoading}
          onClick={() => sumbitClick()}
        >
          立即参与
        </Button>
      </div>
      <NoPopup
        visible={noPopupShow}
        closeChange={() => noPopupChange()}
      ></NoPopup>
      <SuccessPopup
        visible={successPopupShow}
        closeChange={() => successPopupChange()}
      ></SuccessPopup>
    </div>
  );
};
export default Hash;
