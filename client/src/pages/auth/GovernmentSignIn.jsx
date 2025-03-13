import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GovernmentSignIn = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    department: "",
    email: "",
    password: "",
  });

  const departments = [
    { label: "Municipal Corporation", value: "municipal" },
    { label: "Public Works", value: "public_works" },
    { label: "Urban Development", value: "urban_dev" },
    { label: "Environmental Protection", value: "environment" },
    { label: "Transportation", value: "transport" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left Section - Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-12 relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Welcome to UrbanUplift Government Portal
              </h2>
              <p className="text-xl mb-8">
                Access your department's dashboard to efficiently manage and
                resolve community issues. Make data-driven decisions for better
                urban governance.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12L20 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12L4 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Smart Issue Management
                    </h3>
                    <p className="text-green-100">
                      AI-powered issue categorization and routing system for
                      efficient problem resolution across departments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 15C4 15 5 14 8 14C11 14 13 16 16 16C19 16 20 15 20 15V3C20 3 19 4 16 4C13 4 11 2 8 2C5 2 4 3 4 3V15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 22V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Real-time Analytics
                    </h3>
                    <p className="text-green-100">
                      Access comprehensive dashboards with real-time data to
                      monitor department performance and city trends.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Inter-department Collaboration
                    </h3>
                    <p className="text-green-100">
                      Seamlessly coordinate with other departments for complex
                      issue resolution and project management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Divider className="border-white/20" />
              <div className="flex items-center justify-between text-sm">
                <span>Need access to department resources?</span>
                <Button
                  label="View Department Guide"
                  icon="pi pi-file-pdf"
                  className="p-button-text p-button-white"
                  onClick={() => console.log("View department guide")}
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
                  Government Sign In
                </h2>
                <p className="text-gray-600">
                  Access your department's dashboard and manage city issues
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="employeeId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee ID
                  </label>
                  <InputText
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeId: e.target.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter your employee ID"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <Dropdown
                    id="department"
                    value={formData.department}
                    options={departments}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Select your department"
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
                    placeholder="Enter your official email"
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
                  icon="pi pi-shield"
                  className="w-full bg-green-600 hover:bg-green-700"
                />
              </form>

              <Divider align="center" className="my-6">
                <span className="text-gray-500">Important Notice</span>
              </Divider>

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  This portal is exclusively for government officials. Please
                  ensure you have the necessary authorization.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    label="Department Guide"
                    icon="pi pi-file-pdf"
                    className="p-button-outlined"
                    onClick={() => console.log("View department guide")}
                  />
                  <Button
                    label="Help Desk"
                    icon="pi pi-phone"
                    className="p-button-outlined"
                    onClick={() => (window.location.href = "/contact")}
                  />
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Need department access?{" "}
                  <Link
                    to="/contact"
                    className="text-green-600 hover:text-green-500 font-medium"
                  >
                    Contact administrator
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

export default GovernmentSignIn;
