import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-8">
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="outline"
                className="border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, such as when
              you create an account, sign up for our beta waitlist, or contact
              us for support.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to provide, maintain, and
              improve our services, process transactions, send you technical
              notices and support messages, and communicate with you about
              products, services, and events.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Analytics and Tracking
            </h2>
            <p className="text-gray-300 mb-4">
              We use analytics tools including PostHog to help us understand how
              users interact with our service. These tools may collect
              information about your device and usage patterns to help us
              improve our product.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please
              contact us through our website or support channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
