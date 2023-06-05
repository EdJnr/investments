import { useEffect, useState } from "react"
import CoinStore from "../../stores/coinDetailsStore"
import {CartesianGrid, XAxis, YAxis, Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { useNavigate, useParams } from "react-router-dom"
import { formatDate } from "../../functions/formatDate"
import { Loader } from "../../components/loader"

interface stateTypes{
  currency:string
  selectedPeriodValue : number
  currencyValue : number|undefined
  usdValue : number|undefined
}

export const CoinPage=()=>{
  const coinStore = CoinStore();
  const params = useParams<string>();
  const navigate = useNavigate();

  const coinData = coinStore?.coinData;

  //component states
  const[states,setState]=useState<stateTypes>({
    currency:'usd',
    selectedPeriodValue:270,
    currencyValue:0,
    usdValue:0
  })
  const{currency,selectedPeriodValue,currencyValue,usdValue}=states;

    //update state
    const updateState=(stateName:string,value:any[]|string|number|boolean)=>{
      setState(((current) => ({...current,[stateName]:value})));
    }

    useEffect(()=>{
      window.scrollTo(0,0);
      
      params.id ? 
      coinStore.fetchCoin(params.id,currency,selectedPeriodValue)
      :
      navigate('/dashboard')
    },[selectedPeriodValue,currency])

    const currenciesArr = [
      {id:0,value:'usd'},
      {id:1,value:'eur'},
      {id:2,value:'jpy'},
    ]

    const dataArr = [
      {id:0,head:'Current Price',text:`${coinData?.market_data?.current_price[currency]} ${`${currency}`.toUpperCase()}`},
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
      <>
        {coinStore.loading?(
          <Loader/>
        ):(
          <div className="w-10/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 m-auto mt-28 mb-10"> 
            <main className="">
              <div className="  flex flex-col lg:flex-row justify-between">
                {/* chart */}
                <section
                className="calc-100-384">
                  <header className=" flex flex-col mb-10">
                    <span className="rank bg-black w-16 text-white rounded text-xs py-1 shadow-lg">
                      Rank #{coinData?.market_cap_rank}
                    </span>

                    <div className=" flex  items-center mt-3">
                      <img className=" w-7 h-7 rounded mr-0.5" src={coinData?.image?.large} alt="" />
                      <h2 className=" text-3xl font-semibold mx-2 text-gray-700">{coinData?.name}</h2>
                      <p className=" text-sm mt-3">{`${coinData?.symbol}`.toUpperCase()}</p>
                    </div>

                    <p className=" text-left mt-2 text-green-600 text-4xl font-semibold">{(coinData?.market_data?.current_price[currency])} {`${currency}`.toUpperCase()}</p>
                    <p className=" text-left text-gray-400 mt-2">Last Updated : {formatDate(`${coinData?.market_data?.last_updated}`)}</p>
                  </header>

                  <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
                    <h3 className=" mb-3 md:mb-0 text-left text-2xl text-gray-500 font-semibold">{coinData?.name} Price Chart {`(${coinData?.symbol})`.toUpperCase()}</h3>
                    <span style={{marginRight:40}} className="flex">
                      <p className=" mr-2 text-gray-500"><span>Currency: </span></p>

                      <select 
                      style={{borderWidth:1}}
                      value={currency} 
                      onChange={(e)=> updateState('currency',e.target.value)}
                      className=" border-gray-300 w-16 h-7 hover:border-blue-200 focus:border-blue-400 hover:outline-none focus:outline-none rounded">
                        {currenciesArr.map(({id,value})=>
                          <option key={id} value={value}>{value.toUpperCase()}</option>
                        )}
                      </select>
                    </span>
                  </div>

                  <div style={{marginRight:40}} className="flex justify-start md:justify-end mb-5 md:mb-0">
                    <div style={{borderWidth:1}} className=" my-3 flex  items-center rounded  border-gray-300 w-fit">
                      {periodArr.map(({id,name,value})=>
                        <span
                        key={id}
                        onClick={()=> updateState('selectedPeriodValue',value)}
                        style={{borderRightWidth:1}} 
                        className={selectedPeriodValue === value ? " px-2 md:px-3  flex items-center h-8 font-semibold text-gray-500 border-gray-300 bg-gray-300 hover:cursor-not-allowed": "px-2 md:px-3 hover:cursor-pointer flex items-center h-8 font-semibold text-gray-500 border-gray-300"}>{name}</span>
                      )}
                    </div>
                  </div>

                  <div 
                  style={{marginLeft: -10}} 
                  className=" w-full h-80">
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
                <section className=" mt-7 md:mt-0 pl-0 w-full md:w-80">
                  {/* CONVERTER */}
                  <div className="converter rounded-xl py-7 bg-zinc-100">
                    <div className="mx-6  md:mx-4">
                      <h3 className=" mb-4 text-xl font-bold text-gray-700 text-start">{coinData?.name} Converter</h3>
                      {/* coin */}
                      <div className=" w-full flex justify-between mb-3 ">
                        <span style={{borderRightWidth:1}} className="flex border-gray-200 bg-white justify-center rounded-l-lg items-center pl w-24 ">{`${coinData?.symbol}`.toUpperCase()}</span>
                        <input
                        value={currencyValue}
                        onChange={(e)=>{
                          const value = Number(e.target.value);
                          updateState('currencyValue',value);
                          updateState('usdValue',(value??0) * coinData?.market_data?.current_price[currency])
                        }}
                        style={{width : 'calc(100% - 96px)'}} 
                        className="border-2 border-white focus:border-blue-300 rounded-r-lg hover:border-blue-200 hover:outline-none focus:outline-none px-3 h-12" type="number" />
                      </div>

                      {/* currency value */}
                      <div className=" w-full flex justify-between ">
                        <span style={{borderRightWidth:1}} className="flex focus:border-blue-300 hover:border-blue-200 border-gray-200 bg-white justify-center rounded-l-lg items-center pl w-24 ">{`${currency}`.toUpperCase()}</span>
                        <input 
                        value={usdValue}
                        onChange={(e)=>{
                          const value = Number(e.target.value);
                          updateState('usdValue',value);
                          updateState('currencyValue',(value??0)/coinData?.market_data?.current_price[currency])
                        }}
                        style={{width : 'calc(100% - 96px)'}} 
                        className="border-2 border-white focus:border-blue-300 rounded-r-lg hover:border-blue-200 hover:outline-none focus:outline-none px-3 h-12" type="number" />
                      </div>

                      <p className=" font-semibold text-start mt-4 text-gray-400">1 {`${coinData?.symbol}`.toUpperCase()} = {coinData?.market_data?.current_price[currency]} {`${currency}`.toUpperCase()}</p>
                    </div>
                  </div>

                  {/* STATISTICS */}
                  <div className="statistics rounded-xl py-7 mt-4 bg-zinc-100">
                    <div className="content mx-6  md:mx-4">
                      <h3 className=" mb-4 text-xl font-bold text-gray-700 text-start">{`${coinData?.symbol}`.toUpperCase()} Market Statistics</h3>
                      {dataArr.map(({id,head,text})=>
                        <div style={{borderBottomWidth:1}} key={id} className=" flex pb-1 justify-between mb-3">
                          <p className=" text-sm text-gray-500">{head}</p>
                          <p className=" text-sm font-semibold">{text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        )}
      </>
    )
}