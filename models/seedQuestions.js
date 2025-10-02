import { questions } from "./data.js";
import { Questions } from "./Questions.js";

export const seedQuestions = async () => {
  try {
    const count = await Questions.countDocuments();
    if (count === 0) {
      await Questions.insertMany(questions);
      console.log(" Questions seeded successfully");
    } else {
      console.log("Questions already exist, skipping seeding");
    }
  } catch (err) {
    console.error(" Error seeding questions:", err);
  }
};