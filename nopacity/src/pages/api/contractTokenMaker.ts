import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  output: string;
};

function tokenContractMaker(
  tokenName: string,
  tokenSymbol: string,
  tokenAmount: number,
  fileName: string
) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const updatedData = data
      .replace("${tokenName}", tokenName)
      .replace('"${tokenName}"', `"${tokenName}"`)
      .replace('"${tokenName}"', `"${tokenName}"`)
      .replace('"${tokenSymbol}"', `"${tokenSymbol}"`)
      .replace("${tokenAmount}", tokenAmount.toString());

    const newFileName = `contracts/${tokenName}.sol`;

    fs.writeFile(newFileName, updatedData, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File saved successfully!");
    });
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email, message } = req.body;
  console.log("HERE");
  console.log("here " + name);
  console.log(email);
  console.log(message);

  // const tokenName = "HelloToken555";
  // const tokenSymbol = "HW";
  // const tokenAmount = 112;
  // const fileName = "emptyContracts/contractTokenEmpty.txt";
  // tokenContractMaker(tokenName, tokenSymbol, tokenAmount, fileName);
  // res.status(200).json({ name: "John Doe" });
}
