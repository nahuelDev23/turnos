import { IDaysHours } from "../interface/IAvailableDays";

import { stringDayToNumber } from "./stringDayToNumber";

const hardCodedDays: string[] = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

export const turnOffDaysInCalendarNumberFormat = (
  availableDays: IDaysHours[],
) => {
  const bodyDay = availableDays.map((item: any) => item.day);
  const dayToDelete = hardCodedDays.filter((v) => !bodyDay.includes(v));
  const dayToNumber = [];

  for (const dayInString of dayToDelete) {
    dayToNumber.push(stringDayToNumber(dayInString));
  }

  return dayToNumber;
};
