const express = require("express");
const xlsx = require("xlsx");
const fs = require("fs");
const app = express();

const wb = xlsx.readFile("./data.xlsx", { dateNF: "mm/dd/yyyy" });

const ws = wb.Sheets["products"];

const data = xlsx.utils.sheet_to_json(ws, { raw: false });

let newData = data.map((ele) => {
  if (ele.paid === "TRUE") {
    ele.paid = true;
  }
  if (ele.paid === "FALSE") {
    ele.paid = false;
  }
  return ele;
});

fs.writeFileSync("./datajson.json", JSON.stringify(newData, null, 2));

app.get("/", (req, res) => {
  res.send("./datajson.json");
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});

// your code

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
