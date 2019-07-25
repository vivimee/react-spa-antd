/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom';

import Loading from '../components/Loading';

const pageConfig = {
  Homepage: () => import(/* webpackChunkName: "home-page" */'../containers/Homepage'),
  Detailpage: () => import(/* webpackChunkName: "detail-page" */'../containers/Detailpage'),
  NotFound: () => import(/* webpackChunkName: "not-found" */'../containers/Notfound'),
};

const pages = {};
Object.entries(pageConfig).forEach(([key, value]) => {
  pages[key] = Loadable({
    loading: Loading,
    loader: value,
  });
});

const createRoutes = () => (
  <Switch>
    <Route exact path="/" component={pages.Homepage} />
    <Route path="/detail" component={pages.Detailpage} />
    <Route component={pages.NotFound} />
  </Switch>
);

export default createRoutes;
