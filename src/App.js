import React from 'react';

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoListClass from "./components/TodoListClass";
import PokemonList from "./components/PokemonList";
import PokemonSearchFunction from './components/PokemonSearchWithFunction';
import TodoScreen from './screens/TodoScreen';


import PokemonSearchClass from './components/pokemon/PokemonSearchClass';

function App() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, []);

  return (
    <>
    <PokemonSearchClass/>
    {/* < PokemonSearchFunction/> */}
    {/* <PokemonSearchClass/> */}
      {/* <PokemonList /> */}
      {/* <TodoInput /> */}
      {/* {visible && <TodoList />} */}
      {/* {visible && <TodoListClass />} */}
      <TodoScreen />
    </>
  );
};

export default App;
