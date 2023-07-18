import { useEffect, useState } from "react";
import HomeStore from "../../../stores/homeStore"
import { trendingCoinTypes } from "../../../interfaces/generalTypes";
import { debounce } from "../../../functions/debounce";
import { useNavigate } from "react-router";
import { Pagination, Table } from 'antd';
import { columns, columnsSmall } from "../data/trendingCoinsColuns";
import { Bars } from "react-loader-spinner";
import useMediaQuery from "../../../hooks/useMediaQueries";

interface stateTypes{
    trendingCoinsData : trendingCoinTypes[] | []
    index: number
    pageSize : number
}

export const TrendingCoins=()=>{
    const store = HomeStore();
    const largeScreen = useMediaQuery('(min-width: 700px)')
    const navigate = useNavigate();

    //trending coins
    useEffect(()=>{
        store.fetchTrendingCoins();
    },[])

    //component states
    const[states,setState]=useState<stateTypes>({
        trendingCoinsData : [],
        index:1,
        pageSize : 5
    })
    const{trendingCoinsData,index,pageSize}=states;

    //update state
    const updateState=(stateName:string,value:any[]|string|number|boolean)=>{
        setState(((current) => ({...current,[stateName]:value})));
    }

    return(
        <>
            <main className=" w-10/12 md:w-8/12 m-auto mb-14">
                <header className=" mb-14">
                    <input
                    placeholder="Search a coin..."
                    className=" w-80 focus:border-blue-300 mb-3 hover:border-blue-200 hover:outline-none focus:outline-none border-2 rounded px-3 h-12"
                    onChange={(e)=>{
                        updateState('index',1)
                        store.setState('query',e.target.value)
                    }}
                    value={store.query} 
                    type="text" />
                </header>
                
                
                <div className="">
                    <h1 className=" font-semibold text-[26px]  mb-8">{`${store.query && 'Search Result for '}`}<span className={store.query !== '' ? 'text-green-700':''}>{store.query !== '' ? store.query : 'Trending Coins'}</span></h1>

                    <div className=" w-full lg:w-10/12 m-auto">
                        {store.loading?(
                            <div className=" flex flex-row items-center justify-center h-52">
                            <Bars
                            height='60'
                            width="60"
                            color="rgb(96 165 250)"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}/>
                        </div>
                        ):(
                            <Table 
                            
                            style={{width:'100%'}}
                            onRow={(record, rowIndex) => {
                                return {
                                onClick: (event) => {
                                    const id = record.details.id
                                    navigate(`/currency/${id}`)
                                }, // click row
                                };
                            }}
                            columns={largeScreen ? columns : columnsSmall} 
                            dataSource={store?.coins} />
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}