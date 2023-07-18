export const HeaderText:React.FC<{text:string}>=({text})=>{
    return(
        <>
            <h1 className=" text-[26px] text-center mb-0 mt-5 font-semibold">{text}</h1>
        </>
    )
}