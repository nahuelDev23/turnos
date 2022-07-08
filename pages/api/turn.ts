import type { NextApiRequest, NextApiResponse } from "next";

import moment from "moment";

import { Turn } from "../../models";
import { db } from "../../database";
import { ITurnForm } from "../../interface/ITurn";
type Data = {
  ok: boolean;
  message: string;
  turn?: ITurnForm;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "POST":
      return postTurn(req, res);

    default:
      return res.status(400).json({ ok: false, message: "Bad request" });
  }
}

const getTurnByDate = async (day: Date) => {
  const turn = await Turn.find({ day: new Date(day) });

  const x = turn.filter(
    (item) => item.day.toString() === new Date(day).toString(),
  );

  return x;
};
const postTurn = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { hour, day } = JSON.parse(req.body);

  try {
    await db.connect();
    const hourAvalive = ["10:00:00", "12:00:00", "14:00:00"];

    const pickerDate = new Date(moment(day).utc().format("YYYY-MM-DD"));

    const turnInDay = await getTurnByDate(pickerDate);

    if (turnInDay.length === hourAvalive.length) {
      throw new Error("No hay mas turnos disponibles ese dia");
    }

    const hourAlreadyToken = turnInDay.some((item) => item.hour.includes(hour));

    if (hourAlreadyToken) {
      throw new Error("Ese horario ya fue tomado para este dia");
    }

    const turn = new Turn(JSON.parse(req.body));

    turn.day = pickerDate;
    await turn.save();

    await db.disconnect();

    return res.status(200).json({
      ok: true,
      message: "El turno se reservo con exito",
      turn,
    });
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};
