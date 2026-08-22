import AuthSessionProvider from "@/app/components/sessionprovider";
import Navbar from "@/app/components/navbar";
import {NotificationProvider} from "@/app/components/notificationcontext";
import Notification from "@/app/components/notification";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
  <html lang="en">
      <body className="bg-white font-sans text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
      <AuthSessionProvider>
          <NotificationProvider>
              <Navbar />
              <Notification />
              <main className="px-6 py-4">
                  {children}
              </main>
          </NotificationProvider>
      </AuthSessionProvider>
      </body>
  </html>
  )
}
