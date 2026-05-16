import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import EnvManager from "@/config/EnvManager";
import AppRouter from "@/router";
import { userAddress } from "@/Store/Store";
import { storage } from "@/Hooks/useLocalStorage";
import FirstPage from "@/pages/FirstPage";
EnvManager.print();

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAddress } = userAddress.getState();
  useEffect(() => {}, []); // 推荐依赖 checkWallet（因为它是 useCallback）
  return (
    <div className="app">
      <div className="body">
        <AppRouter />
        {/* <FirstPage /> */}
      </div>
    </div>
  );
}

export default App;
