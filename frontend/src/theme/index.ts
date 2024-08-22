import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { brandColors } from './colors';
import { Button, Switch } from './components';
import { styles } from './styles';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const overrides = {
  styles,
  colors: {
    brandColors
  },
  components: {
    Button,
    Switch
  },
  config
}

export default extendTheme(overrides);