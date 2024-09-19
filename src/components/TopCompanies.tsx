"use client";
import CompaniesCard from "./CompaniesCard";
import { v4 as uuidv4 } from "uuid";

export default function TopCompanies() {
   let companies = [
      {
         imageURL:
            "https://images.unsplash.com/photo-1504119089809-1d5100a33f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
         name: "TechHive",
         openings: 5,
      },
      {
         imageURL:
            "https://images.unsplash.com/photo-1571979405609-20128fcb75a9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         name: "BlueWave",
         openings: 20,
      },
      {
         imageURL:
            "https://images.unsplash.com/photo-1551029313-1c711302ce7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         name: "NextGen",
         openings: 14,
      },
      {
         imageURL: "https://cdn.pixabay.com/photo/2016/12/28/08/15/hummingbird-1935665_1280.png",
         name: "Zenith",
         openings: 9,
      },
      {
         imageURL:
            "https://images.unsplash.com/photo-1667581386428-ed64b9bee6a6?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         name: "Quantum",
         openings: 12,
      },
      {
         imageURL:
            "https://images.unsplash.com/photo-1613992519026-c1a3bb8341ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         name: "PixelStream",
         openings: 18,
      },
      {
         imageURL:
            "https://images.unsplash.com/photo-1642045556221-929fc9342a81?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         name: "InnoSphere",
         openings: 16,
      },
      {
         imageURL:
            "https://images.unsplash.com/photo-1443641723753-250ff9bb3c83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         name: "Skyward",
         openings: 31,
      },
      {
         imageURL:
            "https://images.unsplash.com/reserve/uZYSV4nuQeyq64azfVIn_15130980706_64134efc6e_o.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGxldHRlciUyMEd8ZW58MHx8MHx8fDA%3D",
         name: "EcoFuze",
         openings: 4,
      },
   ];
   return (
      <div className=" flex flex-col justify-center items-center">
         <h2 className=" m-[20px] mt-[30px] text-[23px]">Top Companies Hiring</h2>
         <div className=" grid grid-cols-[1fr] md:grid-cols-[1fr_1fr_1fr] gap-[70px]">
            {companies.map((company) => {
               return (
                  <CompaniesCard
                     key={uuidv4()}
                     imageURL={company.imageURL}
                     name={company.name}
                     openings={company.openings}
                  />
               );
            })}
         </div>
      </div>
   );
}
