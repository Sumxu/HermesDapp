import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import query from "@/assets/Chfp/query.png";
import USDT from "@/assets/Chfp/USDT.png";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import rightIcon from "@/assets/Draw/rightIcon.png";
import about from "@/assets/Chfp/about.png";
import NoData from "@/components/NoData/index";
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
          <div className="headerBox">
            <div className="leftTxtOption">理财账户</div>
            <div className="rightOption">
              <span className="txt">规则说明</span>
              <img src={query} className="queryIcon"></img>
            </div>
          </div>
          <div className="AmountOption">
            <span className="num">0.00</span>
            <span className="amountType">USDT</span>
          </div>
          <div className="btnBox">开启智能理财</div>
          <div className="btnList">
            <Button className="btnOne btn">赎回</Button>
            <Button className="btnTwo btn">升级本金</Button>
          </div>
        </div>

        <div className="reinvestmentBox">
          <div className="headerOption">
            <div
              className="leftTxt"
              onClick={() => openReinvestmentPopupClick()}
            >
              追投账户
            </div>
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
          <div className="amountOption">
            <span className="num">0.00</span>
            <span className="typeAmount">USDT</span>
          </div>
          <div className="hintTxt" onClick={() => openExtractPopupClick()}>
            开启后每日将自动追投首投金额的10%，直开启后每日将自动追投首投金额的10%，直至追投账户的余额不够为止。
          </div>
          <div className="btnList">
            <Button className="btnOne btn">提取</Button>
            <Button className="btnTwo btn">充值</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Asset;
