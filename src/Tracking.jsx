import { useState } from "react";
import QRCode from "react-qr-code";

export default function Tracking() {
  const [url, setUrl] = useState("");

  const generateTrackingLink = (inputUrl) => {
    // Exemple : créer un lien vers ta future page /track qui redirige
    const encoded = encodeURIComponent(inputUrl);
    return `${window.location.origin}/track?target=${encoded}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-green-400 to-cyan-400 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Créer un QR Code avec Tracking</h1>
        
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="🔗 Entrez une URL à tracker"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {url && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <QRCode value={generateTrackingLink(url)} size={256} />
            <p className="mt-4 text-sm text-gray-500 break-all">{generateTrackingLink(url)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
