import express from "express";
import Feedback from "../models/feedbackModel.js";
import ExcelJS from "exceljs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // 1. Save new entry to MongoDB
    await Feedback.create(req.body);

    // 2. Fetch ALL MongoDB records
    const allData = await Feedback.find().lean();


    console.log("DB count:", allData.length);
console.log("Sample row:", allData[0]);






    // 3. Initialize workbook + sheet
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Feedback");

    // 4. Excel Columns
    sheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Company", key: "company", width: 20 },
      { header: "Description", key: "description", width: 30 },
      { header: "Feedback", key: "feedback", width: 30 },
      { header: "Rating", key: "rating", width: 10 },
      { header: "Date", key: "createdAt", width: 25 },
    ];

    // 5. Insert ALL rows into Excel
    allData.forEach(item => {
      sheet.addRow({
        name: item.name,
        company: item.company,
        description: item.description,
        feedback: item.feedback,
        rating: item.rating,
        createdAt: item.createdAt.toLocaleString(),
      });
    });


console.log("Sheet row count:", sheet.rowCount);


    // 6. Save file (always overwritten to stay in sync)
    await workbook.xlsx.writeFile("/temp/feedback.xlsx");

    console.log("Excel regenerated with all DB records!");
    res.json({ success: true });

  } catch (err) {
    console.error("Excel Error:", err);
    res.json({ success: false });
  }
});

router.get("/download", async (req, res) => {
  res.download("/tmp/feedback.xlsx");
});



export default router;
