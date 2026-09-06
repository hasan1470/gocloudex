import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "./marketing.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GoCloudEx — Websites & Digital Products",
    template: "%s | GoCloudEx",
  },
  description:
    "Thoughtful business websites, e-commerce stores and useful digital products. Explore GoCloudEx services, live projects and development approach.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  keywords: [
    "portfolio",
    "cloud solutions",
    "web development",
    "Next.js",
    "React",
    "Cloudinary",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "full-stack",
    "developer",
    "WordPress",
    "headless CMS",
    "Web Design",
    "API Integration",
    "WooCommerce",
    "Elementor",
    "Digital Experiences",
    "SEO",
    "Digital Marketing",
  ],
  authors: [{ name: "GoCloudEx" }],
  creator: "GoCloudEx",
  metadataBase: new URL("https://gocloudex.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gocloudex.com",
    title: "GoCloudEx — Websites & Digital Products",
    description:
      "Thoughtful websites and useful digital products. Designed with purpose, built with care.",
    siteName: "GoCloudEx",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GoCloudEx Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoCloudEx — Websites & Digital Products",
    description:
      "Thoughtful websites and useful digital products. Designed with purpose, built with care.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedColor = localStorage.getItem('theme-color');
                  const savedFont = localStorage.getItem('theme-font');
                  if (savedColor) {
                    const colors = {
                      'rgb(59 130 246)': 'rgb(37 99 235)',
                      'rgb(147 51 234)': 'rgb(126 34 206)',
                      'rgb(22 163 74)': 'rgb(21 128 61)',
                      'rgb(220 26 26)': 'rgb(185 28 28)',
                      'rgb(234 88 12)': 'rgb(194 65 12)'
                    };
                    document.documentElement.style.setProperty('--primary-color', savedColor);
                    if (colors[savedColor]) {
                      document.documentElement.style.setProperty('--primary-color-dark', colors[savedColor]);
                    }
                  }
                  if (savedFont) {
                    const fonts = { "'Inter', sans-serif": 'var(--font-inter), Arial, sans-serif', "'Merriweather', serif": 'Georgia, serif', "'JetBrains Mono', monospace": 'ui-monospace, monospace', "'Plus Jakarta Sans', sans-serif": 'system-ui, sans-serif' };
                    if (fonts[savedFont]) {
                      document.documentElement.style.setProperty('--heading-font', fonts[savedFont]);
                      document.documentElement.style.setProperty('--body-font', fonts[savedFont]);
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
