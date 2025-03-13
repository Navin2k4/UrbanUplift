import React from "react";
import { motion } from "framer-motion";
import { Card } from "primereact/card";
import { Timeline } from "primereact/timeline";

const HowItWorksPage = () => {
  const steps = [
    {
      title: "Report an Issue",
      icon: "pi pi-camera",
      color: "#4CAF50",
      content:
        "Take a photo and describe the urban issue you've encountered. Our platform accepts reports for infrastructure problems, public services, environmental concerns, and more.",
      details: [
        "Capture photos of the issue",
        "Provide location details",
        "Add description and category",
        "Submit additional evidence if available",
      ],
    },
    {
      title: "AI Analysis",
      icon: "pi pi-cog",
      color: "#2196F3",
      content:
        "Our advanced AI system analyzes your report, categorizing and prioritizing issues based on urgency and impact on the community.",
      details: [
        "Automatic issue categorization",
        "Priority assessment",
        "Pattern recognition",
        "Impact evaluation",
      ],
    },
    {
      title: "Authority Assignment",
      icon: "pi pi-users",
      color: "#FF9800",
      content:
        "Reports are automatically routed to the relevant city departments or NGOs who are best equipped to handle the specific issue.",
      details: [
        "Smart routing system",
        "Department notification",
        "Resource allocation",
        "Stakeholder coordination",
      ],
    },
    {
      title: "Progress Tracking",
      icon: "pi pi-chart-line",
      color: "#9C27B0",
      content:
        "Track the progress of your reported issue in real-time. Receive updates at every stage of the resolution process.",
      details: [
        "Real-time status updates",
        "Progress notifications",
        "Timeline tracking",
        "Communication channel",
      ],
    },
    {
      title: "Resolution & Feedback",
      icon: "pi pi-check-circle",
      color: "#4CAF50",
      content:
        "Once resolved, verify the solution and provide feedback to help improve our service and maintain quality standards.",
      details: [
        "Resolution verification",
        "Community feedback",
        "Quality assessment",
        "Impact measurement",
      ],
    },
  ];

  const features = [
    {
      icon: "pi pi-mobile",
      title: "Mobile-First Design",
      description:
        "Report issues on the go with our responsive mobile interface",
    },
    {
      icon: "pi pi-map",
      title: "Interactive Maps",
      description:
        "Visualize reported issues in your area with detailed mapping",
    },
    {
      icon: "pi pi-bell",
      title: "Smart Notifications",
      description: "Stay updated with real-time alerts on issue progress",
    },
    {
      icon: "pi pi-users",
      title: "Community Engagement",
      description: "Collaborate with neighbors and local authorities",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
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
              How It Works
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Discover how UrbanUplift transforms your community concerns into
              real solutions through our innovative platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures efficient handling of community
              issues
            </p>
          </motion.div>

          <div className="relative">
            <Timeline
              value={steps}
              align="alternate"
              className="customized-timeline"
              content={(item) => (
                <Card className="mb-3">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <i
                        className={`${item.icon} text-2xl`}
                        style={{ color: item.color }}
                      ></i>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{item.content}</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {item.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools to make community improvement easier and more
              effective
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="h-full">
                  <div className="p-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i
                        className={`${feature.icon} text-2xl text-green-600`}
                      ></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8">
                Join thousands of citizens who are already improving their
                communities
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/report"
                  className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <i className="pi pi-plus mr-2"></i>
                  Report an Issue
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <i className="pi pi-user-plus mr-2"></i>
                  Create Account
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
