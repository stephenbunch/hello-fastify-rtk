import { TodoApp } from "./TodoApp";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
