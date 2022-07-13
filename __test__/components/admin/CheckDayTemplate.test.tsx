import { render, screen, fireEvent } from "@testing-library/react";

import { CheckDayTemplate } from "../../../components/admin/CheckDayTemplate";
import { useMultipleInputs } from "../../../hooks/useMultipleInputs";
import { DaysContext } from "../../../context/DaysContext";
import { responseRawAvailableDaysPartialFilled } from "../../fixtures/availableDays";

const addFormToFormData = jest.fn();
const daysData = responseRawAvailableDaysPartialFilled;
const isLoadingFormData = false;
const removeDay = jest.fn();
const sendForm = jest.fn();
const formData: any = [];

const props = {
  addFormToFormData,
  daysData,
  isLoadingFormData,
  removeDay,
  formData,
  sendForm,
};

jest.mock("../../../hooks/useMultipleInputs");

beforeEach(() => {
  jest.clearAllMocks();
});

const mockAddStep = jest.fn();
const mockDeleteStep = jest.fn();
const mockHandleChangeStep = jest.fn();
const mockSetFormAvailableDays = jest.fn();

describe("test CheckDayTemplate", () => {
  test("should render the component", () => {
    (useMultipleInputs as jest.Mock).mockReturnValue({});

    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="domingo" />
      </DaysContext.Provider>,
    );
  });

  test("should render 2 inputs", () => {
    const mockFormAvailableDays = {
      day: "domingo",
      hours: [{ time: "10:00" }, { time: "9:00" }],
    };

    (useMultipleInputs as jest.Mock).mockReturnValue({
      formAvailableDays: mockFormAvailableDays,
      setFormAvailableDays: mockSetFormAvailableDays,
    });

    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );

    expect(screen.getAllByRole("textbox").length).toBe(2);
    // screen.debug();
  });

  test("should dispatch addStep", () => {
    const mockFormAvailableDays = {
      day: "domingo",
      hours: [{ time: "10:00" }, { time: "9:00" }],
    };

    (useMultipleInputs as jest.Mock).mockReturnValue({
      formAvailableDays: mockFormAvailableDays,
      setFormAvailableDays: mockSetFormAvailableDays,
      addStep: mockAddStep,
    });

    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );
    fireEvent.click(screen.getAllByRole("button", { name: "+" })[0]);

    expect(mockAddStep).toHaveBeenCalled();
  });

  test("should dispatch removeStep", () => {
    const mockFormAvailableDays = {
      day: "domingo",
      hours: [{ time: "10:00" }, { time: "9:00" }],
    };

    (useMultipleInputs as jest.Mock).mockReturnValue({
      formAvailableDays: mockFormAvailableDays,
      setFormAvailableDays: mockSetFormAvailableDays,
      deleteStep: mockDeleteStep,
    });

    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );
    fireEvent.click(screen.getAllByRole("button", { name: "-" })[0]);

    expect(mockDeleteStep).toHaveBeenCalled();
  });

  test("should dispatch handleChangeStep", () => {
    const mockFormAvailableDays = {
      day: "domingo",
      hours: [{ time: "10:00" }, { time: "9:00" }],
    };

    (useMultipleInputs as jest.Mock).mockReturnValue({
      formAvailableDays: mockFormAvailableDays,
      setFormAvailableDays: mockSetFormAvailableDays,
      handleChangeStep: mockHandleChangeStep,
    });

    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );
    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "joder" },
    });

    expect(mockHandleChangeStep).toHaveBeenCalled();
  });
});
