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
import ChfpPlusPopup from "./components/ChfpPlusPopup/index.tsx";
import Reinvestment from "./components/Reinvestment/index.tsx";
import RechargePopup from "./components/RechargePopup/index.tsx";
import Extract from "./components/Extract/index.tsx";
import { Switch } from "antd-mobile";
import { Totast, toWei } from "@/Hooks/Utils.ts";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import { storage } from "@/Hooks/useLocalStorage.ts";
import { fromWei } from "@/Hooks/Utils.ts";
import ContractSend from "@/Hooks/ContractSend.ts";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
interface chfpInfo {
  totalYieldUsdtReward: number; //usdt累计收益
  totalYieldHzReward: number; //hz累计收益
  yieldReward: number; //待领取收益
  autoAppend: boolean; //自动追投开关
}
interface userInfo {
  principal: bigint; //本金
  maxRevenue: bigint; //最大投资额
  rate: bigint; //当前收益
  cycleStart: bigint; //开始时间
  insurancePaid: bigint; //激活金
  investment: bigint; //追投资金
}
interface listItem {
  amount: number; //额度
  createTime: string; //创建时间
  coinType: number; //代币类型 1.usdt 2.hz
}
const Chfp: React.FC = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [accountUsdt, setAccountUsdt] = useState<number>(0);
  const walletAddress = storage.get("address");
  const [list, setList] = useState<listItem[]>([]);
  const [userInfo, setUserInfo] = useState<userInfo>();
  const [chfpInfo, setChfpInfo] = useState<chfpInfo>();
  const [switchLoading, setSwitchLoading] = useState<boolean>(false);
  const [redeemLoading, setRedeemLoading] = useState<boolean>(false);
  const [hintPopupShow, setHintPopupShow] = useState<boolean>(false);
  const [rulePopupShow, setRulePopupShow] = useState<boolean>(false);
  const [chfpPopupShow, setChfpPopupShow] = useState<boolean>(false);
  const [redeemPopupShow, setRedeemPopupShow] = useState<boolean>(false);
  const [reinvestmentShow, setReinvestmentShow] = useState<boolean>(false);
  const [rechargeShow, setRechargeShow] = useState<boolean>(false);
  const [extractShow, setExtractShow] = useState<boolean>(false);
  const [chfpPlusShow, setChfpPlusShow] = useState<boolean>(false);
  const [isOperation, setIsOperation] = useState<boolean>(false); //是否可以点击
  const [activateGoldPopupShow, setActivateGoldPopupShow] =
    useState<boolean>(false);
  const [yieldRewardLoading, setYieldRewardLoading] = useState<boolean>(false);
  const chfpPlusPopupCloseChange = () => {
    setChfpPlusShow(false);
    init();
  };

  const openRechargePopupClick = () => {
    setRechargeShow(true);
  };

  const rechargePopupCloseChange = () => {
    setRechargeShow(false);
    init();
  };

  const openChfpPlusPopupClick = () => {
    setChfpPlusShow(true);
  };

  const extractPopupCloseChange = () => {
    setExtractShow(false);
    init();
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
    init();
  };
  const init = () => {
    initUserData();
    initData();
    initAccountUsdt();
    initListData();
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
    if (userInfo?.principal == toWei("1000", 18)) {
      return Totast("已经最大等级!", "error");
    }
    setChfpPopupShow(true);
  };
  const chfpCloseChange = () => {
    setChfpPopupShow(false);
    init();
  };
  /**
   * 理财赎回
   */
  const redeemPrincipalFn = async () => {
    try {
      setRedeemLoading(true);
      const result = await ContractSend({
        tokenName: "investment",
        methodsName: "redeemPrincipal",
        params: [],
      });
      if (result.value) {
        Totast("赎回成功", "success"); // 检查授权或者授权时发生了错误，请检查网络后重新尝试
        init();
      }
    } catch (error) {
    } finally {
      setRedeemLoading(false);
    }
  };
  const initAccountUsdt = async () => {
    const result = await NetworkRequest({
      Url: "account/getUsdt",
      Method: "get",
    });
    if (result.success) {
      setAccountUsdt(result.data.data);
    }
  };
  const initData = async () => {
    const result = await NetworkRequest({
      Url: "deposit/info",
      Method: "get",
    });
    if (result.success) {
      setChfpInfo(result.data.data);
    }
  };
  const initListData = async () => {
    const result = await NetworkRequest({
      Url: "bill/yield",
      Method: "post",
      Data: {
        size: 10,
        current: 1,
        // coinType: "",
      },
    });
    if (result.success) {
      setList(result.data.data.records);
    }
  };
  const switchChange = async (e) => {
    console.log("e--", e);
    try {
      setSwitchLoading(true);
      //判断本金的10%的五天数量是否足够
      const needAutoAmount = ((userInfo.principal * 10n) / 100n) * 5n;
      if (toWei(accountUsdt.toString(), 18) < needAutoAmount) {
        setSwitchLoading(false);
        return Totast("账户余额不足以开通", "error");
      }
      const result = await NetworkRequest({
        Url: "deposit/updateAuto",
        Method: "get",
        Data: {
          flag: e,
        },
      });
      if (result.success) {
        Totast(`${e ? "开启成功" : "关闭成功"}`, "success");
        init();
      }
    } catch (error) {
    } finally {
      setSwitchLoading(false);
    }
  };
  const initUserData = async () => {
    const result = await ContractRequest({
      tokenName: "investment",
      methodsName: "users",
      params: [walletAddress],
    });
    if (result.value) {
      setUserInfo({
        principal: result.value[0],
        maxRevenue: result.value[1],
        rate: result.value[2],
        cycleStart: result.value[3],
        insurancePaid: result.value[4],
        investment: result.value[5],
      });
      if (result.value[0] > 0n) {
        isOperationWindowFn();
      }
    }
  };
  /**
   * 理财是否可以点击
   */
  const isOperationWindowFn = async () => {
    const result = await ContractRequest({
      tokenName: "investment",
      methodsName: "isOperationWindow",
      params: [walletAddress],
    });
    console.log("result--", result);
    if (result.value) {
      setIsOperation(result.value);
    }
  };
  const claimClick = async () => {
    try {
      setYieldRewardLoading(true);
      const result = await NetworkRequest({
        Url: "deposit/claim",
        Method: "get",
      });
      if (result.success) {
        Totast("领取成功", "success");
        init();
      }
    } catch (error) {
    } finally {
      setYieldRewardLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="ChfpPage">
      <HeaderTop title="理财" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="liCaiBox">
          <div className="headerBox">
            <div className="leftTxtOption" onClick={() => openActivateClick()}>
              理财账户
            </div>
            {/* <div className="rightOption" onClick={() => openRulePopupClick()}>
              <span className="txt">规则说明</span>
              <img src={query} className="queryIcon"></img>
            </div> */}
          </div>
          <div className="AmountOption">
            <span className="num">
              {fromWei(userInfo?.principal + userInfo?.investment, 18)}
            </span>
            <span className="amountType">USDT</span>
          </div>
          {userInfo?.principal == 0n && (
            <div className="btnBox" onClick={() => openChfpPlusPopupClick()}>
              开启智能理财
            </div>
          )}
          {userInfo?.principal > 0n && (
            <div className="btnList">
              <Button
                className="btnOne btn"
                disabled={!isOperation}
                loading={redeemLoading}
                onClick={() => redeemPrincipalFn()}
              >
                赎回
              </Button>
              <Button
                disabled={!isOperation}
                className="btnTwo btn"
                onClick={() => openReinvestmentPopupClick()}
              >
                追投
              </Button>
              <Button
                className="btnThree btn"
                disabled={!isOperation}
                onClick={() => openChfpPopupClick()}
              >
                升级本金
              </Button>
            </div>
          )}
        </div>

        <div className="reinvestmentBox">
          <div className="headerOption">
            <div className="leftTxt">账户余额</div>
            <div className="rightOption">
              <img src={about} className="aboutIcon"></img>
              <span className="txt">Ai追投已开启</span>
              <Switch
                loading={switchLoading}
                onChange={(e) => switchChange(e)}
                checked={chfpInfo?.autoAppend}
                style={{
                  "--checked-color": "#1DD274",
                  "--height": "20px",
                  "--width": "40px",
                }}
              />
            </div>
          </div>
          <div className="amountOption">
            <span className="num">{accountUsdt}</span>
            <span className="typeAmount">USDT</span>
          </div>
          <div className="hintTxt" onClick={() => openExtractPopupClick()}>
            开启后每日将自动追投首投金额的10%，直开启后每日将自动追投首投金额的10%，直至追投账户的余额不够为止。
          </div>
          <div className="btnList">
            <Button
              className="btnOne btn"
              onClick={() => openExtractPopupClick()}
            >
              提现
            </Button>
            <Button
              className="btnTwo btn"
              onClick={() => openRechargePopupClick()}
            >
              充值
            </Button>
          </div>
        </div>
        <div className="shouYiLvBox">
          <div className="leftOption">
            <span className="spn1">当前收益率：</span>
            <span className="spn2">{userInfo?.rate?.toString() / 100}%</span>
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
              <div className="amount">{chfpInfo?.totalYieldUsdtReward}</div>
            </div>
            <div className="endOption">
              <div className="endHintTxt">
                待领取
                <Button
                  className="flashExchangeBtn"
                  onClick={() => navigate("/FlashExchange")}
                >
                  去兑换
                </Button>
              </div>
              <div className="endHintNum">{chfpInfo?.yieldReward}</div>
              <Button
                loading={yieldRewardLoading}
                disabled={chfpInfo?.yieldReward == 0 ? true : false}
                className={`btnGet ${chfpInfo?.yieldReward == 0 ? "btnNo" : "btnOk"}`}
                onClick={() => claimClick()}
              >
                领取
              </Button>
            </div>
          </div>
          <div className="hzBox">
            <div className="usdtTop">
              <img src={HTOKEN} className="usdtIcon"></img>
              <span className="usdtTxt">HZ累计收益</span>
            </div>
            <div className="centerBox">
              <div className="amount">{chfpInfo?.totalYieldHzReward}</div>
            </div>
            <div className="endOption">
              <div className="endHintNums">*自动到账平台账户</div>
              <Button
                className="btnList"
                onClick={() => navigate("/EarningsList")}
              >
                记录
              </Button>
            </div>
          </div>
        </div>
        <div className="listBox">
          <div className="listHeader">
            <div className="leftTitle">动账记录</div>
            <div
              className="rightOption"
              onClick={() => navigate("/EarningsList")}
            >
              <div className="rightTxt">更多记录</div>
              <img src={rightIcon} className="rightIcon"></img>
            </div>
          </div>

          <div className="listBorder">
            <div className="headerOption">
              <div className="headerItem dateTimeHeader">时间</div>
              <div className="headerItem typeHeader">类型</div>
              <div className="headerItem amountHeader">金额(USDT)</div>
            </div>
            <div className="listData">
              {pageLoading && (
                <div className="assetDetailSpinBox">
                  <Spin />
                </div>
              )}
              {!pageLoading && list.length == 0 ? (
                <div className="NoDataOption">
                  <NoData />
                </div>
              ) : (
                list.map((item, index) => {
                  return (
                    <div className="listOption" key={index}>
                      <div className="dateTime">{item.createTime}</div>
                      <div className="type">
                        {item.coinType == 1 ? "USDT" : "HZ"}
                      </div>
                      <div className="amount success">{item.amount}</div>
                    </div>
                  );
                })
              )}
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
        principal={userInfo?.principal}
        insurancePaid={userInfo?.insurancePaid}
        visible={chfpPopupShow}
        closeChange={() => chfpCloseChange()}
      ></ChfpPopup>

      <RedeemPopup
        visible={redeemPopupShow}
        closeChange={() => redeemPopupCloseChange()}
      ></RedeemPopup>

      <Reinvestment
        principal={userInfo?.principal}
        visible={reinvestmentShow}
        closeChange={() => reinvestmentPopupCloseChange()}
      ></Reinvestment>
      <Extract
        visible={extractShow}
        closeChange={() => extractPopupCloseChange()}
      ></Extract>

      <ChfpPlusPopup
        visible={chfpPlusShow}
        closeChange={() => chfpPlusPopupCloseChange()}
      ></ChfpPlusPopup>

      <RechargePopup
        visible={rechargeShow}
        closeChange={() => rechargePopupCloseChange()}
      ></RechargePopup>
    </div>
  );
};
export default Chfp;
