import React, { FC, useReducer } from "react";

import { IDaysHours } from "../interface/IAvailableDays";

import { DaysContext } from "./DaysContext";
import { daysReducer } from "./daysReducer";

interface Props {
  children: React.ReactNode;
}

export interface IDayInitialState {
  formData: IDaysHours[];
}
const DAYINITIALSTATE: IDayInitialState = {
  formData: [],
};

export const DaysProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(daysReducer, DAYINITIALSTATE);

  const addFormToFormData = (data: IDaysHours) => {
    const dayAlreadyAssigned = state.formData.some(
      (item) => item.day === data.day,
    );

    const hasAllHourEmpty = data.hours.every((item) => item.time === "");

    if (hasAllHourEmpty) {
      const onlyFilledDataWitHours = state.formData.filter(
        (item) => item.day !== data.day,
      );

      return dispatch({
        type: "SET_FORM_DATA",
        payload: [...onlyFilledDataWitHours],
      });
    }

    if (!dayAlreadyAssigned && data.hours.length !== 0) {
      return dispatch({
        type: "SET_FORM_DATA",
        payload: [...state.formData, data],
      });
    }

    const updateDays = state.formData.map((item) => {
      if (item.day !== data.day) return item;
      const hoursFilled = data.hours.filter((hour) => hour.time !== "");

      item.hours = hoursFilled;

      return item;
    });

    dispatch({
      type: "SET_FORM_DATA",
      payload: updateDays,
    });
  };

  const sendForm = () => {
    fetch("/api/availableDays", {
      method: "POST",
      body: JSON.stringify(state.formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // TODO: poner mensaje success y de error
        console.log(data.message);

        if (!data.ok) {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);

        // setSuccess(null);
        // setError(err.message);
      });
  };

  return (
    <DaysContext.Provider
      value={{
        ...state,
        addFormToFormData,
        sendForm,
      }}
    >
      {children}
    </DaysContext.Provider>
  );
};
