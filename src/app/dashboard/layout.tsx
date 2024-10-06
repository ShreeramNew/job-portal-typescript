import DashNavForMobile from "@/components/dashboard/DashNavForMobile";
import LeftNavbar from "@/components/dashboard/LeftNavbar";
import NavBar from "@/components/NavBar";
import NavForMobile from "@/components/NavForMobile";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <div className=" flex">
            <LeftNavbar ForDrawer={false} />
            <DashNavForMobile/>
            {children}
         </div>
      </>
   );
}
