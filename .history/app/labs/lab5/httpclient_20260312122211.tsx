import React, { useEffect, useState } from "react";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");

  const fetchWelcomeOnClick = async () => {
    const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
    setWelcomeOnClick(response.data);
  };
  return (
    <div>
      <h3>HTTP Client</h3> <hr />
      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button> <br />
      Response from server: <b>{welcomeOnClick}</b>
    </div>
  );
}

