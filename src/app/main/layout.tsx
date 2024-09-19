import NavBar from "@/components/NavBar";
import NavForMobile from "@/components/NavForMobile";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <NavBar />
         <NavForMobile />
         {children}
      </>
   );
}
