import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeP from "./Pages/HomeP";
import MessengerP from "./Pages/MessengerP";
import PrivateRoute from "./Components/Authentification/PrivateRoute";
import { useDispatch } from "react-redux";
import { getcurrent } from "./Redux/actions/authActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getcurrent());
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeP />} />
        <Route
          path="/messenger"
          element={
            <PrivateRoute>
              <MessengerP />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
