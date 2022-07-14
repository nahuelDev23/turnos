import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useMultipleInputs } from "../../hooks/useMultipleInputs";

beforeEach(() => {
  jest.clearAllMocks();
});
describe("test useMultipleInputs", () => {
  test("should set form available with the argument day", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));
    const { formAvailableDays } = result.current;

    expect(formAvailableDays).toEqual({ day, hours: [{ time: "" }] });
  });

  test("should set form available on handleChangeStep", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));
    const { handleChangeStep } = result.current;

    act(() => {
      handleChangeStep({ target: { value: "10:00" } }, 0);
    });

    expect(result.current.formAvailableDays).toEqual({
      day,
      hours: [{ time: "10:00" }],
    });
  });

  test("should set new times with addStep", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));
    const { addStep } = result.current;

    act(() => {
      addStep();
    });

    expect(result.current.formAvailableDays).toEqual({
      day,
      hours: [{ time: "" }, { time: "" }],
    });
  });

  test("should can delete the second time", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));
    const { addStep, handleChangeStep, deleteStep } = result.current;

    act(() => {
      addStep();
    });

    act(() => {
      handleChangeStep({ target: { value: "9:00" } }, 0);
    });
    act(() => {
      handleChangeStep({ target: { value: "10:00" } }, 1);
    });

    act(() => {
      deleteStep(1);
    });
    expect(result.current.formAvailableDays).toEqual({
      day,
      hours: [{ time: "9:00" }],
    });
  });

  test("should have isPreviousInputEmpty true if time is empty", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));

    expect(result.current.isSomeInputEmpty).toBe(true);
  });

  test("should have isSomeInputEmpty false if time is filled and have only one time", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));
    const { handleChangeStep } = result.current;

    act(() => {
      handleChangeStep({ target: { value: "9:00" } }, 0);
    });

    expect(result.current.isSomeInputEmpty).toBe(false);
  });

  test("should have isSomeInputEmpty true if the first if filled and the new not", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));
    const { handleChangeStep, addStep } = result.current;

    act(() => {
      handleChangeStep({ target: { value: "9:00" } }, 0);
    });

    act(() => {
      addStep();
    });

    expect(result.current.isSomeInputEmpty).toBe(true);
  });

  test("should have isSomeInputEmpty false if the first if filled and the new too is filled", () => {
    const day = "lunes";
    const { result } = renderHook(() => useMultipleInputs(day));
    const { handleChangeStep, addStep } = result.current;

    act(() => {
      handleChangeStep({ target: { value: "9:00" } }, 0);
    });

    act(() => {
      addStep();
    });

    act(() => {
      handleChangeStep({ target: { value: "9:00" } }, 1);
    });

    expect(result.current.isSomeInputEmpty).toBe(false);
  });
});
