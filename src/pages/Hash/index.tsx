import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Input } from "antd";
import { Switch, Button, ProgressCircle } from "antd-mobile";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import rightIcon from "@/assets/Draw/rightIcon.png";
import downIcon from "@/assets/Guessing/downIcon.png";
import OneBlock from "@/assets/Guessing/OneBlock.png";
import TwoBlock from "@/assets/Guessing/TwoBlock.png";
import query from "@/assets/Chfp/query.png";
import NoPopup from "./components/noPopup/index";
import SuccessPopup from "./components/successPopup/index";
const Hash: React.FC = () => {
  const [noPopupShow,setNoPopupShow]=useState<boolean>(false)
  const [successPopupShow,setSuccessPopupShow]=useState<boolean>(false)
  const noPopupChange=()=>{
    setNoPopupShow(false)
  }
  const noPopupOpenClick=()=>{
    setNoPopupShow(true)
  }
    const successPopupChange=()=>{
    setSuccessPopupShow(false)
  }
  const successPopupOpenClick=()=>{
    setSuccessPopupShow(true)
  }
  useEffect(() => {}, []);
  return (
    <div className="HashPage">
      <HeaderTop title="哈希竞猜" backgroundColor="none"></HeaderTop>
      <div className="HashContentPage">
        <div className="hashInfoBox">
          <div className="hashInfoOption">
            <div className="leftOption">
              <div className="topTxt">上期开奖区块</div>
              <div className="endOption">
                <img src={OneBlock} className="icon"></img>
                <div className="endNum">81109920</div>
                <div className="endBtn">验证</div>
              </div>
            </div>
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradientColor"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#C51818" />
                  <stop offset="100%" stopColor="#F8C001" />
                </linearGradient>
              </defs>
            </svg>
            <div className="centerOption">
              <ProgressCircle
                percent={80}
                style={{
                  "--track-width": "4px",
                  "--fill-color": "url(#gradientColor)",
                  "--track-color": "rgba(255,255,255,0.1)",
                }}
              >
                <div className="progressCircleTxt">80</div>
              </ProgressCircle>
            </div>
            <div className="rightOption">
              <div className="topTxt">即将开奖区块</div>
              <div className="endOption">
                <img src={TwoBlock} className="icon"></img>
                <div className="endNum">81109920</div>
              </div>
            </div>
          </div>
          <div className="hashEndTxt">
            <div className="centerOption">
              …6e5d<span className="spnTxt">3[单]</span>
            </div>
            <div className="fixedRightOption">
              <div className="listOption">往期记录</div>
              <img src={downIcon} className="icon"></img>
            </div>
               <div className="listAbsoluteBox">
            <div className="headerTopOption">
              <div className="topItem">开奖区块</div>
              <div className="topItem">开奖结果</div>
              <div className="topItem">区块哈希</div>
              <div className="topItem">操作</div>
            </div>
            <div className="listBox">
              <div className="listOption">
                <div className="numTxt">81109920</div>
                <div className="resultTxt">单</div>
                <div className="num">00**6e5d3</div>
                <div className="btnBlock">
                  <div className="btn" onClick={()=>noPopupOpenClick()}>点击验证</div>
                </div>
              </div>
               <div className="listOption">
                <div className="numTxt">81109920</div>
                <div className="resultTxt">单</div>
                <div className="num">00**6e5d3</div>
                <div className="btnBlock">
                  <div className="btn" onClick={()=>successPopupOpenClick()}>点击验证</div>
                </div>
              </div>
               <div className="listOption">
                <div className="numTxt">81109920</div>
                <div className="resultTxt">单</div>
                <div className="num">00**6e5d3</div>
                <div className="btnBlock">
                  <div className="btn">点击验证</div>
                </div>
              </div>
               <div className="listOption">
                <div className="numTxt">81109920</div>
                <div className="resultTxt">单</div>
                <div className="num">00**6e5d3</div>
                <div className="btnBlock">
                  <div className="btn">点击验证</div>
                </div>
              </div>
               <div className="listOption">
                <div className="numTxt">81109920</div>
                <div className="resultTxt">单</div>
                <div className="num">00**6e5d3</div>
                <div className="btnBlock">
                  <div className="btn">点击验证</div>
                </div>
              </div>
               <div className="listOption">
                <div className="numTxt">81109920</div>
                <div className="resultTxt">单</div>
                <div className="num">00**6e5d3</div>
                <div className="btnBlock">
                  <div className="btn">点击验证</div>
                </div>
              </div>
               <div className="listOption">
                <div className="numTxt">81109920</div>
                <div className="resultTxt">单</div>
                <div className="num">00**6e5d3</div>
                <div className="btnBlock">
                  <div className="btn">点击验证</div>
                </div>
              </div>
            </div>
          </div>
          </div>
       
        </div>
        <div className="hashPlayBox">
          <div className="titleOption">
            <div className="leftOption">BNB单双·1分</div>
            <div className="rightOption">
              <img src={query} className="icon"></img>
              <span className="spx">游戏规则</span>
            </div>
          </div>
          <div className="playOption">
            <div className="typePlay typePlayCheck">
              <div className="typeTxt">单</div>
              <div className="typeBlock">
                <img src={HTOKEN} className="icon"></img>
                <span className="spnTxt">200</span>
              </div>
            </div>

            <div className="typePlay">
              <div className="typeTxt">双</div>
              <div className="typeBlock">
                <img src={HTOKEN} className="icon"></img>
                <span className="spnTxt">200</span>
              </div>
            </div>
          </div>

          <div className="joinBox">
            <div className="leftTxt">参与金额</div>
            <div className="rightOption">
              <span className="title">账户余额:</span>
              <span className="amount">25600HZ</span>
            </div>
          </div>
          <div className="amountListBox">
            <div className="itemAmount itemAmountCheck">100</div>
            <div className="itemAmount">200</div>
            <div className="itemAmount">500</div>
            <div className="itemAmount">1000</div>
            <div className="itemAmount">2000</div>
          </div>
          <div className="inputAmountBox">
            <Input placeholder="自定义金额" className="inputClass"></Input>
          </div>
        </div>
        <div className="awardBox">
          <div className="awardOption">
            <div className="awardTitle">我的奖励</div>
            <div className="awardRight">
              <span className="spn">更多记录</span>
              <img src={rightIcon} className="icon"></img>
            </div>
          </div>
          <div className="awardListBox">
            <div className="awardItem">
              <div className="title">800</div>
              <div className="hintTxt">累计奖励 HZ</div>
              <div className="btnOption">记录</div>
            </div>
            <div className="awardItem">
              <div className="title">28</div>
              <div className="hintTxt">累计获得NFT碎片</div>
              <div className="btnOption">去合成</div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixedEndBox">
        <div className="leftEndOption">
          <div className="needPayTxt">需支付</div>
          <div className="needPayNum">200HZ</div>
        </div>
        <div className="rightBtn">立即参与</div>
      </div>
      <NoPopup visible={noPopupShow} closeChange={()=>noPopupChange()}></NoPopup>
      <SuccessPopup visible={successPopupShow} closeChange={()=>successPopupChange()}></SuccessPopup>
    </div>
  );
};
export default Hash;
