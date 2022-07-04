import Cryptosoots from '../nftdata/cryptosoots/Cryptosoots';
import { useState } from 'react';
import NFTdata from './NFTdata.json'

function Table() {
    //let arrayalldata = Cryptosoots `${Cryptosoots}`

    //console.log(arrayalldata)
    const [data, setdata] = useState(NFTdata)
    const [order, setOrder] = useState("ASC")
    const sorting =(col)=> {
        if (col === "rank" || col === "price" || col === "marketcap") {
            if (order === "ASC"){
                const sorted = [...data].sort((a,b)=>
                a[col].toString().localeCompare(b[col].toString(), "en", {
                    numeric: true
                }))
                setdata(sorted);    
                setOrder("DSC");
            }
            if (order === "DSC"){
                const sorted = [...data].sort((a,b)=>
                b[col].toString().localeCompare(a[col].toString(), "en", {
                    numeric: true
                }))
                setdata(sorted);    
                setOrder("ASC");
            }
        }
        else {
            if (order === "ASC"){
                const sorted = [...data].sort((a,b)=>
                    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
                );
                setdata(sorted);
                setOrder("DSC");
            }
            if (order === "DSC"){
                const sorted = [...data].sort((a,b)=>
                    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
                );
                setdata(sorted);
                setOrder("ASC");
            }
        }
    }

    return (
        <table className="table-auto w-full text-textprimary dark:text-darktextprimary transition-all">
            <thead>
                <Cryptosoots></Cryptosoots>
                <tr>
                    <th onClick={()=>sorting("rank")} className='text-left'>Rank</th>
                    <th onClick={()=>sorting("name")} className='text-left'>NFT</th>
                    <th onClick={()=>sorting("price")} className='text-left'>Floorprice</th>
                    <th onClick={()=>sorting("marketcap")} className='text-left'>Marketcap</th>
                </tr>
            </thead>
            <tbody>
                { data.map((d)=>(
                    <tr key={d.id}>
                        <td>{d.rank}</td>
                        <td>{d.name}</td>
                        <td>{d.price}</td>
                        <td>{d.marketcap}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;