import { useEffect, useState } from "react";
import HomeStore from "../../../stores/homeStore"
import { trendingCoinTypes } from "../../../interfaces/generalTypes";
import { debounce } from "../../../functions/debounce";
import { useNavigate } from "react-router";
import { Pagination, Table } from 'antd';
import { columns } from "../data/trendingCoinsColuns";
import { Bars } from "react-loader-spinner";

interface stateTypes{
    trendingCoinsData : trendingCoinTypes[] | []
    index: number
    pageSize : number
}

export const TrendingCoins=()=>{
    const store = HomeStore();
    const navigate = useNavigate();

    //trending coins
    useEffect(()=>{
        store.fetchTrendingCoins();
        store.setState('query','')
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
                    <h1 className=" text-2xl mb-3">Search a Coin</h1>

                    <input
                    placeholder="Eg. Bitcoin"
                    className=" w-72 focus:border-blue-300 hover:border-blue-200 hover:outline-none focus:outline-none border-2 rounded px-3 h-10"
                    onChange={(e)=>{
                        updateState('index',1)
                        store.setState('query',e.target.value)
                    }}
                    value={store.query} 
                    type="text" />
                </header>
                
                
                <div className="">
                    <h1 className=" text-2xl mb-5">{`${store.query && 'Search Result for '}`}<span className={store.query !== '' ? 'text-green-700':''}>{store.query !== '' ? store.query : 'Trending Coins'}</span></h1>

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
                                    navigate(`/dashboard/currency/${id}`)
                                }, // click row
                                };
                            }}
                            columns={columns} 
                            dataSource={store?.coins} />
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}