import './globals.css'

export const metadata = {
  title: 'CrisAlert',
  description: 'Plateforme de gestion de crise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}