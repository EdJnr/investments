import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { trendingCoinTypes } from '../interfaces/generalTypes'
import { debounce } from '../functions/debounce'

interface HomeState {
    coins : any[]
    query:string

    setState:(stateName:string, value: any[]|string)=>void
    searchCoin:()=> any
    fetchTrendingCoins:() => Promise<any>
}

const HomeStore = create<HomeState>()(
  devtools(
    persist(
      (set) => ({
        coins:[],
        query: '',

        setState:(stateName:string, value: any[]|string)=>{ //set state
            set({[stateName]: value});

            if (stateName==='query') {
                HomeStore.getState().searchCoin();
            }
            
        },
        searchCoin: debounce(async()=>{  //search coin            
            const{query}=HomeStore.getState();
            if (query.length < 3) {
                if (query.length < 1) {
                    HomeStore.getState().fetchTrendingCoins();
                }
                return;
            }

            const SearchResponse= await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
            set({coins:SearchResponse.data.coins})        
        }),
        fetchTrendingCoins:async()=>{ //get coins
            const getResponse = await axios.get('https://api.coingecko.com/api/v3/search/trending');
            const coins = getResponse.data.coins.map((coin:any)=>{
                return{
                    id : coin.item.id,
                    name : coin.item.name,
                    large : coin.item.large,
                    price_btc : coin.item.price_btc
                }
            })

            console.log(coins);
            set({coins:coins})
        }
      }), 
      {
        name: 'coin-storage',
      }
    )
  )
)

export default HomeStore;