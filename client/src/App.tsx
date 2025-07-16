import { Suspense, lazy } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router";

// Components
import Spinner from "@/components/Spinner";
import ErrorPage from "@/components/ErrorPage";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy Components
const Home = lazy(() => import("@/pages/Home"));
const Vault = lazy(() => import("@/pages/Vault"));
const CreatePassword = lazy(() => import("@/pages/vault/CreatePassword"));
const Password = lazy(() => import("@/pages/vault/Password"));
const EditPassword = lazy(() => import("@/pages/vault/EditPassword"));
const DeletePassword = lazy(() => import("@/pages/vault/DeletePassword"));
const Generate = lazy(() => import("@/pages/Generate"));
const About = lazy(() => import("@/pages/About"));
const Account = lazy(() => import("@/pages/Account"));
const EditProfile = lazy(() => import("@/pages/account/EditProfile"));
const ChangePassword = lazy(() => import("@/pages/account/ChangePassword"));
const DeleteAccount = lazy(() => import("@/pages/account/DeleteAccount"));
const Logout = lazy(() => import("@/pages/account/Logout"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Login = lazy(() => import("@/pages/auth/Login"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

function App() {
  return (
    <BrowserRouter>
    
      {/* NESTED ROUTES */}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="vault" element={<ProtectedRoute />}>
            <Route index element={<Vault />} />
            <Route path="create-password" element={<CreatePassword />} />
            <Route path=":id" element={<Password />} />
            <Route path="edit-password">
              <Route
                index
                element={
                  <ErrorPage
                    code={400}
                    status="Bad Request"
                    message="An ID is required to edit your password"
                  />
                }
              />
              <Route path=":id" element={<EditPassword />} />
            </Route>
            <Route path="delete-password">
              <Route
                index
                element={
                  <ErrorPage
                    code={400}
                    status="Bad Request"
                    message="An ID is required to delete your password"
                  />
                }
              />
              <Route path=":id" element={<DeletePassword />} />
            </Route>
          </Route>
          <Route path="generate-password" element={<Generate />} />
          <Route path="about-us" element={<About />} />
          <Route path="account" element={<ProtectedRoute />}>
            <Route index element={<Account />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="auth">
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password">
              <Route
                index
                element={
                  <ErrorPage
                    code={400}
                    status="Bad Request"
                    message="An ID is required to reset your password"
                  />
                }
              />
              <Route path=":token" element={<ResetPassword />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <ErrorPage
                code={404}
                status="Not Found"
                message="The requested URL does not match any available routes"
              />
            }
          />
        </Routes>
      </Suspense>

      {/* TOAST COMPONENT */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="colored"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
