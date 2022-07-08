import { ITurnDB } from "../interface";
import { Turn } from "../models";

import { db } from ".";

export const getAllTurns = async (): Promise<ITurnDB[]> => {
  await db.connect();

  const turns = await Turn.find().sort({ createdAt: "desc" }).lean();

  await db.disconnect();

  return JSON.parse(JSON.stringify(turns));
};
