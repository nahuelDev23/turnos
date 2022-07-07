import { render, screen } from "@testing-library/react";

import { PublicLayout } from "../../../components/Layout/PublicLayout";

describe("Test Public Layout", () => {
  test("should render children", () => {
    render(
      <PublicLayout>
        <p>Iam the children</p>
      </PublicLayout>,
    );

    expect(screen.getByText(/iam the children/i));
  });
});
