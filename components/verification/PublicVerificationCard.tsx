// // components/verification/PublicVerificationCard.tsx
// "use client";

// import { motion } from "motion/react";
// import { CheckCircle, Shield, Calendar, Building2, Package } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// interface VerificationData {
//   certificateNo: string;
//   productName: string;
//   manufacturerName: string;
//   category: string;
//   issuedAt: string;
//   expiresAt: string;
//   isRevoked: boolean;
// }

// interface PublicVerificationCardProps {
//   data: VerificationData;
// }

// export function PublicVerificationCard({ data }: PublicVerificationCardProps) {
//   const isValid = !data.isRevoked && new Date(data.expiresAt) > new Date();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
//     >
//       <div className={`p-8 text-center ${isValid ? "bg-emerald-50" : "bg-red-50"}`}>
//         {isValid ? (
//           <>
//             <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
//             <h2 className="text-2xl font-heading font-bold text-emerald-800">Verified Authentic</h2>
//             <p className="text-emerald-600 mt-2">This product is officially registered with FDA Ghana</p>
//           </>
//         ) : (
//           <>
//             <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
//             <h2 className="text-2xl font-heading font-bold text-red-800">Verification Failed</h2>
//             <p className="text-red-600 mt-2">
//               {data.isRevoked ? "This certificate has been revoked" : "Certificate has expired"}
//             </p>
//           </>
//         )}
//       </div>

//       <div className="p-8 space-y-6">
//         <div className="flex justify-between items-center border-b border-slate-100 pb-4">
//           <span className="text-slate-500">Certificate Number</span>
//           <span className="font-mono font-bold">{data.certificateNo}</span>
//         </div>

//         <div className="flex items-start gap-4">
//           <Package className="w-5 h-5 text-[#D4A017] mt-1" />
//           <div>
//             <p className="text-slate-500 text-sm">Product Name</p>
//             <p className="font-semibold text-lg">{data.productName}</p>
//           </div>
//         </div>

//         <div className="flex items-start gap-4">
//           <Building2 className="w-5 h-5 text-[#D4A017] mt-1" />
//           <div>
//             <p className="text-slate-500 text-sm">Manufacturer</p>
//             <p className="font-medium">{data.manufacturerName}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-slate-500 text-sm">Category</p>
//             <Badge variant="gold">{data.category}</Badge>
//           </div>
//           <div>
//             <p className="text-slate-500 text-sm">Issued Date</p>
//             <p className="font-mono text-sm">{new Date(data.issuedAt).toLocaleDateString()}</p>
//           </div>
//         </div>

//         <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-200">
//           <Calendar className="w-5 h-5 text-[#D4A017] mx-auto mb-2" />
//           <p className="text-sm text-slate-600">
//             {isValid ? (
//               <>Valid until <strong>{new Date(data.expiresAt).toLocaleDateString()}</strong></>
//             ) : (
//               "This certificate is no longer valid"
//             )}
//           </p>
//         </div>

//         <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
//           Verified through FDA Ghana RegTech Platform • 2026
//         </div>
//       </div>
//     </motion.div>
//   );
// }