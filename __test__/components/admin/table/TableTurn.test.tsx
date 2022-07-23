import { render, screen, fireEvent } from "@testing-library/react";

import { TableTurn } from "../../../../components/admin/table/TableTurn";
import { filledTurns } from "../../../fixtures";
import { useTurn } from "../../../../hooks/useTurn";

jest.mock("../../../../hooks/useTurn");

const mockOnInputHourChange = jest.fn();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

(useTurn as jest.Mock).mockReturnValue({
  onInputHourChange: mockOnInputHourChange,
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Test TableTurn", () => {
  test("should have th that correspond to data", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: true,
          }),
      }),
    ) as any;

    render(<TableTurn turnsView={filledTurns} />);

    expect(screen.getByText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByText(/hora/i)).toBeInTheDocument();
    expect(screen.getByText(/dni/i)).toBeInTheDocument();
    expect(screen.getByText(/dia/i)).toBeInTheDocument();
  });

  test("should render table with data", () => {
    render(<TableTurn turnsView={filledTurns} />);

    expect(screen.getAllByRole("row").length).toBe(filledTurns.length + 1);
  });

  test("should change select", async () => {
    render(<TableTurn turnsView={filledTurns} />);

    fireEvent.change(screen.getAllByLabelText("select")[0]);

    expect(mockOnInputHourChange).toHaveBeenCalled();
  });

  test("should say success toast", async () => {
    (useTurn as jest.Mock).mockReturnValue({
      isSuccessUpdate: true,
    });
    render(<TableTurn turnsView={filledTurns} />);

    expect(
      screen.getByText(/El horario se actualizo correctamente/i),
    ).toBeTruthy();
  });

  test("should say error toast", async () => {
    (useTurn as jest.Mock).mockReturnValue({
      isErrorUpdate: true,
    });
    render(<TableTurn turnsView={filledTurns} />);

    expect(screen.getByText(/No se pudo actualizar el horario/i)).toBeTruthy();
  });
});
