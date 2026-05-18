import { useEffect, useState } from "react";
import "./index.scss";
import HeaderTop from "@/components/HeaderTop";
import NoData from "@/components/NoData/index";
import { Button } from "antd";
import { Switch, Picker } from "antd-mobile";
import sanJiaoXing from "@/assets/Basic/sanJiaoXing.png";
const AssetDetail: React.FC = () => {
  const [accountVisible, setAccountVisible] = useState<boolean>(false);
  const [typeVisible, setTypeVisible] = useState<boolean>(false);
  const [checkAccount, setCheckAccount] = useState<string>("1");
  const [checkType, setCheckType] = useState<string>("1");
  const accountList = [
    [
      {
        label: "全部账号1",
        value: "1",
      },
      {
        label: "全部账号2",
        value: "2",
      },
      {
        label: "全部账号3",
        value: "3",
      },
    ],
  ];
  const typeList = [
    [
      {
        label: "全部类型1",
        value: "1",
      },
      {
        label: "全部类型2",
        value: "2",
      },
      {
        label: "全部类型3",
        value: "3",
      },
    ],
  ];
  useEffect(() => {}, []);
  return (
    <div className="AssetDetailPage">
      <HeaderTop title="资产明细" backgroundColor="#000"></HeaderTop>
      <div className="contentPage">
        <div className="tabBox">
          <div className="tabOption">
            <div className="tabItem tabCheck">USDT</div>
            <div className="tabItem">HZ</div>
            <div className="tabItem">NFT</div>
          </div>
        </div>
        <div className="checkContentBox">
          <div className="checkOption" onClick={() => setAccountVisible(true)}>
            <div className="checkTxt">全部账户</div>
            <img src={sanJiaoXing} className="checkIcon"></img>
          </div>

          <div className="checkOption" onClick={() => setTypeVisible(true)}>
            <div className="checkTxt">全部类型</div>
            <img src={sanJiaoXing} className="checkIcon"></img>
          </div>
        </div>
        <div className="listContent">
          <div className="listHeader">
            <div className="leftTxt itemTxtDate">时间</div>
            <div className="rightTxt txtType rightTxtLeft">账户</div>
            <div className="rightTxt txtType rightTxtLeft">类型</div>
            <div className="rightTxt">金额(USDT)</div>
          </div>
          <div className="listItem">
            <div className="itemTxtDate">2026/05/07 18:32:56</div>
            <div className="itemTxt txtType rightTxtLeft">理财账户</div>
            <div className="itemTxt txtType rightTxtLeft">赎回</div>
            <div className="itemTxt rightTxt">-200.00</div>
          </div>
        </div>
      </div>

      <Picker
        columns={accountList}
        visible={accountVisible}
        onClose={() => {
          setAccountVisible(false);
        }}
        value={checkAccount}
        onConfirm={(v) => {
          setAccountVisible(v);
        }}
      />

      <Picker
        columns={typeList}
        visible={typeVisible}
        onClose={() => {
          setTypeVisible(false);
        }}
        value={checkType}
        onConfirm={(v) => {
          setTypeVisible(v);
        }}
      />
    </div>
  );
};
export default AssetDetail;
