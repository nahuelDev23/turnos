import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useLogin } from "../../../hooks/useLogin";

interface IActiveLink {
  text: string;
  path: string;
}

const ActiveLink = ({ text, path }: IActiveLink) => {
  const router = useRouter();

  return (
    <Link passHref href={path}>
      <Text
        bgColor={router.pathname === path ? "blue.400" : "undefined"}
        borderRadius="md"
        fontWeight={router.pathname === path ? "bold" : "undefined"}
        p="2"
      >
        {text}
      </Text>
    </Link>
  );
};

export const AsideMenu = () => {
  const { data: session } = useSession();
  const { logOut } = useLogin();

  return (
    <Stack borderRight="1px solid" minH="100vh" p="4" w="200px">
      <Text>{session?.user?.email}</Text>
      <Divider />
      <ActiveLink path="/admin" text="Agregar horarios disponibles" />
      <ActiveLink path="/admin/turns" text="Lista de turnos" />

      <Button onClick={() => logOut()}>Salir</Button>
    </Stack>
  );
};
