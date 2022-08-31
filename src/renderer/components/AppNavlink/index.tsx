import { NavLink, ThemeIcon } from '@mantine/core';

import { Route } from '../../routes';
import { useStyles } from './styles';

type AppNavlinkProps = {
  route: Route;
  active: boolean;
  onClick: () => void;
};

export function AppNavlink({ route, active, onClick }: AppNavlinkProps) {
  const { classes } = useStyles();

  return (
    <NavLink
      className={classes.navlink}
      color="pink"
      active={active}
      variant="filled"
      label={route.name}
      onClick={onClick}
      icon={
        <ThemeIcon
          sx={{
            background: 'transparent',
            color: '#ffffff',
          }}
        >
          {route.icon}
        </ThemeIcon>
      }
    />
  );
}
