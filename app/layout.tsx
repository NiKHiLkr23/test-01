import "./style/globals.css";
import "./style/home.css";
import "./style/layout.css";
import "./style/loader.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
