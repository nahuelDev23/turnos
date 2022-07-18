import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import themeBase from "../theme/theme_base";
import { DaysProvider } from "../context/DaysProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={themeBase}>
        <DaysProvider>
          <Component {...pageProps} />
        </DaysProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
