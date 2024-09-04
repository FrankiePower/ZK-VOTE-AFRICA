import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ZKVotingModule = buildModule("ZKVotingModule", (m) => {
    const zkvoting = m.contract("ZKVoting");

    return { zkvoting };
});

export default ZKVotingModule;
