import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import query from "@/assets/Chfp/query.png";
import USDT from "@/assets/Chfp/USDT.png";
import HTOKEN from "@/assets/Chfp/HTOKEN.png";
import rightIcon from "@/assets/Draw/rightIcon.png";
import about from "@/assets/Chfp/about.png";
import NoData from "@/components/NoData/index";
import { Button } from "antd";
import HintPopup from "./components/HintPopup/index.tsx";
import RulePopup from "./components/RulePopup/index.tsx";
import ActivateGoldPopup from "./components/ActivateGoldPopup/index.tsx";
import RedeemPopup from "./components/RedeemPopup/index.tsx";
import ChfpPopup from "./components/ChfpPopup/index.tsx";
import Reinvestment from "./components/Reinvestment/index.tsx";
import Extract from "./components/Extract/index.tsx";
import { Switch } from "antd-mobile";
const Chfp: React.FC = () => {
  const [hintPopupShow, setHintPopupShow] = useState<boolean>(false);
  const [rulePopupShow, setRulePopupShow] = useState<boolean>(false);
  const [chfpPopupShow, setChfpPopupShow] = useState<boolean>(false);
  const [redeemPopupShow, setRedeemPopupShow] = useState<boolean>(false);
  const [reinvestmentShow, setReinvestmentShow] = useState<boolean>(false);
  const [extractShow, setExtractShow] = useState<boolean>(false);
  const [activateGoldPopupShow, setActivateGoldPopupShow] =
    useState<boolean>(false);
 const extractPopupCloseChange = () => {
    setExtractShow(false);
  };

  const openExtractPopupClick = () => {
    setExtractShow(true);
  };
  const reinvestmentPopupCloseChange = () => {
    setReinvestmentShow(false);
  };

  const openReinvestmentPopupClick = () => {
    setReinvestmentShow(true);
  };
  const redeemPopupShowClick = () => {
    setRedeemPopupShow(true);
  };

  const redeemPopupCloseChange = () => {
    setRedeemPopupShow(false);
  };

  const hintPopupCloseChange = () => {
    setHintPopupShow(false);
  };
  const activateCloseChange = () => {
    setActivateGoldPopupShow(false);
  };
  const openActivateClick = () => {
    setActivateGoldPopupShow(true);
  };
  const rulePopupCloseChange = () => {
    setRulePopupShow(false);
  };
  const openRulePopupClick = () => {
    setRulePopupShow(true);
  };
  const openHintPopupClick = () => {
    setHintPopupShow(true);
  };
  const openChfpPopupClick = () => {
    setChfpPopupShow(true);
  };
  const chfpCloseChange = () => {
    setChfpPopupShow(false);
  };
  useEffect(() => {}, []);
  return (
    <div className="ChfpPage">
      <HeaderTop title="理财" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="liCaiBox">
          <div className="headerBox">
            <div className="leftTxtOption" onClick={() => openActivateClick()}>
              理财账户
            </div>
            <div className="rightOption" onClick={() => openRulePopupClick()}>
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
            <Button className="btnOne btn" onClick={() => openChfpPopupClick()}>
              赎回
            </Button>
            <Button
              className="btnTwo btn"
              onClick={() => redeemPopupShowClick()}
            >
              升级本金
            </Button>
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
          <div className="hintTxt" onClick={()=>openExtractPopupClick()}>
            开启后每日将自动追投首投金额的10%，直开启后每日将自动追投首投金额的10%，直至追投账户的余额不够为止。
          </div>
          <div className="btnList">
            <Button className="btnOne btn">提取</Button>
            <Button className="btnTwo btn">充值</Button>
          </div>
        </div>
        <div className="shouYiLvBox">
          <div className="leftOption">
            <span className="spn1">当前收益率：</span>
            <span className="spn2">100%</span>
          </div>
          <div className="rightOption" onClick={() => openHintPopupClick()}>
            <span className="spn1">如何提升</span>
            <img src={query} className="queryIcon"></img>
          </div>
        </div>
        <div className="shouYiBox">
          <div className="usdtBox">
            <div className="usdtTop">
              <img src={USDT} className="usdtIcon"></img>
              <span className="usdtTxt">USDT累计收益</span>
            </div>
            <div className="centerBox">
              <div className="amount">0.00</div>
              <div className="yesterDay">昨日+0.00</div>
            </div>
            <div className="endOption">
              <div className="endHintTxt">待领取</div>
              <div className="endHintNum">0.00</div>
              <Button className="btnGet">领取</Button>
            </div>
          </div>
          <div className="hzBox">
            <div className="usdtTop">
              <img src={USDT} className="usdtIcon"></img>
              <span className="usdtTxt">USDT累计收益</span>
            </div>
            <div className="centerBox">
              <div className="amount">0.00</div>
              <div className="yesterDay">昨日+0.00</div>
            </div>
            <div className="endOption">
              <div className="endHintNums">*自动到账平台账户</div>
              <Button className="btnList">记录</Button>
            </div>
          </div>
        </div>
        <div className="listBox">
          <div className="listHeader">
            <div className="leftTitle">动账记录</div>
            <div className="rightOption">
              <div className="rightTxt">更多记录</div>
              <img src={rightIcon} className="rightIcon"></img>
            </div>
          </div>

          <div className="listBorder">
            <div className="headerOption">
              <div className="headerItem dateTimeHeader">时间</div>
              <div className="headerItem accountHeader">账户</div>
              <div className="headerItem typeHeader">类型</div>
              <div className="headerItem amountHeader">金额(USDT)</div>
            </div>
            <div className="listData">
              <div className="listOption">
                <div className="dateTime">2026/05/07 18:32:56</div>
                <div className="account">理财账户</div>
                <div className="type">赎回</div>
                <div className="amount error">-200.00</div>
                <div className="amount success">-200.00</div>
              </div>
              <div className="NoDataOption">
                <NoData />
              </div>
            </div>
          </div>
        </div>
      </div>
      <HintPopup
        visible={hintPopupShow}
        closeChange={() => hintPopupCloseChange()}
      ></HintPopup>
      <RulePopup
        visible={rulePopupShow}
        closeChange={() => rulePopupCloseChange()}
      ></RulePopup>
      <ActivateGoldPopup
        visible={activateGoldPopupShow}
        closeChange={() => activateCloseChange()}
      ></ActivateGoldPopup>

      <ChfpPopup
        visible={chfpPopupShow}
        closeChange={() => chfpCloseChange()}
      ></ChfpPopup>

      <RedeemPopup
        visible={redeemPopupShow}
        closeChange={() => redeemPopupCloseChange()}
      ></RedeemPopup>

      <Reinvestment
        visible={reinvestmentShow}
        closeChange={() => reinvestmentPopupCloseChange()}
      ></Reinvestment>
      <Extract
      visible={extractShow}
      closeChange={()=>extractPopupCloseChange()}
      >

      </Extract>
    </div>
  );
};
export default Chfp;
