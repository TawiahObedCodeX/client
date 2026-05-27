// app/(public)/verify/[qrToken]/page.tsx
import { PublicVerificationCard } from "@/components/verification/PublicVerificationCard";

// This is a Server Component - fetches data directly
async function fetchVerificationData(token: string) {
  // In production, this would query the database
  // For demo, return mock data
  return {
    certificateNo: "FDA-CERT-2026-00123",
    productName: "Alpha Immune Booster Syrup",
    manufacturerName: "Ghana Pharma Ltd",
    category: "DRUG",
    issuedAt: "2026-01-15T00:00:00Z",
    expiresAt: "2029-01-15T00:00:00Z",
    isRevoked: false,
  };
}

export default async function VerifyPage({ params }: { params: { qrToken: string } }) {
  const data = await fetchVerificationData(params.qrToken);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-[#0D1B2A]">FDA Ghana Product Verification</h1>
          <p className="text-slate-500 mt-2">Official Regulatory Ledger • 2026</p>
        </div>
        <PublicVerificationCard data={data} />
      </div>
    </div>
  );
}