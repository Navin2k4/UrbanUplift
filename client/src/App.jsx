import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Main Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";

// Auth Pages
import CitizenSignIn from "./pages/auth/CitizenSignIn";
import NGOSignIn from "./pages/auth/NGOSignIn";
import GovernmentSignIn from "./pages/auth/GovernmentSignIn";
import CollegeSignIn from "./pages/auth/CollegeSignIn";
import CitizenDashBoard from "./pages/Dashboard/CitizenDashboard";
import NGODasboard from "./pages/Dashboard/NGODasboard";
import NGOSignUp from "./pages/auth/NGOSignUp";
import GovernmentSignUp from "./pages/auth/GovernmentSignUp";
import CollegeSignUp from "./pages/auth/CollegeSignUp";
import CitizenSignUp from "./pages/auth/CitizenSignUp";
import OfficialDashboard from "./pages/Dashboard/OfficialDashboard";

function App() {
  return (
    <Router>
      <PrimeReactProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/dept/:department" element={<DepartmentsPage />} />
                <Route
                  path="/success-stories"
                  element={<SuccessStoriesPage />}
                />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* Auth Routes */}
                <Route path="/signin/citizen" element={<CitizenSignIn />} />
                <Route path="/signin/ngo" element={<NGOSignIn />} />
                <Route
                  path="/signin/government"
                  element={<GovernmentSignIn />}
                />
                <Route path="/signin/college" element={<CollegeSignIn />} />

                <Route path="/signup/citizen" element={<CitizenSignUp />} />
                <Route path="/signup/ngo" element={<NGOSignUp />} />
                <Route
                  path="/signup/government"
                  element={<GovernmentSignUp />}
                />
                <Route path="/signup/college" element={<CollegeSignUp />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard/citizen"
                  element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                      <CitizenDashBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/ngo"
                  element={
                    <ProtectedRoute allowedRoles={["NGO"]}>
                      <NGODasboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/:department"
                  element={
                    <ProtectedRoute allowedRoles={["GOVT"]}>
                      <OfficialDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </PrimeReactProvider>
    </Router>
  );
}

export default App;
