import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import aboutBg from "@/assets/About/aboutBg.png";
import oneIcon from "@/assets/About/1.png";
import threeIcon from "@/assets/About/2.png";
import fourIcon from "@/assets/About/3.png";
import fiveIcon from "@/assets/About/4.png";
import sixIcon from "@/assets/About/5.png";
import sevenIcon from "@/assets/About/6.png";
const AboutUs: React.FC = () => {
  const txtList = [
    {
      icon: fiveIcon,
      title: "与你同在",
      txts: "Telegram、Discord、Slack、WhatsApp、Signal、电子邮件、CLI——以及越来越多的平台。先从一个开始，再尝试另一个。",
    },
    {
      icon: threeIcon,
      title: "运行时间越长，增长越多",
      txts: "持久记忆和自动生成的技能——它会学习你的项目，并且永远不会忘记它是如何解决问题的。",
    },
    {
      icon: sevenIcon,
      title: "定时自动化",
      txts: "使用自然语言进行 cron 调度，用于报告、备份和简报——通过网关无人值守运行。",
    },
    {
      icon: oneIcon,
      title: "委托和并行化",
      txts: "具有独立对话、终端和 Python RPC 脚本的独立子代理，实现零上下文成本管道。",
    },
    {
      icon: sixIcon,
      title: "真实沙盒",
      txts: "五个后端——本地、Docker、SSH、Singularity、Modal——具备容器加固和命名空间隔离功能。",
    },
    {
      icon: sixIcon,
      title: "完全控制网页和浏览器",
      txts: "网络搜索、浏览器自动化、视觉、图像生成、",
    },
  ];
  return (
    <div className="AboutUs">
      <HeaderTop
        title="关于我们"
        backgroundColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      />
      <div className="contentPage">
        <div className="hermes-container">
          <div className="hermes-text">
            <div className="line1">Hermes 致力于</div>
            <div className="line2">构建一个智能 Web3 经济生态</div>
          </div>
        </div>

        <div className="hintTxtBox">
          Hermes
          致力于将复杂的链上操作（资产管理、支付、DEX清算）整合为自然语言可调用的AI系统并持续进行自我进化，以智能理财为核心增长引擎，通过完全透明的智能合约，构建一个自我造血、持续通缩、跨越牛熊的智能
          Web3 经济生态。
        </div>
        <img src={aboutBg} className="aboutBg"></img>
        <div className="txtsBox">
          <div className="txtHeader">特点</div>
          <div className="optionBox">
            {txtList.map((item, index) => {
              return (
                <div className="optionItem" key={index}>
                  <div className="leftItem">
                    <img src={item.icon} className="icon"></img>
                  </div>
                  <div className="rightItem">
                    <div className="title">{item.title}</div>
                    <div className="txts">{item.txts}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
