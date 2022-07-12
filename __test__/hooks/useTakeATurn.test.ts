import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useTakeATurn } from "../../hooks/useTakeATurn";
import { responseAvailableDaysFilled } from "../fixtures";
import { filledForm } from "../fixtures/takeATurn";

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
});
