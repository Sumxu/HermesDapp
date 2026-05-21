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
import { init, dispose } from "klinecharts";
interface listItem {
  createTime: string; //加入时间
  amountA: number; // 代币A
  amountB: number; //代币B
  type: number; //交易对 1.usdt/hz 2.hz/usdt
}
const FlashExchange: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hzPrice, setHzPrice] = useState<number>(0);
  const [accountUsdt, setAccountUsdt] = useState<number>(0);
  const [accountHz, setAccountHz] = useState<number>(0);
  const [list, setList] = useState<listItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

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
    initAccountUsdt();
    initAccountHz();
    initListData();
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
  const initAccountHz = async () => {
    const result = await NetworkRequest({
      Url: "account/getHz",
      Method: "get",
    });
    if (result.success) {
      setAccountHz(result.data.data);
    }
  };
  const initAccountUsdt = async () => {
    const result = await NetworkRequest({
      Url: "account/getUsdt",
      Method: "get",
    });
    if (result.success) {
      setAccountUsdt(result.data.data);
    }
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
  const getKlineData = async () => {
    const result = await NetworkRequest({
      Url: "convert/kline",
      Method: "get",
    });
    console.log(result);
  };
  useEffect(() => {
    if (!chartRef.current) return;
    // 初始化
   const chart = init(chartRef.current, {
  styles: {
    candle: {
      tooltip: {
        showRule: "none",
      },
    },
  },
});
    console.log(chart);
  
    // K线数据
    chart?.applyNewData([
      {
        timestamp: Date.now(),
        open: 100,
        high: 120,
        low: 90,
        close: 110,
        volume: 1000,
      },
    ]);

    // 自适应
    const resize = () => {
      chart?.resize();
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (chart) {
        dispose(chart);
      }
    };
  }, []);

  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="FlashExchangePage">
      <HeaderTop title="闪兑" backgroundColor="#000"></HeaderTop>
      <div className="FlashExchangeBox">
        <div className="hintTxtBox">兑换比例 1.00 USDT≈{hzPrice}</div>
        <div className="duiHuanOption">
          <div className="inputOption">
            <div className="inputHeader">
              <span className="spn">用</span>
              <div className="rightDiv">
                <span className="rightTxt">账户余额:</span>
                <span className="amountTxt">{accountUsdt}USDT</span>
              </div>
            </div>
            <div className="inputBox">
              <div className="inputTxtBlock">
                <img src={USDT} className="icon"></img>
                <span className="spn">USDT</span>
              </div>
              <div className="inputOption">
                <Input placeholder="0.00" className="inputClass"></Input>
              </div>
            </div>
          </div>
        </div>
        <img src={topEnd} className="topEndIcon"></img>
        <div className="duiHuanOption">
          <div className="inputOption">
            <div className="inputHeader">
              <span className="spn">兑换</span>
              <div className="rightDiv">
                <span className="rightTxt">余额:</span>
                <span className="amountTxt">{accountHz}HZ</span>
              </div>
            </div>
            <div className="inputBox">
              <div className="inputTxtBlock">
                <img src={HTOKEN} className="icon"></img>
                <span className="spn">HZ</span>
              </div>
              <div className="inputOption">
                <Input placeholder="0.00" className="inputClass"></Input>
              </div>
            </div>
          </div>
        </div>
        <div className="txtBox">
          <div className="txtOption">
            <div className="leftTxt">手续费（5%）:</div>
            <div className="rightTxt">0.00 USDT</div>
          </div>
          <div className="txtOption">
            <div className="leftTxt">需支付:</div>
            <div className="rightTxt">0.00 USDT</div>
          </div>
          <div className="txtOption">
            <div className="leftTxt">实际到账</div>
            <div className="rightTxt">0.00 HZ</div>
          </div>
        </div>
        <div className="btnsHintBox">
          <div className="btnItem">
            <div className="btnItemTop">2,800.00 HZ</div>
            <div className="btnItemEnd">剩余兑换额度</div>
          </div>

          <div className="btnItem">
            <div className="btnItemTop rightTxt">0.00 USDT</div>
            <div className="btnItemEnd">需支付</div>
          </div>
        </div>
        <Button className="flashBtnBox">确认兑换</Button>

        <div className="chartBox">
          <div ref={chartRef} className="chartOption" />;
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
