import axios from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CoinState {
  graphData:any[]
  coinData:any
  loading:boolean
  fetchCoin:(id:string,currency:string,days:number) => Promise<any>
}

const CoinStore = create<CoinState>()(
    devtools(
      persist(
        (set) => ({
          graphData:[],
          coinData:[],
          query: '',
          loading : false,
  
          fetchCoin:async(coinId:string,currency:string,days:number)=>{
            try {
              set({loading:true});

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
              set({loading:false})
              set({graphData:graphData})
              
              //set coin data
              set({coinData:coinDataResponse.data})
            } catch (error) {
              set({loading:false})
            }
          }
        }), 
        {
          name: 'coin-storage',
        }
      )
    )
  )

export default CoinStore;