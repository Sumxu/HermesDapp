// src/config/EnvConfigProvider.ts

/** 环境配置接口（已去掉 VITE_ 前缀，字段名更友好） */
export interface EnvConfig {
  apiBase: string;
  contractUsdt: string;
  chainId: string;
  rpcUrl: string;
  blockExplorerUrls: string;
  chainName: string;
  multiCallToken: string;
  investment: string;
  prize: string;
  SwapRouter: string;
}

/** 环境配置提供类：集中维护 dev / prod 原始值 */
export default class EnvConfigProvider {
  /** 开发环境配置（测试网） */
  static getDevConfig(): EnvConfig {
    return {
      apiBase: "https://v1.zerolink.top/dapp/",
      SwapRouter: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
      contractUsdt: "0x2Cba653C50e9A2e97411104d1460EBFAECE50E9C",
      investment: "0x1d8118aDa8dcbC792FBbCDf8BeeD82241AE40aeF", //竞猜
      prize: "0x7446c989be40A9a2A4Be81227FCb0e95d1a4C283", //代币地址
      multiCallToken: "0xcA11bde05977b3631167028862bE2a173976CA11",
      chainId: "0x61",
      rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
      blockExplorerUrls: "http://143.92.39.28:9030/api",
      chainName: "BNB Smart Chain Testnet",
    };
  }
  /** 生产环境配置（主网） */
  static getProdConfig(): EnvConfig {
    return {
      apiBase: "https://api.bnbHermes.com/",
      contractUsdt: "0x55d398326f99059fF775485246999027B3197955",
      SwapRouter: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      investment: "0x31C1B07F44C3E12A7A378f3A8D37dfe9c9086028", //竞猜
      prize: "0xD7B9907Ef16C6699443433A58b985f2617BCDE59", //代币地址
      multiCallToken: "0xcA11bde05977b3631167028862bE2a173976CA11",
      chainId: "0x38",
      rpcUrl: "https://bsc.blockrazor.xyz/1915635065170173952",
      blockExplorerUrls: "https://bscscan.com",
      chainName: "BNB Chain",
    };
  }
}
