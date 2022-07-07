// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Turn } from "../../models";
import { db } from "../../database";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "POST":
      return postTurn(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getTurnByDate = async (day: Date) => {
  const turn = await Turn.find({ day });

  return turn;
};
const postTurn = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { hour } = JSON.parse(req.body);

  try {
    await db.connect();
    const hourAvalive = ["10:00:00", "12:00:00", "14:00:00"];

    const turnInDay = await getTurnByDate(req.body.day);

    if (turnInDay.length === hourAvalive.length) {
      console.log(turnInDay.length);

      throw new Error("No hay mas turnos disponibles ese dia");
    }

    const hourAlreadyToken = turnInDay.some((item) => item.hour.includes(hour));

    if (hourAlreadyToken) {
      throw new Error("Ese horario ya fue tomado para este dia");
    }

    // console.log(turnInDay);
    const turn = new Turn(JSON.parse(req.body));

    await turn.save();

    await db.disconnect();

    return res.status(200).json({
      message: "El turno se reservo con exito",
      // turn,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
