import { createContext } from "react";

import { IDaysHours } from "../interface/IAvailableDays";

interface IDaysContext {
  formData: IDaysHours[];
  daysData: IDaysHours[];
  addFormToFormData: (data: IDaysHours) => void;
  sendForm: () => void;
  loading: boolean;
}

export const DaysContext = createContext({} as IDaysContext);
