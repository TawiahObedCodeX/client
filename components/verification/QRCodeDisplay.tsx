// // components/verification/QRCodeDisplay.tsx
// "use client";

// import { useEffect, useRef } from "react";
// import QRCode from "qrcode";
// import { motion } from "motion/react";

// interface QRCodeDisplayProps {
//   value: string;
//   size?: number;
//   className?: string;
// }

// export function QRCodeDisplay({ value, size = 200, className }: QRCodeDisplayProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (canvasRef.current && value) {
//       QRCode.toCanvas(canvasRef.current, value, {
//         width: size,
//         margin: 2,
//         color: {
//           dark: "#0D1B2A",
//           light: "#FFFFFF",
//         },
//       }, (error) => {
//         if (error) console.error("QR generation failed:", error);
//       });
//     }
//   }, [value, size]);

//   return (
//     <motion.div
//       initial={{ scale: 0.9, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       className={className}
//     >
//       <canvas ref={canvasRef} className="rounded-2xl shadow-lg" />
//     </motion.div>
//   );
// }