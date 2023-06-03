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
            const coins = SearchResponse.data.coins.map((coin:any)=>{
              console.log(coin);
              
              return{
                details:{
                  id : coin.id,
                  name : coin.name,
                  image : coin.large,
                  symbol : coin.symbol,
                },
                // current_price : coin.market_data.current_price.usd,
                // price_btc : coin.market_data.current_price.btc,
                market_cap_rank : coin.market_cap_rank,
                score : coin.score,
              }
            })
            set({coins:coins})        
        }),
        fetchTrendingCoins:async()=>{ //get coins
          const [getResponse,priceusd]=await Promise.all([
            await axios.get('https://api.coingecko.com/api/v3/search/trending'),
            await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
          ])

          const btcPrice = priceusd.data.bitcoin.usd


          const coins = getResponse.data.coins.map((coin:any)=>{
            return{
              details:{
                id : coin.item.id,
                name : coin.item.name,
                image : coin.item.large,
                symbol : coin.item.symbol,
              },
              current_price : (coin.item.price_btc * btcPrice).toFixed(6),
              price_btc : coin.item.price_btc,
              market_cap_rank : coin.item.market_cap_rank,
              score : coin.item.score,
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