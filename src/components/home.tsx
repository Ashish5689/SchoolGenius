import React, { useState } from "react";
import HomeworkHelper from "./HomeworkHelper";
import { Toaster } from "./ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto h-screen p-0 overflow-hidden">
        <HomeworkHelper />
      </main>
      <Toaster />
    </div>
  );
};

export default Home;
