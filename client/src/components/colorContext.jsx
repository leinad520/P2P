import React from 'react';
import reducerFunction from './colorReducer.jsx';

const colors = {
  blue: "#03619c",
  yellow: "#8c8f03",
  red: "#9c0312"
};

const state = reducerFunction();

export const ColorContext = React.createContext(colors);

export const ColorProvider = ({children}) => {
  console.log(reducerFunction());
  return (
    <ColorContext.Provider value={colors}>
      {children}
    </ColorContext.Provider>
  )
};

