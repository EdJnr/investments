import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { trendingCoinTypes } from '../interfaces/generalTypes'
import { debounce } from '../functions/debounce'

interface CoinState {
  graphData:any[]
  coinData:any
  fetchCoin:(id:string,currency:string,days:number) => Promise<any>
}

const CoinStore = create<CoinState>()(
    devtools(
      persist(
        (set) => ({
          graphData:[],
          coinData:[],
          query: '',
  
          fetchCoin:async(coinId:string,currency:string,days:number)=>{
            const[graphResponse,coinDataResponse]=await Promise.all([
              await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`),
              await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
            ])
            
            //set graph data
            const graphData = graphResponse.data.prices.map((data:any)=>{
              const [timeStamp,price] = data;
              const date = new Date(timeStamp).toLocaleDateString('en-us');
              return{
                Date:date,
                Price:price
              }
            })
            set({graphData:graphData})
            
            //set coin data
            set({coinData:coinDataResponse.data})
          }
        }), 
        {
          name: 'coin-storage',
        }
      )
    )
  )

export default CoinStore;