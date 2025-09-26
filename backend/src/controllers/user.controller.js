import SupportModel from "../models/support.model.js";

export const createSupportTicket = async (req, res) => {
  const { fullName, email, subject, issue } = req.body;

  try {
    if (!fullName || !email || !subject || !issue) {
      return res.status(400).json({
        message: "All fields (fullName, email, subject, issue) are required",
      });
    }

    const support = await SupportModel.create({
      fullName,
      email,
      subject,
      issue,
    });

    return res.status(201).json({
      message: "Support ticket created successfully",
      support,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error while creating support ticket: ${error.message}`,
    });
  }
};


