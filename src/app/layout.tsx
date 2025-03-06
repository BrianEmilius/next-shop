import type { Metadata } from "next"
import "./globals.css"
import { getSiteConfig } from "@/lib/site-config"

const site_config = await getSiteConfig()
export const metadata: Metadata = {
  title: {
    default: site_config.site_name,
    template: "%s | " + site_config.site_name
  },
  description: site_config.site_tagline,
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
