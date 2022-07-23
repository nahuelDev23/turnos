import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useTurn } from "../../hooks/useTurn";

describe("test useTurn", () => {
  test("should onInputHourChange set current item", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: true,
          }),
      }),
    ) as any;

    const { result } = renderHook(() => useTurn());

    await act(async () => {
      result.current.onInputHourChange({ target: { value: "17:00" } }, "asd");
    });

    expect(result.current.currentItem).toEqual({
      hour: "17:00",
      id: "asd",
    });
  });

  test("should set success to true and false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: true,
          }),
      }),
    ) as any;

    const { result } = renderHook(() => useTurn());

    await act(async () => {
      result.current.onInputHourChange({ target: { value: "17:00" } }, "asd");
    });
    expect(result.current.isSuccessUpdate).toBe(true);

    await waitFor(
      () => {
        expect(result.current.isSuccessUpdate).toBe(false);
      },
      { timeout: 3000 }, // default 1000
    );
  });

  test("should set error to true and false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: false,
          }),
      }),
    ) as any;

    const { result } = renderHook(() => useTurn());

    await act(async () => {
      result.current.onInputHourChange({ target: { value: "17:00" } }, "asd");
    });
    expect(result.current.isErrorUpdate).toBe(true);

    await waitFor(
      () => {
        expect(result.current.isErrorUpdate).toBe(false);
      },
      { timeout: 3000 }, // default 1000
    );
  });
});
