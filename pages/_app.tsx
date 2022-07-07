import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import themeBase from "../theme/theme_base";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={themeBase}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
