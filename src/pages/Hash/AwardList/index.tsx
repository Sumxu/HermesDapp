import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import NoData from "@/components/NoData/index";
import { Button } from "antd";
import { Switch, Picker } from "antd-mobile";
const AwardList: React.FC = () => {
 
  const [checkAccount, setCheckAccount] = useState<string>("1");
  const [checkType, setCheckType] = useState<string>("1");
   
  useEffect(() => {}, []);
  return (
    <div className="AssetDetailPage">
      <HeaderTop title="奖励记录" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="tabBox">
          <div className="tabOption">
            <div className="tabItem tabCheck">USDT</div>
            <div className="tabItem">HZ</div>
            <div className="tabItem">NFT</div>
          </div>
        </div>
        <div className="listContent">
          <div className="listHeader">
            <div className="leftTxt itemTxtDate">时间</div>
            <div className="rightTxt txtType rightTxtLeft">账户</div>
            <div className="rightTxt txtType rightTxtLeft">类型</div>
            <div className="rightTxt">金额(USDT)</div>
          </div>
          <div className="listItem">
            <div className="itemTxtDate">2026/05/07 18:32:56</div>
            <div className="itemTxt txtType rightTxtLeft">理财账户</div>
            <div className="itemTxt txtType rightTxtLeft">赎回</div>
            <div className="itemTxt rightTxt">-200.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AwardList;
