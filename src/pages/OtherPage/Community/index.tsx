import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import copy from "@/assets/Basic/copy.png";
import { Button } from "antd";
import USDT from "@/assets/Chfp/USDT.png";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import NoData from "@/components/NoData";
import { useEffect, useState } from "react";
import { formatAddress,copyText } from "@/Hooks/Utils";
import { Spin } from "antd";
import { InfiniteScroll } from "antd-mobile";
import { storage } from "@/Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

interface teamInfo {
  parentAddress: string; //推荐人
  directCount: number; //直推成员
  teamCount: number; //社区人数
  teamPerf: number; //全区域网络流动性
  communityPerf: number; //小区域网络流动性
  level: number; //等级
  totalTeamUsdtReward: number; //累计社区奖励(U)
  totalTeamHzReward: number; //累计社区奖励(Hz)
}
interface listItem {
  address: string; //钱包地址
  createTime: string; //加入时间
  selfPerf: number; //流动性
}
const Community: React.FC = () => {
  const [teamInfo, setTeamInfo] = useState<teamInfo>({});
  const [location, setLocation] = useState(""); //网页地址
  const [list, setList] = useState<listItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const walletAddress = storage.get("address");
   const navigate = useNavigate();

  const initData = async () => {
    const result = await NetworkRequest({
      Url: "team/info",
      Method: "get",
    });
    if (result.success) {
      setTeamInfo(result.data.data);
    }
  };
  const initTeamList = async () => {
    setList([]);
    setPageLoading(true);
    const result = await NetworkRequest({
      Url: "team/invitations",
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
      Url: "team/invitations",
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

  const copyAction = () => {
    const origin = window.location.origin;
    const inviteUrl = `${origin}/Home?invite=${walletAddress}`;
    copyText(inviteUrl);
  };
  useEffect(() => {
    initData();
    initTeamList();
    const origin = window.location.origin;
    const inviteUrl = `${origin}/Home?invite=${walletAddress}`;
    setLocation(inviteUrl);
  }, []);
  return (
    <div className="CommunityPage">
      <HeaderTop title="我的社区" backgroundColor="#000" />
      <div className="contentPage">
        <div className="CommunityHeaderTopBox">
          <div className="headerTopOption">
            <div className="topTxt">
              <div className="txt">我的推荐链接</div>
              <img src={copy} className="copyIcon" onClick={()=>copyAction()}></img>
            </div>
            <div className="endNum">{location}</div>
          </div>

          <div className="headerTopOption">
            <div className="topTxt">
              <div className="txt">推荐人</div>
            </div>
            <div className="endNum">
              {formatAddress(teamInfo.parentAddress)}
            </div>
          </div>
        </div>

        <div className="sheQuBox">
          <div className="sheQuTxt">我的社区</div>
          <div className="sheQuHintTxt">与社区一同成长</div>
          <div className="flexWarpBox">
            <div className="flexItem">
              <div className="flexTxt">直推成员</div>
              <div className="flexTxtTwo">{teamInfo.directCount}</div>
            </div>
            <div className="flexItem">
              <div className="flexTxt">社区成员</div>
              <div className="flexTxtTwo">{teamInfo.teamCount}</div>
            </div>
            <div className="flexItem">
              <div className="flexTxt">小区域网络流动性</div>
              <div className="flexTxtTwo">${teamInfo.communityPerf}</div>
            </div>
            <div className="flexItem">
              <div className="flexTxt">全区域网络流动性</div>
              <div className="flexTxtTwo">${teamInfo.teamPerf}</div>
            </div>
          </div>
        </div>

        <div className="shouYiBox">
          <div className="shouYiTopBox">
            <div className="usdtBox">
              <div className="usdtTop">
                <img src={USDT} className="usdtIcon"></img>
                <span className="usdtTxt">USDT累计收益</span>
              </div>
              <div className="endOption">
                <div className="endHintNum">{teamInfo.totalTeamUsdtReward}</div>
              </div>
            </div>
            <div className="usdtBox">
              <div className="usdtTop">
                <img src={HTOKEN} className="usdtIcon"></img>
                <span className="usdtTxt">HZ累计收益</span>
              </div>
              <div className="endOption">
                <div className="endHintNum">{teamInfo.totalTeamHzReward}</div>
              </div>
            </div>
          </div>
          <div className="shouYiListOption" onClick={()=>navigate('/TeamList')}>记录</div>
        </div>
        <div className="myShareBox">
          <div className="shareTitle">我的推荐</div>
          <div className="shareHintTxt">
            我邀请成功<span className="spn">{total || 0}</span>成员
          </div>
          <div className="shareList">
            <div className="shareHeader">
              <div className="walletAddress">钱包地址</div>
              <div className="joinTime">加入时间</div>
              <div className="usdtAmount">流动性(USDT)</div>
            </div>
            <div className="shareItemsBox">
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
                    <div className="shareItem" key={index}>
                      <div className="walletAddress">
                        {formatAddress(item.address)}
                      </div>
                      <div className="joinTime">{item.createTime}</div>
                      <div className="usdtAmount">{item.selfPerf}</div>
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
    </div>
  );
};
export default Community;
