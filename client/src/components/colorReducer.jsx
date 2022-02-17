import React, { useReducer } from 'react';

// export const StateContext = React.createContext();

const updateStateReducer = (state, action) => {
  // switch statement that updates state here
  // returns copy of modified state object
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
};
const initialState = {
  blue: "#03619c",
  yellow: "#8c8f03",
  red: "#9c0312"
};

const reducerFunction = () => {
const [state, dispatch] = useReducer(updateStateReducer, initialState);
//                             function to update state   setting initial state

// object that we export is... state:
return state
}


export default reducerFunction;