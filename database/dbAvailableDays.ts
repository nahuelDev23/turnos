import { IDaysHours } from "../interface";
import AvailableDays from "../models/AvailableDays";

import { db } from ".";

export const getAvailableDays = async (): Promise<IDaysHours[]> => {
  await db.connect();

  const availableDays = await AvailableDays.find()
    .sort({ createdAt: "desc" })
    .lean();

  // console.log(availableDays);

  await db.disconnect();

  return JSON.parse(JSON.stringify(availableDays));
};
