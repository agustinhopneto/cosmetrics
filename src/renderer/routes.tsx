import { MemoryRouter, Routes as AppRoutes, Route } from 'react-router-dom';
import { Home } from './views/Home/ìndex';

export function Routes() {
  return (
    <MemoryRouter>
      <AppRoutes>
        <Route path="/" element={<Home />} />
      </AppRoutes>
    </MemoryRouter>
  );
}
