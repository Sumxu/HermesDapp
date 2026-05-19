import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import query from "@/assets/Chfp/query.png";
import USDT from "@/assets/Chfp/USDT.png";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import about from "@/assets/Chfp/about.png";
import Icon from "@/assets/Flash/icon.png";
import NFT from "@/assets/Flash/nft.png";
import listIcon from "@/assets/Basic/listIcon.png";
import { Button } from "antd";
import { Switch } from "antd-mobile";

const Asset: React.FC = () => {
  useEffect(() => {}, []);
  return (
    <div className="AssetPage">
      <HeaderTop title="资产中心" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="assetInfoBox">
          <div className="leftInfoOption">
            <div className="topTxt">资产总估值</div>
            <div className="endTxt">$ 37,285.09</div>
          </div>
          <div className="rightInfoOption">
            <img className="icon" src={listIcon}></img>
            <div className="iconRightTxt">资产明细</div>
          </div>
        </div>
        <div className="liCaiBox">
          <div className="liCaiLeftOption">
            <div className="headerBox">
              <div className="leftTxtOption">理财账户</div>
            </div>
            <div className="AmountOption">
              <span className="num">0.00</span>
              <span className="amountType">USDT</span>
            </div>
          </div>
          <div className="btnList">
            <Button className="btnOne btn">赎回</Button>
            <Button className="btnToRu btn">追投</Button>
            <Button className="btnTwo btn">升级</Button>
          </div>
        </div>

        <div className="reinvestmentBox">
          <div className="headerOption">
            <div className="leftTxt">追投账户</div>
            <div className="rightOption">
              <img src={about} className="aboutIcon"></img>
              <span className="txt">Ai追投已开启</span>
              <Switch
                style={{
                  "--checked-color": "#1DD274",
                  "--height": "20px",
                  "--width": "40px",
                }}
              />
            </div>
          </div>
          <div className="endInfoOption">
            <div className="amountOption">
              <span className="num">0.00</span>
              <span className="typeAmount">USDT</span>
            </div>
            <div className="btnList">
              <Button className="btnOne btn">提取</Button>
              <Button className="btnTwo btn">充值</Button>
            </div>
          </div>
        </div>
        <div className="blanceOfBox">
          <div className="blanceOption bottomBorder">
            <div className="leftOption">
              <img src={HTOKEN} className="icon"></img>
              <div className="contentOption">
                <div className="topTxt">HZ</div>
                <div className="endTxt">账户余额</div>
              </div>
            </div>
            <div className="rightOption">
              <div className="numTxt">1,532.08</div>
              <div className="numTwoTxt">≈$536.05</div>
            </div>
          </div>

          <div className="blanceOption bottomBorder">
            <div className="leftOption">
              <img src={USDT} className="icon"></img>
              <div className="contentOption">
                <div className="topTxt">USDT</div>
                <div className="endTxt">账户余额</div>
              </div>
            </div>
            <div className="rightOption">
              <div className="numTxt">1,532.08</div>
              <div className="numTwoTxt">≈$536.05</div>
            </div>
          </div>

          <div className="blanceOption">
            <div className="leftOption">
              <img src={NFT} className="icon"></img>
              <div className="contentOption">
                <div className="topTxt">NFT</div>
                <div className="endTxt">账户余额</div>
              </div>
            </div>
            <div className="rightOption">
              <div className="numTxt">1,532.08</div>
              <div className="numTwoTxt">≈$536.05</div>
            </div>
          </div>
        </div>

        <div className="duiHuanBox">
          <div className="leftOption">
           <div className="iconOption">
             <img src={Icon} className="icon"></img>
           </div>
            <div className="contentOption">
              <div className="numTxt">28000HZ</div>
              <div className="hintTxt">剩余兑换额度</div>
            </div>
          </div>

          <div className="rightBtn">去兑换</div>
        </div>
      </div>
    </div>
  );
};
export default Asset;
