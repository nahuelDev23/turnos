import { fireEvent, render, screen } from "@testing-library/react";

import Login from "../../../pages/auth/login";

const mockOnSubmitLogin = jest.fn();

jest.mock("../../../hooks/useLogin", () => ({
  ...jest.requireActual("../../../hooks/useLogin"),
  onSubmitLogin: () => mockOnSubmitLogin,
}));

describe("Test on page login", () => {
  test("should show inputs for login", () => {
    render(<Login />);

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ingresar/i }),
    ).toBeInTheDocument();
  });

  test("should can write on inputs", () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "nahuel@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "123456" },
    });

    expect((screen.getByLabelText("email") as HTMLInputElement).value).toBe(
      "nahuel@gmail.com",
    );
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe(
      "123456",
    );
  });
});
