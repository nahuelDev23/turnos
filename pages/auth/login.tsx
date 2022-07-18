import { ChangeEventHandler, useState } from "react";

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

  const onSubmitLogin = () => {
    console.log("se fue");
  };

  const onInputLoginChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormAuth({ ...formAuth, [event.target.name]: event.target.value });
  };

  return (
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
    </form>
  );
};

export default login;
