import { StyleFunctionProps } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { brandColors } from '../colors';

export const Switch = {
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
}