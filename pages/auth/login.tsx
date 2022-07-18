import { Button } from "@chakra-ui/react";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Router from "next/router";

import { PublicLayout } from "../../components/Layout/PublicLayout";
interface authInputs {
  email: string;
  password: string;
}
const initialFormAuthValues = {
  email: "",
  password: "",
};
const login = () => {
  const [formAuth, setFormAuth] = useState<authInputs>(initialFormAuthValues);

  const { email, password } = formAuth;

  const onSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log("se fue");
    const response = (await signIn("credentials", {
      email,
      password,
      redirect: false,
    })) as any;

    if (response.ok) {
      Router.push("/admin");
    }
    console.log(response);
  };

  const onInputLoginChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormAuth({ ...formAuth, [event.target.name]: event.target.value });
  };

  return (
    // todo cambiar por admin panel
    <PublicLayout>
      <form onSubmit={onSubmitLogin}>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="text"
            value={email}
            onChange={onInputLoginChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="text"
            value={password}
            onChange={onInputLoginChange}
          />
        </label>
        <Button type="submit">Ingresar</Button>
      </form>
    </PublicLayout>
  );
};

export default login;
