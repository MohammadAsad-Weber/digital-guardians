import { Suspense, lazy } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router";

// Components
import Spinner from "./components/spinner";
import ErrorPage from "./components/error-page";
import ProtectedRoute from "./components/protected-route";
import NavigateProvider from "./components/navigate-provider";

// Public Pages
const HomePage = lazy(() => import("./pages/home-page"));
const AboutPage = lazy(() => import("./pages/about-page"));
const GeneratorPage = lazy(() => import("./pages/generate-page"));

// Vault Pages
const VaultPage = lazy(() => import("./pages/vault-page"));
const Password = lazy(() => import("./pages/vault/password"));
const EditPassword = lazy(() => import("./pages/vault/edit-password"));
const CreatePassword = lazy(() => import("./pages/vault/create-password"));
const DeletePassword = lazy(() => import("./pages/vault/delete-password"));

// Account Pages
const Logout = lazy(() => import("./pages/account/logout"));
const AccountPage = lazy(() => import("./pages/account-page"));
const EditProfile = lazy(() => import("./pages/account/edit-profile"));
const DeleteAccount = lazy(() => import("./pages/account/delete-account"));
const ChangePassword = lazy(() => import("./pages/account/change-password"));

// Auth Pages
const Login = lazy(() => import("./pages/auth/login"));
const Signup = lazy(() => import("./pages/auth/signup"));
const ResetPassword = lazy(() => import("./pages/auth/reset-password"));
const ForgotPassword = lazy(() => import("./pages/auth/forgot-password"));

function App() {
  return (
    <BrowserRouter>
    
      {/* NAVIGATE PROVIDER */}
      <NavigateProvider>
        
        {/* GLOBAL LOADER --> NESTED ROUTES */}
        <Suspense fallback={<Spinner />}>
          <Routes>

            {/* PUBLIC PAGES */}
            <Route index element={<HomePage />} />
            <Route path="generate-password" element={<GeneratorPage />} />
            <Route path="about-us" element={<AboutPage />} />

            {/* VAULT PAGES */}
            <Route path="vault" element={<ProtectedRoute />}>
              <Route index element={<VaultPage />} />
              <Route path=":id" element={<Password />} />
              <Route path="create-password" element={<CreatePassword />} />
              <Route path="edit-password">
                <Route path=":id" element={<EditPassword />} />
                <Route
                  index
                  element={
                    <ErrorPage
                      status="Bad Request"
                      status_code={400}
                      message="A valid Object ID is required to proceed"
                    />
                  }
                />
              </Route>
              <Route path="delete-password">
                <Route path=":id" element={<DeletePassword />} />
                <Route
                  index
                  element={
                    <ErrorPage
                      status="Bad Request"
                      status_code={400}
                      message="A valid Object ID is required to proceed"
                    />
                  }
                />
              </Route>
            </Route>

            {/* ACCOUNT PAGES */}
            <Route path="account" element={<ProtectedRoute />}>
              <Route index element={<AccountPage />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="delete-account" element={<DeleteAccount />} />
              <Route path="logout" element={<Logout />} />
            </Route>

            {/* AUTH PAGES */}
            <Route path="auth">
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password">
                <Route path=":token" element={<ResetPassword />} />
                <Route
                  index
                  element={
                    <ErrorPage
                      status="Bad Request"
                      status_code={400}
                      message="The password reset link appears to be broken or incomplete"
                    />
                  }
                />
              </Route>
            </Route>

            {/* FALLBACK PAGE */}
            <Route
              path="*"
              element={
                <ErrorPage
                  status_code={404}
                  status="Not Found"
                  message={`The requested URL "${window.location.toString()}" could not be located`}
                />
              }
            />

          </Routes>
        </Suspense>

        {/* TOAST COMPONENT */}
        <ToastContainer
          position="top-right"
          theme="colored"
          stacked={true}
          draggable={true}
          autoClose={3000}
          newestOnTop={true}
          pauseOnHover={true}
          closeOnClick={true}
          transition={Bounce}
          pauseOnFocusLoss={true}
        />

      </NavigateProvider>
      
    </BrowserRouter>
  );
}

export default App;
