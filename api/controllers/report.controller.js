import Report from "../models/report.model";

export const getReport = async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
};

export const getReportByID = async (req, res) => {
  const report = await Report.findById(req.params.id);
  res.json(report);
};

export const createReport = async (req, res) => {
  const report = new Report(req.body);
  await report.save();
  res.json(report);
};

export const updateReport = async (req, res) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body);
  res.json(report);
};

export const deleteReport = async (req, res) => {
  await Report.findByIdAndDelete(req.params.id);
  res.json({ message: "Report deleted" });
};

export const recognizeImage = async (req, res) => {
  try {
    // Get the report with the image
    const report = await Report.findById(req.params.id);
    if (!report || !report.image) {
      return res.status(404).json({ message: "Report or image not found" });
    }

    // Configure the model API request
    const modelAPIConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MODEL_API_KEY}`
      },
      body: JSON.stringify({
        image: report.image
      })
    };

    // Call the model API for image recognition
    const response = await fetch(process.env.MODEL_API_URL, modelAPIConfig);
    if (!response.ok) {
      throw new Error('Image recognition failed');
    }

    const result = await response.json();

    // Update report with recognition results
    report.recognitionResults = result;
    await report.save();

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      message: "Error processing image recognition",
      error: error.message 
    });
  }
};
