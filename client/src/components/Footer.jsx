import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "How It Works", path: "/how-it-works" },
      { name: "Report Issue", path: "/report" },
      { name: "View Issues", path: "/issues" },
      { name: "Success Stories", path: "/success-stories" },
    ],
    community: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "FAQ", path: "/faq" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
    departments: [
      { name: "Infrastructure", path: "/dept/infrastructure" },
      { name: "Public Services", path: "/dept/public-services" },
      { name: "Environment", path: "/dept/environment" },
      { name: "Safety & Security", path: "/dept/safety" },
    ],
    social: [
      { name: "Facebook", icon: "pi pi-facebook", url: "#" },
      { name: "Twitter", icon: "pi pi-twitter", url: "#" },
      { name: "Instagram", icon: "pi pi-instagram", url: "#" },
      { name: "LinkedIn", icon: "pi pi-linkedin", url: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Platform Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Departments
            </h3>
            <ul className="space-y-2">
              {footerLinks.departments.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Connect With Us
            </h3>
            <div className="mb-4">
              <p className="mb-2">Get updates on city improvements</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
                />
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="hover:text-green-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Urban Uplift. All rights
              reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-green-400">
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-green-400"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-green-400"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
