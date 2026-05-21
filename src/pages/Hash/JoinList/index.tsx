import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Input } from "antd";
import copy from "@/assets/Basic/copy.png";
import NoData from "@/components/NoData";
import { Switch, Button, ProgressCircle } from "antd-mobile";
import { Spin } from "antd";
import { InfiniteScroll } from "antd-mobile";
import { storage } from "@/Hooks/useLocalStorage";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
interface listItem {
  status: number; //状态 0 待开奖 1 赢 2 输
  type: number; //购买类型 1.单
  endBlock: number; //开奖区块
  blockHash: number; //开奖hash
  createTime: number; //参与时间
  amount: number; //参与金额
}

const JoinList: React.FC = () => {
  const [list, setList] = useState<listItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const initList = async () => {
    setList([]);
    setPageLoading(true);
    const result = await NetworkRequest({
      Url: "lottery/list",
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

  // 获取更多团队列表
  const loadMoreAction = async () => {
    const nexPage = current + 1;
    setCurrent(nexPage);
    await NetworkRequest({
       Url: "lottery/list",
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
  const hashStr = (hash) => {
    const lastFive = hash.slice(-5);
    return lastFive;
  };
  useEffect(() => {
    initList();
  }, []);
  return (
    <div className="JoinListPage">
      <HeaderTop title="参与记录" backgroundColor="#000"></HeaderTop>
      <div className="JoinListContentPage">
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
              <div
                className={`box ${item.status == 0 ? " boxNo" : "boxOk"}`}
                key={index}
              >
                <div className="headerBox">
                  <div className="leftTxt">开奖区块:{item.endBlock}</div>
                  <div className="rightTxt">
                    开奖结果 {item.status == 0 && "未开奖"}
                    {item.status !== 0 && (
                      <span className={`${item.status == 1 ? "win" : "lose"}`}>
                        {item.type == 1 ? "单" : "双"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="contentBox">
                  <div className="hintTxtOption">
                    <span className="spn">竞猜内容:</span>
                    <span className="spn2">{item.type == 1 ? "单" : "双"}</span>
                  </div>

                  <div className="hintTxtOption">
                    <span className="spn">参与金额:</span>
                    <span className="spn2">{item.amount}</span>
                  </div>

                  <div className="hintTxtOption">
                    <span className="spn">区块哈希:</span>
                    <span className="spn2">
                      {item.status == 0 ? "-" : "..."+hashStr(item.blockHash)}
                    </span>
                  </div>
                  <div className="hintTxtOption">
                    <span className="spn">参与时间:</span>
                    <span className="spn2">{item.createTime}</span>
                  </div>
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
  );
};
export default JoinList;
