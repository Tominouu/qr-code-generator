import { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { Helmet } from "react-helmet";

export default function App() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#4F46E5"); 
  const [downloadLink, setDownloadLink] = useState("");

  const generateQRCode = () => {
    const qrCodeElement = document.getElementById("qrcode-svg");

    html2canvas(qrCodeElement).then((canvas) => {
      const imageUrl = canvas.toDataURL("image/png");
      setDownloadLink(imageUrl);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Helmet>
        <title>Générateur de QR Code - Créez votre QR Code facilement</title>
        <meta
          name="description"
          content="Créez un QR code personnalisé avec un texte ou une URL de votre choix. Choisissez la couleur et téléchargez-le facilement."
        />
        <meta
          name="keywords"
          content="QR code, générateur de QR code, créer un QR code, télécharger QR code, opensource, personnaliser QR code"
        />
        <meta name="author" content="Tom Leclercq" />
        <meta property="og:title" content="Générateur de QR Code" />
        <meta property="og:description" content="Créez un QR code personnalisé" />
        <meta property="og:image" content="URL_de_l'image_du_QR_code" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center animate-fade-in space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Générateur de QR Code
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="🔗 Entrez un texte ou une URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          />

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Choisissez la couleur du QR Code</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            {text ? (
              <>
                <div id="qrcode-svg" className="flex justify-center mb-4">
                  <QRCode
                    value={text}
                    size={256}
                    fgColor={color}
                  />
                </div>
                <div className="space-y-4">
                  <button
                    onClick={generateQRCode}
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Télécharger le QR Code
                  </button>
                  {downloadLink && (
                    <a
                      href={downloadLink}
                      download="QRCode.png"
                      className="block text-center text-blue-600 hover:underline"
                    >
                      Cliquez ici pour télécharger
                    </a>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500">💡 Entrez quelque chose pour générer un QR code</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
