import {Bars} from 'react-loader-spinner'

interface props{
    height ?: number | string | undefined
}
export const Loader = ({height=undefined}:props)=>{
    return(
        <>
            <main
            className={` z-20 bg-white flex justify-center bottom-0 top-20 right-0 left-0 fixed items-center ${!height && ''}`}
            >
                <Bars
                height='80'
                width="80"
                color="rgb(96 165 250)"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </main>
        </>
    )
}