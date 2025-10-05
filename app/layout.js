    import "./globals.css";

    export const metadata = {
      title: "Udaxgui.com",
      description: "Итгэл, найдвар, хайрын тухай мэдлэг түгээх блог.",
      icons: {
        icon: {
          url: "/tomb.png",
          type: "image/png",
        },
      },
    };

    export default function RootLayout({ children }) {
      return (
        <html lang="mn">
          <head>
            <meta charSet="utf-8" />
          </head>
          <body suppressHydrationWarning={true}>
            {children}
          </body>
        </html>
      );
    }
    

