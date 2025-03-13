import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputTextarea } from "primereact/inputtextarea";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const NGOSignUp = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationId: "",
    registrationNumber: "",
    description: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

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
      const response = await fetch("/api/auth/ngo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.organizationName,
          organizationId: formData.organizationId,
          registrationNumber: formData.registrationNumber,
          description: formData.description,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          role: "NGO",
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
        navigate("/signin/ngo");
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
                Join UrbanUplift as an NGO Partner
              </h2>
              <p className="text-xl mb-8">
                Partner with us to create lasting impact in communities.
                Register your organization and start making a difference.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-globe text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Expand Your Impact
                    </h3>
                    <p className="text-green-100">
                      Connect with communities and amplify your organization's
                      reach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-users text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Collaborate & Network
                    </h3>
                    <p className="text-green-100">
                      Partner with other organizations and government bodies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <i className="pi pi-chart-bar text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Track & Measure Impact
                    </h3>
                    <p className="text-green-100">
                      Access analytics and reports to measure your community
                      impact.
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
                  to="/signin/ngo"
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
                  Register Your NGO
                </h2>
                <p className="text-gray-600">
                  Create an account to start your partnership
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="organizationName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Organization Name
                  </label>
                  <InputText
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationName: e.target.value,
                      })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter organization name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="organizationId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Organization ID
                  </label>
                  <InputText
                    id="organizationId"
                    value={formData.organizationId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationId: e.target.value,
                      })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter organization ID"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="registrationNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Registration Number
                  </label>
                  <InputText
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter NGO registration number"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Organization Description
                  </label>
                  <InputTextarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 w-full"
                    placeholder="Brief description of your organization"
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
                    placeholder="Enter organization email"
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
                      setFormData({
                        ...formData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="mt-1 w-full"
                    placeholder="Enter contact number"
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
                    placeholder="Enter organization address"
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
                  label="Register NGO"
                  icon="pi pi-building"
                  loading={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                />
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already registered?{" "}
                  <Link
                    to="/signin/ngo"
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

export default NGOSignUp;
