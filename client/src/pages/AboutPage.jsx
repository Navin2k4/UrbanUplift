import React from "react";
import { motion } from "framer-motion";
import { Card } from "primereact/card";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      description: "Urban planning expert with 15 years of experience",
    },
    {
      name: "Michael Chen",
      role: "Technical Director",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      description: "Software architect specializing in civic tech",
    },
    {
      name: "Emma Williams",
      role: "Community Manager",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      description: "Community engagement and public relations specialist",
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
              About UrbanUplift
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Empowering communities to create positive change through
              technology and collaboration. We're on a mission to make every
              city a better place to live.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At UrbanUplift, we believe that every citizen has the power to
                make their city better. Our platform bridges the gap between
                communities and local authorities, creating a more efficient and
                transparent system for urban improvement.
              </p>
              <p className="text-lg text-gray-600">
                Through innovative technology and community engagement, we're
                revolutionizing how cities address and resolve urban issues, one
                neighborhood at a time.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-lg transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80"
                alt="City planning"
                className="relative rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="pi pi-heart text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Community First
              </h3>
              <p className="text-gray-600">
                We prioritize the needs and voices of local communities in
                everything we do.
              </p>
            </motion.div>
            <motion.div
              className="text-center p-6"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="pi pi-check-circle text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in open communication and accountability at every
                step.
              </p>
            </motion.div>
            <motion.div
              className="text-center p-6"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="pi pi-bolt text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously evolve our solutions to better serve our
                communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals dedicated to making our cities
              better
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
