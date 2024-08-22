import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { brandColors } from './colors';
import { Button } from './components';
import { styles } from './styles';

const chakraConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const overrides = {
  styles,
  colors: {
    brandColors
  },
  components: {
    Button,
  },
  chakraConfig
}

export default extendTheme(overrides);