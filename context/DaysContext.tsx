import { createContext } from "react";

import { IDaysHours, daysString } from "../interface/IAvailableDays";

interface IDaysContext {
  formData: IDaysHours[];
  daysData: IDaysHours[];
  addFormToFormData: (data: IDaysHours) => void;
  sendForm: () => void;
  isLoadingFormData: boolean;
  fillFormData: (data: IDaysHours[]) => void;
  removeDay: (day: daysString) => void;
}

export const DaysContext = createContext({} as IDaysContext);
