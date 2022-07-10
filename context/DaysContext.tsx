import { createContext } from "react";

import { IDaysHours } from "../interface/IAvailableDays";

interface IDaysContext {
  formData: IDaysHours[];
  daysData: IDaysHours[];
  addFormToFormData: (data: IDaysHours) => void;
  sendForm: () => void;
  loading: boolean;
  fillFormData: (data: IDaysHours[]) => void;
}

export const DaysContext = createContext({} as IDaysContext);
