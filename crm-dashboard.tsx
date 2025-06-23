"use client"

import { useState } from "react"
import { BarChart3, Settings, Users, LayoutDashboard, Menu } from "lucide-react"
import { DashboardContent } from "./components/dashboard-content"
import { ClientsContent } from "./components/clients-content"

export default function Component() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Hamburger for mobile */}
      <button
        className="absolute top-4 left-4 z-30 block md:hidden bg-white p-2 rounded-md border shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-gray-900" />
      </button>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 p-6 transform transition-transform duration-200 ease-in-out
          md:static md:translate-x-0 md:block
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <nav className="space-y-2">
          <a
            href="#"
            onClick={() => { setCurrentPage("dashboard"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              currentPage === "dashboard"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="#"
            onClick={() => { setCurrentPage("clients"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              currentPage === "clients"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5" />
            Clients
          </a>
          <a
            href="#"
            onClick={() => { setCurrentPage("reports"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              currentPage === "reports"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Reports
          </a>
          <a
            href="#"
            onClick={() => { setCurrentPage("settings"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              currentPage === "settings"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Page Title - always visible and not covered by hamburger */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8 md:hidden block text-center">CRM Dashboard</h1>
        <h1 className="text-2xl font-bold text-gray-900 mb-8 hidden md:block">CRM Dashboard</h1>
        {currentPage === "dashboard" ? (
          <DashboardContent />
        ) : currentPage === "clients" ? (
          <ClientsContent />
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Page coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}
