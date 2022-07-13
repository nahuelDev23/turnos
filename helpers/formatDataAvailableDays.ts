import { IDaysHours, RawAvailableDaysFromDb } from "../interface";

export const formatDataAvailableDays = (
  rawAvailableDaysData: RawAvailableDaysFromDb[],
): IDaysHours[] => {
  return rawAvailableDaysData.map((item: IDaysHours) => ({
    day: item.day,
    hours: item.hours,
  }));
};
