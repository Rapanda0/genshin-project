"use client";
import React from "react";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";


export default function Home() {
  return (
    <div>
      <Navbar />
      <CharacterList/>
    </div>
  );
}
