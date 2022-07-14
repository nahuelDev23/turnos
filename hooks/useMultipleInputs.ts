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

  const isSomeInputEmpty = useMemo(() => {
    return formAvailableDays.hours.some((item) => item.time === "");
  }, [formAvailableDays]);

  return {
    // values

    isSomeInputEmpty,
    // methods
    addStep,
    deleteStep,
    formAvailableDays,
    handleChangeStep,
    setFormAvailableDays,
  };
};
