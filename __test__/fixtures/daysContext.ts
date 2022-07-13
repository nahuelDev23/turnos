import { IDaysHours } from "../../interface";

export interface IDayInitialState {
  formData: IDaysHours[];
  daysData: IDaysHours[];
  isLoadingFormData: boolean;
}

export const initialState: IDayInitialState = {
  formData: [],
  daysData: [],
  isLoadingFormData: false,
};
