import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import themeBase from "../theme/theme_base";
import { DaysProvider } from "../context/DaysProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={themeBase}>
      <DaysProvider>
        <Component {...pageProps} />
      </DaysProvider>
    </ChakraProvider>
  );
}

export default MyApp;
