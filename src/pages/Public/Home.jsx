import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section1 from "../../components/Section1";
import Section2 from "../../components/Section2";
import Section3 from "../../components/Section3";
import Section4 from "../../components/Section4";
import Section5 from "../../components/Section5";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Banner Gradient Wrapper */}
      <div className="relative overflow-visible">
        <Section1 />
      </div>

      {/* Page Content */}
      <main className="flex-grow bg-white">
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </main>

    </div>
  );
}