// components/layout/Footer.tsx
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-white py-8 px-6 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright - Fixed to show 2026 */}
          <div className="flex items-center gap-2 text-slate-500">
            © 2026 Food and Drugs Authority Ghana. All Rights Reserved.
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact FDA</a>
          </div>

          {/* Built with love */}
          <div className="flex items-center gap-1 text-slate-400">
            Built with <Heart className="w-4 h-4 text-red-500" /> for Ghana
          </div>
        </div>
        
        {/* FDA Contact Information */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-500">
            <div>
              <p className="font-medium text-slate-700 mb-1">Head Office</p>
              <p className="text-xs">17 Indian Ocean Street, Nelson Mandela Ave</p>
              <p className="text-xs">Accra, Ghana</p>
            </div>
            <div>
              <p className="font-medium text-slate-700 mb-1">Contact</p>
              <p className="text-xs">+233 302 233 200</p>
              <p className="text-xs">fda@fda.gov.gh</p>
            </div>
            <div>
              <p className="font-medium text-slate-700 mb-1">Working Hours</p>
              <p className="text-xs">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-xs">Weekend & Holidays: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}