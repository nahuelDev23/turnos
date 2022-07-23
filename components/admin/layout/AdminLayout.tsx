import React, { FC } from "react";
import { Stack } from "@chakra-ui/react";

import { AsideMenu } from "./AsideMenu";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <Stack direction="row">
      <AsideMenu />
      <Stack p="4">{children}</Stack>
    </Stack>
  );
};
