import { Questions } from "../models/Questions.js";
export const addQuestion = async (req, res) => {
  try {
    const data = req.body;
    let que;
    if (Array.isArray(data)) {
      que = await Questions.insertMany(data);
    } else {
      const newQues = new Questions(req.body);
      que = await newQues.save();
    }

    res.status(201).json(que);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    const questionsWithoutAnswer = questions.map((que) => ({
      id: que._id,
      title: que.title,
      options: que.options,
      image: que.image,
    }));
    res.status(200).json(questionsWithoutAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScore = async (req, res) => {
  try {
    const attemptedQuestions = req.body;
    let details = [];
    let score = 0;

    const totalQuestions = await Questions.countDocuments();
    const allQuestions = await Questions.find(
      {},
      "_id title options correctOption"
    );

    const attemptedIds = attemptedQuestions.map((attempt) =>
      attempt.id?.toString()
    );

    if (Array.isArray(attemptedQuestions)) {
      for (let attempt of attemptedQuestions) {
        const question = await Questions.findById(attempt.id);
        if (!question) continue;

        const isCorrect = question.correctOption === attempt.selectedOption;
        if (isCorrect) {
          score++;
        }

        details.push({
          questionId: question._id,
          title: question.title,
          selectedOption: attempt.selectedOption,
          correctOption: question.correctOption,
          options: question.options,
          isCorrect,
        });
      }
    }

    // Find unattempted questions
    const unAttemptedQuestions = allQuestions.filter(
      (q) => !attemptedIds.includes(q._id.toString())
    );

    // Add unattempted into details
    const finalDetails = [
      ...details,
      ...unAttemptedQuestions.map((q) => ({
        questionId: q._id,
        title: q.title,
        selectedOption: null,
        correctOption: q.correctOption,
        options: q.options,
        isCorrect: false,
        unattempted: true, 
      })),
    ];

    res.status(200).json({
      score,
      totalQuestions,
      details: finalDetails,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

