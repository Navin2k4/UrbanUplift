import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const GovernmentSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    designation: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const departments = [
    { label: "Municipal Corporation", value: "municipal" },
    { label: "Public Works", value: "public_works" },
    { label: "Urban Development", value: "urban_dev" },
    { label: "Environmental Protection", value: "environment" },
    { label: "Transportation", value: "transport" },
  ];

  const designations = [
    { label: "Department Head", value: "head" },
    { label: "Senior Officer", value: "senior_officer" },
    { label: "Officer", value: "officer" },
    { label: "Coordinator", value: "coordinator" },
    { label: "Inspector", value: "inspector" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/government/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            employeeId: formData.employeeId,
            department: formData.department,
            designation: formData.designation,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Registration successful",
      });

      navigate("/govt/dashboard");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to register",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast ref={toast} />
      <div className="flex min-h-screen">
        {/* Left Section - Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-12 relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Join UrbanUplift Government Portal
              </h2>
              <p className="text-xl mb-8">
                Register to access powerful tools for urban governance and
                community development.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-shield text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Streamlined Management
                    </h3>
                    <p className="text-green-100">
                      Efficiently manage and respond to community issues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-chart-line text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Data-Driven Decisions
                    </h3>
                    <p className="text-green-100">
                      Access analytics and insights for better governance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-users text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Collaborative Platform
                    </h3>
                    <p className="text-green-100">
                      Work seamlessly with other departments and stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Divider className="border-white/20" />
              <div className="flex items-center justify-between text-sm">
                <span>Already have access?</span>
                <Link
                  to="/signin/government"
                  className="text-white hover:text-green-100"
                >
                  Sign in here →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Sign Up Form */}
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
                  Government Official Registration
                </h2>
                <p className="text-gray-600">
                  Create your account to access the portal
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <InputText
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

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
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <Dropdown
                    id="designation"
                    value={formData.designation}
                    options={designations}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Select your designation"
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
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <InputText
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter your contact number"
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
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Password
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="mt-1 w-full"
                    toggleMask
                    feedback={false}
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  label="Register"
                  icon="pi pi-shield"
                  loading={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                />
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have access?{" "}
                  <Link
                    to="/signin/government"
                    className="text-green-600 hover:text-green-500 font-medium"
                  >
                    Sign in
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

export default GovernmentSignUp;
