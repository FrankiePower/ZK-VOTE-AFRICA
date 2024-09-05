"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!ready) {
          return null;
        }

        if (!connected) {
          return (
            <button onClick={openConnectModal} type="button" className='bg-primary-green text-white py-2 px-5 rounded-lg'>
              Connect Wallet
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button onClick={openChainModal} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <button
            onClick={openAccountModal}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1B7339',
              border: 'none',
              cursor: 'pointer',
            }}

            className='bg-primary-green text-white py-2 px-5 rounded-lg'
          >
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
