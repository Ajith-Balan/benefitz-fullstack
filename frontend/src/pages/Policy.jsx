import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
  return (
    <div>
      <Layout title={'Privacy Policy - Benefitz International Consulting'}>
        <div className="privacy-policy p-4">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

          <p className="mb-4">
            <strong>Benefitz International Consulting Company</strong> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with our services, including our paid consultations and subscription plans. Please read this policy carefully to understand our practices regarding your personal data.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>
              <strong>Personal Data</strong>: We collect your name, email address, and phone number when you subscribe or register for our services.
            </li>
            <li>
              <strong>Transaction Data</strong>: Includes payment information for our ₹999 subscription or consulting fees.
            </li>
            <li>
              <strong>Usage Data</strong>: Includes IP address, browser type, and interaction patterns with our website.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies</strong>: Used to improve your browsing experience.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>To process subscriptions and consulting service requests.</li>
            <li>To provide personalized support and communication.</li>
            <li>To manage user accounts and deliver invoices.</li>
            <li>To analyze service usage for improvements.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Consulting Abroad Fees</h2>
          <p className="mb-4">
            Consulting services for opportunities abroad are subject to additional fees based on the destination country and the complexity of the service. Detailed fee structures will be shared during the consultation process. All international consulting services must be paid in advance unless otherwise agreed.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Return & Refund Policy</h2>
          <p className="mb-4">
            Due to the nature of consulting services, all payments made (including the ₹999 subscription and international consulting fees) are non-refundable. However, in cases of payment error or duplicate transactions, users can contact our support team within 7 working days for review. Any exceptions or credits issued will be at the sole discretion of the company, and processed according to internal approval policies.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Sharing Your Information</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>We only share your data with trusted partners or legal authorities when required.</li>
            <li>Third-party services (e.g., payment gateways) may have access to necessary information to complete transactions.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Security of Your Information</h2>
          <p className="mb-4">
            We implement physical, technical, and administrative security measures to protect your data. However, online data transmission is never fully secure, so we recommend using secure networks and devices.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Data Protection Rights</h2>
          <p className="mb-4">
            You may request access to, correction of, or deletion of your personal data. Contact us via our support page for assistance.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this policy periodically. Changes will be posted on this page with an updated effective date.
          </p>
        </div>
      </Layout>
    </div>
  )
}

export default Policy
