import { mainBrandName } from "../info/genInfo"

export const Footer=()=>{
    return(
        <div className=" py-14">
            <p className=" text-sm md:text-base text-gray-400">👏 Developed By Edward</p>
            <p className=" text-sm md:text-base text-gray-400">{mainBrandName} 2023. All rights reserved</p>
        </div>
    )
}