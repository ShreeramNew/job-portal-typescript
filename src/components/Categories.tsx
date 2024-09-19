import CategoryCard from "./CategoryCard";
import { v4 as uuidv4 } from "uuid";
export default function Categories() {
   type category = {
      imageLink: string;
      category: string;
   };
   let categories = [
      {
         imageLink:
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Sales and Marketing",
      },
      {
         imageLink:
            "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Finance and Accounting",
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Customer Service",
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1581092157699-83c90752400a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Engineering",
      },
      {
         imageLink:
            "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Healthcare",
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Education and Training",
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Human Resources",
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Creative and Design",
      },
   ];

   return (
      <div className=" flex flex-col justify-center items-center">
         <h2 className=" m-[20px] text-[23px]">Browse Career Fields</h2>
         <div className=" grid grid-cols-[1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-[40px]">
            {categories.map((item: category) => {
               return (
                  <CategoryCard
                     key={uuidv4()}
                     imageLink={item.imageLink}
                     category={item.category}
                  />
               );
            })}
         </div>
      </div>
   );
}
