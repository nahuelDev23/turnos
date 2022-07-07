import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const themeBase = extendTheme({
  colors: {
    green: {
      // 500:#8534273
    },
  },
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("gray.400", "gray.700")(props),
      },
      fonts: {
        // heading: "inconsolata",
        // body: "Roboto Mono",
      },
    }),
  },
});

export default themeBase;
