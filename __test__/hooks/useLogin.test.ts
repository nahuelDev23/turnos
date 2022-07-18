import { renderHook } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { act } from "react-dom/test-utils";

import { useLogin } from "../../hooks/useLogin";

jest.mock("next-auth/react");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("test useLogin", () => {
  test("should return default values", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current).toEqual({
      email: "",
      logOut: expect.any(Function),
      onInputLoginChange: expect.any(Function),
      onSubmitLogin: expect.any(Function),
      password: "",
    });
  });

  test("should call singIn when submit login", async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

    (signIn as jest.Mock).mockResolvedValue({
      signIn: { ok: 200 },
    });

    const { result } = renderHook(() => useLogin());
    const { onSubmitLogin } = result.current;

    await act(async () => {
      await onSubmitLogin({ preventDefault: jest.fn() } as any);
    });

    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      email: "",
      password: "",
      redirect: false,
    });
  });
});
