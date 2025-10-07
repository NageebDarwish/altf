import { Telegram } from "@mui/icons-material";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://admin.arabicallthetime.com/api/contact-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully!",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row rounded-3xl bg-white shadow-lg overflow-hidden">
        <div className="w-full md:w-2/3 p-6 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <h1 className="font-pally text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2 text-heading">
              Contact Us
            </h1>
            <p className="font-HelveticaNeue text-sm md:text-base mb-4 text-[#0C3373] font-normal">
              Have a question or suggestion? We&apos;d love to hear from you.
            </p>

            {submitStatus && (
              <p
                className={`mb-2 font-bold ${
                  submitStatus.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {submitStatus.message}
              </p>
            )}

            <label className="font-HelveticaNeue text-sm md:text-base font-bold text-[#0C3373] mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#F8FAFC] rounded-xl p-3 md:p-4 mb-4 font-HelveticaNeue text-sm md:text-base text-[#0C3373] border border-gray-300 focus:border-[#0C3373] outline-none"
              placeholder="Enter your full name"
              required
            />

            <label className="font-HelveticaNeue text-sm md:text-base font-bold text-[#0C3373] mb-2 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F8FAFC] rounded-xl p-3 md:p-4 mb-4 font-HelveticaNeue text-sm md:text-base text-[#0C3373] border border-gray-300 focus:border-[#0C3373] outline-none"
              placeholder="Enter your email"
              required
            />

            <label className="font-HelveticaNeue text-sm md:text-base font-bold text-[#0C3373] mb-2 block">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-[#F8FAFC] rounded-xl p-3 md:p-4 mb-4 font-HelveticaNeue text-sm md:text-base text-[#0C3373] border border-gray-300 focus:border-[#0C3373] outline-none"
              placeholder="Briefly summarize your message"
              required
            />

            <label className="font-HelveticaNeue text-sm md:text-base font-bold text-[#0C3373] mb-2 block">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-[#F8FAFC] rounded-xl p-3 md:p-4 mb-4 font-HelveticaNeue text-sm md:text-base text-[#0C3373] border border-gray-300 focus:border-[#0C3373] outline-none"
              placeholder="Describe your request or suggestion"
              required
            />

            <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#F28327] text-white rounded-full text-center px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-bold disabled:bg-gray-300 order-2 sm:order-1 w-full sm:w-auto"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
              <div className="flex items-center gap-3 md:gap-4 order-1 sm:order-2">
                <img
                  src="/chat.png"
                  alt="Chat"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
                <Telegram className="rounded-full p-2 bg-[#002f6c] text-4xl md:text-5xl text-white" />
              </div>
            </div>
          </form>
        </div>

        <div className="hidden md:flex md:w-1/3 bg-[#002f6c] flex-col justify-between items-center text-white p-6 lg:p-8 relative">
          <img src="/mylogo.webp" alt="Logo" className="w-24 md:w-32 lg:w-48 mt-5" />

          <div className="absolute bottom-0 right-0">
            <img src="/shape.png" alt="Shape" className="w-12 md:w-16 lg:w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
