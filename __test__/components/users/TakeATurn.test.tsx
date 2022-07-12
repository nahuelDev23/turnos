import { render, screen } from "@testing-library/react";
import useSWR from "swr";

import { TakeATurn } from "../../../components/users/formTakeATurn";
import { emptyForm } from "../../fixtures";
import { useTakeATurn } from "../../../hooks/useTakeATurn";
import {
  responseAvailableDaysUndefined,
  responseAvailableDaysFilled,
} from "../../fixtures/availableDays";

jest.mock("../../../hooks/useTakeATurn");
jest.mock("swr");

describe("Test on TakeATurn", () => {
  const mockSubmit = jest.fn();
  const mockOnInputChange = jest.fn();
  const mockSetStartDate = jest.fn();

  (useTakeATurn as jest.Mock).mockReturnValue({
    onSubmit: mockSubmit,
    onInputChange: mockOnInputChange,
    error: undefined,
    success: undefined,
    hoursPerDay: [],
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    setStartDate: mockSetStartDate,
    form: emptyForm,
  });

  test("should render the component without data", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: responseAvailableDaysUndefined,
      error: undefined,
    });

    render(<TakeATurn />);

    expect(screen.getByText(/obteniendo días disponibles/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/nombre/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/d.n.i/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/teléfono/i)).toBeTruthy();
    expect(screen.getAllByRole("option").length).toBe(1);
    expect(screen.getAllByRole("textbox").length).toBe(3);
  });

  test("should render the component with data", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: responseAvailableDaysFilled,
      error: undefined,
    });

    render(<TakeATurn />);

    const index = screen.getAllByRole("textbox").length - 1;

    const calendarInput = (
      screen.getAllByRole("textbox")[index] as HTMLInputElement
    ).value;

    expect(screen.queryByText(/obteniendo días disponibles/i)).toBeFalsy();
    expect(
      calendarInput.includes(new Date().toLocaleDateString("en-US")),
    ).toBeTruthy();
    expect(screen.getAllByRole("textbox").length).toBe(4);
  });

  test("should render the error", () => {
    (useTakeATurn as jest.Mock).mockReturnValue({
      error: "Se rompió todo",
      form: emptyForm,
    });

    (useSWR as jest.Mock).mockReturnValue({
      data: responseAvailableDaysFilled,
      error: undefined,
    });

    render(<TakeATurn />);

    expect(screen.getByText(/Se rompió todo/i)).toBeTruthy();
  });

  test("should render the success", () => {
    (useTakeATurn as jest.Mock).mockReturnValue({
      success: "bien!",
      form: emptyForm,
    });

    (useSWR as jest.Mock).mockReturnValue({
      data: responseAvailableDaysFilled,
      error: undefined,
    });

    render(<TakeATurn />);

    expect(screen.getByText(/bien/i)).toBeTruthy();
  });
});
