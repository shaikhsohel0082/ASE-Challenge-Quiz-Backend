import mongoose from "mongoose";
const questionSchema=new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String},
    questionType:{type:String,required:true},
    options:
       [
        {
            key:{type:String,required:true},
            value:{type:String,required:true},
            image:{type:String},
        }
       ]
    ,
    correctOption:{type:String,required:true}
});

export const Questions=mongoose.model("Questions",questionSchema);
