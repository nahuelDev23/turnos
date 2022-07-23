import { render, screen } from "@testing-library/react";

import { TableTurn } from "../../../../components/admin/table/TableTurn";
import { filledTurns } from "../../../fixtures";

describe("Test TableTurn", () => {
  test("should have th that correspond to data", () => {
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
});
