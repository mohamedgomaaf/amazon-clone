import "bootstrap/dist/css/bootstrap.min.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Payment from "./components/Payment";
import { useAuth } from "./context/GlobalState";
import { auth } from "./firebase";
import "./App.css";

const App = () => {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51M8qBGGgMfG9lrQtwQD96xCOGZUGCke60ampxG6veTlOT3bRrKATseNAiOzXTUNYB7GyXIDHzsgSTqkcMXgnHCXL00jKa12Jue"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>  
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              {/* <Orders /> */}
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1 className="text-center mt-5">Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
