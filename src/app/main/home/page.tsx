"use client";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SuccessStories from "@/components/SuccessStories";
import TopCompanies from "@/components/TopCompanies";

export default function Home() {
   return (
      <>
         <div>
            <Header />
            <Categories />
            <TopCompanies />
            <SuccessStories />
            <Footer />
         </div>
      </>
   );
}
