import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../store/slices/authSlices";
import InputField from "./InputField";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URI;

const AuthDialog = ({ show, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dialogRef = useRef();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => state.authDetails
  );

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword } = formData;

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!isLogin) {
      if (!name) newErrors.name = "Name is required.";
      if (!confirmPassword)
        newErrors.confirmPassword = "Confirm your password.";
      if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((msg) => toast.error(msg));
    }

    return Object.keys(newErrors).length === 0;
  };

  const loginUser = async (payload) => {
    dispatch(setLoading(true));
    dispatch(setError(false));

    try {
      const {data}=await axios.post(`${API_URL}/auth/login`, payload);
      console.log(data?.data);
      
      dispatch(setUser(data?.data))
      toast.success("Logged in successfully!");
      onClose();
    } catch (error) {
      const message = error.response?.data?.message || "Login failed.";
      dispatch(setError(true));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signupUser = async (payload) => {
    dispatch(setLoading(true));
    dispatch(setError(false));

    try {
      await axios.post(`${API_URL}/auth/signup`, payload);
      toast.success("Account created successfully!");
      onClose();
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed.";
      dispatch(setError(true));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

    if (isLogin) {
      loginUser(payload);
    } else {
      signupUser(payload);
    }

    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } text-white py-2 rounded-md mt-4`}
          >
            {isLoading ? "Please wait..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AuthDialog;
