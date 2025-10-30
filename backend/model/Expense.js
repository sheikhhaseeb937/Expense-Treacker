import mongoose from "mongoose";

const ExpenseScheme = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the User model
      required: true,
    },
    
        icon:{
            type:String,
        },
    
    category: {
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


const Expense = mongoose.model("expense", ExpenseScheme);
export default Expense;
