import { Box, Text, Icon, Switch, IconButton, useColorMode, useBreakpointValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Switch
      isChecked={colorMode === 'dark'}
      onChange={toggleColorMode}
      aria-label="Toggle color mode"
      // sx={{
      //   "span > span:first-child::after": {
      //     content: colorMode === 'dark' ? <MoonIcon /> : <SunIcon />
      //   }
      // }}
    >
      <Icon as={colorMode === 'dark' ? MoonIcon : SunIcon} boxSize={6} />
    </Switch>
  );
};
