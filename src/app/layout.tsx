import './globals.css'; // Importar el archivo global de estilos
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-50 border-b border-gray-100">
          <div className='container max-w-7xl mx-auto p-6 h-16'>
    {/*       <h1 className='text-xl'>Codify</h1> */}
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}