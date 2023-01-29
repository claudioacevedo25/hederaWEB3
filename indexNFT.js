import {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenType,
  Hbar,
  TokenMintTransaction,
  TokenSupplyType,
} from "@hashgraph/sdk";
import CID from "./cid.js";
import dotenv from "dotenv";
dotenv.config();
//   console.clear();

// Configure accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const treasuryId = AccountId.fromString(process.env.TREASURY_ID);
const treasuryKey = PrivateKey.fromString(process.env.TREASURY_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);
client.setDefaultMaxTransactionFee(new Hbar(100));
client.setMaxQueryPayment(new Hbar(50));

const supplyKey = PrivateKey.generateED25519();
//

async function main() {
  // CREATE FUNGIBLE TOKEN
  const nftCreateTx = new TokenCreateTransaction()
    .setTokenName("CARBON OFFSETS")
    .setTokenSymbol("CO2OFF")
    .setTokenType(TokenType.NonFungibleUnique)
    .setTreasuryAccountId(treasuryId)
    .setInitialSupply(0)
    .setMaxSupply(10000)
    .setSupplyType(TokenSupplyType.Finite)
    .setSupplyKey(supplyKey)
    .freezeWith(client);
  const nftCreateSign = await nftCreateTx.sign(treasuryKey);
  const nftCreateSubmit = await nftCreateSign.execute(client);
  const nftCreateRx = await nftCreateSubmit.getReceipt(client);
  const tokenId = nftCreateRx.tokenId;

  console.log(`- Creamos NFT con Token ID: ${tokenId} \n`);

  // MINT NEW BATCH OF NFTs
  const mintTx = new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata(CID) //Batch minting - UP TO 10 NFTs in single tx
    .freezeWith(client);
  const mintSign = await mintTx.sign(supplyKey);
  const mintSubmit = await mintSign.execute(client);
  const mintRx = await mintSubmit.getReceipt(client);

  console.log(
    `- Ver detalles en network explorer: https://hashscan.io/testnet/token/${tokenId} \n`
  );
}

main();
