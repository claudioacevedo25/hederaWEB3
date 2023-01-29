import {
  Client,
  AccountId,
  PrivateKey,
  Hbar,
  ContractCreateFlow,
  ContractExecuteTransaction,
} from "@hashgraph/sdk";
import counterContract from "./contracts/Counter.js";
import dotenv from "dotenv";
dotenv.config();
console.clear();

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);
client.setDefaultMaxTransactionFee(new Hbar(100));
client.setMaxQueryPayment(new Hbar(50));

async function main() {
  // STEP 1 ===================================
  console.log(`\nSTEP 1===================================\n`);
  console.log(`- Deploying contract ...\n`);

  // Deploy the contract (counter)

  // STEP 2 ===================================
  console.log(`\nSTEP 2 ===================================\n`);
  console.log(`- Ejecutando funcion del contrato ...\n`);

  //

  console.log(`
  ====================================================
  🎉🎉 THE END - NOW JOIN: https://hedera.com/discord
  ====================================================\n`);
}
main();
