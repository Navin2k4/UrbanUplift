import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";

const FAQPage = () => {
  const faqCategories = [
    {
      title: "General Questions",
      questions: [
        {
          q: "What is UrbanUplift?",
          a: "UrbanUplift is a community-driven platform that enables citizens to report and track urban issues in their neighborhoods. We connect residents with local authorities to facilitate faster resolution of community problems.",
        },
        {
          q: "How does it work?",
          a: "Users can report issues through our platform, providing details and photos. Our AI system categorizes the issues and routes them to the appropriate authorities. Users can track the status of their reports and receive updates throughout the resolution process.",
        },
        {
          q: "Is the service free?",
          a: "Yes, UrbanUplift is completely free for citizens to use. We believe in making community improvement accessible to everyone.",
        },
      ],
    },
    {
      title: "Reporting Issues",
      questions: [
        {
          q: "What types of issues can I report?",
          a: "You can report various urban issues including infrastructure problems, public services, safety concerns, environmental issues, and more. Our platform covers a wide range of community concerns.",
        },
        {
          q: "Do I need to create an account?",
          a: "While you can browse reported issues without an account, creating one allows you to submit reports, track their progress, and receive updates.",
        },
        {
          q: "Can I report issues anonymously?",
          a: "Yes, you can choose to report issues anonymously. However, providing contact information helps us keep you updated on the resolution progress.",
        },
      ],
    },
    {
      title: "Issue Resolution",
      questions: [
        {
          q: "How long does it take to resolve an issue?",
          a: "Resolution times vary depending on the type and complexity of the issue. Simple problems might be resolved within days, while more complex issues may take longer. You can track the status of your report in real-time.",
        },
        {
          q: "Who handles the reported issues?",
          a: "Issues are handled by relevant local authorities, city departments, or partnered NGOs, depending on the nature of the problem.",
        },
        {
          q: "What happens after I submit a report?",
          a: "After submission, our AI system categorizes your report and assigns it to the appropriate department. You'll receive a confirmation email with a tracking number and regular updates on the progress.",
        },
      ],
    },
    {
      title: "Technical Support",
      questions: [
        {
          q: "What if I encounter technical problems?",
          a: "Our support team is available 24/7 to help with any technical issues. You can reach us through the contact form or email support@urbanuplift.com.",
        },
        {
          q: "Can I use UrbanUplift on mobile devices?",
          a: "Yes, UrbanUplift is fully responsive and works on all devices including smartphones and tablets.",
        },
        {
          q: "How do I update my account information?",
          a: "You can update your account information through your profile settings after logging in.",
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Find answers to common questions about UrbanUplift and how we help
              improve communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {faqCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Card className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.title}
                  </h2>
                  <Accordion className="faq-accordion">
                    {category.questions.map((item, qIndex) => (
                      <AccordionTab
                        key={qIndex}
                        header={item.q}
                        className="mb-2"
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {item.a}
                        </p>
                      </AccordionTab>
                    ))}
                  </Accordion>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions Section */}
          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="inline-block">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <i className="pi pi-envelope mr-2"></i>
                  Contact Support
                </a>
                <a
                  href="mailto:support@urbanuplift.com"
                  className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <i className="pi pi-send mr-2"></i>
                  Email Us
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
