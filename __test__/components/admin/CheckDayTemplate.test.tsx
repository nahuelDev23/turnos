import {
  render,
  renderHook,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";

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

beforeEach(() => {
  jest.clearAllMocks();
});
describe("test CheckDayTemplate", () => {
  test("should render 4 inputs", async () => {
    renderHook(() => {
      useMultipleInputs("lunes");
    });
    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );

    const hourInputs = screen.getAllByLabelText("input-hour");

    expect(hourInputs.length).toBe(4);
  });

  test("should delete inputs", async () => {
    renderHook(() => {
      useMultipleInputs("lunes");
    });
    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "-" })[2]);
    const hourInputs = screen.getAllByLabelText("input-hour");

    expect(hourInputs.length).toBe(3);
  });

  test("should add inputs", async () => {
    renderHook(() => {
      return useMultipleInputs("lunes");
    });

    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "+" })[2]);

    expect(screen.getAllByLabelText("input-hour").length).toBe(4);
  });

  test("should can write on inputs", async () => {
    renderHook(() => {
      useMultipleInputs("lunes");
    });
    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );

    fireEvent.change(screen.getAllByLabelText("input-hour")[3], {
      target: { value: "asd" },
    });

    await waitFor(async () => {
      expect(screen.getByPlaceholderText("Horario N 3")).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText("Horario N 3")).toHaveValue("asd");
  });

  test("should cant add more inputs if textfield is empty", async () => {
    renderHook(() => {
      useMultipleInputs("lunes");
    });
    render(
      <DaysContext.Provider value={{ ...props }}>
        <CheckDayTemplate text="lunes" />
      </DaysContext.Provider>,
    );

    fireEvent.change(screen.getAllByLabelText("input-hour")[3], {
      target: { value: "asd" },
    });

    await waitFor(async () => {
      expect(screen.getByPlaceholderText("Horario N 3")).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText("Horario N 3")).toHaveValue("asd");
  });
});
