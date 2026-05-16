import "./index.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import leftIcon from "@/assets/Basic/leftIcon.png";
import openEye from "@/assets/Draw/openEye.png";
// 定义 Props 类型
interface HeaderTopProps {
  title: string; // 标题（必传）
  backgroundColor?: string; // 背景颜色（可选）
  className?: string; // 额外 className，方便扩展样式
  isRight?: boolean;
}
const HeaderTop: React.FC<HeaderTopProps> = ({
  title,
  backgroundColor = "#ffffff", // 默认白色背景
  isRight,
}) => {
  const navigate = useNavigate();
  const leftClick = () => {
    navigate(-1);
  };
  return (
    <div className="headerTopBox" style={{ backgroundColor }}>
      <img
        src={leftIcon}
        className="leftIcon"
        onClick={() => leftClick()}
      ></img>
      <div className="centerTxt">{title}</div>
      <div className="rightIcon">
        {isRight && <img src={openEye} className="rightIcon"></img>}
      </div>
    </div>
  );
};
export default HeaderTop;
