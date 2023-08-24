import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import slugify from 'slugify';
import useColorChange from 'use-color-change';

function Table() {
    let amountoflistedNFTs = 28

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
        if (col === "rank" || col === "floorprice" || col === "circulating" || col === "marketcap") {
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
        else if (col === 'floorpricesevenday') {
            if (order === "ASC") {
                const sorted = [...nftlist].sort((a, b) =>
                    b[col].toLowerCase() < a[col].toLowerCase() ? 1 : -1
                );
                setNftList(sorted);
                setOrder("DSC");
                var secondsorticon5 = document.getElementsByClassName(`button`)
                for (var i5 = 0; i5 < secondsorticon5.length; i5++) {
                    secondsorticon5[i5].style.filter = 'brightness(50%)';
                }
                var sorticon5 = document.getElementsByClassName(`${col}button1`)
                sorticon5[0].style.filter = 'brightness(100%)';
            }
            if (order === "DSC") {
                const sorted = [...nftlist].sort((a, b) =>
                    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
                );
                setNftList(sorted);
                setOrder("ASC");
                var secondsorticon6 = document.getElementsByClassName(`button`)
                for (var i6 = 0; i6 < secondsorticon6.length; i6++) {
                    secondsorticon6[i6].style.filter = 'brightness(50%)';
                }
                var sorticon6 = document.getElementsByClassName(`${col}button2`)
                sorticon6[0].style.filter = 'brightness(100%)';
            }
        }
    }

    function shorten(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }

    return (
            <table className="table-auto w-[265vw] np1:w-[220vw] np2:w-[195vw] np3:w-[170vw] sm:w-[160vw!important] md:w-[140vw!important] np4:w-[135vw!important] np5:w-[120vw!important] np6:w-[100vw!important] np7:w-[100%!important] text-textprimary dark:text-darktextprimary transition-all">
                <thead>
                    <tr className='text-[0.8rem] sm:text-base'>
                        <th className='text-left'><div className='flex flex-row'><p>Rank</p><div className='flex flex-col ml-1 mb-[1px] text-[10px]'><button onClick={() => sorting("rank")} className='rankbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("rank")} className='rankbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>NFT</p></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>NFT Name</p><div className='flex flex-col ml-1 mb-[1px] text-[10px]'><button onClick={() => sorting("name")} className='namebutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("name")} className='namebutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Floorprice</p><div className='flex flex-col ml-1 mb-[1px] text-[10px]'><button onClick={() => sorting("floorprice")} className='floorpricebutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("floorprice")} className='floorpricebutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Floor on:</p><div className='flex flex-col ml-1 mb-[1px] text-[10px]'><button onClick={() => sorting("cheapestmarket")} className='cheapestmarketbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("cheapestmarket")} className='cheapestmarketbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Amount</p><div className='flex flex-col ml-1 mb-[1px] text-[10px]'><button onClick={() => sorting("circulating")} className='circulatingbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("circulating")} className='circulatingbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                        <th className='text-left'><div className='flex flex-row'><p>Market cap</p><div className='flex flex-col ml-1 mb-[1px] text-[10px]'><button onClick={() => sorting("marketcap")} className='marketcapbutton1 button brightness-[50%] relative bottom-1 h-[6px] w-[12px]'>▲</button><button onClick={() => sorting("marketcap")} className='marketcapbutton2 button brightness-[50%] h-[6px] w-[12px]'>▼</button></div></div></th>
                    </tr>
                </thead>
                <tbody>
                    {nftlist.map((index) => (
                        <tr className='text-[0.85rem] sm:text-base' key={index.id}>
                            <td style={colorStyle} className='w-[60px] sm:w-[70px] border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'>{index.rank}</td>
                            <td className='w-[45px] sm:w-[50px] border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><img className='nfticonimg rounded-lg md:rounded-xl w-[31px] h-[31px] sm:w-[35px] sm:h-[35px] aspect-auto' src={index.image} alt="NFT icon" /></td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><Link to={`/nft/${(slugify(index.name, '_'))}`}>{shorten(index.name, 17)}</Link></td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><NumberFormat style={colorStyle} className='floorprice_element' decimalScale={2} value={index.floorprice} displayType={'text'} thousandSeparator={','} prefix={'$'} /></td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'>{index.cheapestmarket}</td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'>{index.circulating}</td>
                            <td className='border-collapse border-t dark:border-[rgba(245,245,230,0.25)]'><NumberFormat style={Object.assign(colorStyle)} className='marketcap_element' decimalScale={2} value={index.marketcap} displayType={'text'} thousandSeparator={','} prefix={'$'} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
}

export default Table;