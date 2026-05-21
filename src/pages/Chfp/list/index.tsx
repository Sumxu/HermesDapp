import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Button } from "antd";
import { Switch } from "antd-mobile";
import { Spin } from "antd";
import NoData from "@/components/NoData";
import { InfiniteScroll } from "antd-mobile";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
interface listItem {
  amount: number; //额度
  createTime: string; //创建时间
  coinType: number; //代币类型 1.usdt 2.hz
}
const EarningsList: React.FC = () => {
  const typeList = [
    {
      label: "USDT",
      value: 1,
    },
    {
      label: "HZ",
      value: 2,
    },
  ];
  const [list, setList] = useState<listItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [type, setType] = useState<number>(1); // 1 2
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const initList = async (type) => {
    setList([]);
    setPageLoading(true);
    const result = await NetworkRequest({
      Url: "bill/yield",
      Method: "post",
      Data: {
        size: 10,
        current: 1,
        coinType: type,
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
  // 获取更多团队列表
  const loadMoreAction = async () => {
    const nexPage = current + 1;
    setCurrent(nexPage);
    await NetworkRequest({
      Url: "bill/yield",
      Method: "post",
      Data: {
        size: 10,
        current: nexPage,
        coinType: type,
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
  const tabClick = (value) => {
    setType(value);
    initList(value);
  };
  useEffect(() => {
    initList(1);
  }, []);
  return (
    <div className="EarningsListPage">
      <HeaderTop title="收益记录" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="tabBox">
          <div className="tabOption">
            {typeList.map((item, index) => {
              return (
                <div
                  className={`tabItem ${type == item.value ? "tabCheck" : ""}`}
                  onClick={() => tabClick(item.value)}
                  key={index}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="listContent">
          <div className="listHeader">
            <div className="leftTxt">时间</div>
            <div className="rightTxt">金额</div>
          </div>
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
                  <div className="itemTxt">{item.createTime}</div>
                  <div className="itemTxt rightTxt">+{item.amount}</div>
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
  );
};
export default EarningsList;
