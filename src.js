import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/Payment";

const stripePromise = loadStripe("your_publishable_key"); // Replace with your Stripe Publishable Key

function App() {
  return (
    <Router>
      <nav>
        <Link to="/payment">Payment</Link>
      </nav>
      <Routes>
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
