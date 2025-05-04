import React, { useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout({ links, title }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar toggleSidebar={() => setOpen(true)} />
      <div className="flex flex-1 pt-14">
        <Sidebar links={links} close={logout} />
        <MobileSidebar links={links} open={open} close={() => setOpen(false)} />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="mb-4 text-2xl font-semibold">{title}</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, path: PropTypes.string })).isRequired,
  title: PropTypes.string.isRequired,
};