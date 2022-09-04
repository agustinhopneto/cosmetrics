import {
  Box,
  Paper,
  Text,
  Select,
  Pagination as MPagination,
} from '@mantine/core';
import { useStyles } from './styles';

type PaginationProps = {
  totalItems: number;
  pageLimit: string | null;
  setPageLimit: (value: string | null) => void;
  page: number;
  setPage?: ((page: number) => void) | undefined;
  totalPages: number;
};

export const pageLimits = ['10', '20', '50', '100'];

export function Pagination({
  totalItems,
  pageLimit,
  setPageLimit,
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  const { classes } = useStyles();
  return (
    <Paper className={classes.pagination} p="xl">
      <Box className={classes.paginationContent}>
        <Text>{totalItems} itens |</Text>
        <Select
          className={classes.paginationLimit}
          value={pageLimit}
          onChange={setPageLimit}
          data={pageLimits}
        />
        <Text>/ página</Text>
      </Box>
      <MPagination page={page} onChange={setPage} total={totalPages} />
    </Paper>
  );
}
