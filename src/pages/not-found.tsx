import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8fafc] px-4 w-full">
      <SEO title="Page Not Found | fixitech" description="The page you requested could not be found." />
      <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 font-display">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Fix Not Found</h2>
        <p className="text-slate-500 mb-8 text-lg">
          It looks like the troubleshooting guide you are looking for has been moved, deleted, or never existed.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
