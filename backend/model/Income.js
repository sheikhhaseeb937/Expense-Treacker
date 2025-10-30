import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the User model
      required: true,
    },
    
        icon:{
            type:String,
        },
    
    source: {
      type: String,
required:true,
    },
    amount: {
      type: Number,
      required: true,
    
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


const Income = mongoose.model("Income", IncomeSchema);
export default Income;
