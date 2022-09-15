import { NavLink, ThemeIcon } from '@mantine/core';

import { Route } from '../../routes';
import { useStyles } from './styles';

type AppNavlinkProps = {
  route: Route;
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

export function AppNavlink({
  route,
  active,
  onClick,
  children,
}: AppNavlinkProps) {
  const { classes } = useStyles();
  return (
    <NavLink
      className={classes.navlink}
      color="pink"
      active={active}
      variant="filled"
      label={route.name}
      onClick={onClick}
      children={children || undefined}
      opened
      icon={
        route.icon ? (
          <ThemeIcon
            variant="filled"
            sx={() => ({
              color: '#fff',
            })}
          >
            {route.icon}
          </ThemeIcon>
        ) : undefined
      }
    />
  );
}
