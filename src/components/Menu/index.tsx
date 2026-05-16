import "./index.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Totast, getMask, fromWei, toWei } from "@/Hooks/Utils.ts";
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
interface MenuType {
  label: string;
  url: string;
}
const menuList: MenuType[] = [];

const Menu: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
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
      path: "",
      icon: liCai,
    },
    {
      label: "哈希竞猜",
      path: "",
      icon: hash,
    },
    {
      label: "闪兑",
      path: "",
      icon: shanDui,
    },
    {
      label: "社区",
      path: "",
      icon: sheQu,
    },
  ];
  const walletAddress = userAddress().address;
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    if (visible != "hidden") {
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
            <img src={close} className="closeIcon" onClick={()=>onClose()}></img>
          </div>
        </div>
        <div className="walletBox">
          <div className="leftOption">
            <div className="walletIconOption">
              <img src={walletBlock} className="walletIcon"></img>
            </div>
            <div className="walletAddress">0x1232q123</div>
          </div>
          <img src={duanKai} className="duanKai"></img>
        </div>
        <div className="blanceOfBox">
          <div className="topHeaderOption">
            <div className="leftOption">
              <span className="txt">我的资产</span>
              <img src={rightIcon} className="rightIcon"></img>
            </div>
            <div className="rightOption">
              <img src={openEye} className="openEye"></img>
            </div>
          </div>
          <div className="endOption">$ 37,285.09</div>
        </div>
        <div className="toolsBox">
          <div className="toolItem">
            <div className="num">800</div>
            <div className="txt">积分</div>
            <Button className="btn qianDao">每日钱包</Button>
          </div>

          <div className="toolItem">
            <div className="num">23</div>
            <div className="txt">NFT碎片</div>
            <Button className="btn heCheng">合成</Button>
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
                <div className="toolPageOption" key={index}>
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
