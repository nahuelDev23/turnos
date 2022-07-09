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
    case "GET":
      return getDays(req, res);

    default:
      return res.status(400).json({ ok: false, message: "Bad request" });
  }
}

const getDays = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const days = await AvailableDays.find();

    await db.disconnect();

    return res.status(200).json({ days });
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const postAvailableDays = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  try {
    await db.connect();

    const filter = JSON.parse(req.body).filter(
      (item: IDaysHours) => item.hours[0].time !== "" && item.hours.length >= 1,
    );

    const bodyDay = filter.map((item: any) => item.day);

    const dayToDelete = hardCodedDays.filter((v) => !bodyDay.includes(v));

    dayToDelete.forEach(async (day) => {
      await AvailableDays.findOneAndDelete({ day });
    });

    filter.forEach(async (element: any) => {
      await AvailableDays.findOneAndUpdate({ day: element.day }, element, {
        upsert: true,
      });
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
