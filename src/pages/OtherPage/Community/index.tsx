import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import copy from "@/assets/Basic/copy.png";
const Community: React.FC = () => {
  return (
    <div className="CommunityPage">
      <HeaderTop title="我的社区" backgroundColor="#000" />
      <div className="contentPage">
        <div className="CommunityHeaderTopBox">
          <div className="headerTopOption">
            <div className="topTxt">
              <div className="txt">我的推荐链接</div>
              <img src={copy} className="copyIcon"></img>
            </div>
            <div className="endNum">Hermes.io…u008856</div>
          </div>

          <div className="headerTopOption">
            <div className="topTxt">
              <div className="txt">推荐人</div>
            </div>
            <div className="endNum">Hermes.io…u008856</div>
          </div>
        </div>

        <div className="sheQuBox">
          <div className="sheQuTxt">我的社区</div>
          <div className="sheQuHintTxt">与社区一同成长</div>
          <div className="flexWarpBox">
            <div className="flexItem">
              <div className="flexTxt">直推成员</div>
              <div className="flexTxtTwo">78</div>
            </div>
            <div className="flexItem">
              <div className="flexTxt">社区成员</div>
              <div className="flexTxtTwo">12</div>
            </div>
            <div className="flexItem">
              <div className="flexTxt">小区域网络流动性</div>
              <div className="flexTxtTwo">$89,634.05</div>
            </div>
            <div className="flexItem">
              <div className="flexTxt">全区域网络流动性</div>
              <div className="flexTxtTwo">$250,634.05</div>
            </div>
          </div>
        </div>

        <div className="sheQuBox">
          <div className="sheQuTxt">社区奖励</div>
          <div className="sheQuHintTxt">邀请好友将获得奖励</div>
          <div className="btnOptionBox">
            <div className="leftOption">
              <div className="topTxt">待领取</div>
              <div className="endAmount">180.00 USDT</div>
            </div>
            <div className="rightBtn">领取</div>
          </div>

          <div className="btnOptionBox">
            <div className="leftOption">
              <div className="topTxt">累积奖励</div>
              <div className="endAmountList">15,800.35 USDT</div>
            </div>
            <div className="rightBtnList">记录</div>
          </div>
        </div>

        <div className="myShareBox">
          <div className="shareTitle">我的推荐</div>
          <div className="shareHintTxt">我邀请成功的成员</div>
          <div className="shareList">
            <div className="shareHeader">
              <div className="walletAddress">钱包地址</div>
              <div className="joinTime">加入时间</div>
              <div className="usdtAmount">流动性(USDT)</div>
            </div>
            <div className="shareItemsBox">
              <div className="shareItem">
                <div className="walletAddress">0x8b28…r58R</div>
                <div className="joinTime">2026/04/21</div>
                <div className="usdtAmount">12,500.56</div>
              </div>

               <div className="shareItem">
                <div className="walletAddress">0x8b28…r58R</div>
                <div className="joinTime">2026/04/21</div>
                <div className="usdtAmount">12,500.56</div>
              </div>

               <div className="shareItem">
                <div className="walletAddress">0x8b28…r58R</div>
                <div className="joinTime">2026/04/21</div>
                <div className="usdtAmount">12,500.56</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Community;
