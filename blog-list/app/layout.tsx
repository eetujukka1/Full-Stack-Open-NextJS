import Link from "next/link"
import AuthSessionProvider from "@/app/components/sessionprovider";
import Navbar from "@/app/components/navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
  <html lang="en">
      <body>
      <AuthSessionProvider>
        <Navbar />
      </AuthSessionProvider>
      {children}
      </body>
  </html>
  )
}