import type { NextPage } from "next";

import { Button, useColorMode } from "@chakra-ui/react";

import { PublicLayout } from "../components/Layout/PublicLayout";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <PublicLayout>
      {colorMode}
      <Button onClick={() => toggleColorMode()}>Change color</Button>
    </PublicLayout>
  );
};

export default Home;
