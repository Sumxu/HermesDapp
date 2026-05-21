import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import NoData from "@/components/NoData/index";
import { Button } from "antd";
import { Switch, Picker } from "antd-mobile";
import { Spin } from "antd";
import { InfiniteScroll } from "antd-mobile";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
interface listItem {
  amount: number; //额度
  createTime: string; //创建时间
  orderBlock: string; //创建时间
  coinType: number; //代币类型"“全部 1.hz 2.nft碎片
}
const AwardList: React.FC = () => {
  const [list, setList] = useState<listItem[]>([]);

  const typeList = [
    {
      label: "全部",
      value: "",
    },
    {
      label: "HZ",
      value: 2,
    },
    {
      label: "NFT碎片",
      value: 3,
    },
  ];
  const [checkAccount, setCheckAccount] = useState<string>("1");
  const [checkType, setCheckType] = useState<string>("1");

  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [type, setType] = useState<number>(1); // 1 2
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const initList = async (type) => {
    setList([]);
    setPageLoading(true);
    const result = await NetworkRequest({
      Url: "bill/lottery",
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
      Url: "bill/lottery",
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
    initList("");
  }, []);
  return (
    <div className="AssetDetailPage">
      <HeaderTop title="奖励记录" backgroundColor="#000"></HeaderTop>
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
            <div className="leftTxt itemTxtDate">时间</div>
            <div className="rightTxt txtType rightTxtLeft">开奖区块</div>
            <div className="rightTxt txtType rightTxt">奖励类型</div>
            <div className="rightTxt">奖励数量</div>
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
                <div className="listItem">
                  <div className="itemTxtDate">{item.createTime}</div>
                  <div className="itemTxt txtType rightTxtLeft">
                    {item.orderBlock}
                  </div>
                  <div className="itemTxt txtType rightTxtRight">
                    {item.type == 2 ? "HZ" : "NFT碎片"}
                  </div>
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
export default AwardList;
