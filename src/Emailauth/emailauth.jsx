import "./app.css";
import { Link } from "react-router-dom";
import "../Crudoperations/crudoperations";
import { useState } from "react";
import { supabase } from "../Crudoperations/key";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth() {
  const [register, setregister] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const authsubmit = async (e) => {
    e.preventDefault();

    if (register) {
      const { data, signineror } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (signineror) {
        toast.error(error.message);
        return;
      }
      toast.success("Register Suceesfully! Check Your Email.");
      setname(''),
        setemail(''),
        setpassword('');


    }
    else {
      const { data, signuperror } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signuperror) {
        toast.error(error.message);
        return;
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={authsubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit" >{register ? "Register" : "Register"}</button>
      </form>
      <div>
        <p>Already have an account?</p>
        <Link to="./login">Login</Link>
      </div>
      <ToastContainer autoClose={2500} theme="dark" position="top-center" />
    </div>
  );
}

export default Auth;
