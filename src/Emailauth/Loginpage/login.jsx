import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import { supabase } from "../../Crudoperations/key";
import { toast, ToastContainer } from "react-toastify";

function Loginpage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

    const { data: authsubscribe } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

    })
    return () => {
      authsubscribe.subscription.unsubscribe();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Incorrect ? Email or Password");
      return;
    }
    toast.success("Email Login Succesfully.");

    setTimeout(() => {
      navigate("/crudoperation");
    }, 1500);
  };

  return (
    <div className="sign-page">
      <div className="login-container">
        <form className="sign-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <Link to="/" className="back-btn">
          ← Back to Register
        </Link>
      </div>
      <ToastContainer position="top-center" autoClose={2500} theme="dark" />
    </div>
  );
}

export default Loginpage;