import "./index.scss";
import menu from "@/assets/Basic/menu.png";
import walletBlock from "@/assets/Basic/walletBlock.png";
import walletLink from "@/assets/Basic/walletLink.png";
import logoIcon from "@/assets/Basic/LogoIcon.png";
import about from "@/assets/Home/about.png";
import earnings from "@/assets/Home/earnings.png";
import market from "@/assets/Home/market.png";
import { useEffect, useState } from "react";
import contract from "@/assets/Home/contract.png";
import hash from "@/assets/Home/hash.png";
import flash from "@/assets/Home/flash.png";
import qianDao from "@/assets/Home/qianDao.png";
import shouyi from "@/assets/Home/shouyi.png";
import uploadImg from "@/assets/Home/uploadImg.png";
import sendIcon from "@/assets/Home/sendIcon.png";
import { Input } from "antd-mobile";
import Menu from "@/components/Menu";
interface listItem {
  txt: string;
  icon: string;
}
const Home: React.FC = () => {
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const tagList: listItem[] = [
    {
      txt: "关于Hermes",
      icon: about,
    },
    {
      txt: "收益评估",
      icon: earnings,
    },
    {
      txt: "加密货币行情",
      icon: market,
    },
    {
      txt: "Ai智能合约检测",
      icon: contract,
    },
  ];
  const keywordList: listItem[] = [
    {
      icon: flash,
      txt: "智能理财",
    },
    {
      icon: hash,
      txt: "哈希竞猜",
    },
    {
      icon: shouyi,
      txt: "收益评估",
    },
    {
      icon: qianDao,
      txt: "每日签到",
    },
  ];
  const menuChange = () => {
    setMenuStatus(true);
  };
  
  const sendChange=()=>{
    console.log("2==")
  }
  return (
    <div className="HomePage">
      <div className="HeaderTopBox">
        <img src={menu} className="menuLeft" onClick={() => menuChange()}></img>
        <img src={logoIcon} className="logoContent"></img>
        <img src={walletBlock} className="rightWallet"></img>
      </div>
      <div className="hintBox">
        <div className="welcomeTxt">Hi, 0x8b56…B400</div>
        <div className="hintTxts">我是Hermes智能体，欢迎来到WEB3</div>
        <div className="tagBox">
          {tagList.map((item, index) => {
            return (
              <div className="tagItem" key={index}>
                <img src={item.icon} className="iconItem"></img>
                <span className="txtItem">{item.txt}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixedBox">
        <div className="keyWordListBox">
          <div className="keyWordListOption">
            {keywordList.map((item, index) => {
              return (
                <div className="keWordItem" key={index}>
                  <img src={item.icon} className="itemIcon"></img>
                  <span className="itemTxt">{item.txt}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="inputBox">
          <img src={uploadImg} className="upLoadImgIcon"></img>
          <div className="inputOption">
            <Input placeholder="你想了解点什么" className="inputStyle"></Input>
          </div>
          <img src={sendIcon} className="sendIcon" onClick={()=>sendChange()}></img>
        </div>
        <div className="endOption">
          <span className="txt">积分余额：800</span>
          <span className="txt">10积分/次</span>
        </div>
      </div>

      <Menu
        visible={menuStatus}
        onClose={() => {
          setMenuStatus(false);
        }}
      />
    </div>
  );
};
export default Home;
