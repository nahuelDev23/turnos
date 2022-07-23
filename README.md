[] validaciones de los inputs con formik
[] disablear botones para sacar turno si no estan los 3 campos con datos

```
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      pathname: "/",
      route: "/",
      asPath: "/",
      query: "",
    }));

    fireEvent.click(screen.getByText("some text...."));
    expect(push).toHaveBeenCalledWith("/your-expected-route");

    //https://github.com/vercel/next.js/issues/7479#issuecomment-778586840
```
