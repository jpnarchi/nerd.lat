import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nerd.lat"; 

export const metadata = {
  title: "Nerd ",
  description: "Nerd es una plataforma impulsada por inteligencia artificial que crea sitios web de manera automática, rápida y optimizada para cualquier negocio o proyecto.",
  icons: {
    icon: "/lentes.svg"
  },
  openGraph: {
    title: "Nerd - Crea tu sitio web con IA",
    description:
      "Nerd es una plataforma impulsada por inteligencia artificial que crea sitios web de manera automática, rápida y optimizada.",
    url: baseUrl,
    type: "website",
    images: [
      {
        url: `${baseUrl}/marketing.jpeg`, // Dynamic URL
        width: 1200,
        height: 630,
        alt: "Nerd - Plataforma impulsada por IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nerd - Crea tu sitio web con IA",
    description:
      "Nerd es una plataforma impulsada por inteligencia artificial que crea sitios web de manera automática, rápida y optimizada.",
    images: [`${baseUrl}/marketing.jpeg`], // Dynamic URL
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
      >
        <ConvexClientProvider>
        <Provider>
         {children}
         <Toaster />
        </Provider>
        </ConvexClientProvider>
       
      </body>
    </html>
  );
}
