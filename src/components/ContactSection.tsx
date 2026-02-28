"use client";
import { useState, FormEvent } from "react";

interface ContactSectionProps {
  data: {
    heading: string;
    subheading?: string;
    firstNameLabel?: string;
    lastNameLabel?: string;
    emailLabel?: string;
    phoneLabel?: string;
    messageLabel?: string;
    buttonText?: string;
    firstNamePlaceholder?: string;
    lastNamePlaceholder?: string;
    emailPlaceholder?: string;
    phonePlaceholder?: string;
    messagePlaceholder?: string;
  };
}

export function ContactSection({ data }: Readonly<ContactSectionProps>) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  if (!data) return null;
  const {
    heading,
    subheading,
    firstNameLabel = "First Name*",
    lastNameLabel = "Last Name*",
    emailLabel = "Email*",
    phoneLabel = "Phone Number",
    messageLabel = "Message*",
    buttonText = "Send Message",
    firstNamePlaceholder = "",
    lastNamePlaceholder = "",
    emailPlaceholder = "",
    phonePlaceholder = "",
    messagePlaceholder = "",
  } = data;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white mb-3 md:mb-4 uppercase">
            {heading}
          </h2>
          {subheading && (
            <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-nobel-content">
              {subheading}
            </p>
          )}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-nobel-content text-sm md:text-base mb-2">
                {firstNameLabel}
              </label>
              <input
                type="text"
                required
                placeholder={firstNamePlaceholder}
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nobel-blue"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-nobel-content text-sm md:text-base mb-2">
                {lastNameLabel}
              </label>
              <input
                type="text"
                required
                placeholder={lastNamePlaceholder}
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nobel-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-nobel-content text-sm md:text-base mb-2">
                {emailLabel}
              </label>
              <input
                type="email"
                required
                placeholder={emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nobel-blue"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-nobel-content text-sm md:text-base mb-2">
                {phoneLabel}
              </label>
              <input
                type="tel"
                placeholder={phonePlaceholder}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nobel-blue"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-nobel-content text-sm md:text-base mb-2">
              {messageLabel}
            </label>
            <textarea
              required
              rows={6}
              placeholder={messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nobel-blue"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 md:px-12 py-3 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content text-sm md:text-base font-bold transition-colors"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
