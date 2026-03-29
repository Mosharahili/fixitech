import { SEO } from "@/components/SEO";
import { Shield, FileText, Info } from "lucide-react";

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
      <SEO title="About Us | fixitech" description="Learn about fixitech and our mission to make technology repair accessible to everyone." />
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-full mb-6">
          <Info className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-display">About fixitech</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          We believe technology should work for you, not against you. When things break, we're here to help you fix them.
        </p>
      </div>

      <div className="prose prose-lg prose-blue max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h2>Our Mission</h2>
        <p>
          Founded by a team of frustrated IT professionals, fixitech was built on a simple premise: technical troubleshooting shouldn't require a computer science degree. We aim to translate complex diagnostic procedures into plain English, step-by-step guides that anyone can follow.
        </p>
        <p>
          Every day, millions of devices end up in landfills simply because of minor software glitches or easily resolvable hardware faults. By empowering users to repair their own devices, we hope to save you money, reduce e-waste, and demystify the technology that powers our daily lives.
        </p>
        
        <h2>How We Create Content</h2>
        <p>
          Every guide on fixitech is meticulously researched and based on proven IT industry standards. We don't just guess; we test our solutions. Our steps follow a logical progression: starting with the easiest, safest, and most likely fixes, before moving on to more complex solutions like factory resets or hardware diagnostics.
        </p>

        <div className="bg-blue-50 p-6 rounded-2xl mt-8 border border-blue-100">
          <h3 className="text-blue-900 mt-0">Why trust us?</h3>
          <ul className="text-blue-800 m-0">
            <li>No sponsored fixes - we only recommend solutions that actually work.</li>
            <li>Clear, actionable steps without unnecessary jargon.</li>
            <li>Categorized specifically for the devices you use every day.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
      <SEO title="Privacy Policy | fixitech" description="Our privacy policy details how we handle your data." />
      
      <div className="mb-12">
        <div className="inline-flex items-center space-x-3 mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-extrabold text-slate-900 font-display">Privacy Policy</h1>
        </div>
        <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-lg prose-blue max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <p>Your privacy is important to us. It is fixitech's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        
        <h2>Information We Collect</h2>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>
        <p>Since fixitech is primarily a static informational website, we collect very little data. We may collect anonymous analytics data (such as page views and bounce rates) to help us improve our content.</p>

        <h2>Use of Information</h2>
        <p>Any information we collect is used solely to improve our website experience and understand which troubleshooting guides are most helpful to our audience.</p>

        <h2>Third-Party Services</h2>
        <p>We do not share any personally identifying information publicly or with third-parties, except when required to by law. Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
      <SEO title="Terms of Service | fixitech" description="Terms and conditions for using fixitech." />
      
      <div className="mb-12">
        <div className="inline-flex items-center space-x-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-extrabold text-slate-900 font-display">Terms of Service</h1>
        </div>
        <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-lg prose-blue max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h2>1. Terms</h2>
        <p>By accessing the website at fixitech, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>

        <h2>2. Disclaimer</h2>
        <p>The troubleshooting guides provided on fixitech are for informational purposes only. While we strive to provide accurate and safe solutions, performing software or hardware modifications carries inherent risks.</p>
        <p><strong>fixitech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</strong></p>
        <p>Under no circumstances shall fixitech or its authors be liable for any data loss, hardware damage, or voided warranties resulting from the use of the guides provided on this site. Use the information at your own risk.</p>

        <h2>3. Limitations</h2>
        <p>In no event shall fixitech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on fixitech's website.</p>

        <h2>4. Accuracy of Materials</h2>
        <p>The materials appearing on fixitech's website could include technical, typographical, or photographic errors. fixitech does not warrant that any of the materials on its website are accurate, complete or current. fixitech may make changes to the materials contained on its website at any time without notice.</p>
      </div>
    </div>
  );
}
