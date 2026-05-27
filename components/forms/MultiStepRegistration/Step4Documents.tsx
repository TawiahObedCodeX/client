// components/forms/MultiStepRegistration/Step4Documents.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FileDropzone } from "@/components/upload/FileDropzone";
import { DocumentList } from "@/components/upload/DocumentList";

const documentTypes = [
  { value: "PRODUCT_SPECIFICATION", label: "Product Specification Sheet" },
  { value: "MANUFACTURING_LICENSE", label: "Manufacturing License" },
  { value: "CERTIFICATE_OF_ANALYSIS", label: "Certificate of Analysis (CoA)" },
  { value: "LABELLING_ARTWORK", label: "Labelling Artwork" },
  { value: "IMPORTATION_PERMIT", label: "Importation Permit (if applicable)" },
  { value: "SITE_LICENSE", label: "Site License / GMP Certificate" },
  { value: "SAFETY_DATA_SHEET", label: "Safety Data Sheet (SDS)" },
  { value: "OTHER", label: "Other Supporting Documents" },
];

export function Step4Documents() {
  const { setValue, watch } = useFormContext();
  const documents = watch("documents") || [];

  const handleUploadComplete = (file: { type: string; fileKey: string; fileName: string }) => {
    const newDoc = {
      type: file.type,
      fileKey: file.fileKey,
      fileName: file.fileName,
    };
    setValue("documents", [...documents, newDoc]);
  };

  const handleRemoveDocument = (index: number) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setValue("documents", updated);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-heading font-bold text-[#0D1B2A]">Supporting Documents</h3>
      <p className="text-slate-500 -mt-4">Upload all required documents for regulatory assessment.</p>

      <div>
        <Label>Required Documents</Label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
          <div>✓ Certificate of Analysis (CoA)</div>
          <div>✓ Manufacturing License / GMP Certificate</div>
          <div>✓ Product Specification Sheet</div>
          <div>✓ Labelling Artwork</div>
        </div>
      </div>

      <div className="space-y-4">
        {documentTypes.map((docType) => (
          <div key={docType.value} className="border border-slate-200 rounded-2xl p-4">
            <Label className="font-medium mb-2 block">{docType.label}</Label>
            <FileDropzone
              onUploadComplete={(fileKey, fileName) =>
                handleUploadComplete({
                  type: docType.value,
                  fileKey,
                  fileName,
                })
              }
              acceptedFileTypes={["application/pdf", "image/jpeg", "image/png"]}
              maxSizeMB={10}
            />
          </div>
        ))}
      </div>

      {documents.length > 0 && (
        <div>
          <Label>Uploaded Documents</Label>
          <DocumentList documents={documents} onRemove={handleRemoveDocument} />
        </div>
      )}
    </div>
  );
}