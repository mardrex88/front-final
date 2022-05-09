import React from 'react';

import { StoreProvider } from './Store';
import FormView from "./list/FormView";
import ListView from "./list/ListView";

function App() {
  return <StoreProvider>
    <ListView/>
    <FormView/>
    
  </StoreProvider>
}

export default App;
