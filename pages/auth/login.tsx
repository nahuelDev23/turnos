import { Button } from "@chakra-ui/react";

import { PublicLayout } from "../../components/Layout/PublicLayout";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { onSubmitLogin, email, password, onInputLoginChange } = useLogin();

  return (
    // todo cambiar por admin panel
    <PublicLayout>
      <form onSubmit={onSubmitLogin}>
        <label htmlFor="email">
          Email
          <input
            aria-label="email"
            name="email"
            type="text"
            value={email}
            onChange={onInputLoginChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            aria-label="password"
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

export default Login;
