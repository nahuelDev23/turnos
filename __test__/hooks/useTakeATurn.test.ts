import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useTakeATurn } from "../../hooks/useTakeATurn";
import { responseAvailableDaysFilled } from "../fixtures";
import { filledForm, emptyForm } from "../fixtures/takeATurn";

describe("Test useTakeATurn", () => {
  test("should change values of form with inputChange", async () => {
    const { result } = renderHook(() =>
      useTakeATurn(responseAvailableDaysFilled),
    );

    const { onInputChange } = result.current;

    await act(async () => {
      onInputChange({ target: { name: "name", value: filledForm.name } });
    });

    expect(result.current.form.name).toBe(filledForm.name);
  });

  test("form should be empty by default", async () => {
    const { result } = renderHook(() =>
      useTakeATurn(responseAvailableDaysFilled),
    );

    expect(result.current.form).toStrictEqual(emptyForm);
  });

  test("should return success onSubmit", async () => {
    const { result } = renderHook(() =>
      useTakeATurn(responseAvailableDaysFilled),
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: true,
            message: "El turno se reservo con éxito",
            turn: [],
          }),
      }),
    ) as any;

    const { onSubmit } = result.current;

    await act(async () => {
      onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.success).toBe("El turno se reservo con éxito");
  });

  test("should return error onSubmit", async () => {
    const { result } = renderHook(() =>
      useTakeATurn(responseAvailableDaysFilled),
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: false,
            message: "Hubo un error",
            turn: [],
          }),
      }),
    ) as any;

    const { onSubmit } = result.current;

    await act(async () => {
      onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.error).toBe("Hubo un error");
  });

  test("startDay should be today", async () => {
    const { result } = renderHook(() =>
      useTakeATurn(responseAvailableDaysFilled),
    );

    expect(result.current.startDate).toStrictEqual(
      new Date(new Date().setHours(0, 0, 0, 0)),
    );
  });

  test("should change hoursPerDay if startDay change", async () => {
    const { result } = renderHook(() =>
      useTakeATurn(responseAvailableDaysFilled),
    );
    const { setStartDate } = result.current;

    act(() => {
      setStartDate(new Date(new Date("07/12/2022").setHours(0, 0, 0, 0)));
    });

    expect(result.current.hoursPerDay).toStrictEqual([
      { time: "10:00" },
      { time: "10:20" },
      { time: "10:30" },
      { time: "10:40" },
    ]);

    act(() => {
      setStartDate(new Date(new Date("07/13/2022").setHours(0, 0, 0, 0)));
    });

    expect(result.current.hoursPerDay).toStrictEqual([
      { time: "12:00" },
      { time: "13:20" },
      { time: "14:30" },
      { time: "15:40" },
    ]);
  });
});
