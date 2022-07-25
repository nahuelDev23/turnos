import { Container } from "@chakra-ui/react";
import React, { FC } from "react";
import { useRouter } from "next/router";

import { IMetadata } from "../../interface";
import { Navbar } from "../users/Navbar";

import { HeadComponent } from "./HeadComponent";

interface Props {
  children: React.ReactNode;
  metadata?: IMetadata;
}

export const PublicLayout: FC<Props> = ({ children, metadata }) => {
  const router = useRouter();

  return (
    <Container maxWidth="container.xl" position="relative">
      <HeadComponent metadata={metadata} />
      <Container mt="4">
        {router.pathname !== "/auth/login" && <Navbar />}
        {children}
      </Container>
    </Container>
  );
};
