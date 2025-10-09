import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-gradient-br">
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
          <h1 className="text-4xl font-bold text-white mb-8">
            Terms of Service
          </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-300 mb-4">
              By accessing and using Fest-Vibes, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Description of Service
            </h2>
            <p className="text-gray-300 mb-4">
              Fest-Vibes is a platform that helps users discover local music
              events, plan music experiences, and connect with other music
              enthusiasts. Our service includes planning tools, event discovery,
              and social features.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              User Responsibilities
            </h2>
            <p className="text-gray-300 mb-4">
              You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              use of your account.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Beta Testing
            </h2>
            <p className="text-gray-300 mb-4">
              Our service is currently in beta. Features may change, and the
              service may experience downtime or interruptions. Beta users
              understand that the service is provided "as is" during this
              testing period.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Prohibited Uses
            </h2>
            <p className="text-gray-300 mb-4">
              You may not use our service for any unlawful purpose or to violate
              any laws. You agree not to use the service to harass, abuse, or
              harm other users.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-300 mb-4">
              Fest-Vibes shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of the service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-300 mb-4">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes to these terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please
              contact us through our website or support channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
