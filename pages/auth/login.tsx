import { Button, Input, FormLabel, Text } from "@chakra-ui/react";

import { PublicLayout } from "../../components/Layout/PublicLayout";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { onSubmitLogin, email, password, onInputLoginChange, errorLogin } =
    useLogin();

  return (
    <PublicLayout>
      {errorLogin && <Text>{errorLogin}</Text>}
      <form onSubmit={onSubmitLogin}>
        <FormLabel htmlFor="email">
          Email
          <Input
            aria-label="email"
            name="email"
            type="text"
            value={email}
            onChange={onInputLoginChange}
          />
        </FormLabel>
        <FormLabel htmlFor="password">
          Password
          <Input
            aria-label="password"
            name="password"
            type="password"
            value={password}
            onChange={onInputLoginChange}
          />
        </FormLabel>
        <Button type="submit">Ingresar</Button>
      </form>
    </PublicLayout>
  );
};

export default Login;
