import React from "react";
import { motion } from "framer-motion";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";

const TermsPage = () => {
  const terms = [
    {
      title: "Acceptance of Terms",
      content: `By accessing and using UrbanUplift, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.`,
      details: [
        "Agreement to all terms upon use",
        "Compliance with local laws",
        "Age restrictions and eligibility",
        "Account responsibility",
      ],
    },
    {
      title: "User Accounts",
      content: `To access certain features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account.`,
      details: [
        "Accurate registration information",
        "One account per user",
        "Password security",
        "Account activity responsibility",
      ],
    },
    {
      title: "Issue Reporting",
      content: `When reporting issues through our platform, you agree to provide accurate and truthful information. False reporting may result in account suspension.`,
      details: [
        "Accurate issue description",
        "Relevant photo evidence",
        "Location accuracy",
        "No false reporting",
      ],
    },
    {
      title: "Content Guidelines",
      content: `Users must follow content guidelines when submitting reports or interacting with the platform. Inappropriate content will be removed.`,
      details: [
        "Appropriate language",
        "Relevant content only",
        "No harmful content",
        "Respectful communication",
      ],
    },
    {
      title: "Service Modifications",
      content: `We reserve the right to modify or discontinue the service at any time. Users will be notified of significant changes.`,
      details: [
        "Service availability",
        "Feature modifications",
        "Update notifications",
        "Continued use agreement",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
              Terms of Service
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Please read these terms carefully before using UrbanUplift. By
              using our service, you agree to these terms.
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

      {/* Terms Sections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {terms.map((term, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {term.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{term.content}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Key Points:
                    </h3>
                    <ul className="space-y-2">
                      {term.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Additional Information
              </h2>
              <Accordion>
                <AccordionTab header="Governing Law">
                  <p className="text-gray-600">
                    These terms shall be governed by and construed in accordance
                    with local laws. Any disputes will be subject to the
                    exclusive jurisdiction of local courts.
                  </p>
                </AccordionTab>
                <AccordionTab header="Changes to Terms">
                  <p className="text-gray-600">
                    We reserve the right to modify these terms at any time.
                    Users will be notified of significant changes. Continued use
                    of the service constitutes acceptance of modified terms.
                  </p>
                </AccordionTab>
                <AccordionTab header="Contact Information">
                  <p className="text-gray-600">
                    For any questions regarding these terms, please contact us
                    through our support channels or email at
                    legal@urbanuplift.com
                  </p>
                </AccordionTab>
              </Accordion>
            </Card>
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
                Questions About Terms?
              </h2>
              <p className="mb-6">
                If you have any questions about our terms of service, please
                contact our support team.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <i className="pi pi-envelope mr-2"></i>
                  Contact Support
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <i className="pi pi-shield mr-2"></i>
                  Privacy Policy
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
