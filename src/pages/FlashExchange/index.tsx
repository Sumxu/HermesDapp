import { useEffect, useState, useRef } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Input } from "antd";
import { Switch, Button } from "antd-mobile";
import USDT from "@/assets/Chfp/USDT.png";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import topEnd from "@/assets/Basic/topEnd.png";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import { Spin } from "antd";
import { InfiniteScroll } from "antd-mobile";
import NoData from "@/components/NoData";
import KlineChart from "./components/KlineChart";
import { Totast } from "@/Hooks/Utils";
interface listItem {
  createTime: string; //加入时间
  amountA: number; // 代币A
  amountB: number; //代币B
  type: number; //交易对 1.usdt/hz 2.hz/usdt
}
interface userBalance {
  usdt: number; //账户余额（u）
  hz: number; //账户余额（hz）
  yieldReward: number; //产出收益(usdt)
  convertRate: number; //兑换额度百分比
  swapFee: number; //兑换手续费
}
const FlashExchange: React.FC = () => {
  const [userBalance, setUserBalance] = useState<userBalance>();
  const [checkType, setCheckType] = useState<number>(1); //1 usdt 2hz
  const [hzPrice, setHzPrice] = useState<number>(0);
  const [accountUsdt, setAccountUsdt] = useState<number>(0);
  const [accountHz, setAccountHz] = useState<number>(0);
  const [list, setList] = useState<listItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [swapAmount, setSwapAmount] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const loadMoreAction = async () => {
    const nexPage = current + 1;
    setCurrent(nexPage);
    await NetworkRequest({
      Url: "bill/swap",
      Method: "post",
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
  const initData = async () => {
    getHzPrice();
    initListData();
    initBalance();
  };
  const initBalance = async () => {
    const result = await NetworkRequest({
      Url: "convert/getBalance",
      Method: "get",
    });
    if (result.success) {
      setUserBalance(result.data.data);
    }
  };
  const initListData = async () => {
    setList([]);
    setPageLoading(true);
    const result = await NetworkRequest({
      Url: "bill/swap",
      Method: "post",
      Data: {
        size: 10,
        current: 1,
      },
    });
    if (result.success) {
      setList((prevList) => [...prevList, ...result.data.data.records]);
      console.log("list--", list);
      setTotal(result.data.data.total);
      if (result.data.data.records.length == 10) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
    }
    setPageLoading(false);
  };
  const inputChange = (e, type) => {
    console.log("e---", e);
    console.log("type---", type);
    let amount = 0;
    if (type == 1) {
      //usdt->hz
      amount = Number(e) / hzPrice;
    } else {
      //hz->usdt
      amount = Number(e) * hzPrice;
    }
    setInputAmount(e);
    setSwapAmount(amount.toFixed(4));
  };
  /**
   * 手续费
   */
  const serviceCharge = () => {
    return inputAmount * userBalance?.swapFee;
  };

  const checkTypeChange = (e) => {
    setCheckType(e == 1 ? 2 : 1);
    inputChange(inputAmount, e == 1 ? 2 : 1);
  };
  const getHzPrice = async () => {
    const result = await NetworkRequest({
      Url: "account/getPrice",
      Method: "get",
    });
    console.log(result);
    if (result.success) {
      setHzPrice(result.data.data || 0);
    }
  };
  const submitClick = async () => {
    //判断兑换的余额是否足够
    //hz->usdt 额度是否足够
    if (checkType == 2) {
      if (userBalance?.hz < inputAmount) {
        return Totast("账号HZ余额不足", "info");
      }
    } else {
      //判断额度是否足够
      if (convertLimitFn() < inputAmount) {
        return Totast("HZ兑换额度余额不足", "info");
      }
      if (userBalance?.yieldReward < inputAmount) {
        return Totast("账号余额不足", "info");
      }
    }
    setBtnLoading(true);

    const result = await NetworkRequest({
      Url: "convert/swap",
      Method: "post",
      Data: {
        type: checkType,
        amount: inputAmount,
      },
    });
    if (result.success) {
      Totast("兑换成功!", "info");
    }
    setBtnLoading(false);
    initData();
  };
  const convertLimitFn = () => {
    const amount =
     hzPrice/ (userBalance?.yieldReward * userBalance?.convertRate) ;
    return amount.toFixed(4);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="FlashExchangePage">
      <HeaderTop title="闪兑" backgroundColor="#000"></HeaderTop>
      <div className="FlashExchangeBox">
        <div className="hintTxtBox">兑换比例 1.00 HZ≈{hzPrice} USDT</div>
        <div className="duiHuanOption">
          <div className="inputOption">
            <div className="inputHeader">
              <span className="spn">用</span>
              <div className="rightDiv">
                <span className="rightTxt">
                  {checkType == 1 ? "产出收益" : "账户余额"}
                </span>
                <span className="amountTxt">
                  {checkType == 1 ? userBalance?.yieldReward : userBalance?.hz}
                  {checkType == 1 ? "USDT" : "HZ"}
                </span>
              </div>
            </div>
            <div className="inputBox">
              <div className="inputTxtBlock">
                <img
                  src={checkType == 1 ? USDT : HTOKEN}
                  className="icon"
                ></img>
                <span className="spn">{checkType == 1 ? "USDT" : "HZ"}</span>
              </div>
              <div className="inputOption">
                <Input
                  placeholder="请输入"
                  value={inputAmount}
                  onChange={(e) => inputChange(e.target.value, checkType)}
                  className="inputClass"
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <img
          src={topEnd}
          className="topEndIcon"
          onClick={() => checkTypeChange(checkType)}
        ></img>
        <div className="duiHuanOption">
          <div className="inputOption">
            <div className="inputHeader">
              <span className="spn">兑换</span>
              <div className="rightDiv">
                <span className="rightTxt">余额:</span>
                <span className="amountTxt">
                  {checkType == 2 ? userBalance?.usdt : userBalance?.hz}
                  {checkType == 2 ? "HZ" : "USDT"}
                </span>
              </div>
            </div>
            <div className="inputBox">
              <div className="inputTxtBlock">
                <img
                  src={checkType == 1 ? HTOKEN : USDT}
                  className="icon"
                ></img>
                <span className="spn">{checkType == 1 ? "HZ" : "USDT"}</span>
              </div>
              <div className="inputOption">
                <Input
                  placeholder="请输入"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  className="inputClass"
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <div className="txtBox">
          <div className="txtOption">
            <div className="leftTxt">手续费（{userBalance?.swapFee}%）:</div>
            <div className="rightTxt">
              {inputAmount ? serviceCharge() : "-"}{" "}
              {checkType == 1 ? "USDT" : "HZ"}
            </div>
          </div>
          <div className="txtOption">
            <div className="leftTxt">需支付:</div>
            <div className="rightTxt">
              {inputAmount ? serviceCharge() : "-"}{" "}
              {checkType == 1 ? "USDT" : "HZ"}
            </div>
          </div>
          <div className="txtOption">
            <div className="leftTxt">实际到账</div>
            <div className="rightTxt">
              {swapAmount ? swapAmount : "-"} {checkType == 1 ? "USDT" : "HZ"}
            </div>
          </div>
        </div>
        <div className="btnsHintBox">
          <div className="btnItem">
            <div className="btnItemTop">
              {userBalance?.yieldReward ? convertLimitFn() : "-"}HZ
            </div>
            <div className="btnItemEnd">剩余兑换HZ额度</div>
          </div>

          <div className="btnItem">
            <div className="btnItemTop rightTxt">
              {inputAmount || "-"} {checkType == 1 ? "USDT" : "HZ"}
            </div>
            <div className="btnItemEnd">需支付</div>
          </div>
        </div>
        <Button
          className="flashBtnBox"
          onClick={() => submitClick()}
          loading={btnLoading}
        >
          确认兑换
        </Button>

        <div className="chartBox">
          <KlineChart height={340}></KlineChart>
        </div>
        <div className="listHint">最近记录</div>
        <div className="listBox">
          <div className="listHeader">
            <div className="time">时间</div>
            <div className="type">交易对</div>
            <div className="amount">数量</div>
          </div>
          <div className="listConent">
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
                  <div className="listItem" key={index}>
                    <div className="time">{item.createTime}</div>
                    <div className="type">
                      {item.type == 1 ? "USDT/HZ" : "HZ/USDT"}
                    </div>
                    <div className="amount">
                      {item.type == 1
                        ? `${item.amountA}USDT/${item.amountB}HZ`
                        : `${item.amountA}HZ/${item.amountB}USDT`}
                    </div>
                  </div>
                );
              })
            )}
            <InfiniteScroll
              loadMore={loadMoreAction}
              hasMore={isMore}
            ></InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlashExchange;
