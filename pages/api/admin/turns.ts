import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { Turn } from "../../../models";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>, // cambiar el any
) {
  switch (req.method) {
    case "PUT":
      return updateNewTurns(req, res);

    default:
      return res.status(400).json({ ok: false, message: "Bad request" });
  }
}

const updateNewTurns = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  const { id, hour } = JSON.parse(req.body);

  console.log(hour);

  try {
    await db.connect();
    await Turn.findOneAndUpdate({ _id: id }, { hour });
    await db.disconnect();

    res.status(200).json({ ok: true });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
