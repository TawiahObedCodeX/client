// components/layout/Footer.tsx - Updated Footer with 2026 Version
// Footer component used on the landing page

import { Heart, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                F
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#0F172A]">FDA Ghana</h3>
                <p className="text-xs text-slate-500">Food and Drugs Authority</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              The official digital platform for product registration and regulatory 
              compliance management with the Food and Drugs Authority Ghana. 
              Ensuring safety, quality, and efficacy of regulated products since 1997.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#0F172A] mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/register" className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors">
                  Register Product
                </a>
              </li>
              <li>
                <a href="/login" className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors">
                  Applicant Login
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors">
                  Track Application
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors">
                  Download Forms
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-[#0F172A] mb-4">Contact FDA</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-slate-600">
                <span className="font-medium text-slate-700">Head Office:</span><br />
                17 Indian Ocean Street,<br />
                Nelson Mandela Ave, Accra
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-medium text-slate-700">Phone:</span><br />
                +233 302 233 200
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-medium text-slate-700">Email:</span><br />
                fda@fda.gov.gh
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright - 2026 Version */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4 text-[#2563EB]" />
              <span>© 2026 Food and Drugs Authority Ghana. All Rights Reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Accessibility
              </a>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-1 text-sm text-slate-400">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Ghana
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}