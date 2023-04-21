import { AiOutlineClose } from "react-icons/ai";

interface props{
    text:string;
    background ?: 'green'|'red'
    handleCancel:()=>void
}
const Alert = ({text,handleCancel,background='red'}:props) => {
    return (
        <main className=" fixed top-20 flex items-center justify-center w-full ">
            <div 
            className={
                background === 'red'?
                "bg-red-50 px-4 flex flex-row justify-between items-center py-2 rounded shadow-xl"
                :
                "bg-green-50 px-4 flex flex-row justify-between items-center py-2 rounded shadow-xl"
            }>
                <p className=" pr-6">{text}</p>
                <AiOutlineClose onClick={handleCancel} className=" cursor-pointer" size={20}/>
            </div>
        </main>
    );
}
 
export default Alert;