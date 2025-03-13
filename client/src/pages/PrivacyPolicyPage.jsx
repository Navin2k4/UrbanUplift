import React from "react";
import { motion } from "framer-motion";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number)",
        "Location data for issue reporting",
        "Device information and IP address",
        "Usage data and interaction with our platform",
        "Photos and media uploaded for issue reporting",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To process and manage reported issues",
        "To communicate updates and progress",
        "To improve our services and user experience",
        "To maintain platform security and prevent fraud",
        "To analyze usage patterns and optimize performance",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "With relevant city departments for issue resolution",
        "With service providers who assist our operations",
        "When required by law or government authorities",
        "With your consent for specific purposes",
        "In anonymized form for analytics",
      ],
    },
    {
      title: "Your Rights and Choices",
      content: [
        "Access and update your personal information",
        "Request deletion of your data",
        "Opt-out of marketing communications",
        "Control location data sharing",
        "Manage cookie preferences",
      ],
    },
    {
      title: "Data Security",
      content: [
        "Industry-standard encryption protocols",
        "Regular security audits and monitoring",
        "Secure data storage and transmission",
        "Employee data handling training",
        "Incident response procedures",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We are committed to protecting your privacy and ensuring the
              security of your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600"
          >
            Last Updated: {new Date().toLocaleDateString()}
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Questions About Privacy?
              </h2>
              <p className="mb-6">
                If you have any questions about our privacy policy or how we
                handle your data, please don't hesitate to contact us.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <i className="pi pi-envelope mr-2"></i>
                  Contact Us
                </a>
                <a
                  href="/faq"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <i className="pi pi-question-circle mr-2"></i>
                  View FAQs
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
