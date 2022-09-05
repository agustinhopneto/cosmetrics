import { Box, Title } from '@mantine/core';
import { useStyles } from './styles';

type AppHeaderProps = {
  children: React.ReactNode;
  title: string;
};
export function AppHeader({ children, title }: AppHeaderProps) {
  const { classes } = useStyles();

  return (
    <Box className={classes.header}>
      <Title>{title}</Title>
      {children}
    </Box>
  );
}
