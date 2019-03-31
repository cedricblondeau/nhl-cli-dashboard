import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import Dashboard from './components/Dashboard/Dashboard';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'NHL CLI Dashboard',
  debug: true,
  fullUnicode: false,
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

render(
  <Dashboard
    addKeypressListener={(key, fn) => screen.key(key, fn)}
    debug={msg => screen.debug(msg)}
  />,
  screen,
);
