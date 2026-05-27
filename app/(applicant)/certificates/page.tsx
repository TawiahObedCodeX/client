// app/(applicant)/certificates/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, QrCode, Eye, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { PremiumDashboardSkeleton } from "@/components/common/Loader";

// Mock certificates - initially empty for new users
const fetchCertificates = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return []; // Return empty for new users
};

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertificates().then((data) => {
      setCertificates(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <PremiumDashboardSkeleton />;
  }

  if (certificates.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-[#0D1B2A] mb-2">My Certificates</h1>
        <p className="text-slate-500 mb-8">Approved product certificates will appear here</p>
        <EmptyState
          title="No certificates yet"
          description="Once your application is approved, the certificate will be available for download here."
          actionLabel="View My Applications"
          actionHref="/applications"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-[#0D1B2A] mb-2">My Certificates</h1>
      <p className="text-slate-500 mb-8">Download and manage your FDA-approved product certificates</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-[#D4A017]" />
                    <div>
                      <CardTitle className="text-xl">{cert.productName}</CardTitle>
                      <CardDescription className="font-mono text-sm">
                        {cert.certificateNo}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Issued: {new Date(cert.issuedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Expires: {new Date(cert.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <QrCode className="w-4 h-4" /> View QR
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <Eye className="w-4 h-4" /> Verify
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}