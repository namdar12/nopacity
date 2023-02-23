const fs = require("fs");
const path = require("path");
const { run, ethers } = require("hardhat");
import type { NextApiRequest, NextApiResponse } from "next";

async function compileContracts() {
  // Run the Hardhat task to compile the contracts
  await run("compile");

  // Read the compiled artifacts from the `artifacts` directory
  //const artifactsDir = path.join(__dirname, "artifacts");
  const artifactsDir = "/Users/namdarmesri/Projects/AlchemyBootCamp/nopacity/nopacity/artifacts";
  const files = fs.readdirSync(artifactsDir);
  const contracts = {};
  for (const file of files) {
    const contractName = file.replace(".json", "");
    const contractPath = path.join(artifactsDir, file);
    const contractJson = fs.readFileSync(contractPath);
    contracts[contractName] = JSON.parse(contractJson);
  }

  // Log the compiled contracts
  console.log(contracts);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  compileContracts();
  res.status(200).json({ name: "John Doe" });
}
