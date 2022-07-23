import { renderHook } from "@testing-library/react";
import { signIn, signOut } from "next-auth/react";
import { act } from "react-dom/test-utils";
import { ChangeEvent } from "react";

import { useLogin } from "../../hooks/useLogin";

const mockPush = jest.fn();

jest.mock("next-auth/react");
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

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
      errorLogin: false,
    });
  });

  test("should call singIn when submit login", async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

    (signIn as jest.Mock).mockResolvedValue({ ok: true });

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

    expect(mockPush).toHaveBeenCalled();
  });

  test("should set errorLogin to true", async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: false });

    const { result } = renderHook(() => useLogin());
    const { onSubmitLogin } = result.current;

    await act(async () => {
      await onSubmitLogin({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.errorLogin).toBe(true);
  });

  test("should call singOut when submit logOut", async () => {
    const mockSignOut = signOut as jest.MockedFunction<typeof signIn>;

    const { result } = renderHook(() => useLogin());
    const { logOut } = result.current;

    await act(async () => {
      await logOut();
    });

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  test("should form value change when onInputLoginChange ", async () => {
    const { result } = renderHook(() => useLogin());
    const { onInputLoginChange } = result.current;

    act(() => {
      onInputLoginChange({
        target: { name: "email", value: "joder@gmail.com" },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.email).toBe("joder@gmail.com");

    act(() => {
      onInputLoginChange({
        target: { name: "password", value: "123123" },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.password).toBe("123123");
  });
});
