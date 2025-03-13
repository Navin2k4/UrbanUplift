import { Button } from "primereact/button";
import React, { useState } from "react";
import { Card } from "primereact/card";
import { Timeline } from "primereact/timeline";
import { ScrollTop } from "primereact/scrolltop";
import { motion } from "framer-motion";

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const events = [
    {
      status: "Report Issue",
      icon: "pi pi-camera",
      color: "#4CAF50",
      description: "Take a photo and describe the issue in your area",
    },
    {
      status: "AI Analysis",
      icon: "pi pi-cog",
      color: "#2196F3",
      description: "Our AI system categorizes and prioritizes the issue",
    },
    {
      status: "Authority Assignment",
      icon: "pi pi-users",
      color: "#FF9800",
      description: "Issue is assigned to relevant department or NGO",
    },
    {
      status: "Resolution & Update",
      icon: "pi pi-check",
      color: "#4CAF50",
      description: "Issue is resolved and you receive an update",
    },
  ];

  // Categories data - Updated with relevant urban issues
  const categories = [
    {
      icon: "pi pi-exclamation-triangle",
      title: "Infrastructure",
      desc: "Roads, Buildings, Bridges",
    },
    {
      icon: "pi pi-clock",
      title: "Public Services",
      desc: "Transport, Utilities",
    },
    {
      icon: "pi pi-shield",
      title: "Safety & Security",
      desc: "Street Lights, Emergency",
    },
    {
      icon: "pi pi-globe",
      title: "Environment",
      desc: "Pollution, Green Spaces",
    },
    {
      icon: "pi pi-home",
      title: "Housing",
      desc: "Community Housing Issues",
    },
    {
      icon: "pi pi-users",
      title: "Social Issues",
      desc: "Community Concerns",
    },
    {
      icon: "pi pi-heart",
      title: "Healthcare",
      desc: "Public Health Issues",
    },
    {
      icon: "pi pi-book",
      title: "Education",
      desc: "School Facilities",
    },
  ];

  // Statistics data - Updated with relevant metrics
  const statistics = [
    { value: "2000+", label: "Issues Resolved" },
    { value: "15+", label: "City Departments" },
    { value: "30+", label: "Communities Served" },
    { value: "95%", label: "Resolution Rate" },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[80vh] px-4 py-12 md:px-6 lg:px-8 bg-gradient-to-br from-green-100 via-white to-green-200 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-city-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <motion.div
            className="flex flex-col gap-8 relative z-10 px-4 max-w-7xl mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Transform Your City with
              <motion.span
                className="text-green-600 block mt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                UrbanUplift
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Join our platform to report issues, collaborate with authorities,
              and make your community better. Together, we can create positive
              change.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6 justify-center mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button
                label="Report an Issue"
                icon="pi pi-exclamation-circle"
                className="p-button-raised bg-green-600 hover:bg-green-700 border-green-600 px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
              />
              <Button
                label="View Issues"
                icon="pi pi-map"
                className="p-button-outlined border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 text-lg shadow-md hover:shadow-lg transition-all"
              />
            </motion.div>
          </motion.div>

          {/* Decorative Elements with Animation */}
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 transform translate-y-1/2 -translate-x-1/2 opacity-10"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#22c55e"
                d="M34.5,-47.2C46.3,-34.1,58.6,-24.7,64.4,-11.5C70.2,1.7,69.5,18.7,61.8,31.4C54.1,44.1,39.4,52.5,24.4,56.6C9.3,60.7,-6,60.4,-22.1,56.6C-38.2,52.8,-55,45.4,-65.6,31.5C-76.2,17.7,-80.5,-2.7,-74.9,-19.9C-69.3,-37.1,-53.8,-51,-37.8,-63.5C-21.8,-76,-10.9,-87.1,0.8,-88.2C12.5,-89.3,25,-60.3,34.5,-47.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </motion.div>
        </section>

        {/* SDG Goals Section */}
        <section className="py-16 px-4 bg-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-grid-pattern opacity-5"></div>
          </div>
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-green-600 font-semibold mb-4 block">
                United Nations Sustainable Development Goal 11
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sustainable Cities & Communities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                UrbanUplift actively contributes to UN SDG Goal 11 by making
                cities inclusive, safe, resilient, and sustainable through
                community engagement.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="absolute top-4 right-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="text-green-500"
                    >
                      <i className="pi pi-globe text-3xl"></i>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Environmental Impact
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Reduced carbon emissions through efficient issue
                        resolution
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Improved waste management systems
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Enhanced green spaces and biodiversity
                      </span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="absolute top-4 right-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1,
                      }}
                      className="text-green-500"
                    >
                      <i className="pi pi-users text-3xl"></i>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Social Progress
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Inclusive community participation in urban planning
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Improved accessibility for all residents
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Enhanced public safety measures
                      </span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="absolute top-4 right-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2,
                      }}
                      className="text-green-500"
                    >
                      <i className="pi pi-chart-line text-3xl"></i>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Economic Growth
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Efficient resource allocation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Reduced maintenance costs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                      <span className="text-gray-600">
                        Increased property values
                      </span>
                    </li>
                  </ul>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Our Commitment to SDG 11
                </h3>
                <p className="mb-6">
                  By 2030, we aim to contribute to making cities more inclusive,
                  safe, resilient, and sustainable through active community
                  participation and technological innovation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                  >
                    <i className="pi pi-shield mr-2"></i>
                    <span>Safe Communities</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                  >
                    <i className="pi pi-heart mr-2"></i>
                    <span>Inclusive Growth</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                  >
                    <i className="pi pi-globe mr-2"></i>
                    <span>Sustainable Future</span>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <motion.section
          className="py-16 px-4 bg-white w-full"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Report Any City Issue
              </h2>
              <p className="text-xl text-gray-600">
                Select from various categories to report issues in your
                neighborhood
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {categories.map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="text-center p-4">
                      <i
                        className={`${item.icon} text-4xl text-green-600 mb-4`}
                      ></i>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Process Timeline */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden w-full">
          <div className="absolute inset-0">
            <svg
              className="absolute left-0 top-0 h-48 w-48 text-green-100 transform -translate-x-1/2 -translate-y-1/2 opacity-50"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <path d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50Z" />
            </svg>
            <svg
              className="absolute right-0 bottom-0 h-48 w-48 text-green-100 transform translate-x-1/2 translate-y-1/2 opacity-50"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <path d="M0 0h100v100H0z" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                Issue Resolution Process
              </h2>
              <p className="text-xl text-gray-600">
                Track your reported issue through our streamlined process
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
            >
              <Timeline
                value={events}
                align="alternate"
                className="customized-timeline"
                content={(item) => (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      },
                    }}
                  >
                    <Card className="mb-3 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
                      <motion.div
                        className="flex flex-col gap-3"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                          {item.status}
                          <i className={`${item.icon} text-xl mx-2`}></i>
                        </span>
                        <p className="text-gray-600">{item.description}</p>

                        <motion.div
                          className="absolute top-2 right-2 text-green-500"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        ></motion.div>
                      </motion.div>
                    </Card>
                  </motion.div>
                )}
              />
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <motion.section
          className="py-16 px-4 bg-white w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-green-600 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-green-700 text-white relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-city-pattern opacity-10"></div>
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Be Part of the Solution
                  <br />
                  <span className="text-green-200">
                    Shape Our City's Future
                  </span>
                </h2>
                <p className="text-xl mb-8 text-green-50">
                  Your active participation drives positive change in our
                  community. Report issues, track progress, and witness the
                  transformation of our city, one solution at a time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Report Now"
                    icon="pi pi-exclamation-circle"
                    className="p-button-raised bg-white text-green-600 hover:bg-green-50 px-6 py-3 text-lg"
                  />
                  <Button
                    label="View Issues Map"
                    icon="pi pi-map"
                    className="p-button-outlined border-2 border-white text-white hover:bg-green-700 px-6 py-3 text-lg"
                  />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-lg bg-white/10">
                    <i className="pi pi-clock text-4xl mb-4 text-green-200"></i>
                    <h3 className="text-xl font-semibold mb-2">
                      Quick Response
                    </h3>
                    <p className="text-green-50">
                      24/7 monitoring and rapid response to reported issues
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/10">
                    <i className="pi pi-users text-4xl mb-4 text-green-200"></i>
                    <h3 className="text-xl font-semibold mb-2">
                      Community Driven
                    </h3>
                    <p className="text-green-50">
                      Powered by citizens like you who care about their city
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/10">
                    <i className="pi pi-chart-line text-4xl mb-4 text-green-200"></i>
                    <h3 className="text-xl font-semibold mb-2">
                      Track Progress
                    </h3>
                    <p className="text-green-50">
                      Real-time updates on issue resolution status
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/10">
                    <i className="pi pi-check-circle text-4xl mb-4 text-green-200"></i>
                    <h3 className="text-xl font-semibold mb-2">
                      Verified Results
                    </h3>
                    <p className="text-green-50">
                      Transparent verification of completed solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollTop
        threshold={200}
        className="bg-green-600 hover:bg-green-700"
        icon="pi pi-arrow-up"
      />
    </div>
  );
};

export default HomePage;
