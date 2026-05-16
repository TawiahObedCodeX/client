import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-white py-8 px-6 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            © {new Date().getFullYear()} Food and Drugs Authority Ghana. All Rights Reserved.
          </div>

          <div className="flex gap-6 text-slate-500">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Use</a>
            <a href="#" className="hover:text-slate-900">Contact FDA</a>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            Built with <Heart className="w-4 h-4 text-red-500" /> for Ghana
          </div>
        </div>
      </div>
    </footer>
  );
}