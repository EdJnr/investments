import { useEffect, useState } from "react"
import CoinStore from "../../stores/coinDetailsStore"
import {CartesianGrid, XAxis, YAxis, Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { useNavigate, useParams } from "react-router-dom"
import { formatDate } from "../../functions/formatDate"

interface stateTypes{
  currency:'usd'|'eur'|'jpy'
  selectedPeriodValue : number
}

export const CoinPage=()=>{
    const coinStore = CoinStore();
    const params = useParams<string>();
    const navigate = useNavigate();

    const coinData = coinStore?.coinData;

    //component states
    const[states,setState]=useState<stateTypes>({
        currency:'usd',
        selectedPeriodValue:270
    })
    const{currency,selectedPeriodValue}=states;

    //update state
    const updateState=(stateName:string,value:any[]|string|number|boolean|'usd'|'eur'|'jpy')=>{
        setState(((current) => ({...current,[stateName]:value})));
    }

    useEffect(()=>{
        params.id ? 
        coinStore.fetchCoin(params.id,currency,selectedPeriodValue)
        :
        navigate('/dashboard')
    },[selectedPeriodValue,currency])

    const dataArr = [
      {id:0,head:'Current Price',text:`$${coinData?.market_data?.current_price[currency]}`},
      {id:1,head:'Market Cap Rank',text:coinData?.market_cap_rank},
      {id:2,head:'24h High',text:coinData?.market_data?.high_24h[currency]},
      {id:3,head:'24h Lower',text:coinData?.market_data?.low_24h[currency]},
      {id:4,head:'Circulating Supply',text:coinData?.market_data?.circulating_supply},
      {id:5,head:'1y Change',text:coinData?.market_data?.price_change_percentage_1y?.toFixed(2)},
    ]

    const periodArr = [
      {id:0,name:'24h',value:1},
      {id:1,name:'14d',value:14},
      {id:3,name:'30d',value:30},
      {id:4,name:'90d',value:90},
      {id:5,name:'180d',value:180},
      {id:6,name:'270d',value:270},
    ]
    return(
      <div className=" w-8/12 m-auto mt-36"> 
        <header className=" flex flex-col mb-10">
          <span className="rank bg-black w-16 text-white rounded text-xs py-1 shadow-lg">
            Rank #{coinData?.market_cap_rank}
          </span>

         <div className=" flex  items-center mt-3">
          <img className=" w-7 h-7 rounded mr-0.5" src={coinData?.image?.large} alt="" />
          <h2 className=" text-3xl font-semibold mx-2 text-gray-700">{coinData?.name}</h2>
          <p className=" text-sm mt-3">{`${coinData?.symbol}`.toUpperCase()}</p>
         </div>

         <p className=" text-left mt-2 text-green-600 text-4xl font-semibold">${coinData?.market_data?.current_price?.usd}</p>
         <p className=" text-left text-gray-400 mt-2">Last Updated : {formatDate(`${coinData?.market_data?.last_updated}`)}</p>
        </header>

        <main className="">
          <h3 className=" text-left text-2xl text-gray-500 font-semibold">{coinData?.name} Price Chart {`(${coinData?.symbol})`.toUpperCase()}</h3>

          <div className="  flex justify-between">
            {/* chart */}
            <section
            className=" w-7/12 h-96">
              <div className="flex justify-end mr-9">
                <div style={{borderWidth:1}} className=" my-3 flex  items-center rounded  border-gray-300 w-fit">
                  {periodArr.map(({id,name,value})=>
                    <span
                    key={id}
                    onClick={()=> updateState('selectedPeriodValue',value)}
                    style={{borderRightWidth:1}} 
                    className={selectedPeriodValue === value ? "px-3 flex items-center h-8 font-semibold text-gray-500 border-gray-300 bg-gray-300 hover:cursor-not-allowed": "px-3 hover:cursor-pointer flex items-center h-8 font-semibold text-gray-500 border-gray-300"}>{name}</span>
                  )}
                </div>
              </div>

              <div style={{marginLeft: -7}} className=" w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={coinStore.graphData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* right section */}
            <section className=" bg-red-200 w-5/12">
              {/* CONVERTER */}
              <div className="converter">
                {/* coin */}
                <div className="">
                  <span>{`${coinData?.symbol}`.toUpperCase()}</span>
                  <input type="number" />
                </div>

                {/* usd value */}
                <div className="">
                  <span>{`USD`}</span>
                  <input type="number" />
                </div>

                <p>1 {`${coinData?.symbol}`.toUpperCase()} = {coinData?.market_data?.current_price[currency]}</p>
              </div>

              {/* STATISTICS */}
              <div className="statistics">
                <div className="content">
                  {dataArr.map(({id,head,text})=>
                    <div key={id} className="">
                      <p>{head}</p>
                      <p>{text}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    )
}