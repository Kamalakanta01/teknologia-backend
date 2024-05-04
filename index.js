
const express = require("express");
const bcrypt = require('bcrypt');
const { connection } = require("./connection");
require('dotenv').config()
const { DataModel } = require("./models/Data.Model")
const multer = require('multer');
const { memoryStorage } = require('multer')
const storage = memoryStorage()
const upload = multer({ storage })
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors())

app.get("/", async(req, res) => {
 res.json("welcome")
});


const ITEMS_PER_PAGE = 5; // Define the number of items to show per page

app.get("/data", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query string, default to 1
    const skip = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of documents to skip

    const totalCount = await DataModel.countDocuments(); // Get the total number of documents
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE); // Calculate the total number of pages

    const allData = await DataModel.find()
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    res.json({
      data: allData,
      currentPage: page,
      totalPages,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
  


app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const { name, password } = req.body;
    const fileBuffer = req.file.buffer; // Uploaded file buffer

    // Check if a document with the same file content already exists
    const existingData = await DataModel.findOne({ file: fileBuffer });

    if (existingData) {
      return res.status(400).json({ error: "Duplicate resume detected" });
    }

    const hash = bcrypt.hashSync(password, 6);
    const newData = new DataModel({ name, file: fileBuffer, password: hash });
    const savedData = await newData.save();

    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({ error: "Failed to upload resume" });
  }
});

  app.delete("/data/:id", async (req, res) => {
    try {
      const deletedData = await DataModel.findByIdAndDelete(req.params.id);
      if (!deletedData) {
        return res.status(404).json({ error: "Data not found" });
      }
      res.json(deletedData);
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  });

const PORT=8080;
app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log("connection established with db");
  } catch(err) {
    console.log("error in connection");
    console.log(err)
  }
  console.log(`listening on ${PORT}`);
});

//-------------------------------------------------------------->

