import { render, screen, fireEvent } from "@testing-library/react";

import { InputHour } from "../../../../components/admin/form/InputHour";

const addStep = jest.fn();
const handleChangeStep = jest.fn();
const props = {
  handleChangeStep,
  index: 0,
  times: { time: "10:00" },
  addStep,
  deleteStep: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});
describe("test InputHour", () => {
  test("should trigger addStep ", async () => {
    render(<InputHour {...props} isSomeInputEmpty={false} />);

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(addStep).toHaveBeenCalled();
  });

  test("should exist  deleteStep if index is grater than  0 ", async () => {
    render(<InputHour {...props} index={1} isSomeInputEmpty={false} />);

    expect(screen.getByRole("button", { name: "-" })).toBeTruthy();
  });

  test("should cant click + if isSomeInputEmpty ", async () => {
    render(<InputHour {...props} isSomeInputEmpty={true} />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(addStep).not.toHaveBeenCalled();
  });
});
