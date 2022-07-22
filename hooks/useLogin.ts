import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState, ChangeEvent } from "react";

interface AuthInputs {
  email: string;
  password: string;
}
const initialFormAuthValues = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const [formAuth, setFormAuth] = useState<AuthInputs>(initialFormAuthValues);
  const router = useRouter();
  const { email, password } = formAuth;

  const onSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = (await signIn("credentials", {
        email,
        password,
        redirect: false,
      })) as any;

      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.log("aca", error);
    }
  };

  const onInputLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormAuth({ ...formAuth, [event.target.name]: event.target.value });
  };

  const logOut = () => signOut();

  return {
    ...formAuth,
    onSubmitLogin,
    onInputLoginChange,
    logOut,
  };
};
