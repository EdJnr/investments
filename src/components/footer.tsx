import { mainBrandName } from "../info/genInfo"

export const Footer=()=>{
    return(
        <div className=" py-14">
            <p className="text-gray-500">👏 Developed By Edward</p>
            <p className=" text-gray-500">{mainBrandName} 2023. All rights reserved</p>
        </div>
    )
}