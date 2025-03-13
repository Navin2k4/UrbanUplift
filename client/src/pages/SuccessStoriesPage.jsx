import React from "react";
import { motion } from "framer-motion";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";

const SuccessStoriesPage = () => {
  const successStories = [
    {
      title: "Park Renovation Project",
      location: "Downtown District",
      category: "Environment",
      image:
        "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80",
      description:
        "A community-driven initiative transformed an abandoned lot into a vibrant park.",
      impact: [
        "5,000+ residents benefited",
        "30% increase in property values",
        "New community events space",
      ],
      timeline: "3 months",
      before: "Abandoned lot with safety concerns",
      after: "Modern park with playground and green spaces",
    },
    {
      title: "Smart Traffic Management",
      location: "City Center",
      category: "Infrastructure",
      image:
        "https://images.unsplash.com/photo-1573511860302-28c524319d2a?auto=format&fit=crop&q=80",
      description:
        "Implementation of AI-powered traffic signals reduced congestion significantly.",
      impact: [
        "40% reduction in traffic",
        "30% lower emissions",
        "Improved emergency response times",
      ],
      timeline: "6 months",
      before: "Heavy traffic congestion during peak hours",
      after: "Smooth traffic flow with smart signaling",
    },
    {
      title: "Community Safety Initiative",
      location: "Residential District",
      category: "Safety & Security",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80",
      description:
        "Enhanced street lighting and security cameras improved neighborhood safety.",
      impact: [
        "50% reduction in incidents",
        "Increased pedestrian activity",
        "Stronger community bonds",
      ],
      timeline: "4 months",
      before: "Poor lighting and security concerns",
      after: "Well-lit streets with modern security",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Community Leader",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote:
        "UrbanUplift transformed our neighborhood. The quick response and efficient handling of issues made a real difference.",
    },
    {
      name: "Michael Rodriguez",
      role: "Local Business Owner",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote:
        "The platform's impact on our business district has been remarkable. Issues are resolved faster than ever before.",
    },
    {
      name: "Emily Chen",
      role: "Resident",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote:
        "I love how easy it is to report issues and track their progress. Our community feels more connected now.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
              Success Stories
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Discover how UrbanUplift has helped transform communities and
              improve city life through successful issue resolutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card className="h-full">
                  <div className="space-y-4">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <Badge value={story.category} severity="success" />
                      <span className="text-gray-600">{story.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {story.title}
                    </h3>
                    <p className="text-gray-600">{story.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Impact:</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {story.impact.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <h4 className="font-semibold text-gray-900">Before:</h4>
                        <p className="text-gray-600">{story.before}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">After:</h4>
                        <p className="text-gray-600">{story.after}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      Completed in: {story.timeline}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Community Voices
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from community members about their experience with
              UrbanUplift
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600 italic mb-4">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-green-600">{testimonial.role}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Create Your Success Story
              </h2>
              <p className="text-xl mb-8">
                Join our community and be part of the next success story
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
                  href="/how-it-works"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <i className="pi pi-info-circle mr-2"></i>
                  Learn More
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;
