import './globals.css';
import { Providers } from './providers';

import { Provider } from 'react-redux';
import { store } from '../features/store';

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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}