import React, { useEffect, useState } from "react";
import "./index.css";
import { supabase } from "./key";
import { data, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Crudoperation() {
  const navigate = useNavigate();

  const [task, setTask] = useState({ title: "", description: "" });
  const [taskfetch, settaskfetch] = useState([]);
  const [update, setupdate] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/");
      }
    };

    checkSession();
  }, []);

  const fetchdata = async () => {
    const { data, error } = await supabase.from("demotask").select("*");

    if (error) {
      toast.error(error.message);
      return;
    }
   console.log("fetch Sucessful");

    settaskfetch(data);
  };

  const handlecreate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("demotask").insert(task);

    if (error) {
      toast.error("Insert Valid Credentials!");
      return;
    }
    toast.success("Sucessfully Created.")

    setTask({ title: "", description: "" });
    fetchdata();
  };

  const deletetask = async (id) => {
    const { error } = await supabase.from("demotask").delete().eq("id", id);

    if (error) {
      toast.error("Error Delete !");
      return;
    }
    toast.success("Sucessfully Deleted")

    fetchdata();
  };

  const updatetask = async (id) => {
    const { error } = await supabase
      .from("demotask")
      .update({ description: update })
      .eq("id", id);

    if (error) {
      toast.error("Error for Updating");
      return;
    }
    toast.success("Update Succesfully.")

    fetchdata();
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout Error");
      return;
    }
    toast.success("Successfully Logout.")

    setTimeout(()=>{
      navigate("/")
    },1500)
  };

  return (
    <div className="crud-page">
      <h1>CRUD Operation</h1>

      <form className="form" onSubmit={handlecreate}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          value={task.description}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <button type="submit">Create</button>
      </form>

      <div className="crud-read">
        {taskfetch.map((item) => (
          <ul key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div>
              <textarea
                placeholder="Enter Update Description..."
                onChange={(e) => setupdate(e.target.value)}
              />

              <button onClick={() => updatetask(item.id)}>Update</button>
              <button onClick={() => deletetask(item.id)}>Delete</button>
            </div>
          </ul>
        ))}
      </div>

      <button onClick={logout}>Logout</button>
      <ToastContainer autoClose={2500} theme="dark" position="top-center" />
    </div>
  );
}

export default Crudoperation;
