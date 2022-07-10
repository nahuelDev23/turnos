import { useMemo, useState, useEffect } from "react";

import { IAvailableHours, IDaysHours } from "../interface";

export const useMultipleInputs = (initialState: IDaysHours) => {
  const [formAvailableDays, setFormAvailableDays] =
    useState<IDaysHours>(initialState);

  const [haveAtLastOneTime, setHaveAtLastOneTime] = useState(false);

  const addStep = () => {
    const values = { ...formAvailableDays };

    console.log("click add step");

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

  const setDayAvailable = () => {
    setHaveAtLastOneTime((isAvailable) => !isAvailable);
    setFormAvailableDays(initialState);
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

  useEffect(() => {
    const hasAtLastOneTimeSetted = formAvailableDays.hours.some(
      (item: IAvailableHours) => item.time !== "",
    );

    setHaveAtLastOneTime(hasAtLastOneTimeSetted);
    setFormAvailableDays(initialState);
  }, [initialState]);

  return {
    // values
    haveAtLastOneTime,
    isPreviousInputEmpty,
    // methods
    addStep,
    deleteStep,
    formAvailableDays,
    handleChangeStep,
    setDayAvailable,
  };
};
