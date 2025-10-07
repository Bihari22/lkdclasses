import AboutPage from "./About";

// Env variables
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const siteDescription ="Learn more about LKD Classes in Sitalpur, Saran — Our mission, vision, and dedication to empowering students through expert faculty, structured learning, and a results-oriented approach.";
const siteLogo = process.env.NEXT_PUBLIC_SITE_LOGO || "/logo.png";

export const metadata = {
  title: `About | ${siteName}`,
  description: siteDescription,
  openGraph: {
    title: `About | ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/about`,
    siteName: siteName,
    images: [siteLogo],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteName}`,
    description: siteDescription,
    images: [siteLogo],
  },
};

export default function Page() {
  return <AboutPage />;
}
