import { extendTheme, StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";

const chakraConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const brandColors = {
  // Light mode
  primary: 'green.600',
  secondary: 'green.400',
  background: 'gray.200',
  textColor: 'gray.900',
  accentColor: 'green.500',

  // Dark mode
  primaryDark: 'green.400',
  secondaryDark: 'green.300',
  backgroundDark: 'gray.800',
  textColorDark: 'gray.100',
  accentColorDark: 'green.400',
};

export const theme = extendTheme({
  colors: {
    brandColors,
  },
  styles: {
    global: {
      '.fc-toolbar': {
        backgroundColor: 'gray.800',
        color: 'white',
      },
      '.fc-daygrid-day': {
        borderColor: 'gray.200',
        backgroundColor: 'gray.50',
      },
      '.fc-daygrid-event': {
        backgroundColor: 'teal.500',
        color: 'white',
      },
      '.fc-button': {
        backgroundColor: 'red.400',
        color: 'white',
        '&:hover': {
          backgroundColor: 'teal.600',
        },
      },
      '.fc-button.fc-button-primary': {
        backgroundColor: 'red.400',
        color: 'white',
        '&:hover': {
          backgroundColor: 'teal.600',
        },
      },
    }
  },
  components: {
    Button: {
      variants: {
        base: (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'dark' ? brandColors.primaryDark : brandColors.primary,
          color: props.colorMode === 'dark' ? brandColors.textColorDark : brandColors.textColor,
          _hover: {
            bg: props.colorMode === 'dark' ? brandColors.secondaryDark : brandColors.secondary,
          },
        }),
      },
      defaultProps: {
        variant: 'base'
      }
    },
  },
  chakraConfig,
});