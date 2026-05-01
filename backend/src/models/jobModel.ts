import mongoose, { Document, Schema } from "mongoose";

export interface Ijob extends Document {
  title: string;
  company: string;
  salary?: number;
  notes?: string;
  location?: string;
  status: "applied" | "interview" | "offer" | "rejected";
  jobLink?: string;
  user: mongoose.Types.ObjectId;
  appliedAt: Date;
}

const jobSchema = new Schema<Ijob>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    notes: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      default: "applied",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Job = mongoose.model<Ijob>("Job", jobSchema);
export default Job;
