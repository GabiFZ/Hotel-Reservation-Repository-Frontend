import { useState } from "react";
import { registerUser } from "../services/api";

export default function RegistrationForm({ onRegisterSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await registerUser(form);
      setMessage("Registration successful! You can now login.");
      onRegisterSuccess?.();
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Register</h2>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border p-3 rounded" required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-3 rounded" required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-3 rounded" required />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}