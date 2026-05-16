import "./index.scss";
import React from "react";
import { t } from "i18next";
import noDataList from "@/assets/Chfp/noDataList.png";
const NoData: React.FC = () => {
  return (
    <div className="noData">
      <img src={noDataList} className="noDataList"></img>
      <div className="txt">暂无记录</div>
    </div>
  );
};
export default NoData;
