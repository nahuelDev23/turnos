import { render, screen, fireEvent } from "@testing-library/react";

import { InputHour } from "../../../../components/admin/form/InputHour";

const addStep = jest.fn();
const handleChangeStep = jest.fn();
const props = {
  handleChangeStep,
  index: 0,
  element: { time: "10:00" },
  addStep,
  deleteStep: jest.fn(),
  isPreviousInputEmpty: false,
};

describe("test InputHour", () => {
  test("should trigger addStep ", async () => {
    render(<InputHour {...props} />);

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(addStep).toHaveBeenCalled();
  });

  test("should exist  deleteStep if index is grater than  0 ", async () => {
    render(<InputHour {...props} index={1} />);

    expect(screen.getByRole("button", { name: "-" })).toBeTruthy();
  });
});
