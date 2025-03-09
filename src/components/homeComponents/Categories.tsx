import { delay } from "framer-motion";
import CategoryCard from "../cards/CategoryCard";
import { v4 as uuidv4 } from "uuid";
export default function Categories() {
   type category = {
      imageLink: string;
      category: string;
      SearchKeywords: string;
      span: number;
      xMove: string;
      yMove: string;
      delay: number;
   };
   let categories = [
      {
         imageLink:
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Sales and Marketing",
         SearchKeywords: "digital marketing sales strategies market analysis branding",
         span: 6,
         xMove: "-1rem",
         yMove: "0",
         delay: 0,
      },
      {
         imageLink:
            "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Finance and Accounting",
         SearchKeywords: "accounting finance budgeting auditing tax analysis",
         span: 6,
         xMove: "1rem",
         yMove: "0",
         delay: 0.7,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Customer Service",
         SearchKeywords: "customer support client relations service management crm tools",
         span: 4,
         xMove: "-1rem",
         yMove: "0",
         delay: 0.1,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1581092157699-83c90752400a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Engineering",
         SearchKeywords: "react node software development mechanical civil electrical",
         span: 4,
         xMove: "0rem",
         yMove: "-1rem",
         delay: 0.6,
      },
      {
         imageLink:
            "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Healthcare",
         SearchKeywords: "nursing doctor patient care medical research health services",
         span: 4,
         xMove: "1rem",
         yMove: "0",
         delay: 0.3,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Education and Training",
         SearchKeywords: "teaching curriculum training elearning education tools",
         span: 3,
         xMove: "-1rem",
         yMove: "0",
         delay: 0.5,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Human Resources",
         SearchKeywords: "recruitment hr policies employee engagement talent management",
         span: 6,
         xMove: "0rem",
         yMove: "-1rem",
         delay: 0.2,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Creative and Design",
         SearchKeywords: "graphic design creativity branding photography video editing",
         span: 3,
         xMove: "1rem",
         yMove: "0",
         delay: 0.4,
      },
   ];

   return (
      <div className=" flex flex-col justify-center items-center mt-[4rem] md:mt-[5rem] lg:max-w-[78rem] md:mx-auto">
         <h2 className=" m-[20px] text-[1.6rem] md:text-[3rem] text-gray-800">Browse Career Fields</h2>
         <div className="  flex items-center md:grid grid-cols-12 p-[3%] w-full overflow-x-scroll md:overflow-x-visible gap-[4rem] md:gap-3  h-[35vh] md:h-fit px-[20px] md:px-[5%] border- border-red-900">
            {categories.map((item: category) => {
               return (
                  <CategoryCard
                     key={uuidv4()}
                     imageLink={item.imageLink}
                     category={item.category}
                     SearchKeywords={item.SearchKeywords}
                     span={item.span}
                     xMove={item.xMove}
                     yMove={item.yMove}
                     delay={item.delay}
                  />
               );
            })}
         </div>
      </div>
   );
}
