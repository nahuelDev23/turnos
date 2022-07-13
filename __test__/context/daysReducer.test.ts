import { daysReducer } from "../../context/daysReducer";
import { initialState, responseAvailableDaysFilled } from "../fixtures";
describe("test daysReducer", () => {
  test("should return default values", () => {
    const newState = daysReducer(initialState, {} as any);

    expect(newState).toBe(initialState);
  });

  test("should set from data", () => {
    const action = {
      type: "SET_FORM_DATA",
      payload: [...responseAvailableDaysFilled],
    };

    initialState.isLoadingFormData = true;
    const newState = daysReducer(initialState, action as any);

    expect(newState.formData.length).toBe(7);
    expect(newState.formData).toEqual(responseAvailableDaysFilled);
    expect(newState.isLoadingFormData).toBe(false);
  });

  test("should set days data", () => {
    const action = {
      type: "SET_DAYS_DATA",
      payload: [...responseAvailableDaysFilled],
    };

    initialState.isLoadingFormData = true;
    const newState = daysReducer(initialState, action as any);

    expect(newState.daysData.length).toBe(7);
    expect(newState.isLoadingFormData).toBe(false);
  });

  test("should set loading form data ", () => {
    const action = {
      type: "LOADING_FORM_DATA",
      payload: true,
    };
    const newState = daysReducer(initialState, action as any);

    expect(newState.isLoadingFormData).toBe(true);
  });
});
