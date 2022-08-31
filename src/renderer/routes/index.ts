import React from 'react';
import { RiTruckFill } from 'react-icons/ri';
import { Providers } from '../views/Providers';

export type Route = {
  name: string;
  icon: React.ReactNode;
  path: string;
  view: React.ReactNode;
};

export const routes: Route[] = [
  {
    name: 'Fornecedores',
    icon: React.createElement(RiTruckFill),
    path: '/',
    view: React.createElement(Providers),
  },
];
