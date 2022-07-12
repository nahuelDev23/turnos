import { render, screen } from "@testing-library/react";
import useSWR from "swr";

import { TakeATurn } from "../../../components/users/formTakeATurn";
import { emptyForm } from "../../fixtures";
import { useTakeATurn } from "../../../hooks/useTakeATurn";
import { responseAvailableDaysUndefined } from "../../fixtures/availableDays";

jest.mock("../../../hooks/useTakeATurn");
jest.mock("swr");

describe("Test on TakeATurn", () => {
  const mockSubmit = jest.fn();
  const mockOnInputChange = jest.fn();
  const mockSetStartDate = jest.fn();

  test("should render the component without data", () => {
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

    (useSWR as jest.Mock).mockReturnValue({
      data: responseAvailableDaysUndefined,
      error: undefined,
    });

    render(<TakeATurn />);

    expect(screen.getByText(/obteniendo días disponibles/i)).toBeTruthy();
    expect(screen.getAllByRole("option").length).toBe(1);
    expect(screen.getAllByRole("textbox").length).toBe(3);
  });
});
