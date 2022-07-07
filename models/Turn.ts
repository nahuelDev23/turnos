import mongoose, { Schema, model, Model } from "mongoose";

import { ITurnDB } from "../interface";

const turnSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    hour: { type: String, required: true },
    dni: { type: String, required: true },
    day: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

turnSchema.index({ phone: "text", day: "text", hour: "text", dni: "text" });

const Turn: Model<ITurnDB> = mongoose.models.Turn || model("Turn", turnSchema);

export default Turn;
