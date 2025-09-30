import './globals.css'

export const metadata = {
  title: 'Udaxgui.com',
  description: 'Итгэл, найдвар, хайрын тухай мэдлэг түгээх блог.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

