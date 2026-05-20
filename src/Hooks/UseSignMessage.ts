import { useCallback } from "react";
import { ethers } from "ethers";
import { message as antdMessage } from "antd";

export const UseSignMessage = () => {
  const signMessage = useCallback(
    async (msg: string): Promise<string | null> => {
      if (!window.ethereum) {
        antdMessage.error("请先安装 MetaMask");
        return null;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();

        const address = await signer.getAddress();

        // ✅ 推荐方式
        const signature = await signer.signMessage(msg);

        // ✅ ethers v6 验证
        const recovered = ethers.verifyMessage(msg, signature);

        console.log("签名地址:", recovered);
        console.log("钱包地址:", address);

        if (recovered.toLowerCase() !== address.toLowerCase()) {
          antdMessage.error("签名验证失败");
          return null;
        }

        return signature;
      } catch (error: any) {
        console.error(error);

        if (error.code === 4001) {
          antdMessage.warning("用户取消签名");
        } else {
          antdMessage.error("签名失败");
        }

        return null;
      }
    },
    [],
  );

  return { signMessage };
};