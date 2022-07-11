import { useMemo, useState, useEffect } from "react";

import { daysString, IAvailableHours, IDaysHours } from "../interface";

export const useMultipleInputs = (text: daysString) => {
  const [formAvailableDays, setFormAvailableDays] = useState<IDaysHours>({
    day: text,
    hours: [{ time: "" }],
  });

  const [toggleDisableDay, setToggleDisableDay] = useState(false);

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

  // todo poner nombre disableDay || toggleDisableDay
  const setDayAvailable = () => {
    setToggleDisableDay((isAvailable) => !isAvailable);
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
    // hace que los campos que tienen al menos un horario aparezcan abiertos
    // y que si borras todos los campos los horarios desaparezcan solos
    const hasAtLastOneTimeSetted = formAvailableDays.hours.some(
      (item: IAvailableHours) => item.time !== "",
    );

    setToggleDisableDay(hasAtLastOneTimeSetted);
  }, [formAvailableDays]);

  return {
    // values
    toggleDisableDay,
    isPreviousInputEmpty,
    // methods
    addStep,
    deleteStep,
    formAvailableDays,
    handleChangeStep,
    setDayAvailable,
    setFormAvailableDays,
    // setOriginalState,
  };
};
