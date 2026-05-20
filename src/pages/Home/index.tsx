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
import { Spin } from "antd";
import Menu from "@/components/Menu";
import InviteModal from "@/components/InviteModal";
import { ensureWalletConnected } from "@/Hooks/WalletHooks";
import { storage } from "@/Hooks/useLocalStorage";
import { useLocation } from "react-router-dom";
import { Totast, concatSign, formatAddress } from "@/Hooks/Utils";
import { userAddress } from "@/Store/Store";
import { UseSignMessage } from "@/Hooks/UseSignMessage.ts";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
interface listItem {
  txt: string;
  icon: string;
}
const Home: React.FC = () => {
  const location = useLocation();
  const [sign, setSign] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [bigRes, setBigRes] = useState<string>("");
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [inviteShow, setInviteShow] = useState<boolean>(false);
  const [invite, setInvite] = useState<string | null>(null);
  const [userInfoIntegral, setUserInfoIntegral] = useState<number>(0);
  const { signMessage } = UseSignMessage();
  const [isBindLoading, setIsBindLoading] = useState<boolean>(false);
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
    if (!walletAddress) return Totast("未链接钱包", "info");
    setMenuStatus(true);
  };
  const initInviter = () => {
    // 1️⃣ 先检查 URL 是否有 invite 参数
    const params = new URLSearchParams(location.search);
    const inviteParam = params.get("invite");
    if (inviteParam) {
      setInvite(inviteParam); // 保存到 state
      storage.set("invite", inviteParam); // 可选：存本地
    }
  };
  const initLogin = () => {
    setInviteShow(false);
    setWalletAddress(storage.get("address"));
  };
  const sendChange = () => {};
  // 授权登录
  const connectWallet = async () => {
    if (walletAddress) return;
    const result = await ensureWalletConnected(location);
    if (result) {
      const address = userAddress.getState().address;
      const isRegisterResult = await isRegister(address); //检查是否已注册
      console.log("isRegisterResult==", isRegisterResult == true);
      let bigRes;
      try {
        bigRes = concatSign(address);
        setBigRes(bigRes);
        const sigResult = await signMessage(bigRes);
        if (sigResult) {
          setSign(sigResult);
          console.log("isRegisterResult=--", isRegisterResult);
          if (isRegisterResult == false) {
            setInviteShow(true);
          } else {
            inviteConfirm(bigRes, sigResult);
          }
        }
      } catch (error) {
        Totast("签名失败", "error");
      }
    }
  };
  const isRegister = async (address) => {
    const result = await NetworkRequest({
      Url: "auth/isRegister",
      Method: "get",
      Data: {
        address,
      },
    });
    if (result.success) {
      return result.data.data;
    } else {
      return false;
    }
  };
  const inviteConfirm = async (bigRes, sign) => {
    setIsBindLoading(true);
    let Data = {
      address: userAddress.getState().address,
      msg: bigRes,
      signature: sign,
    };
    const result = await NetworkRequest({
      Url: "auth/login",
      Method: "post",
      Data: Data,
    });
    if (result.success) {
      setIsBindLoading(false);
      setInviteShow(false);
      setWalletAddress(userAddress.getState().address);
      storage.set("address", userAddress.getState().address);
      storage.set("sign", result.data.data);
    }
  };
  const inviteOnConfirm = async (inviteAddress) => {
    setIsBindLoading(true);
    let Data = {
      address: userAddress.getState().address,
      inviterAddress: inviteAddress,
      msg: bigRes,
      signature: sign,
    };
    const result = await NetworkRequest({
      Url: "auth/login",
      Method: "post",
      Data: Data,
    });
    if (result.success) {
      setIsBindLoading(false);
      setInviteShow(false);
      setWalletAddress(userAddress.getState().address);
      storage.set("address", userAddress.getState().address);
      storage.set("sign", result.data.data);
    }
  };
  useEffect(() => {
    initLogin();
    initInviter();
  }, [location]);
  return (
    <div className="HomePage">
      <div className="HeaderTopBox">
        <img src={menu} className="menuLeft" onClick={() => menuChange()}></img>
        <img src={logoIcon} className="logoContent"></img>
        <img
          src={walletAddress ? walletLink : walletBlock}
          className="rightWallet"
          onClick={() => connectWallet()}
        ></img>
      </div>
      <div className="hintBox">
        <div className="welcomeTxt">
          {walletAddress ? `Hi,${formatAddress(walletAddress)}` : "未链接钱包"}
        </div>
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
          <img
            src={sendIcon}
            className="sendIcon"
            onClick={() => sendChange()}
          ></img>
        </div>
        <div className="endOption">
          <span className="txt">
            积分余额：{walletAddress ? userInfoIntegral : "-"}
          </span>
          <span className="txt">{walletAddress ? 10 : "-"}积分/次</span>
        </div>
      </div>

      <Menu
        visible={menuStatus}
        onClose={() => {
          setMenuStatus(false);
        }}
      />

      <InviteModal
        isShow={inviteShow}
        isBindLoading={isBindLoading}
        onConfirm={(inviteAddress) => inviteOnConfirm(inviteAddress)}
        onClose={() => setInviteShow(false)}
      ></InviteModal>
    </div>
  );
};
export default Home;
