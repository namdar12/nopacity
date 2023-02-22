import * as fs from "fs";

function convertTimeToSeconds(duration: string, timeInput: number) {
  const unitsInSeconds: { [key: string]: number } = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000, // average number of seconds in a 30-day month
    year: 31536000, // average number of seconds in a 365-day year
  };

  const time = (unitsInSeconds[duration] * timeInput) / 12;

  return time;
}

function contractOutput(
  governorName: string,
  timeInput: number,
  periodInput: string,
  time: number,
  fileName: string
) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const updatedData = data
      .replace("${governorName}", governorName)
      .replace('"${governorName}"', `"${governorName}"`)
      .replace("${timeInput}", timeInput)
      .replace("${periodInput}", periodInput)
      .replace("${time}", time.toString());

    const newFileName = `contracts/${governorName}.sol`;

    fs.writeFile(newFileName, updatedData, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File saved successfully!");
    });
  });
}

//Inputs that would come from the user
const governorName = "HelloGovernor2";
const timeInput = 1;
const periodInput = "week";
const time = convertTimeToSeconds(periodInput, timeInput);
const fileName = "scripts/contractGovernanceEmpty.txt";

contractOutput(governorName, timeInput, periodInput, time, fileName);
