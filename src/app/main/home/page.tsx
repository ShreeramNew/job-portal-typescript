"use client";
import Categories from "@/components/homeComponents/Categories";
import Footer from "@/components/homeComponents/Footer";
import Header from "@/components/homeComponents/Header";
import SuccessStories from "@/components/homeComponents/SuccessStories";
import TopCompanies from "@/components/homeComponents/TopCompanies";

export default function Home() {
   return (
      <>
         <div>
            <Header />
            <Categories />
            {/* <TopCompanies /> */}
            <SuccessStories />
            <Footer />
         </div>
      </>
   );
}
