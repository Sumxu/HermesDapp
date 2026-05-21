import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import { Input } from "antd";
import { Switch, Button, ProgressCircle } from "antd-mobile";
import ruleDown from "@/assets/Guessing/ruleDown.png";
import ruleEx from "@/assets/Guessing/ruleEx.png";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
interface lotteryConfig {
  odds: number; //倍数
  minAmount: number; //最小投注
  maxAmount: number; //最大投注
  giveDebris: number; //投入多少可获得nft碎片
}
const GameRule: React.FC = () => {
  const [lotteryConfig, setLotteryConfig] = useState<lotteryConfig>();

  const initConfig = async () => {
    const result = await NetworkRequest({
      Url: "lottery/config",
      Method: "post",
    });
    if (result.success) {
      setLotteryConfig(result.data.data);
    }
  };
  useEffect(() => {
    initConfig();
  }, []);
  return (
    <div className="GameRulePage">
      <HeaderTop title="游戏规则" backgroundColor="#000"></HeaderTop>

      <div className="GameRuleContentPage">
        <div className="contentTopBox">
          <div className="contentTopOption"></div>
          <div className="txtOption">币安链开奖取值规则</div>
          <div className="txtsOption">
            开奖由每局的区块哈希值决定，系统每隔20个区块
          </div>
          <div className="txtsTwoOption">币安链区块哈希值</div>
          <div className="txtsTwoOption">最后1位数字作为游戏开</div>
          <img className="icon" src={ruleDown}></img>
          <img className="num" src={ruleEx}></img>
        </div>
        <div className="ruleHintBox">
          <div className="title">赔率及限额</div>
          <div className="ruleHintTxt">
            <div className="hintLabel">
              赔率:<span className="spn">1:{lotteryConfig?.odds}</span>
            </div>
            <div className="hintLabel">
              限额:
              <span className="spn">
                {lotteryConfig?.minAmount}-{lotteryConfig?.maxAmount}HZ
              </span>
            </div>
          </div>
          <div className="title">游戏规则</div>
          <div className="ruleHintTxt">
            <div className="hintLabel">
              1.游戏<span className="spn">1、3、5、7、9</span> 开奖结果为{" "}
              <span className="spn">单</span>
            </div>
            <div className="hintLabel">
              2.数字<span className="spn">0、2、4、6、8</span> 开奖结果为{" "}
              <span className="spn">双</span>
            </div>
          </div>

          <div className="title">关于奖励</div>
          <div className="ruleHintTxt">
            <div className="hintLabel">1.猜对了将获得{lotteryConfig?.odds*100}%的HZ</div>
            <div className="hintLabel">
              2.猜错了，参与金额≥{lotteryConfig?.giveDebris}，则获得1枚NFT碎片（20张碎片可以合成一张NFT）；参与金额＜{lotteryConfig?.giveDebris}，没有任何奖励
            </div>
          </div>

          <div className="title">注意事项</div>
          <div className="ruleHintTxt">
            <div className="hintLabel">
              1.由于币安链3秒刷新一个区块结果，BNB转账时会存在一定的网络延迟，您的当期投注以确认注单区块为准。
            </div>
            <div className="hintLabel">
              2.游戏赔率会自动浮动，所有解释权归本平台所有。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameRule;
