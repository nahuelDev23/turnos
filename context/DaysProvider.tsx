import React, { FC, useReducer, useEffect } from "react";

import {
  IDaysHours,
  daysString,
  RawAvailableDaysFromDb,
} from "../interface/IAvailableDays";
import { formatDataAvailableDays } from "../helpers/formatDataAvailableDays";

import { DaysContext } from "./DaysContext";
import { daysReducer } from "./daysReducer";

interface Props {
  children: React.ReactNode;
}

export interface IDayInitialState {
  formData: IDaysHours[];
  daysData: IDaysHours[];
  isLoadingFormData: boolean;
  successUpdateDaysHours: boolean;
  errorUpdateDaysHours: boolean;
}
const DAYINITIALSTATE: IDayInitialState = {
  formData: [],
  daysData: [],
  isLoadingFormData: false,
  successUpdateDaysHours: false,
  errorUpdateDaysHours: false,
};

export const DaysProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(daysReducer, DAYINITIALSTATE);

  const setSuccessUpdateDaysHours = () => {
    dispatch({
      type: "SET_SUCCESS_UPDATE_DAYS_HOURS",
      payload: true,
    });

    setTimeout(() => {
      dispatch({
        type: "SET_SUCCESS_UPDATE_DAYS_HOURS",
        payload: false,
      });
    }, 2000);
  };

  const setErrorUpdateDaysHours = () => {
    dispatch({
      type: "SET_ERROR_UPDATE_DAYS_HOURS",
      payload: true,
    });

    setTimeout(() => {
      dispatch({
        type: "SET_ERROR_UPDATE_DAYS_HOURS",
        payload: false,
      });
    }, 2000);
  };
  const removeDay = (day: daysString) => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: state.formData.filter((item) => item.day !== day),
    });
  };

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

  const getDaysData = async () => {
    dispatch({
      type: "LOADING_FORM_DATA",
      payload: true,
    });
    const response = await fetch("/api/admin/availableDays");
    const availableDaysList: RawAvailableDaysFromDb[] = await response.json();

    if (availableDaysList.length) {
      fillFormData(availableDaysList);

      fillDaysData(availableDaysList);
    }
  };

  const fillDaysData = (data: RawAvailableDaysFromDb[]) => {
    dispatch({
      type: "SET_DAYS_DATA",
      payload: data,
    });
  };

  const fillFormData = (data: RawAvailableDaysFromDb[]) => {
    if (data) {
      dispatch({
        type: "SET_FORM_DATA",
        payload: formatDataAvailableDays(data)!,
      });
    }
  };

  useEffect(() => {
    getDaysData();
  }, []);

  const sendForm = () => {
    fetch("/api/admin/availableDays", {
      method: "POST",
      body: JSON.stringify(state.formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) throw new Error(data.message);

        setSuccessUpdateDaysHours();
      })
      .catch(() => {
        setErrorUpdateDaysHours();
      });
  };

  return (
    <DaysContext.Provider
      value={{
        ...state,
        addFormToFormData,
        sendForm,
        removeDay,
      }}
    >
      {children}
    </DaysContext.Provider>
  );
};
