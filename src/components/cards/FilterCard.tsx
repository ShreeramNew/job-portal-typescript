import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { RiArrowRightSLine } from "react-icons/ri";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
const onChange: CheckboxProps["onChange"] = (e) => {
   console.log(`checked = ${e.target.checked}`);
};

const CheckboxContent = ({ title }: { title: string }) => {
   return (
      <div className=" w-full border- border-gray-900 px-[20px] text-blue-600">
         <Checkbox onChange={onChange}>
            <div className="text-gray-600">{title}</div>
         </Checkbox>
      </div>
   );
};

const items: CollapseProps["items"] = [
   {
      key: "1",
      label: "Work mode",
      children: (
         <div>
            <CheckboxContent title="Any" />
            <CheckboxContent title="Work from home" />
            <CheckboxContent title="Work from office" />
            <CheckboxContent title="Hybrid" />
         </div>
      ),
   },
   {
      key: "2",
      label: "Experience",
      children: (
         <div>
            <CheckboxContent title="Any" />
            <CheckboxContent title="0-1 Year" />
            <CheckboxContent title="1-5 Year" />
            <CheckboxContent title="5-10 Year" />
         </div>
      ),
   },
   
   {
      key: "3",
      label: "Location",
      children: (
         <div>
            <CheckboxContent title="Any" />
            <CheckboxContent title="Banglore" />
            <CheckboxContent title="Delhi" />
            <CheckboxContent title="Chennai" />
            <CheckboxContent title="Noida" />
            <CheckboxContent title="Mumbai" />
         </div>
      ),
   },
   {
      key: "4",
      label: "Salary",
      children: (
         <div>
            <CheckboxContent title="Any" />
            <CheckboxContent title="2-6 LPA" />
            <CheckboxContent title="6-20 LPA" />
            <CheckboxContent title="20-50 LPA" />
         </div>
      ),
   },
];

export default function FilterCard() {
   const onChange = (key: string | string[]) => {
      console.log(key);
   };
   return (
      <div className="w-[100%] lg:w-[300px] h-[99vh] bg-white border-2 border-gray-100 lg:ml-[60px] lg:mt-[10px] shadow-2xl rounded-xl">
         <div className="hidden lg:flex md:flex justify-between items-center p-[20px] border-b- border-gray-800">
            <div className=" flex justify-center items-center gap-[8px]">
               <div>Filters</div>
               <HiOutlineAdjustmentsVertical />
            </div>
            <div className="text-blue-400 cursor-pointer">Clear</div>
         </div>
         <hr className="hidden md:block lg:block" />
         <div className="font-bold">
            <Collapse
               items={items}
               defaultActiveKey={["1", "2","3","4"]}
               onChange={onChange}
               expandIconPosition={"end"}
               ghost={true}
               size="small"
            />
         </div>
      </div>
   );
}
