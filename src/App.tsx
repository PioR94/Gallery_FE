import React from 'react';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import {AddForm} from "./components/AddForm";

function App() {
  return (
      <PrimeReactProvider>
          <AddForm></AddForm>
      </PrimeReactProvider>
  );
}

export default App;
