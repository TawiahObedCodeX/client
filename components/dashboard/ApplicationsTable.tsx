// components/dashboard/ApplicationsTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface Application {
  id: string;
  referenceNo: string;
  productName: string;
  status: string;
  submittedAt: string;
  slaDeadline: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  isLoading?: boolean;
}

export function ApplicationsTable({ applications, isLoading }: ApplicationsTableProps) {
  const router = useRouter();

  if (isLoading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500">No applications found. Start by creating a new application.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Reference No.</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>SLA Deadline</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="cursor-pointer hover:bg-slate-50" onClick={() => router.push(`/applications/${app.referenceNo}`)}>
              <TableCell className="font-mono text-sm font-medium">{app.referenceNo}</TableCell>
              <TableCell>{app.productName}</TableCell>
              <TableCell>
                <StatusBadge status={app.status} />
              </TableCell>
              <TableCell className="text-slate-500 text-sm">
                {new Date(app.submittedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-slate-500 text-sm">
                {new Date(app.slaDeadline).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border border-slate-200 rounded-xl shadow-md p-1">
                    <DropdownMenuItem
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-slate-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/applications/${app.referenceNo}`);
                      }}
                    >
                      <Eye className="h-4 w-4" /> View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}