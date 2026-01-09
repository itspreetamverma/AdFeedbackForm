import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdFeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    description: "",
    feedback: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setForm({ ...form, rating: value });
  };

  const validate = () => {
    const err = {};
    if (!form.name) err.name = "Name required";
    if (!form.company) err.company = "Company required";
    if (!form.rating) err.rating = "Rating required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("https://adfeedbackform-1.onrender.com/api/feedback", form);


      if (res.data.success) {
        toast.success("Feedback submitted successfully!");
        setForm({
          name: "",
          company: "",
          description: "",
          feedback: "",
          rating: 0,
        });
      } else {
        toast.error("Failed to submit!");
      }
    } catch (error) {
      console.log(error);
      oast.error("Server Error!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold text-center mb-2">Ad Feedback Form</h1>
      <p className="text-gray-500 text-center mb-6">Share how you felt about the ad</p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="font-semibold text-sm">Your Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="font-semibold text-sm">Company Name *</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Coca Cola"
          />
          {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-sm">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
            placeholder="Describe the advertisement..."
          />
        </div>

        {/* Feedback */}
        <div>
          <label className="font-semibold text-sm">Feedback (Optional)</label>
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
            placeholder="Your thoughts about the ad..."
          />
        </div>

        {/* Rating */}
        <div>
          <label className="font-semibold text-sm">Rating *</label>
          <div className="flex gap-2 mt-1">
            {[1,2,3,4,5].map(star => (
              <button
                type="button"
                key={star}
                onClick={() => handleRating(star)}
                className={`text-2xl ${star <= form.rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-red-500 text-xs">{errors.rating}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
