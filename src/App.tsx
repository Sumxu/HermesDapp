import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import EnvManager from "@/config/EnvManager";
import AppRouter from "@/router";
import { userAddress } from "@/Store/Store";
import { listenWalletEvents } from "@/Hooks/WalletHooks";
import { storage } from "@/Hooks/useLocalStorage";
import FirstPage from "@/pages/FirstPage";
EnvManager.print();

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAddress } = userAddress.getState();
  const checkWallet = async () => {
    storage.set("sign", null);
    storage.set("address", null);
    listenWalletEvents(navigate);
    navigate("/home");
  };
  useEffect(() => {
    checkWallet();
    // 只注册一次全局监听
  }, []);
  return (
    <div className="app">
      <div className="body">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
