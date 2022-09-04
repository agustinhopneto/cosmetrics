import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  pagination: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  paginationContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  paginationLimit: {
    width: 72,
  },
}));
