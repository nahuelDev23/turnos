import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form } from "../../../components/users/formTakeATurn/Form";
import { emptyForm, filledForm } from "../../fixtures";
import { responseAvailableDaysFilled } from "../../fixtures/availableDays";

jest.mock("../../../hooks/useTakeATurn");

describe("Test users/Form", () => {
  const mockSubmit = jest.fn((e) => e.preventDefault());
  const mockOnInputChange = jest.fn();

  test("should render the component", () => {
    render(
      <Form
        form={emptyForm}
        hoursPerDay={[]}
        onInputChange={mockOnInputChange}
        onSubmit={mockSubmit}
      />,
    );

    expect(screen.getByText(/reservar/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/nombre/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/d.n.i/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/teléfono/i)).toBeTruthy();
    expect(screen.getAllByRole("option").length).toBe(1);
    expect(screen.getAllByRole("textbox").length).toBe(3);
  });

  test("should render the hours per day", () => {
    render(
      <Form
        form={emptyForm}
        hoursPerDay={responseAvailableDaysFilled[0].hours}
        onInputChange={mockOnInputChange}
        onSubmit={mockSubmit}
      />,
    );

    expect(screen.getAllByRole("option").length).toBe(
      responseAvailableDaysFilled[0].hours.length + 1,
    );
  });

  test("should have fill input text with form", async () => {
    render(
      <Form
        form={filledForm}
        hoursPerDay={responseAvailableDaysFilled[0].hours}
        onInputChange={mockOnInputChange}
        onSubmit={mockSubmit}
      />,
    );

    expect(screen.getByPlaceholderText(/nombre/i)).toHaveValue(filledForm.name);
    expect(screen.getByPlaceholderText(/d.n.i/i)).toHaveValue(filledForm.dni);
    expect(screen.getByPlaceholderText(/teléfono/i)).toHaveValue(
      filledForm.phone,
    );
  });

  test("should dispatch inputChange", async () => {
    render(
      <Form
        form={filledForm}
        hoursPerDay={responseAvailableDaysFilled[0].hours}
        onInputChange={mockOnInputChange}
        onSubmit={mockSubmit}
      />,
    );

    await userEvent.type(screen.getByPlaceholderText(/nombre/i), "hello");

    expect(mockOnInputChange).toHaveBeenCalled();
  });

  test("should dispatch inputChange", async () => {
    render(
      <Form
        form={filledForm}
        hoursPerDay={responseAvailableDaysFilled[0].hours}
        onInputChange={mockOnInputChange}
        onSubmit={mockSubmit}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
