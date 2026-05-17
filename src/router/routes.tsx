import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Home = lazy(() => import("@/pages/Home/index"));
const FirstPage = lazy(() => import("@/pages/FirstPage/index"));
const ABoutUs = lazy(() => import("@/pages/OtherPage/AboutUs/index"));
const Chfp = lazy(() => import("@/pages/Chfp/index"));
const EarningsList = lazy(() => import("@/pages/Chfp/list/index"));
const Nft = lazy(() => import("@/pages/Nft/index"));
export const routes = [
  { path: "/", element: <Navigate to="/FirstPage" replace /> },
  { path: "/FirstPage", element: <FirstPage /> },
  { path: "/Home", element: <Home /> },
  { path: "/ABoutUs", element: <ABoutUs /> },
  { path: "/Chfp", element: <Chfp /> },
  { path: "/EarningsList", element: <EarningsList /> },
  { path: "/Nft", element: <Nft /> },
];
