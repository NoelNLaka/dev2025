"use client"

import { useState } from "react"
import { BarChart3, Settings, Users, LayoutDashboard } from "lucide-react"
import { DashboardContent } from "./components/dashboard-content"
import { ClientsContent } from "./components/clients-content"

export default function Component() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-8">CRM Dashboard</h1>
        <nav className="space-y-2">
          <a
            href="#"
            onClick={() => setCurrentPage("dashboard")}
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
            onClick={() => setCurrentPage("clients")}
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
            onClick={() => setCurrentPage("reports")}
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
            onClick={() => setCurrentPage("settings")}
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

      {/* Main Content */}
      <div className="flex-1 p-8">
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
