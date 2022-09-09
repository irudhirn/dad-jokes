import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const emojis = ["😄", "😆", "😁", "😅", "😝"];

function App() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = async () => {
    setJoke("");

    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        setJoke(() => "Error occured...");
        return;
      }

      const data = await res.json();

      setJoke(() => data.joke);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="container">
      {joke === "" ? (
        <div className="card">
          <img
            src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            alt="Error occured..."
            className="spinner"
          />
        </div>
      ) : (
        <div className="card">
          <span className="smiley">
            {emojis[Math.floor(Math.random() * 5)]}
          </span>
          {joke}
        </div>
      )}
      <button className="btn" onClick={getJoke}>
        Get Joke
      </button>
    </div>
  );
}

export default App;
