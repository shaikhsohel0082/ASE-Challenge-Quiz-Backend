import express from "express";
import { addQuestion,getAllQuestions, getScore } from "../controller/questionController.js";
const questionroutes=express.Router();
questionroutes.post("/addQuestion",addQuestion);
questionroutes.get("/getAllQuestions",getAllQuestions);
questionroutes.post("/getScore",getScore)
export default questionroutes;