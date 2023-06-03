import { LineChart, Line } from "recharts";

export const columns = [
  {
    title: '#',
    dataIndex: 'market_cap_rank',
    key: 'market_cap_rank',
  },
  {
    title: 'Coin',
    dataIndex: 'details',
    key: 'large',
    render: ({symbol,name,image,id}:{symbol:string,name:string,image:string,id:string}) =>(
      <div className=" flex  items-center mt-3">
        <img className=" w-6 h-6 rounded mr-0.5" src={image} alt="" />
        <p className=" text-lg font-semibold mx-2 ">{name}</p>
        <p className=" text-xs mt-1 text-gray-400">{`${symbol}`.toUpperCase()}</p>
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'current_price',
    key: 'current_price',
    render: (price:number) =>(
      <p className=" text-green-600">${price??'  -'}</p>
    )
  },
  {
    title: 'BTCPrice',
    dataIndex: 'price_btc',
    key: 'price_btc',
    render: (price:number) =>(
      <p className=" ">{price??'  -'}</p>
    )
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    render: (price:number) =>(
      <p className=" ">{price??'  -'}</p>
    )
  },
];