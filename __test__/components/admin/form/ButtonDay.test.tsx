import { render, fireEvent, screen } from "@testing-library/react";

import { ButtonDay } from "../../../../components/admin/form/ButtonDay";

const haveAtLastOneTime = true;
const isLoadingFormData = true;
const setDayAvailable = jest.fn();
const text = "viernes";

const props = {
  haveAtLastOneTime,
  isLoadingFormData,
  setDayAvailable,
  text,
};

describe("Test del Test", () => {
  test("should be disabled if isLoadingFormData is true ", () => {
    render(<ButtonDay {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /viernes/i }));

    expect(setDayAvailable).not.toHaveBeenCalled();
  });

  test("should be enabled if isLoadingFormData is false ", () => {
    render(<ButtonDay {...props} isLoadingFormData={false} />);

    fireEvent.click(screen.getByRole("button", { name: /viernes/i }));

    expect(setDayAvailable).toHaveBeenCalledTimes(1);
  });

  test("should have text on viernes ", () => {
    render(<ButtonDay {...props} />);

    expect(
      screen.getByRole("button", { name: /viernes/i }).textContent,
    ).toEqual("viernes");
  });
});
