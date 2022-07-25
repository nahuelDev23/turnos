import { IDaysHours } from "../interface";

import { IDayInitialState } from "./DaysProvider";

type Action =
  | { type: "SET_FORM_DATA"; payload: IDaysHours[] }
  | { type: "SET_DAYS_DATA"; payload: IDaysHours[] }
  | { type: "LOADING_FORM_DATA"; payload: boolean }
  | { type: "SET_SUCCESS_UPDATE_DAYS_HOURS"; payload: boolean }
  | { type: "SET_ERROR_UPDATE_DAYS_HOURS"; payload: boolean };

export const daysReducer = (
  state: IDayInitialState,
  action: Action,
): IDayInitialState => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        isLoadingFormData: false,
        formData: [...action.payload],
      };
    case "SET_DAYS_DATA":
      return {
        ...state,
        isLoadingFormData: false,
        daysData: action.payload,
      };

    case "LOADING_FORM_DATA":
      return {
        ...state,
        isLoadingFormData: action.payload,
      };
    case "SET_SUCCESS_UPDATE_DAYS_HOURS":
      return {
        ...state,
        successUpdateDaysHours: action.payload,
      };
    case "SET_ERROR_UPDATE_DAYS_HOURS":
      return {
        ...state,
        errorUpdateDaysHours: action.payload,
      };

    default:
      return state;
  }
};
