import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../database";
import { getAvailableDays } from "../../database/dbAvailableDays";
import { IDaysHours } from "../../interface/";
import { AvailableDays } from "../../models/";

type Data = {
  ok: boolean;
  message: string;
  availableDays?: IDaysHours;
};

const hardCodedDays: string[] = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "POST":
      return postAvailableDays(req, res);

    default:
      return res.status(400).json({ ok: false, message: "Bad request" });
  }
}

const postAvailableDays = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  try {
    await db.connect();

    // si req.body es vacio borro todo
    const bodyDay = JSON.parse(req.body).map((item) => item.day);

    const dayToDelete = hardCodedDays.filter((v) => !bodyDay.includes(v));

    dayToDelete.forEach(async (day) => {
      await AvailableDays.findOneAndDelete({ day });
    });

    JSON.parse(req.body).forEach(async (element: any) => {
      const availableDays = new AvailableDays(element);

      await availableDays.save();
    });

    await db.disconnect();

    return res.status(200).json({
      ok: true,
      message: "El turno se configuro con exito",
      // availableDays,
    });
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};
