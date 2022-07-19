import React, { FC } from "react";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { useLogin } from "../../hooks/useLogin";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const { logOut } = useLogin();

  return (
    <Stack direction="row">
      <Stack borderRight="1px solid" minH="100vh" p="4" w="300px">
        <Text>{session?.user?.email}</Text>
        <Button onClick={() => logOut()}>Salir</Button>
      </Stack>
      <Stack p="4">{children}</Stack>
    </Stack>
  );
};
