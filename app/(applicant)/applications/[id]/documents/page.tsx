// app/(applicant)/applications/[id]/documents/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDropzone } from "@/components/upload/FileDropzone";
import { DocumentList } from "@/components/upload/DocumentList";
import { showToast } from "@/components/common/Toast";

export default function ApplicationDocumentsPage() {
  const { id } = useParams();
  const [documents, setDocuments] = useState<any[]>([]);

  const handleUploadComplete = (fileKey: string, fileName: string, type: string) => {
    const newDoc = { type, fileKey, fileName };
    setDocuments((prev) => [...prev, newDoc]);
    showToast.success("Document uploaded", `${fileName} has been uploaded successfully.`);
  };

  const handleRemove = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
    showToast.info("Document removed", "The document has been removed.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href={`/applications/${id}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0D1B2A] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Application
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
            <CardDescription>
              Upload additional documents for application {id}. Required documents include Certificate of Analysis,
              Manufacturing License, and Product Specification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="font-medium mb-4">Upload New Document</h3>
              <FileDropzone
                onUploadComplete={(fileKey, fileName) => handleUploadComplete(fileKey, fileName, "OTHER")}
              />
            </div>

            {documents.length > 0 && (
              <div>
                <h3 className="font-medium mb-4">Uploaded Documents</h3>
                <DocumentList documents={documents} onRemove={handleRemove} />
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-slate-200">
              <Button variant="gold">Save All Documents</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}