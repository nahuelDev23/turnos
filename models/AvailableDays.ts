import mongoose, { Schema, model, Model } from "mongoose";

import { IDaysHours } from "../interface/IAvailableDays";

const availableDaysSchema = new Schema(
  {
    day: { type: String, required: true, unique: true },
    hours: [{ type: Object, required: true, trim: true }],
  },
  {
    timestamps: true,
  },
);

availableDaysSchema.index({
  day: "text",
  hours: "text",
});

const AvailableDays: Model<IDaysHours> =
  mongoose.models.AvailableDays || model("AvailableDays", availableDaysSchema);

export default AvailableDays;
