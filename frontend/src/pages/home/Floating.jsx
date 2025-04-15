import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { X } from 'lucide-react';

const FloatingContactForm = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(); // Added formRef

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: formData.name,
      message: formData.message,
      phone: formData.phone,
      email: formData.email,
    };

    emailjs
      .send(
        'service_ifk8wbk', // Replace with your EmailJS service ID
        'template_eygl5sq', // Replace with your EmailJS template ID
        templateParams,
        'beLgYajD0RyNxY_v_' // Replace with your EmailJS public key
      )
      .then(() => {
        alert('We Will Connect You Shortly!');
        setFormData({
          name: '',
          message: '',
          phone: '',
          email: '',
        });
      })
      .catch((error) => {
        console.error('Email sending failed!', error);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ${
        showForm
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg">
        {/* Close Icon */}
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <form ref={formRef} onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Get Free Consultation!</h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full p-3 mb-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="w-full p-3 mb-3 border rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full p-3 mb-3 border rounded-lg"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            className="w-full p-3 mb-4 border rounded-lg"
            rows="4"
          />

          <button
            type="submit"
            disabled={isSending}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSending ? 'Sending...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FloatingContactForm;
