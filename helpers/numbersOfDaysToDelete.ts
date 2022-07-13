import { IDaysHours } from "../interface/IAvailableDays";

import { stringDayToNumber } from "./stringDayToNumber";

const WEEKDAYS: string[] = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

export const numbersOfDaysToDelete = (
  availableDays: IDaysHours[],
): number[] => {
  const namesAvailableDays: string[] | [] = availableDays.map(
    (item: IDaysHours) => item.day,
  );

  const dayNamesToDelete: string[] | [] = WEEKDAYS.filter(
    (day) => !namesAvailableDays.includes(day),
  );

  const daysNumberToDelete: number[] = [];

  for (const dayInString of dayNamesToDelete) {
    daysNumberToDelete.push(stringDayToNumber(dayInString));
  }

  return daysNumberToDelete;
};
