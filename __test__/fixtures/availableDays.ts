import { IDaysHours } from "../../interface/IAvailableDays";

export const responseAvailableDaysFilled: IDaysHours[] = [
  {
    day: "lunes",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },
  {
    day: "martes",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },
  {
    day: "miercoles",
    hours: [
      { time: "12:00" },
      { time: "13:20" },
      { time: "14:30" },
      { time: "15:40" },
    ],
  },
  {
    day: "jueves",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },
  {
    day: "viernes",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },
  {
    day: "sabado",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },
  {
    day: "domingo",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },
];

export const responseAvailableDaysPartialFilled: IDaysHours[] = [
  {
    day: "lunes",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },

  {
    day: "miercoles",
    hours: [
      { time: "12:00" },
      { time: "13:20" },
      { time: "14:30" },
      { time: "15:40" },
    ],
  },

  {
    day: "viernes",
    hours: [
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ],
  },
];

export const responseAvailableDaysUndefined = undefined;

export const responseAvailableDaysEmpty: IDaysHours[] = [];
