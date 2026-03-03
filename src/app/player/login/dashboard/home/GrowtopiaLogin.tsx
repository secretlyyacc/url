"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const GrowtopiaLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("data") || "";

  const [isRegister, setIsRegister] = useState(false);
  const [growId, setGrowId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const loginFormRef = useRef<HTMLFormElement>(null);
  const registerFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // 🔥 FIX 1: Cek apakah di browser sebelum pake browser APIs
    if (typeof window !== 'undefined') {
      document.title = "Growtopia Player Portal";
      const saved = localStorage.getItem("growId");
      if (saved) setGrowId(saved);
    }
  }, []);

  const validateUsername = (name: string) => {
    if (!name) return "Please enter username";
    if (name.length < 4) return "Minimum 4 characters";
    if (!/^[a-zA-Z0-9]+$/.test(name)) return "Invalid input username";
    if (name.length > 20) return "Maximum 20 characters";
    return "";
  };

  const validatePassword = (pass: string) => {
    if (!pass) return "Please enter password";
    if (pass.length < 6) return "Minimum 6 characters";
    return "";
  };

  const validateEmail = (mail: string) => {
    if (!mail) return "Please enter email";
    if (!/^\S+@\S+\.\S+$/.test(mail)) return "Invalid email format";
    return "";
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameError = validateUsername(growId);
    const passwordError = validatePassword(password);
    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }
    localStorage.setItem("growId", growId);
    loginFormRef.current?.submit();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameError = validateUsername(growId);
    const passwordError = validatePassword(password);
    const emailError = validateEmail(email);
    if (usernameError || passwordError || emailError) {
      setErrors({ username: usernameError, password: passwordError, email: emailError });
      return;
    }
    localStorage.setItem("tempGrowId", growId);
    registerFormRef.current?.submit();
  };

  return (
    <div className={`container ${isRegister ? "active" : ""}`}>
      {/* LOGIN FORM */}
      <div className="form-box login">
        <form ref={loginFormRef} method="POST" action="/player/growid/login/validate" id="loginForm" onSubmit={handleLogin}>
          <h1>Login</h1>
          <input type="hidden" name="type" value="log" />
          <input type="hidden" name="_token" value={token} />
          <div className="input-box">
            <input
              type="text"
              name="growId"
              placeholder="GrowID"
              value={growId}
              onChange={(e) => setGrowId(e.target.value)}
            />
            <i className="bx bxs-user"></i>
            {errors.username && <div className="error-message show">{errors.username}</div>}
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
            {errors.password && <div className="error-message show">{errors.password}</div>}
          </div>

          <div className="forgot-link">
            <a href="https://eternityps.site/">Forgot Password?</a>
          </div>

          <button type="submit" className="btn">Login</button>

          <p>Need help? Join our community</p>
          <div className="social-icons">
            <a href="https://chat.whatsapp.com/JpJPCjE6tIlCs64ubEPg0T" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-whatsapp"></i>
            </a>
            <a href="https://discord.gg/mBcfYge8zR" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-discord"></i>
            </a>
            <a href="https://t.me/windsverse" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-telegram"></i>
            </a>
          </div>
        </form>
      </div>

      {/* REGISTER FORM */}
      <div className="form-box register">
        <form ref={registerFormRef} method="POST" action="/player/growid/login/validate" id="regisForm" onSubmit={handleRegister}>
          <h1>Registration</h1>
          <input type="hidden" name="type" value="reg" />
          <input type="hidden" name="_token" value={token} />

          <div className="input-box">
            <input
              type="text"
              name="growId"
              placeholder="GrowID"
              value={growId}
              onChange={(e) => setGrowId(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
            {errors.username && <div className="error-message show">{errors.username}</div>}
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-envelope"></i>
            {errors.email && <div className="error-message show">{errors.email}</div>}
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
            {errors.password && <div className="error-message show">{errors.password}</div>}
          </div>

          <button type="submit" className="btn">Register</button>
        </form>
      </div>

      {/* TOGGLE PANEL */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <div className="logo-container">
            <Image 
              src="/game_title.png" 
              alt="Game Title"
              width={300}
              height={100}
              style={{ 
                width: '100%',
                height: 'auto',
                objectFit: 'contain' 
              }}
              priority
            />
          </div>
          <p>Don&apos;t have an account?</p>
          <button className="btn" type="button" onClick={() => setIsRegister(true)}>
            Register
          </button>
        </div>

        <div className="toggle-panel toggle-right">
          <div className="logo-container">
            <Image 
              src="/game_title.png" 
              alt="Game Title"
              width={300}
              height={100}
              style={{ 
                width: '100%',
                height: 'auto',
                objectFit: 'contain' 
              }}
              priority
            />
          </div>
          <p>Already have an account?</p>
          <button className="btn" type="button" onClick={() => setIsRegister(false)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrowtopiaLogin;
