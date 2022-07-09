import { IDaysHours } from "../interface";

import { IDayInitialState } from "./DaysProvider";

type Action =
  | { type: "SET_FORM_DATA"; payload: IDaysHours[] }
  | { type: "SET_DAYS_DATA"; payload: IDaysHours[] };

export const daysReducer = (
  state: IDayInitialState,
  action: Action,
): IDayInitialState => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: [...action.payload],
      };
    case "SET_DAYS_DATA":
      return {
        ...state,
        daysData: action.payload,
      };
  }
};
