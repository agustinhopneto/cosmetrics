import { Routes, Route } from 'react-router-dom';
import { getNormalizedRoutes } from './index';

const routes = getNormalizedRoutes();

export function Router() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.view} />
      ))}
    </Routes>
  );
}
