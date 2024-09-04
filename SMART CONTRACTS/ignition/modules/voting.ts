import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("ZKVoteAfrica", (m) => {
  const lock = m.contract("Lock");

  return { lock };
});

export default LockModule;
