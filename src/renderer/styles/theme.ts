import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'pink',
  fontFamily: 'Lexend, sans-serif',
  headings: { fontFamily: 'Lexend, sans-serif' },
  components: {
    Title: {
      styles: {
        root: {
          color: '#373A40',
          overflowWrap: 'break-word',
        },
      },
    },
    Text: {
      styles: {
        root: {
          color: '#5C5F66',
          overflowWrap: 'break-word',
        },
      },
    },
  },
};
