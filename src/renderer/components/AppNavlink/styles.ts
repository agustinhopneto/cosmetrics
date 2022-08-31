import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  navlink: {
    transition: 'background-color 100ms',
    '&[data-active="true"] span span': {
      color: '#fff',
    },
    '&:hover': {
      background: theme.colors.pink[1],
    },
  },
}));
