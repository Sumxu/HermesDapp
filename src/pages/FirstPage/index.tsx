import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import LogoIcon from "@/assets/Basic/LogoIcon.png";
const FirstPage: React.FC = () => {
   const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
        navigate('/home')
    },2000);
  }, []);
  return (
    <div className="FirstPage">
      <div className="contentBg">
        <img className="logoIcon" src={LogoIcon}></img>
      </div>
      <div className="fixedBottom">构建一个智能的 Web3 经济生态系统</div>
    </div>
  );
};
export default FirstPage;
