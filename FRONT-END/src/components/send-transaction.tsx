import {mainnet, sepolia} from 'wagmi/chains'
import {useAccount, useConnect} from "wagmi";
import {useWeb3jsSigner} from "@/lib";
import {useEffect} from "react";
import {ConnectButton} from '@rainbow-me/rainbowkit';

function SendTransaction() {
    const account = useAccount()
    const {connectors, connect,} = useConnect()
    const web3js = useWeb3jsSigner({chainId: sepolia.id})

    useEffect(() => {
        if (account && account.address) {
            web3js.eth.sendTransaction({
                from: account.address,
                to: '0x', // some address
                value: '0x1' // set your value
            }).then(console.log).catch(console.error)
        }
    }, [account])

    return (
        <>
            {connectors.map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({connector})}
                    type="button"
                    className="bg-primary-green py-2 px-6"
                >
                    {connector.name}
                </button>
            ))}
            <ConnectButton/>
        </>
    )
}

export default SendTransaction