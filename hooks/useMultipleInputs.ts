import { useMemo, useState, useEffect } from "react";

import { daysString, IAvailableHours, IDaysHours } from "../interface";

export const useMultipleInputs = (text: daysString) => {
  const [formAvailableDays, setFormAvailableDays] = useState<IDaysHours>({
    day: text,
    hours: [{ time: "" }],
  });
  const [originalState, setOriginalState] = useState<IDaysHours>({
    day: text,
    hours: [{ time: "" }],
  });
  const [haveAtLastOneTime, setHaveAtLastOneTime] = useState(false);

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

  const setDayAvailable = () => {
    setHaveAtLastOneTime((isAvailable) => !isAvailable);
  };

  useEffect(() => {
    if (!haveAtLastOneTime) {
      setFormAvailableDays({
        day: text,
        hours: [{ time: "" }],
      });
    }
  }, [haveAtLastOneTime]);

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
    // setFormAvailableDays(formAvailableDays);
  }, [formAvailableDays]);

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
    setFormAvailableDays,
    setOriginalState,
  };
};
