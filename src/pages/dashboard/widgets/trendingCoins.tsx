import { useEffect, useState } from "react";
import HomeStore from "../../../stores/homeStore"
import { trendingCoinTypes } from "../../../interfaces/generalTypes";
import { debounce } from "../../../functions/debounce";
import { useNavigate } from "react-router";
import { Pagination } from 'antd';

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
            <main className="w-8/12 m-auto mb-14">
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

                    <div className=" w-8/12 m-auto">
                        {store?.coins?.slice((index-1) * pageSize,index*pageSize).map((coin)=>
                            <div
                            style={{
                                borderBottomWidth:1
                            }}
                            onClick={()=> navigate(`/dashboard/currency/${coin.id}`)}
                            key={coin.id}
                            className=" mb-4 pb-3 hover:cursor-pointer flex flex-row justify-between border-b-2">
                                <section className=" flex items-center">
                                    <div  className="img w-16 h-16 mr-5">
                                        <img className=" rounded-lg" src={coin.large} alt="icon" />
                                    </div>

                                    <p>{coin.name}</p>
                                </section>

                                <section className=" flex items-end justify-center flex-col">
                                    <p>{coin.price_btc} BTC</p>
                                    <p className=" text-green-600">{coin.usd_price} USD</p>
                                </section>
                            </div>
                        )}

                        <Pagination 
                        onChange={(pageNum)=>{
                            updateState('index',pageNum)
                        }}
                        className=" mt-10"
                        pageSize={pageSize}
                        defaultCurrent={1} 
                        total={store?.coins?.length} />
                    </div>
                </div>
            </main>
        </>
    )
}