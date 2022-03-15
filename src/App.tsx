import "./css/template.scss";
import "./css/styles.scss";
import CarList from "./pages/CarList";
import { useDispatch } from "react-redux";
import { getAllCars } from "./api/api";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Client from "./pages/Client";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Rented from "./pages/Rented";
import RentedHistory from "./pages/History";

let hasLoaded = false;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(getAllCars);
      hasLoaded = true;
    }
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route index element={<CarList />} />
        <Route path="/client/" element={<Navbar />}>
          <Route index element={<Client />} />
          <Route path="login" element={<Login />} />
          <Route path="rented" element={<Rented />} />
          <Route path="history" element={<RentedHistory />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
