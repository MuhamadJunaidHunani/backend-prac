const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

const dataFilePath = path.join(__dirname, "data.json");
const todoFilePath = path.join(__dirname, "users.json");
app.post("/profile", (req, res) => {
  const data = req.body;

  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving data" });
    }
    res.status(200).json({ message: "Data saved successfully" });
  });
  res.status(200).json(data);
});

app.post("/register", (req, res) => {
  const newData = req.body;

  fs.readFile(todoFilePath, "utf8", (err, fileContent) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).json({ message: "Error reading data" });
    }

    let existingData = { data: [] };
    if (fileContent) {
      try {
        existingData.data = JSON.parse(fileContent.data);
      } catch (parseErr) {
        return res.status(500).json({ message: "Error parsing data" } );
      }
    }

    existingData.data?.push(newData);

    fs.writeFile(
      todoFilePath,
      JSON.stringify(existingData, null, 2),
      (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ message: "Error saving data" });
        }
        res.status(200).json({ message: "Data saved successfully" });
      }
    );
  });
});

app.get("/get-data", (req, res) => {
  fs.readFile(dataFilePath, "utf-8", (err, fileData) => {
    if (err) {
      return res.status(500).json({ message: "No data found" });
    }

    res.status(200).json(JSON.parse(fileData));
  });
});

app.listen("4000", () => {
  console.log("server is listening on http://localhost:4000");
});
