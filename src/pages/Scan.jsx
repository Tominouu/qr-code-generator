import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://ytpahcacxjykrhgshdee.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFoY2FjeGp5a3JoZ3NoZGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3ODUxMzYsImV4cCI6MjA2MTM2MTEzNn0.kbAIp4gGJam7t5AhGQU__Nce_DnibFtuxBYdRlxeUzY"
  );

export default function Scan() {
  const { id } = useParams();

  useEffect(() => {
    const logScan = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const { ip, city, country_name, latitude, longitude } = data;

        await supabase.from("scans").insert([
          {
            code_id: id,
            ip,
            city,
            country: country_name,
            latitude,
            longitude,
          },
        ]);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du scan:", error);
      }
    };

    logScan();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <h1 className="text-3xl font-bold text-white mb-4">✅ QR Code Scanné !</h1>
      <p className="text-white">Merci ! Redirection en cours...</p>
    </div>
  );
}
