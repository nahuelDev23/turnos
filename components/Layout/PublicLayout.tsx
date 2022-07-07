import { Container } from "@chakra-ui/react";
import React, { FC } from "react";

import { IMetadata } from "../../interface";

import { HeadComponent } from "./HeadComponent";

interface Props {
  children: React.ReactNode;
  metadata?: IMetadata;
}

export const PublicLayout: FC<Props> = ({ children, metadata }) => {
  return (
    <Container maxWidth="container.xl" position="relative">
      <HeadComponent metadata={metadata} />
      {children}
    </Container>
  );
};
