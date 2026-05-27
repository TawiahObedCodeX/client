// components/upload/DocumentList.tsx
"use client";

import { motion } from "motion/react";
import { File, Trash2, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Document {
  type: string;
  fileKey: string;
  fileName: string;
}

interface DocumentListProps {
  documents: Document[];
  onRemove?: (index: number) => void;
  onPreview?: (fileKey: string) => void;
  isReadOnly?: boolean;
}

const documentTypeLabels: Record<string, string> = {
  PRODUCT_SPECIFICATION: "Product Spec",
  MANUFACTURING_LICENSE: "Manufacturing License",
  CERTIFICATE_OF_ANALYSIS: "CoA",
  LABELLING_ARTWORK: "Label Artwork",
  IMPORTATION_PERMIT: "Import Permit",
  SITE_LICENSE: "Site License",
  SAFETY_DATA_SHEET: "SDS",
  OTHER: "Other",
};

export function DocumentList({ documents, onRemove, onPreview, isReadOnly = false }: DocumentListProps) {
  if (documents.length === 0) {
    return <p className="text-slate-400 text-sm text-center py-4">No documents uploaded</p>;
  }

  return (
    <div className="space-y-3">
      {documents.map((doc, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="p-2 bg-slate-100 rounded-lg">
              <File className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{doc.fileName}</p>
              <Badge variant="default" className="text-xs mt-1">
                {documentTypeLabels[doc.type] || doc.type}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onPreview && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onPreview(doc.fileKey)}
                className="h-8 w-8"
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-600"
            >
              <Download className="w-4 h-4" />
            </Button>
            {!isReadOnly && onRemove && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(idx)}
                className="h-8 w-8 text-slate-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}