import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    dueDate: Date,
    completed: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);