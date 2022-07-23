import type { NextApiRequest, NextApiResponse } from "next";

import moment from "moment";

import { Turn } from "../../models";
import { db } from "../../database";
import { ITurnForm, ITurnDB } from "../../interface/ITurn";
import { numberDayToString } from "../../helpers/numberDayToString";
import AvailableDays from "../../models/AvailableDays";

type Data = {
  ok: boolean;
  message?: string;
  turn?: ITurnForm;
};

type IListTurns = {
  ok: boolean;
  listTurns?: ITurnDB[];
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "GET":
      return getAllTurns(req, res);
    case "POST":
      return postTurn(req, res);

    default:
      return res.status(400).json({ ok: false, message: "Bad request" });
  }
}

const getAllTurns = async (
  req: NextApiRequest,
  res: NextApiResponse<IListTurns>,
) => {
  try {
    await db.connect();
    const listTurns = await Turn.find();

    await db.disconnect();

    return res.status(200).json({
      ok: true,
      listTurns,
    });
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const getTurnByDate = async (day: Date): Promise<ITurnDB[]> => {
  const turn = await Turn.find({ day: new Date(day) });

  const todayTurns = turn.filter(
    (item) => item.day.toString() === new Date(day).toString(),
  );

  return todayTurns;
};

const postTurn = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { hour, day, name, dni, phone } = JSON.parse(req.body);

  try {
    await db.connect();

    if (!hour) {
      throw new Error("No se selecciono ningún horario");
    }

    if (!name) {
      throw new Error("No se introdujo ningún nombre");
    }

    if (!dni) {
      throw new Error("No se introdujo ningún dni");
    }

    if (!phone) {
      throw new Error("No se introdujo ningún teléfono  de contacto");
    }

    const pickerDate = new Date(moment(day).utc().format("YYYY-MM-DD"));

    const turnInDay = await getTurnByDate(pickerDate);

    const pickerDateToNumber = new Date(day).getDay();
    const pickerDateToString = numberDayToString(pickerDateToNumber);

    const hourAvalive = await AvailableDays.find({ day: pickerDateToString });

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
      message: "El turno se reservo con éxito",
      turn,
    });
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};
