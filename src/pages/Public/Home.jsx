import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section1 from "../../components/Section1";
import Section2 from "../../components/Section2";
import Section3 from "../../components/Section3";
import Section4 from "../../components/Section4";
import Section5 from "../../components/Section5";
import { fakeBooks } from "../../mocks/fakeBooks";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />

      {/* HERO + SERVICES */}
      <Section1 />

      {/* FLASH DEALS */}
      <Section2 flashDeals={fakeBooks.slice(0, 5)} />

      {/* NEW ARRIVALS */}
      <Section3 newArrivals={fakeBooks.slice(5, 10)} />

      {/* DEAL OF THE WEEK */}
      <Section4 dealOfTheWeek={fakeBooks.slice(10, 14)} />

      {/* HOT DEALS */}
      <Section5 hotDeals={fakeBooks.slice(14, 18)} />
    </div>
  );
}
