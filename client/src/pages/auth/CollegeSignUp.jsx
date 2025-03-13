import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const CollegeSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    collegeId: "",
    collegeName: "",
    department: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const departments = [
    { label: "Computer Science", value: "cs" },
    { label: "Information Technology", value: "it" },
    { label: "Electronics", value: "ec" },
    { label: "Mechanical", value: "me" },
    { label: "Civil", value: "ce" },
  ];

  const roles = [
    { label: "College Administrator", value: "admin" },
    { label: "Department Head", value: "head" },
    { label: "Faculty Coordinator", value: "faculty" },
    { label: "Student", value: "student" },
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
      const response = await fetch("/api/auth/college/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          collegeId: formData.collegeId,
          collegeName: formData.collegeName,
          department: formData.department,
          role: "NSS",
          collegeRole: formData.role,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Registration successful! Please sign in to continue.",
      });

      // Redirect to sign in page after successful registration
      setTimeout(() => {
        navigate("/signin/college");
      }, 1500);
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
                Join UrbanUplift Educational Network
              </h2>
              <p className="text-xl mb-8">
                Connect your institution with community service opportunities
                and empower students to make a difference.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-book text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Educational Impact
                    </h3>
                    <p className="text-green-100">
                      Integrate community service with academic learning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-users text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Student Engagement
                    </h3>
                    <p className="text-green-100">
                      Create opportunities for meaningful community involvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-chart-bar text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Track Progress
                    </h3>
                    <p className="text-green-100">
                      Monitor and measure student participation and impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Divider className="border-white/20" />
              <div className="flex items-center justify-between text-sm">
                <span>Already registered?</span>
                <Link
                  to="/signin/college"
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
                  Educational Institution Registration
                </h2>
                <p className="text-gray-600">
                  Create an account to join our network
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
                    htmlFor="collegeName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    College Name
                  </label>
                  <InputText
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) =>
                      setFormData({ ...formData, collegeName: e.target.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter college name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="collegeId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    College ID
                  </label>
                  <InputText
                    id="collegeId"
                    value={formData.collegeId}
                    onChange={(e) =>
                      setFormData({ ...formData, collegeId: e.target.value })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter college ID"
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
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <InputTextarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={2}
                    className="mt-1 w-full"
                    placeholder="Enter college address"
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
                  icon="pi pi-user-plus"
                  loading={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                />
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already registered?{" "}
                  <Link
                    to="/signin/college"
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

export default CollegeSignUp;
