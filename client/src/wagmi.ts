import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
  lisk,
  liskSepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'c59e86f04bdb6a22343b9337956b2368',
  chains: [
    sepolia,
    lisk,
    liskSepolia,
  ],
  ssr: true,
});