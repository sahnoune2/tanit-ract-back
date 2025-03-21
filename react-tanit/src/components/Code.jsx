import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Code() {
  const [code, setCode] = useState("");
  console.log(code);

  const handleclick = async () => {
    try {
      const response = await axios.post("http://localhost:5001/user/signUp", code, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("code sent successfully");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <button onClick={handleclick}>submit</button>
      <input
        onChange={(e) => setCode(e.target.value)}
        placeholder="put ur code here"
        type="text"
      ></input>
    </div>
  );
}
