import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import NoData from "@/components/NoData/index";
import { Button } from "antd";
import { Switch } from "antd-mobile";
const EarningsList: React.FC = () => {
  useEffect(() => {}, []);
  return (
    <div className="EarningsListPage">
      <HeaderTop title="收益记录" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="tabBox">
          <div className="tabOption">
            <div className="tabItem tabCheck">USDT</div>
            <div className="tabItem">HZ</div>
          </div>
        </div>
        <div className="listContent">
          <div className="listHeader">
            <div className="leftTxt">时间</div>
            <div className="rightTxt">金额(USDT)</div>
          </div>
          <div className="listItem">
            <div className="itemTxt">2026/05/07 18:32:56</div>
            <div className="itemTxt rightTxt">+56.32</div>
          </div>
           <div className="listItem">
            <div className="itemTxt">2026/05/07 18:32:56</div>
            <div className="itemTxt rightTxt">+56.32</div>
          </div>
           <div className="listItem">
            <div className="itemTxt">2026/05/07 18:32:56</div>
            <div className="itemTxt rightTxt">+56.32</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EarningsList;
