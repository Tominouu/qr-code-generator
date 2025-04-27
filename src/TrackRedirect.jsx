import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // si tu n'as pas react-router-dom installé, on peut faire autrement
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ytpahcacxjykrhgshdee.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFoY2FjeGp5a3JoZ3NoZGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3ODUxMzYsImV4cCI6MjA2MTM2MTEzNn0.kbAIp4gGJam7t5AhGQU__Nce_DnibFtuxBYdRlxeUzY"
);

export default function TrackRedirect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const targetUrl = searchParams.get("target");

    const trackAndRedirect = async () => {
      try {
        // Récupère l'IP via un service public
        const res = await fetch("https://api.ipify.org?format=json");
        const { ip } = await res.json();

        // Récupère une géolocalisation basique
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geoData = await geoRes.json();

        // Envoie les infos à Supabase
        await supabase.from("scans").insert([
          {
            ip_address: ip,
            city: geoData.city,
            country: geoData.country_name,
            latitude: geoData.latitude,
            longitude: geoData.longitude,
            scanned_at: new Date().toISOString(),
            target_url: decodeURIComponent(targetUrl),
          },
        ]);

        // Petite pause avant de rediriger
        setTimeout(() => {
          window.location.href = decodeURIComponent(targetUrl);
        }, 1000);
      } catch (error) {
        console.error("Erreur tracking:", error);
        // Redirige quand même au cas où
        window.location.href = decodeURIComponent(targetUrl);
      }
    };

    if (targetUrl) {
      trackAndRedirect();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <h1 className="text-2xl font-bold mb-4 animate-pulse">⏳ Redirection en cours...</h1>
      <p>Merci pour votre scan ✨</p>
    </div>
  );
}
