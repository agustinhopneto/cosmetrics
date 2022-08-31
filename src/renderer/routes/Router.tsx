import { Routes as AppRoutes, Route } from 'react-router-dom';
import { routes } from './index';

export function Router() {
  return (
    <AppRoutes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.view} />
      ))}
    </AppRoutes>
  );
}
