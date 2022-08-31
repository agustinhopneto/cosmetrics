import React from 'react';
import { RiFlaskFill, RiTruckFill } from 'react-icons/ri';
import { Ingredients } from '../views/Ingredients';
import { Providers } from '../views/Providers';

export type Route = {
  name: string;
  icon: React.ReactNode;
  path: string;
  view: React.ReactNode;
};

export const routes: Route[] = [
  {
    name: 'Ingredientes',
    icon: React.createElement(RiFlaskFill),
    path: '/',
    view: React.createElement(Ingredients),
  },
  {
    name: 'Fornecedores',
    icon: React.createElement(RiTruckFill),
    path: '/providers',
    view: React.createElement(Providers),
  },
];
