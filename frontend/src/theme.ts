import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const chakraConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _disabled: {
          bg: "gray.400",
          cursor: "not-allowed",
        },
      },
    },
  },
  chakraConfig,
});