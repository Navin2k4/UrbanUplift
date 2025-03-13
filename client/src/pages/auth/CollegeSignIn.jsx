import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CollegeSignIn = () => {
  const [formData, setFormData] = useState({
    collegeId: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = [
    { label: "College Administrator", value: "admin" },
    { label: "Department Head", value: "head" },
    { label: "Faculty Coordinator", value: "faculty" },
    { label: "Student", value: "student" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left Section - Image and Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-12 relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Welcome to UrbanUplift Educational Portal
              </h2>
              <p className="text-xl mb-8">
                Join our platform to engage your students in meaningful
                community service and urban development projects.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-users text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Student Engagement
                    </h3>
                    <p className="text-green-100">
                      Connect your students with real-world community projects
                      and volunteer opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-chart-bar text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Impact Tracking
                    </h3>
                    <p className="text-green-100">
                      Monitor and measure your institution's contribution to
                      community development.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-verified text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Certification
                    </h3>
                    <p className="text-green-100">
                      Provide verified certificates for student volunteer work
                      and project participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Divider className="border-white/20" />
              <div className="flex items-center justify-between text-sm">
                <span>Need help? Contact support</span>
                <Button
                  label="Learn More"
                  icon="pi pi-arrow-right"
                  className="p-button-text p-button-white"
                  onClick={() => (window.location.href = "/contact")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="p-6 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  College Portal Sign In
                </h2>
                <p className="text-gray-600">
                  Access your institution's dashboard and manage community
                  engagement
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="collegeId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Institution ID
                  </label>
                  <InputText
                    id="collegeId"
                    value={formData.collegeId}
                    onChange={(e) =>
                      setFormData({ ...formData, collegeId: e.target.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter your institution ID"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <Dropdown
                    id="role"
                    value={formData.role}
                    options={roles}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Select your role"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <InputText
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Password
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="mt-1 w-full"
                    toggleMask
                    feedback={false}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-green-600 hover:text-green-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  label="Sign In"
                  icon="pi pi-sign-in"
                  className="w-full bg-green-600 hover:bg-green-700"
                />
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  New institution?{" "}
                  <Link
                    to="/signup/college"
                    className="text-green-600 hover:text-green-500 font-medium"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSignIn;
