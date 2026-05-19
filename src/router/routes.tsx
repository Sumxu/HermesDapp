import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Home = lazy(() => import("@/pages/Home/index"));
const FirstPage = lazy(() => import("@/pages/FirstPage/index"));
const ABoutUs = lazy(() => import("@/pages/OtherPage/AboutUs/index"));
const Community = lazy(() => import("@/pages/OtherPage/Community/index"));
const Chfp = lazy(() => import("@/pages/Chfp/index"));
const EarningsList = lazy(() => import("@/pages/Chfp/list/index"));
const Nft = lazy(() => import("@/pages/Nft/index"));
const AssetDetail = lazy(() => import("@/pages/Asset/AssetDetail/index"));
const Asset = lazy(() => import("@/pages/Asset/index"));
const FlashExchange = lazy(() => import("@/pages/FlashExchange/index"));
const Hash = lazy(() => import("@/pages/Hash/index"));
const GameRule = lazy(() => import("@/pages/Hash/GameRule/index"));
const JoinList = lazy(() => import("@/pages/Hash/JoinList/index"));
export const routes = [
  { path: "/", element: <Navigate to="/FirstPage" replace /> },
  { path: "/FirstPage", element: <FirstPage /> },
  { path: "/Home", element: <Home /> },
  { path: "/ABoutUs", element: <ABoutUs /> },
  { path: "/Chfp", element: <Chfp /> },
  { path: "/EarningsList", element: <EarningsList /> },
  { path: "/Nft", element: <Nft /> },
  { path: "/AssetDetail", element: <AssetDetail /> },
  { path: "/Asset", element: <Asset /> },
  { path: "/Community", element: <Community /> },
  { path: "/FlashExchange", element: <FlashExchange /> },
  { path: "/Hash", element: <Hash /> },
  { path: "/GameRule", element: <GameRule /> },
  { path: "/JoinList", element: <JoinList /> },
];
