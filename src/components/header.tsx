import { mainBrandName } from "../info/genInfo";

const Header = () => {
    return ( 
        <>
            <nav className=" h-16 text-2xl text-blue-700 flex items-center justify-center">
                <p>{mainBrandName}</p>
            </nav>
        </>
    );
}
 
export default Header;