import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Button } from "antd";
import { Switch, Picker } from "antd-mobile";
import sanJiaoXing from "@/assets/Basic/sanJiaoXing.png";
import { Spin } from "antd";
import { InfiniteScroll } from "antd-mobile";
import { storage } from "@/Hooks/useLocalStorage";
import NoData from "@/components/NoData";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
interface listItem {
  amount: string; //额度
  createTime: string; //加入时间
  bizType: number; //类型 1.代数奖励 2.等级奖励 3.平级奖励 4.全球分红 5.直推奖励
  type: number; //类型 1.产出收益 2.竞猜收益 3.提现收益
  coinType: number; //代币类型 1.usdt 2.hz
}
const TeamList: React.FC = () => {
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
  const bizTypeMap = {
    1: "代数奖励",
    2: ".等级奖励",
    3: "平级奖励",
    4: "全球分红",
    5: "直推奖励",
  };
  const typeMap = {
    1: "产出收益",
    2: ".竞猜收益",
    3: "提现收益",
  };
  const [checkType, setCheckType] = useState<string>("1");
  const [list, setList] = useState<listItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [type, setType] = useState<number>(1); //
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const initList = async (coinType) => {
    setList([]);
    setPageLoading(true);
    const result = await NetworkRequest({
      Url: "bill/team",
      Method: "post",
      Data: {
        size: 10,
        current: 1,
        coinType: coinType,
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
      Url: "bill/team",
      Method: "post",
      Data: {
        current: nexPage,
        size: 10,
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
    <div className="TeamListPage">
      <HeaderTop title="团队收益" backgroundColor="#000"></HeaderTop>
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
            <div className="leftTxt rightTxtLeft">来源类型</div>
            <div className="leftTxt rightTxtLeft">业务类型</div>
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
                  <div className="itemTxtDate">{item.createTime}</div>
                  <div className="itemTxt txtType">{bizTypeMap[item.bizType]}</div>
                  <div className="itemTxt txtType">{typeMap[item.type]}</div>
                  <div className="itemTxt rightTxt">{item.amount}</div>
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
export default TeamList;
