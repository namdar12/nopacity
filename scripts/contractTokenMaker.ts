import * as fs from "fs";

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

//Inputs from user
const tokenName = "HelloWorld";
const tokenSymbol = "HW";
const tokenAmount = 112;
const fileName = "scripts/contractTokenEmpty.txt";

tokenContractMaker(tokenName, tokenSymbol, tokenAmount, fileName);
