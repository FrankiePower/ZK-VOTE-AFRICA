const { Chain, EnsPlugin } = require("@namespace-ens/web3-plugin-ens");
import { Web3 } from "web3";
import { useMemo } from "react";
import type { Chain as ChainType, Client, Transport } from "viem";
import { type Config, useClient, useConnectorClient } from "wagmi";
const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

web3.registerPlugin(new EnsPlugin(Chain.Sepolia));

// web3.eth.accounts.wallet.add("PRIVATE_KEY");

export async function verifyEns(ensName: string) {
  try {
    const address = await getAddress(ensName);
    const otherRecords = await getTextRecords(ensName);
    return { address, details: otherRecords };
  } catch (error) {
    console.error("An error occured:", error);
    return { error };
  }
}

export async function getAddress(ensName: string) {
  try {
    const address = await web3.ens.getAddress(ensName);
    console.log("getting address");
    console.log(address);
    return address;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getTextRecords(ensName: string) {
  try {
    const textRecords = await web3.ens.getTextRecords(ensName, [
      "email",
      "name",
      "avatar",
    ]);
    console.log("getting records");
    console.log(textRecords);
    return textRecords;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export function clientToWeb3js(client?: Client<Transport, ChainType>) {
  if (!client) {
    return new Web3();
  }

  const { transport } = client;

  if (transport.type === "fallback") {
    return new Web3(transport.transports[0].value.url);
  }
  return new Web3(transport);
}

/** Action to convert a viem Client to a web3.js Instance. */
export function useWeb3js({ chainId }: { chainId?: number } = {}) {
  const client = useClient<Config>({ chainId });
  return useMemo(() => clientToWeb3js(client), [client]);
}

/** Action to convert a viem ConnectorClient to a web3.js Instance. */
export function useWeb3jsSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => clientToWeb3js(client), [client]);
}
