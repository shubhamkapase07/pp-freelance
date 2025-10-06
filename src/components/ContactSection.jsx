import React, { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { companyInfo } from "../mock/mockData";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const NOCODEAPI_URL =
      "https://v1.nocodeapi.com/shubhamkapase07/google_sheets/XeZtJbENEuMYRCXv?tabId=Sheet1";

    // ✅ Build a 2D array (each inner array is one new row)
    const values = [
      [formData.name, formData.email, formData.phone, formData.message, new Date().toLocaleString()],
    ];

    const res = await fetch(NOCODEAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw new Error("Failed to send data");

    setSubmitStatus("success");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitStatus(""), 3000);
  } catch (err) {
    console.error("Form submission error:", err);
    setSubmitStatus("error");
    setTimeout(() => setSubmitStatus(""), 3000);
  } finally {
    setIsSubmitting(false);
  }
};


  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: companyInfo.whatsappNumber,
      link: `tel:${companyInfo.whatsappNumber}`,
    },
    {
      icon: Mail,
      title: "Email",
      details: companyInfo.email,
      link: `mailto:${companyInfo.email}`,
    },
    {
      icon: MapPin,
      title: "Location",
      details: companyInfo.address,
      link: null,
    },
  ];

  return (
    <section className="py-24 bg-slate-900" id="contact">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-orange-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and
            create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact info */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <div className="flex items-start space-x-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:bg-slate-700/50">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-300">{info.details}</p>
                    </div>
                  </div>
                );
                return (
                  <div key={index}>
                    {info.link ? (
                      <a href={info.link} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="h-56 bg-gradient-to-br from-orange-500/20 to-amber-600/20 rounded-2xl p-4 backdrop-blur-sm border border-orange-500/20">
                <div className="h-full bg-slate-800/80 rounded-xl p-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">
                      Let's
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      Work
                    </div>
                    <div className="text-3xl font-bold text-orange-400">
                      Together
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-500/20 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="text-center p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="text-center p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
