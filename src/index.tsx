// Keep wdyr at top of file
// organize-imports-ignore
import './wdyr';
import 'regenerator-runtime/runtime';

import React from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './MainApp';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <div>
    <MainApp />
  </div>
);
