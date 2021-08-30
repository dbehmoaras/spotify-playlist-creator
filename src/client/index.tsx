import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import "./../assets/index.scss"
import * as dotenv from 'dotenv';

// dotenv.config();

render(
  <App />,
  document.getElementById('root')
);