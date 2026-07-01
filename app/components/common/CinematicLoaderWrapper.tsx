// // src/components/common/CinematicLoaderWrapper.tsx

// "use client";

// // ============================================
// // FDA GHANA FRMS - CINEMATIC LOADER
// // A premium loading animation displayed while
// // pages are loading. Shows the FDA Ghana branding
// // with smooth animations.
// // ============================================

// import { useEffect, useState } from "react";
// import { HiOutlineShieldCheck } from "react-icons/hi";

// export default function CinematicLoaderWrapper() {
//   // State to control animation phases
//   const [isVisible, setIsVisible] = useState(true);
//   const [progress, setProgress] = useState(0);

//   // Simulate loading progress
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           // Hide loader after completion
//           setTimeout(() => setIsVisible(false), 500);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, []);

//   // If not visible, don't render anything
//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-950">
//       {/* Animated background grid */}
//       <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

//       {/* Floating particles background effect */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-gold-400/30"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 2}s`,
//               opacity: Math.random() * 0.5 + 0.2,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main loader content */}
//       <div className="relative z-10 text-center">
//         {/* Logo animation */}
//         <div className="mb-8 animate-float">
//           <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
//             {/* Outer glow ring */}
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 animate-pulse-soft" />
            
//             {/* Inner ring animation */}
//             <div className="absolute inset-2 rounded-xl border-2 border-gold-400/30 animate-spin-slow" />
            
//             {/* Logo container */}
//             <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-2xl shadow-gold-500/30">
//               <HiOutlineShieldCheck className="h-10 w-10 text-primary-950" />
//             </div>
//           </div>
//         </div>

//         {/* Brand name */}
//         <h1 className="mb-2 font-heading text-3xl font-bold text-white">
//           FDA <span className="text-gold-400">Ghana</span>
//         </h1>
        
//         {/* Subtitle */}
//         <p className="mb-8 font-heading text-sm font-medium tracking-wider text-surface-400 uppercase">
//           Regulation Management System
//         </p>

//         {/* Progress bar */}
//         <div className="mx-auto h-1 w-48 overflow-hidden rounded-full bg-surface-800">
//           <div
//             className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 ease-out"
//             style={{ width: `${progress}%` }}
//           />
//         </div>

//         {/* Loading text */}
//         <p className="mt-4 font-mono text-xs text-surface-500">
//           {progress < 100 ? "Loading..." : "Ready"}
//         </p>
//       </div>
//     </div>
//   );
// }