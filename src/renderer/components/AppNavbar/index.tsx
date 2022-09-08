import { Image, Navbar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { routes } from '../../routes';
import logo from '../../assets/images/logo.svg';
import { AppNavlink } from '../AppNavlink';

export function AppNavbar() {
  const [activeRoute, setActive] = useState(routes[0].path);
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path: string) => {
      setActive(path);
      navigate(path);
    },
    [navigate]
  );

  return (
    <Navbar width={{ base: 220 }}>
      <Navbar.Section py={32} px={48} mb={64}>
        <Image src={logo} />
      </Navbar.Section>
      <Navbar.Section>
        {routes.map((route) => (
          <AppNavlink
            key={route.path}
            route={route}
            active={activeRoute === route.path}
            onClick={() => handleNavigate(route.path)}
          />
        ))}
      </Navbar.Section>
    </Navbar>
  );
}
