import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Input } from "antd";

import { Switch, Button } from "antd-mobile";
import USDT from "@/assets/Chfp/USDT.png";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import topEnd from "@/assets/Basic/topEnd.png";
const FlashExchange: React.FC = () => {
  useEffect(() => {}, []);
  return (
    <div className="FlashExchangePage">
      <HeaderTop title="闪兑" backgroundColor="#000"></HeaderTop>
      <div className="FlashExchangeBox">
        <div className="hintTxtBox">兑换比例 1.00 USDT≈100.0</div>
        <div className="duiHuanOption">
          <div className="inputOption">
            <div className="inputHeader">
              <span className="spn">用</span>
              <div className="rightDiv">
                <span className="rightTxt">账户余额:</span>
                <span className="amountTxt">28000USDT</span>
              </div>
            </div>
            <div className="inputBox">
              <div className="inputTxtBlock">
                <img src={USDT} className="icon"></img>
                <span className="spn">USDT</span>
              </div>
              <div className="inputOption">
                <Input placeholder="0.00" className="inputClass"></Input>
              </div>
            </div>
          </div>
        </div>
        <img src={topEnd} className="topEndIcon"></img>
        <div className="duiHuanOption">
          <div className="inputOption">
            <div className="inputHeader">
              <span className="spn">兑换</span>
              <div className="rightDiv">
                <span className="rightTxt">余额:</span>
                <span className="amountTxt">15123HZ</span>
              </div>
            </div>
            <div className="inputBox">
              <div className="inputTxtBlock">
                <img src={HTOKEN} className="icon"></img>
                <span className="spn">HZ</span>
              </div>
              <div className="inputOption">
                <Input placeholder="0.00" className="inputClass"></Input>
              </div>
            </div>
          </div>
        </div>
        <div className="txtBox">
          <div className="txtOption">
            <div className="leftTxt">手续费（5%）:</div>
            <div className="rightTxt">0.00 USDT</div>
          </div>
          <div className="txtOption">
            <div className="leftTxt">需支付:</div>
            <div className="rightTxt">0.00 USDT</div>
          </div>
          <div className="txtOption">
            <div className="leftTxt">实际到账</div>
            <div className="rightTxt">0.00 HZ</div>
          </div>
        </div>
        <div className="btnsHintBox">
          <div className="btnItem">
            <div className="btnItemTop">2,800.00 HZ</div>
            <div className="btnItemEnd">剩余兑换额度</div>
          </div>

          <div className="btnItem">
            <div className="btnItemTop rightTxt">0.00 USDT</div>
            <div className="btnItemEnd">需支付</div>
          </div>
        </div>
        <Button className="flashBtnBox">确认兑换</Button>
        <div className="listHint">最近记录</div>
        <div className="listBox">
          <div className="listHeader">
            <div className="time">时间</div>
            <div className="type">交易对</div>
            <div className="status">状态</div>
            <div className="amount">数量(HZ)</div>
          </div>
          <div className="listConent">
            <div className="listItem">
              <div className="time">2026/05/07 18:32:56</div>
              <div className="type">USDT/HZ</div>
              <div className="status">已完成</div>
              <div className="amount">200.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlashExchange;
