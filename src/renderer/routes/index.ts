import React from 'react';
import {
  RiFlaskFill,
  RiListCheck,
  RiTestTubeFill,
  RiTruckFill,
} from 'react-icons/ri';
import _ from 'lodash';
import { IngredientsCategories } from '../views/Categories';
import { IngredientsProperties } from '../views/Properties';
import { Ingredients } from '../views/Ingredients';
import { Providers } from '../views/Providers';

export type Route = {
  name: string;
  icon?: React.ReactNode;
  path: string;
  view: React.ReactNode;
  children?: Route[];
};

export const routes: Route[] = [
  {
    name: 'Fornecedores',
    icon: React.createElement(RiTruckFill),
    path: '/',
    view: React.createElement(Providers),
  },
  {
    name: 'Ingredientes',
    icon: React.createElement(RiFlaskFill),
    path: '/ingredients',
    view: React.createElement(Ingredients),
    children: [
      {
        name: 'Categorias',
        icon: React.createElement(RiListCheck),
        path: '/ingredients/categories',
        view: React.createElement(IngredientsCategories),
      },
      {
        name: 'Propriedades',
        icon: React.createElement(RiTestTubeFill),
        path: '/ingredients/properties',
        view: React.createElement(IngredientsProperties),
      },
    ],
  },
];

const getRoutes = (route: Route): [Route, Route[]] | Route => {
  const routeCopy = { ...route };
  delete routeCopy.children;

  if (!route.children || !route.children.length) {
    return routeCopy;
  }

  return [routeCopy, _.flatMapDeep(route.children, getRoutes)];
};

export const getNormalizedRoutes = (): Route[] => {
  return _.flatMapDeep(routes, getRoutes);
};
