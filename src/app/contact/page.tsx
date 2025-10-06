export default function ContactPage() {
  return (
    <main className="p-massive max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        We'd love to hear from you! Whether you're an artisan looking to join our marketplace,
        a customer with questions, or a collaborator with ideas—Handcrafted Haven is here to connect.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reach Out</h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            📧 <strong>Email:</strong> support@handcraftedhaven.com
          </li>
          <li>
            🏢 <strong>Address:</strong> Handcrafted Haven, Mbabane ESwatini, H100
          </li>
          <li>
            💬 <strong>Team Slack:</strong> #handcrafted-haven (for contributors)
          </li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 italic mt-8">
        Handcrafted Haven is a student-built platform for showcasing artisan talent and fostering creative community.
      </p>
    </main>
  );
}
