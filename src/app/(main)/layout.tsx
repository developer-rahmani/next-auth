import NextAuthProvider from "@/provider/next-auth-provider";
import Header from "@/components/header";


export default function LocalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
