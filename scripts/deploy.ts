import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KnowledgeRegistryModule = buildModule("KnowledgeRegistryModule", (m) => {
  const knowledgeRegistry = m.contract("KnowledgeRegistry");
  return { knowledgeRegistry };
});

export default KnowledgeRegistryModule;
