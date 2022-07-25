import { FormEvent, useEffect, useState } from "react";

import { ITurnForm } from "../interface";
import { numberDayToString } from "../helpers/numberDayToString";
import { IDaysHours } from "../interface/IAvailableDays";

export const useTakeATurn = (availableDays: IDaysHours[]) => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [hoursPerDay, setHoursPerDay] = useState<any>(null);

  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [form, setForm] = useState<ITurnForm>({
    name: "",
    dni: "",
    phone: "",
    hour: "",
    day: startDate,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("/api/turn", {
      method: "POST",
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.message);
        }
        setSuccess(data.message);
        setError(null);
      })
      .catch((err) => {
        setSuccess(null);
        setError(err.message);
      });
  };

  const onInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setForm((form) => ({ ...form, day: startDate }));
  }, [startDate]);

  useEffect(() => {
    if (availableDays) {
      const currentDay = numberDayToString(startDate.getDay());

      const todayHaveHours = availableDays.find(
        (item: IDaysHours) => item.day === currentDay,
      ) as IDaysHours;

      if (todayHaveHours) return setHoursPerDay(todayHaveHours.hours);
    }
  }, [startDate, availableDays]);

  return {
    onSubmit,
    onInputChange,
    error,
    success,
    hoursPerDay,
    startDate,
    setStartDate,
    form,
  };
};
