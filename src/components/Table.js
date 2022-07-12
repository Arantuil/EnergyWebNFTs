import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import slugify from 'slugify';
import useColorChange from 'use-color-change';

function Table() {
    let amountoflistedNFTs = 10

    const [nftlist, setNftList] = useState([])

    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();

            if (data.length >= amountoflistedNFTs) {
                data.sort((a, b) => b.marketcap - a.marketcap);
                let i = 1
                Object.values(data).map((nft) => {
                    nft["rank"] = String(i)
                    i += 1
                    return(oldArray => [...oldArray, nft])
                });
                setNftList(data.slice(-amountoflistedNFTs))
            }
            if (data !== null && data.length < amountoflistedNFTs){
                data.sort((a, b) => b.marketcap - a.marketcap);
                let i = 1
                Object.values(data).map((nft) => {
                    nft["rank"] = String(i)
                    i += 1
                    return(setNftList(oldArray => [...oldArray, nft]))
                });
            }
            
        });
    }, [amountoflistedNFTs]);

    const colorStyle = useColorChange(nftlist, {
        higher: 'rgba(35, 136, 35, 0.20)',
        lower: 'rgba(210, 34, 45, 0.20)',
        duration: 750
    });

    const [order, setOrder] = useState("ASC")
    const sorting = (col) => {
        if (col === "rank" || col === "floorprice" || col === "circulating" || col === "marketcap" || col === 'floorpricethirtyday' || col === 'volumetwentyfourhour') {
            if (order === "ASC") {
                const sorted = [...nftlist].sort((a, b) =>
                    a[col].toString().localeCompare(b[col].toString(), "en", {
                        numeric: true
                    }))
                setNftList(sorted);
                setOrder("DSC");
                var secondsorticon1 = document.getElementsByClassName(`button`)
                for (var i = 0; i < secondsorticon1.length; i++) {
                    secondsorticon1[i].style.filter = 'brightness(50%)';
                }
                var sorticon1 = document.getElementsByClassName(`${col}button1`)
                sorticon1[0].style.filter = 'brightness(100%)';
            }
            if (order === "DSC") {
                const sorted = [...nftlist].sort((a, b) =>
                    b[col].toString().localeCompare(a[col].toString(), "en", {
                        numeric: true
                    }))
                setNftList(sorted);
                setOrder("ASC");
                var secondsorticon2 = document.getElementsByClassName(`button`)
                for (var i2 = 0; i2 < secondsorticon2.length; i2++) {
                    secondsorticon2[i2].style.filter = 'brightness(50%)';
                }
                var sorticon2 = document.getElementsByClassName(`${col}button2`)
                sorticon2[0].style.filter = 'brightness(100%)';
            }
        }
        else if (col === 'name' || col === 'cheapestmarket') {
            if (order === "ASC") {
                const sorted = [...nftlist].sort((a, b) =>
                    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
                );
                setNftList(sorted);
                setOrder("DSC");
                var secondsorticon3 = document.getElementsByClassName(`button`)
                for (var i3 = 0; i3 < secondsorticon3.length; i3++) {
                    secondsorticon3[i3].style.filter = 'brightness(50%)';
                }
                var sorticon3 = document.getElementsByClassName(`${col}button1`)
                sorticon3[0].style.filter = 'brightness(100%)';
            }
            if (order === "DSC") {
                const sorted = [...nftlist].sort((a, b) =>
                    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
                );
                setNftList(sorted);
                setOrder("ASC");
                var secondsorticon4 = document.getElementsByClassName(`button`)
                for (var i4 = 0; i4 < secondsorticon4.length; i4++) {
                    secondsorticon4[i4].style.filter = 'brightness(50%)';
                }
                var sorticon4 = document.getElementsByClassName(`${col}button2`)
                sorticon4[0].style.filter = 'brightness(100%)';
            }
        }
    }

    return (
            <table className="table-auto w-[280vw] sm:w-[170vw] md:w-[130vw] lg:w-full text-textprimary dark:text-darktextprimary transition-all">
                <thead>
                    <tr>
                        <th className='text-left'><div className='flex flex-row'><p>Rank</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("rank")} className='rankbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("rank")} className='rankbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>NFT</p></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>NFT Name</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("name")} className='namebutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("name")} className='namebutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Floorprice</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("floorprice")} className='floorpricebutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("floorprice")} className='floorpricebutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Cheapest on:</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("cheapestmarket")} className='cheapestmarketbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("cheapestmarket")} className='cheapestmarketbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>30d % ($)</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("floorpricethirtyday")} className='floorpricethirtydaybutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("floorpricethirtyday")} className='floorpricethirtydaybutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Amount</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("circulating")} className='circulatingbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("circulating")} className='circulatingbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Market cap</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("marketcap")} className='marketcapbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("marketcap")} className='marketcapbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Volume (24h)</p><div className='flex flex-col ml-1 mt-1 text-[10px]'><button onClick={() => sorting("volumetwentyfourhour")} className='volumetwentyfourhourbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("volumetwentyfourhour")} className='volumetwentyfourhourbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                    </tr>
                </thead>
                <tbody>
                    {nftlist.map((index) => (
                        <tr key={index.id}>
                            <td style={colorStyle} className='w-[70px] border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'>{index.rank}</td>
                            <td className='w-[50px] border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><img className='w-[35px] h-[35px]' src={index.image} alt="NFT icon" /></td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><Link to={`/nft/${(slugify(index.name, '_'))}`}>{index.name}</Link></td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><NumberFormat style={colorStyle} className='floorprice_element' decimalScale={2} value={index.floorprice} displayType={'text'} thousandSeparator={','} prefix={'$'} /></td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'>{index.cheapestmarket}</td>
                            <td style={colorStyle} className='percentagecolor border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'>{index.floorpricethirtyday}</td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'>{index.circulating}</td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><NumberFormat style={colorStyle} className='marketcap_element' decimalScale={2} value={index.marketcap} displayType={'text'} thousandSeparator={','} prefix={'$'} /></td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><NumberFormat style={colorStyle} className='volumetwentyfourhour_element' decimalScale={2} value={index.volumetwentyfourhour} displayType={'text'} thousandSeparator={','} prefix={'$'} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
}

export default Table;