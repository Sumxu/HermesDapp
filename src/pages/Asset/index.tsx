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
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import { storage } from "@/Hooks/useLocalStorage";
import { fromWei } from "@/Hooks/Utils";
import { useNavigate } from "react-router-dom";
import RechargePopup from "@/pages/Chfp/components/RechargePopup/index.tsx";
import Extract from "@/pages/Chfp/components/Extract/index.tsx";

interface userInfo {
  convertLimit: number;
  debris: number;
  hz: number;
  integral: number;
  usdt: number;
  nft: number;
}

const Asset: React.FC = () => {
  const [extractShow, setExtractShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const [accountUsdt, setAccountUsdt] = useState<number>(0);
  const [rechargeShow, setRechargeShow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<userInfo>();
  const [hzPrice, setHzPrice] = useState<number>(0);
  const [walletAddressAmount, setWalletAddressAmount] = useState<bigint>(0n);
  const walletAddress = storage.get("address");
  const initData = async () => {
    const result = await NetworkRequest({
      Url: "account/asset",
      Method: "get",
    });
    if (result.success) {
      setUserInfo(result.data.data);
    }
  };
  const initUsdtAmount = async () => {
    const result = await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "balanceOf",
      params: [walletAddress],
    });
    setWalletAddressAmount(result.value);
  };
  const getHzPrice = async () => {
    const result = await NetworkRequest({
      Url: "account/getPrice",
      Method: "get",
    });
    console.log(result);
    if (result.success) {
      setHzPrice(result.data.data || 0);
    }
  };
  const calculateUsdt = (amount) => {
    return amount * hzPrice;
  };
  const totalUsdtAmount = () => {
    const usdtWalletAmount = Number(fromWei(walletAddressAmount || 0n, 18));
    const usdtAccountAmount = userInfo?.usdt || 0;
    const hzUsdtAmount = calculateUsdt(userInfo?.hz || 0);

    return usdtWalletAmount + usdtAccountAmount + hzUsdtAmount;
  };

  const openRechargePopupClick = () => {
    setRechargeShow(true);
  };

  const rechargePopupCloseChange = () => {
    setRechargeShow(false);
    initAccountUsdt();
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
  const extractPopupCloseChange = () => {
    setExtractShow(false);
    init();
  };

  const openExtractPopupClick = () => {
    setExtractShow(true);
  };
  const init = () => {
    initData();
    getHzPrice();
    initUsdtAmount();
    initAccountUsdt();
  };
  const convertLimitFn = () => {
    const amount = (accountUsdt * userInfo?.convertLimit) / hzPrice;
    return amount
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="AssetPage">
      <HeaderTop title="资产中心" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="assetInfoBox">
          <div className="leftInfoOption">
            <div className="topTxt">资产总估值</div>
            <div className="endTxt">${totalUsdtAmount()}</div>
          </div>
          <div
            className="rightInfoOption"
            onClick={() => navigate("/AssetDetail")}
          >
            <img className="icon" src={listIcon}></img>
            <div className="iconRightTxt">资产明细</div>
          </div>
        </div>
        <div className="reinvestmentBox">
          <div className="headerOption">
            <div className="leftTxt">账户余额</div>
          </div>

          <div className="endInfoOption">
            <div className="amountOption">
              <span className="num">{accountUsdt}</span>
              <span className="typeAmount">USDT</span>
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
              <div className="numTxt">{userInfo?.hz}</div>
              <div className="numTwoTxt">≈${calculateUsdt(userInfo?.hz)}</div>
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
              <div className="numTxt">{userInfo?.usdt}</div>
              <div className="numTwoTxt">≈${userInfo?.usdt}</div>
            </div>
          </div>
          <div className="blanceOption bottomBorder">
            <div className="leftOption">
              <img src={USDT} className="icon"></img>
              <div className="contentOption">
                <div className="topTxt">USDT</div>
                <div className="endTxt">钱包余额</div>
              </div>
            </div>
            <div className="rightOption">
              <div className="numTxt">{fromWei(walletAddressAmount, 18)}</div>
              <div className="numTwoTxt">
                ≈${fromWei(walletAddressAmount, 18)}
              </div>
            </div>
          </div>
          <div className="blanceOption">
            <div className="leftOption">
              <img src={NFT} className="icon"></img>
              <div className="contentOption">
                <div className="topTxt">NFT</div>
              </div>
            </div>
            <div className="rightOption">
              <div className="numTxt">{userInfo?.nft}</div>
            </div>
          </div>
        </div>

        <div className="duiHuanBox">
          <div className="leftOption">
            <div className="iconOption">
              <img src={Icon} className="icon"></img>
            </div>
            <div className="contentOption">
              <div className="numTxt">
                {userInfo?.hz ? convertLimitFn() : "-"}HZ
              </div>
              <div className="hintTxt">剩余兑换额度</div>
            </div>
          </div>

          <div className="rightBtn" onClick={() => navigate("/FlashExchange")}>
            去兑换
          </div>
        </div>
      </div>
      <RechargePopup
        visible={rechargeShow}
        closeChange={() => rechargePopupCloseChange()}
      ></RechargePopup>

      <Extract
        visible={extractShow}
        closeChange={() => extractPopupCloseChange()}
      ></Extract>
    </div>
  );
};
export default Asset;
