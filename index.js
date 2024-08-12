require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res, next) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  if (!req.file) {
    res.status(400).json({ error: "please upload a file" });
    next();
  }

  const { originalname, mimetype, size } = req.file;

  res.status(200).json({ name: originalname, type: mimetype, size });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
