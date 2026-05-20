import "./index.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Totast,
  getMask,
  fromWei,
  toWei,
  formatAddress,
} from "@/Hooks/Utils.ts";
import LogoIcon from "@/assets/Basic/LogoIcon.png";
import walletBlock from "@/assets/Basic/walletBlock.png";
import duanKai from "@/assets/Basic/duanKai.png";
import { userAddress } from "@/Store/Store.ts";
import openEye from "@/assets/Draw/openEye.png";
import rightIcon from "@/assets/Draw/rightIcon.png";
import newToken from "@/assets/Draw/newToken.png";
import liCai from "@/assets/Draw/liCai.png";
import shanDui from "@/assets/Draw/shanDui.png";
import sheQu from "@/assets/Draw/sheQu.png";
import hash from "@/assets/Home/hash.png";
import close from "@/assets/Basic/close.png";
import { Button } from "antd";
import { storage } from "@/Hooks/useLocalStorage";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";

interface MenuType {
  label: string;
  url: string;
}
interface userInfo {
  convertLimit: number;
  debris: number;
  hz: number;
  integral: number;
  usdt: number;
}
const menuList: MenuType[] = [];
const Menu: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const [isSignLoading, setIsSignLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const walletAddress = storage.get("address");
  const [userInfo, setUserInfo] = useState<userInfo>();
  const timeTokenTitleList = [
    "关于我们",
    "哈哈哈哈",
    "哈哈哈哈",
    "哈哈哈哈",
    "哈哈哈哈",
  ];
  const toolsPage = [
    {
      label: "理财",
      path: "/Chfp",
      icon: liCai,
    },
    {
      label: "哈希竞猜",
      path: "/Hash",
      icon: hash,
    },
    {
      label: "闪兑",
      path: "/FlashExchange",
      icon: shanDui,
    },
    {
      label: "社区",
      path: "/Community",
      icon: sheQu,
    },
  ];
  const initData = async () => {
    const result = await NetworkRequest({
      Url: "account/asset",
      Method: "get",
    });
    if (result.success) {
      setUserInfo(result.data.data);
    }
  };
  const toolPageClick = (item) => {
    if (!walletAddress) return Totast("未登录", "info");
    onClose();
    navigate(item.path);
  };

  const signFn = async () => {
    setIsSignLoading(true);
    try {
      const result = await NetworkRequest({
        Url: "user/sign",
        Method: "get",
      });
      if (result.success) {
        Totast("签到成功", "success");
      }
    } catch (error) {
    } finally {
      setIsSignLoading(false);
    }
  };
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    if (visible != "hidden") {
      initData();
    }
  }, [visible]);
  return (
    <>
      <div className={`menu-content ${visible ? "show" : "hide"}`}>
        <div className="MenuHeader">
          <img src={LogoIcon} className="logoIcon"></img>
          <div className="rightOption">
            <div className="rightBlock">
              <div className="icon"></div>
              <div className="txt">简体中文</div>
            </div>
            <img
              src={close}
              className="closeIcon"
              onClick={() => onClose()}
            ></img>
          </div>
        </div>
        <div className="walletBox">
          <div className="leftOption">
            <div className="walletIconOption">
              <img src={walletBlock} className="walletIcon"></img>
            </div>
            <div className="walletAddress">{formatAddress(walletAddress)}</div>
          </div>
          <img src={duanKai} className="duanKai"></img>
        </div>
        <div className="blanceOfBox">
          <div className="topHeaderOption">
            <div className="leftOption" onClick={() => navigate("/Asset")}>
              <span className="txt">我的资产</span>
              <img src={rightIcon} className="rightIcon"></img>
            </div>
            <div className="rightOption">
              <img src={openEye} className="openEye"></img>
            </div>
          </div>
          <div className="endOption">
            <span>USDT:${userInfo?.usdt}</span> <span>HZ:{userInfo?.hz}</span>
          </div>
        </div>
        <div className="toolsBox">
          <div className="toolItem">
            <div className="num">{userInfo?.integral}</div>
            <div className="txt">积分</div>
            <Button className="btn qianDao" onClick={()=>signFn()} loading={isSignLoading}>每日签到</Button>
          </div>

          <div className="toolItem">
            <div className="num">{userInfo?.debris}</div>
            <div className="txt">NFT碎片</div>
            <Button className="btn heCheng" onClick={()=>navigate('/Nft')}>合成</Button>
          </div>
        </div>
        <div className="tokenListBox">
          <div className="createToken">
            <img src={newToken} className="icon"></img>
            <span className="txt">开启新对话</span>
          </div>

          <div className="toolsPage">
            {toolsPage.map((item, index) => {
              return (
                <div
                  className="toolPageOption"
                  key={index}
                  onClick={() => toolPageClick(item)}
                >
                  <div className="leftOption">
                    <img src={item.icon} className="leftIcon"></img>
                    <span className="txt">{item.label}</span>
                  </div>
                  <img src={rightIcon} className="rightIcon"></img>
                </div>
              );
            })}
          </div>

          <div className="timeTokenList">
            <div className="timeTokenTitle">最近对话</div>
            <div className="txts">
              {timeTokenTitleList.map((item, index) => {
                return (
                  <div className="timeTokenItem" key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Menu;
