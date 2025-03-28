import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { changeFilters, pushFilterResults } from "@/features/SearchSlice";
import { useEffect, useMemo, useState } from "react";
import { q } from "framer-motion/client";
import EachJobType from "@/types/EachJobType";

type filtersType = {
   experience: number[];
   location: string[];
   salary: number[];
};

type nameType = "location" | "experience" | "salary";

const CheckboxContent = ({
   title,
   value,
   name,
}: {
   title: string;
   value: string | number[];
   name: string;
}) => {
   const filters = useSelector((state: RootState) => state.SearchSlice.filters);
   let dispatch = useDispatch();

   //----------------Handle checking or unchecking the checkbox----------
   const onChange: CheckboxProps["onChange"] = (e) => {
      let checkedValue = e.target.value;
      let isChecked = e.target.checked;
      let name: nameType = e.target.name as nameType;

      let newFilters: filtersType = {
         salary: [],
         experience: [],
         location: [],
      };

      if (name === "location") {
         newFilters = {
            ...filters,
            location: isChecked
               ? filters.location.concat([checkedValue])
               : filters.location.filter((item) => item !== checkedValue),
         };
      } else {
         newFilters = {
            ...filters,
            [name]: isChecked
               ? filters[name].concat(checkedValue)
               : filters[name].filter((item) => !checkedValue.includes(item)),
         };
      }

      dispatch(changeFilters(newFilters));
   };
   return (
      <div className=" w-full border- border-gray-900 px-[20px] text-blue-600">
         <Checkbox
            className="filterCheckBox"
            name={name}
            onChange={(e) => onChange(e)}
            value={value}
         >
            <div className="text-gray-600">{title}</div>
         </Checkbox>
      </div>
   );
};

const items: CollapseProps["items"] = [
   {
      key: "1",
      label: "Experience",
      children: (
         <div>
            <CheckboxContent name="experience" value={[0, 1]} title="0-1 Year" />
            <CheckboxContent name="experience" value={[2, 5]} title="2-5 Year" />
            <CheckboxContent name="experience" value={[6, 10]} title="6-10 Year" />
         </div>
      ),
   },

   {
      key: "2",
      label: "Location",
      children: (
         <div>
            <CheckboxContent name="location" value={"bangalore"} title="Bangalore" />
            <CheckboxContent name="location" value={"delhi"} title="Delhi" />
            <CheckboxContent name="location" value={"chennai"} title="Chennai" />
            <CheckboxContent name="location" value={"noida"} title="Noida" />
            <CheckboxContent name="location" value={"mumbai"} title="Mumbai" />
         </div>
      ),
   },
   {
      key: "3",
      label: "Salary",
      children: (
         <div>
            <CheckboxContent name="salary" value={[2, 6]} title="2-6 LPA" />
            <CheckboxContent name="salary" value={[7, 20]} title="7-20 LPA" />
            <CheckboxContent name="salary" value={[21, 50]} title="21-50 LPA" />
         </div>
      ),
   },
];

export default function FilterCard() {
   const onChange = (key: string | string[]) => {
      // console.log(key);
   };

   const filters = useSelector((state: RootState) => state.SearchSlice.filters);
   const searchResults = useSelector((state: RootState) => state.SearchSlice.results);
   const dispatch = useDispatch();
   let sortedExperience = useMemo(
      () => [...filters.experience].sort((a, b) => a - b),
      [filters.experience]
   );
   let sortedSalary = useMemo(() => [...filters.salary].sort((a, b) => a - b), [filters.salary]);
   //-----------------------Handle filter change----------------------
   const applyNewFilters = (filters: filtersType) => {
      let finalResult: EachJobType[] = [];

      finalResult = searchResults.filter((job) => {
         let matchesExperience =
            filters.experience.length === 0 ||
            (job.minExp &&
               job.maxExp &&
               job.minExp >= sortedExperience[0] &&
               job.maxExp <= sortedExperience[sortedExperience.length - 1]);

         let matchesLocation =
            filters.location.length === 0 ||
            (job.location && filters.location.includes(job.location?.toLocaleLowerCase()));

         let matchesSalary =
            filters.salary.length === 0 ||
            (job.minSalary &&
               job.maxSalary &&
               job.minSalary >= sortedSalary[0] &&
               job.maxSalary <= sortedSalary[sortedSalary.length - 1]);

         return matchesExperience && matchesLocation && matchesSalary;
      });

      //-----------Once all the filter is applied, update the Filter result
      dispatch(pushFilterResults(finalResult));
   };

   useEffect(() => {
      if (searchResults.length > 0) {
         applyNewFilters(filters);
      }
   }, [filters]);

   const handleClear = () => {
      let allCheckbox = document.querySelectorAll<HTMLInputElement>(".filterCheckBox");
      allCheckbox.forEach((checkbox) => (checkbox.checked = false));
   };

   return (
      <div className="w-[100%] lg:w-[20rem] h-auto  bg-white border-2 border-gray-100  shadow-2xl rounded-xl  relative">
         <div className="hidden lg:flex md:flex justify-between items-center p-[20px] border-b- border-gray-800">
            <div className=" flex justify-center items-center gap-[8px]">
               <div>Filters</div>
               <HiOutlineAdjustmentsVertical />
            </div>
            {/* <div className="text-blue-400 cursor-pointer" onClick={handleClear}>
               Clear
            </div> */}
         </div>
         <hr className="hidden md:block lg:block" />
         <div className="font-bold">
            <Collapse
               items={items}
               defaultActiveKey={["1", "2", "3"]}
               onChange={onChange}
               expandIconPosition={"end"}
               ghost={true}
               size="small"
            />
         </div>
      </div>
   );
}
