import { ethers } from "ethers";

const CONTRACT_ABI = [
  "function registerKnowledge(string memory contentHash, string memory title) public",
  "function getKnowledge(string memory contentHash) public view returns (string memory title, address contributor, uint256 timestamp)",
  "event KnowledgeRegistered(string contentHash, string title, address indexed contributor, uint256 timestamp)",
];

export async function registerKnowledgeOnChain(
  hash: string,
  title: string
): Promise<string | null> {
  const rpcUrl = process.env.RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (
    !rpcUrl ||
    !privateKey ||
    !contractAddress ||
    privateKey === "your-private-key-here" ||
    contractAddress === "0x0000000000000000000000000000000000000000"
  ) {
    console.warn(
      "Blockchain env vars not configured – skipping on-chain registration."
    );
    return null;
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet);

  const tx = await contract.registerKnowledge(hash, title);
  const receipt = await tx.wait();
  return receipt.hash as string;
}
