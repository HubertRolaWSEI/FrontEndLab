import { useReducer } from "react";
import AppReducer from './AppReducer';
import AppContext from "./AppContext";
import { people } from '../module-data'; 

const init = (initialData) => {
  return initialData.map(person => ({
    ...person,
    rating: person.rating || 0,
    check: person.check || false
  }));
};

function AppProvider({ children }) {
  const [state, appDispatch] = useReducer(AppReducer, people, init);
  
  return (
    <AppContext.Provider value={{ items: state, dispatch: appDispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;