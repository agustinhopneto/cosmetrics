import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'pink',
  fontFamily: 'Lexend, sans-serif',
  headings: { fontFamily: 'Lexend, sans-serif' },
  components: {
    Title: {
      styles: {
        root: {
          color: '#25262B',
        },
      },
    },
    Text: {
      styles: {
        root: {
          color: '#2C2E33',
        },
      },
    },
  },
};
