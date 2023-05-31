import { useEffect, useState } from "react";
import HomeStore from "../../../stores/homeStore"
import { trendingCoinTypes } from "../../../interfaces/generalTypes";
import { debounce } from "../../../functions/debounce";

interface stateTypes{
    trendingCoinsData : trendingCoinTypes[] | []
}

export const TrendingCoins=()=>{
    const store = HomeStore();
    
    //trending coins
    useEffect(()=>{
        store.fetchTrendingCoins();
    },[])

    //component states
    const[states,setState]=useState<stateTypes>({
        trendingCoinsData : []
    })
    const{trendingCoinsData}=states;

    //update state
    const updateState=(stateName:string,value:any[]|string|number|boolean)=>{
        setState(((current) => ({...current,[stateName]:value})));
    }

    // const handleSearch=debounce(()=>{
    //     store.searchTrendingCoin()
    // })

    return(
        <>
            <main>
                <p>Trending</p>
                <input 
                onChange={(e)=> store.setState('query',e.target.value)}
                value={store.query} 
                type="text" />
                <button
                onClick={()=> store.searchCoin()}
                >Search</button>
                
                {store?.coins?.map((coin)=>
                    <p>{coin.name}</p>
                )}
            </main>
        </>
    )
}