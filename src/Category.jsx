import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { BiBowlHot } from "react-icons/bi";
import { CiBowlNoodles } from "react-icons/ci";
import { GiFullPizza } from "react-icons/gi";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiHamburger } from "react-icons/gi";

const categories=[
    
    {
        id:1,
        name:"All",
        icon: <TiThSmallOutline className="w-15 h-15 text-green-500" /> 
    },
       {
        id:2,
        name:"breakfast",
        icon: <MdOutlineFreeBreakfast className="w-15 h-15 text-green-500" />
    },   {
        id:3,
        name:"soups",
         icon: <BiBowlHot className="w-15 h-15 text-green-500" /> 
    },   {
        id:4,
        name:"pasta",
        icon: <CiBowlNoodles className="w-15 h-15 text-green-500"/>
    },   {
        id:5,
        name:"main_course",
        icon: <MdOutlineFoodBank  className="w-15 h-15 text-green-500" />
    },   {
        id:6,
        name:"pizza",
        icon: <GiFullPizza className="w-15 h-15 text-green-500"/> 
    },   {
        id:7,
        name:"burger",
        icon: <GiHamburger className="w-15 h-15 text-green-500"/>
    },
]

export default categories