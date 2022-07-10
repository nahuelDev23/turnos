import { useMemo, useState } from "react";

import { IDaysHours } from "../interface";

export const useMultipleInputs = (initialState: IDaysHours) => {
  const [formAvailableDays, setFormAvailableDays] = useState<any>(initialState);

  const addStep = (e: any) => {
    const values = { ...formAvailableDays };

    values.hours.push({
      time: "",
    });
    setFormAvailableDays(values);
  };

  const deleteStep = (i: number) => {
    const values = { ...formAvailableDays };

    values.hours.splice(i, 1);
    setFormAvailableDays(values);
  };

  const isPreviousInputEmpty = useMemo(() => {
    const first =
      formAvailableDays.hours.length === 1 &&
      formAvailableDays.hours[0].time === "";
    const second =
      formAvailableDays.hours.length > 1 &&
      formAvailableDays.hours[formAvailableDays.hours.length - 1].time === "";

    return first || second;
  }, [formAvailableDays]);

  return {
    addStep,
    deleteStep,
    formAvailableDays,
    isPreviousInputEmpty,
  };
};
