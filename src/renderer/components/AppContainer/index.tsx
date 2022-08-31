import { AppShell, AppShellProps } from '@mantine/core';
import { AppNavbar } from '../AppNavbar';
import { useStyles } from './styles';

type AppContainerProps = AppShellProps;

export function AppContainer({ children }: AppContainerProps) {
  const { classes } = useStyles();
  return (
    <AppShell
      padding="lg"
      navbar={<AppNavbar />}
      className={classes.appContainer}
    >
      {children}
    </AppShell>
  );
}
