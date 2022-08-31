import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  navlink: {
    '&[data-active="true"] span span': {
      color: '#fff',
    },
  },
}));
