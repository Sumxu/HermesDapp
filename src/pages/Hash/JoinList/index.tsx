import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Input } from "antd";
import copy from "@/assets/Basic/copy.png";
import { Switch, Button, ProgressCircle } from "antd-mobile";
const JoinList: React.FC = () => {
  useEffect(() => {}, []);
  return (
    <div className="JoinListPage">
      <HeaderTop title="参与记录" backgroundColor="#000"></HeaderTop>
      <div className="JoinListContentPage">
        <div className="box boxNo">
          <div className="headerBox">
            <div className="leftTxt">开奖区块:812321312</div>
            <div className="rightTxt">开奖结果 32s</div>
          </div>
          <div className="contentBox">
            <div className="hintTxtOption">
              <span className="spn">精彩内容:</span>
              <span className="spn2">单</span>
            </div>

            <div className="hintTxtOption">
              <span className="spn">参与金额:</span>
              <span className="spn2">200.00</span>
            </div>

            <div className="hintTxtOption">
              <span className="spn">区块哈希:</span>
              <span className="spn2">--</span>
            </div>
            <div className="hintTxtOption">
              <span className="spn">参与时间:</span>
              <span className="spn2">2026/03/18 18:35:56</span>
            </div>
            <div className="hintTxtOption">
              <span className="spn">盈亏金额:</span>
              <span className="spn2">--</span>
            </div>
          </div>
        </div>

        <div className="box boxOk">
          <div className="headerBox">
            <div className="leftTxt">开奖区块:812321312</div>
            <div className="rightTxt">
              开奖结果 <span className="win lose">单</span>
            </div>
          </div>
          <div className="contentBox">
            <div className="hintTxtOption">
              <span className="spn">精彩内容:</span>
              <span className="spn2">单</span>
            </div>

            <div className="hintTxtOption">
              <span className="spn">参与金额:</span>
              <span className="spn2">200.00</span>
            </div>

            <div className="hintTxtOption">
              <span className="spn">区块哈希:</span>
              <div className="spn2">
                <span className="spnNum">00**6e5d6</span>
                <img src={copy} className="copyIcon"></img>
                <div className="btn">点击验证</div>
              </div>
            </div>
            <div className="hintTxtOption">
              <span className="spn">参与时间:</span>
              <span className="spn2">2026/03/18 18:35:56</span>
            </div>
            <div className="hintTxtOption">
              <span className="spn">盈亏金额:</span>
              <div className="spn2">
                <span className="win lose">12321</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JoinList;
