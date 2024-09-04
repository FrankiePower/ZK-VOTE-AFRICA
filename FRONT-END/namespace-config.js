import { Web3 } from "web3"
import { EnsPlugin, Chain } from "@namespace-ens/web3-plugin-ens"

// Initialize RPC and plugin
const web3 = new Web3("https://sepolia.drpc.org");
web3.registerPlugin(new EnsPlugin(Chain.Sepolia));

// Use plugin
await web3.ens.getAddress("santiagodevrel.eth")
await web3.ens.commit(registrationRequest);
await web3.ens.register(registrationRequest);

web3.eth.accounts.wallet.add('_your_private_key_');

// set and resolve an address for your ENS name
await web3.ens.setAddress('_your_ens_name_', '_your_address_');
await web3.ens.getAddress('_your_ens_name_');