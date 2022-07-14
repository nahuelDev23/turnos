import { useMemo, useState } from "react";

import { daysString, IDaysHours } from "../interface";

export const useMultipleInputs = (text: daysString) => {
  const [formAvailableDays, setFormAvailableDays] = useState<IDaysHours>({
    day: text,
    hours: [{ time: "" }],
  });

  const addStep = () => {
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

  const handleChangeStep = (e: any, i: number) => {
    const values = { ...formAvailableDays };

    values.hours[i].time = e.target.value;
    setFormAvailableDays(values);
  };

  const isPreviousInputEmpty = useMemo(() => {
    // todo esto no hace lo que dice
    // is current filled podría ser
    const first =
      formAvailableDays.hours.length === 1 &&
      formAvailableDays.hours[0].time === "";
    const second =
      formAvailableDays.hours.length > 1 &&
      formAvailableDays.hours[formAvailableDays.hours.length - 1].time === "";

    return first || second;
  }, [formAvailableDays]);

  return {
    // values

    isPreviousInputEmpty,
    // methods
    addStep,
    deleteStep,
    formAvailableDays,
    handleChangeStep,
    setFormAvailableDays,
  };
};
