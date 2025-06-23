"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Filter } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { AddClientForm } from "./add-client-form"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

interface Client {
  id: string
  name: string
  company: string
  email: string
  status: string
  revenue: string
  projects: number
  last_contact: string
}

export function ClientsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddClientOpen, setAddClientOpen] = useState(false)

  const fetchClients = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.from("clients").select("*")
    if (error) {
      setError(error.message)
      setClients([])
    } else {
      setClients(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" onClick={() => setAddClientOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>
      <AddClientForm
        isOpen={isAddClientOpen}
        onClose={() => setAddClientOpen(false)}
        onClientAdded={fetchClients}
      />
      {loading && <div className="mb-4">Loading clients...</div>}
      {error && <div className="mb-4 text-red-600">Error: {error}</div>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Card className="p-4 sm:p-6">
          <CardHeader className="pb-2 px-0 sm:px-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
          </CardHeader>
          <CardContent className="px-0 sm:px-2">
            <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6">
          <CardHeader className="pb-2 px-0 sm:px-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Clients</CardTitle>
          </CardHeader>
          <CardContent className="px-0 sm:px-2">
            <div className="text-2xl font-bold text-green-600">
              {clients.filter((c) => c.status === "Active").length}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6">
          <CardHeader className="pb-2 px-0 sm:px-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Clients</CardTitle>
          </CardHeader>
          <CardContent className="px-0 sm:px-2">
            <div className="text-2xl font-bold text-yellow-600">
              {clients.filter((c) => c.status === "Pending").length}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6">
          <CardHeader className="pb-2 px-0 sm:px-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
          </CardHeader>
          <CardContent className="px-0 sm:px-2">
            <div className="text-2xl font-bold text-gray-900">
              {clients.reduce((sum, client) => sum + (client.projects || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[120px] hidden sm:table-cell">Company</TableHead>
                  <TableHead className="min-w-[180px] hidden md:table-cell">Email</TableHead>
                  <TableHead className="min-w-[90px]">Status</TableHead>
                  <TableHead className="min-w-[90px] hidden sm:table-cell">Revenue</TableHead>
                  <TableHead className="min-w-[80px] hidden md:table-cell">Projects</TableHead>
                  <TableHead className="min-w-[120px] hidden lg:table-cell">Last Contact</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium p-4">{client.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{client.company}</TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600 break-all">{client.email}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell font-medium">{client.revenue}</TableCell>
                    <TableCell className="hidden md:table-cell">{client.projects}</TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-600">{client.last_contact}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
