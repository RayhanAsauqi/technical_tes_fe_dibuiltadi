import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./lib/middleware/private-route";
import RootRoute from "./lib/middleware/root-route";
import LoadingPage from "./pages/Loading";

const SummaryPage = lazy(() => import("./pages/Summary"));
const AuthPage = lazy(() => import("./pages/Auth"));
const CustomerPage = lazy(() => import("./pages/Customer"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const DetailTransactionPage = lazy(() => import("./pages/DetailTransaction"));

function App() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/summary"
            element={
              <PrivateRoute>
                <SummaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <PrivateRoute>
                <CustomerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <TransactionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions/:no"
            element={
              <PrivateRoute>
                <DetailTransactionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
