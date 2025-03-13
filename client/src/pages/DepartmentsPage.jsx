import React from "react";
import { motion } from "framer-motion";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";

const DepartmentsPage = () => {
  const departments = [
    {
      name: "Infrastructure",
      icon: "pi pi-building",
      description: "Maintaining and improving city infrastructure",
      responsibilities: [
        "Road maintenance and repair",
        "Bridge inspection and upkeep",
        "Public building maintenance",
        "Construction oversight",
        "Infrastructure planning",
      ],
      stats: {
        projects: "150+",
        staff: "200+",
        coverage: "100%",
      },
    },
    {
      name: "Public Services",
      icon: "pi pi-cog",
      description: "Essential services for community well-being",
      responsibilities: [
        "Waste management",
        "Public transportation",
        "Street cleaning",
        "Utility maintenance",
        "Emergency services coordination",
      ],
      stats: {
        projects: "300+",
        staff: "450+",
        coverage: "98%",
      },
    },
    {
      name: "Environment",
      icon: "pi pi-globe",
      description: "Protecting and preserving our environment",
      responsibilities: [
        "Green space maintenance",
        "Environmental monitoring",
        "Pollution control",
        "Sustainability initiatives",
        "Wildlife protection",
      ],
      stats: {
        projects: "120+",
        staff: "150+",
        coverage: "95%",
      },
    },
    {
      name: "Safety & Security",
      icon: "pi pi-shield",
      description: "Ensuring community safety and security",
      responsibilities: [
        "Emergency response",
        "Public safety programs",
        "Security monitoring",
        "Safety education",
        "Crisis management",
      ],
      stats: {
        projects: "200+",
        staff: "350+",
        coverage: "99%",
      },
    },
  ];

  const recentProjects = [
    {
      department: "Infrastructure",
      projects: [
        {
          name: "Main Street Renovation",
          status: "In Progress",
          completion: "75%",
          description:
            "Complete renovation of Main Street including road surface, sidewalks, and utilities",
        },
        {
          name: "Bridge Safety Inspection",
          status: "Completed",
          completion: "100%",
          description:
            "Annual safety inspection and maintenance of city bridges",
        },
      ],
    },
    {
      department: "Public Services",
      projects: [
        {
          name: "Smart Waste Management",
          status: "In Progress",
          completion: "60%",
          description:
            "Implementation of smart waste bins and route optimization",
        },
        {
          name: "Public Transport GPS",
          status: "In Progress",
          completion: "85%",
          description: "GPS tracking system for public transportation",
        },
      ],
    },
    {
      department: "Environment",
      projects: [
        {
          name: "City Parks Renewal",
          status: "In Progress",
          completion: "40%",
          description:
            "Renovation and expansion of city parks and green spaces",
        },
        {
          name: "Air Quality Monitoring",
          status: "Ongoing",
          completion: "95%",
          description: "Installation of air quality monitoring stations",
        },
      ],
    },
    {
      department: "Safety & Security",
      projects: [
        {
          name: "Street Light Upgrade",
          status: "In Progress",
          completion: "80%",
          description: "Upgrading street lights to smart LED systems",
        },
        {
          name: "Emergency Response System",
          status: "Completed",
          completion: "100%",
          description: "Implementation of new emergency response system",
        },
      ],
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
              City Departments
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Learn about the various departments working together to make our
              city better and how they handle community issues.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${dept.icon} text-2xl text-green-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{dept.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-green-600 font-bold">
                        {dept.stats.projects}
                      </div>
                      <div className="text-sm text-gray-500">Projects</div>
                    </div>
                    <div>
                      <div className="text-green-600 font-bold">
                        {dept.stats.staff}
                      </div>
                      <div className="text-sm text-gray-500">Staff</div>
                    </div>
                    <div>
                      <div className="text-green-600 font-bold">
                        {dept.stats.coverage}
                      </div>
                      <div className="text-sm text-gray-500">Coverage</div>
                    </div>
                  </div>
                  <ul className="text-left text-gray-600 space-y-2">
                    {dept.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-center">
                        <i className="pi pi-check text-green-500 mr-2"></i>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Projects */}
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
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest initiatives and improvements across
              departments
            </p>
          </motion.div>

          <TabView>
            {recentProjects.map((dept, index) => (
              <TabPanel key={index} header={dept.department}>
                <div className="grid md:grid-cols-2 gap-8">
                  {dept.projects.map((project, pIndex) => (
                    <Card key={pIndex}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-gray-900">
                            {project.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              project.status === "Completed"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-gray-600">{project.description}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: project.completion }}
                          ></div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          Completion: {project.completion}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabView>
        </div>
      </section>

      {/* Contact Section */}
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
                Need to Report an Issue?
              </h2>
              <p className="text-xl mb-8">
                Our departments are ready to help resolve your community
                concerns
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/report"
                  className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <i className="pi pi-plus mr-2"></i>
                  Submit Report
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <i className="pi pi-envelope mr-2"></i>
                  Contact Departments
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;
