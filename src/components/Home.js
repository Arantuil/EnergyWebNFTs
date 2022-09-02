import Table from './Table';
import FooterHome from '../components/FooterHome';
import NumberFormat from 'react-number-format';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import useColorChange from 'use-color-change';
import Searchbar from './Searchbar';
import ttlogoeggs from '../images/ttlogo-eggs.png';
import CountdownTimer from './CountdownTimer'; 

function Home() {
    const axios = require("axios")

    function axiosGetInfo() {
        const promise = axios({
            url: 'https://ewc-subgraph-production.carbonswap.exchange/subgraphs/name/carbonswap/uniswapv2',
            method: 'post',
            data: {
                query: `
            {
                pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0") {
                    token1Price
                }
                token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc") {
                    derivedETH
                }
            }
            `
            }
        })
        const dataPromise = promise.then((response) => response.data)
        return dataPromise
    }

    const [ewtcoinprice, setEwtcoinprice] = useState(0)
    function getewtprice() {
        axiosGetInfo().then(data => {
            var ewtprice = data["data"]["pair"]["token1Price"]
            ewtprice = Number(ewtprice)
            setEwtcoinprice(ewtprice)
        })
    }

    const [susucoinprice, setSusucoinprice] = useState(0)
    function getsusuprice() {
        axiosGetInfo().then(data => {
            var susuprice = data["data"]["token"]["derivedETH"]
            susuprice = Number(susuprice) * ewtcoinprice
            setSusucoinprice(susuprice)
        })
    }

    getewtprice()
    getsusuprice()

    const [marketcaptotal, setMarketcaptotal] = useState(0)
    const colorStyle = useColorChange(marketcaptotal, {
        higher: 'rgba(35, 136, 35, 0.2)',
        lower: 'rgba(210, 34, 45, 0.2)',
        duration: 750
    });

    const [allnftdata, setAllnftdata] = useState([])
    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();

            if (data !== null) {
                data.sort((a, b) => b.marketcap - a.marketcap);
                var total = 0
                Object.values(data).map((nft) => {
                    total += Number(nft["marketcap"])
                    return (setMarketcaptotal(total))
                });
            }
            setAllnftdata(data)
        });
    }, []);

    window.addEventListener('load', function () {
        document.getElementsByClassName("currencybutton1")[0].disabled = true;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0.8)";
        document.getElementsByClassName("currencybutton2")[0].disabled = false;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton3")[0].disabled = false;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0)";
    })

    var ewtprice = ewtcoinprice
    var susuprice = susucoinprice
    var currencystate = 'dollar'

    function changetodollar() {
        document.getElementsByClassName("currencybutton1")[0].disabled = true;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0.8)";
        document.getElementsByClassName("currencybutton2")[0].disabled = false;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton3")[0].disabled = false;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0)";
        if (currencystate === 'susu') {
            var allvolumes = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes[i].textContent = allvolumes[i].textContent.slice(0, -5)
                allvolumes[i].textContent = '$' + ((Number(allvolumes[i].textContent.substring(-3).replace(/,/g, '')) / (1 / susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            var allvolumes24 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes24[i].textContent = allvolumes24[i].textContent.slice(0, -5)
                allvolumes24[i].textContent = '$' + ((Number(allvolumes24[i].textContent.substring(-3).replace(/,/g, '')) / (1 / susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            //var allvolumes3 = document.getElementsByClassName('volumetwentyfourhour_element')
            //for (let i = 0; i < allnftdata.length; i++) {
            //    allvolumes3[i].textContent = allvolumes3[i].textContent.slice(0, -5)
            //    allvolumes3[i].textContent = '$'+((Number(allvolumes3[i].textContent.substring(-3).replace(/,/g, ''))/(1/susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            //}
            var marketcap = document.getElementsByClassName('marketcaptotal')
            marketcap[0].textContent = marketcap[0].textContent.slice(0, -5)
            marketcap[0].textContent = '$' + ((Number(marketcap[0].textContent.substring(-3).replace(/,/g, '')) / (1 / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        else if (currencystate === 'ewt') {
            var allvolumes4 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes4[i].textContent = allvolumes4[i].textContent.slice(0, -4)
                allvolumes4[i].textContent = '$' + ((Number(allvolumes4[i].textContent.substring(-3).replace(/,/g, '')) * ewtprice).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            var allvolumes5 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes5[i].textContent = allvolumes5[i].textContent.slice(0, -4)
                allvolumes5[i].textContent = '$' + ((Number(allvolumes5[i].textContent.substring(-3).replace(/,/g, '')) * ewtprice).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            //var allvolumes6 = document.getElementsByClassName('volumetwentyfourhour_element')
            //for (let i = 0; i < allnftdata.length; i++) {
            //    allvolumes6[i].textContent = allvolumes6[i].textContent.slice(0, -4)
            //    allvolumes6[i].textContent = '$'+((Number(allvolumes6[i].textContent.substring(-3).replace(/,/g, ''))*ewtprice).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            //}
            var marketcap2 = document.getElementsByClassName('marketcaptotal')
            marketcap2[0].textContent = marketcap2[0].textContent.slice(0, -4)
            marketcap2[0].textContent = '$' + ((Number(marketcap2[0].textContent.substring(-3).replace(/,/g, '')) * ewtprice).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        currencystate = 'dollar'
    }

    function changetosusu() {
        document.getElementsByClassName("currencybutton1")[0].disabled = false;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton2")[0].disabled = true;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0.8)";
        document.getElementsByClassName("currencybutton3")[0].disabled = false;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0)";

        if (currencystate === 'dollar') {
            var allvolumes7 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes7[i].textContent = allvolumes7[i].textContent.substring(1)
                allvolumes7[i].textContent = ((Number(allvolumes7[i].textContent.substring(-3).replace(/,/g, '')) * (1 / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SUSU'
            }
            var allvolumes8 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes8[i].textContent = allvolumes8[i].textContent.substring(1)
                allvolumes8[i].textContent = ((Number(allvolumes8[i].textContent.substring(-3).replace(/,/g, '')) * (1 / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SUSU'
            }
            //var allvolumes9 = document.getElementsByClassName('volumetwentyfourhour_element')
            //for (let i = 0; i < allnftdata.length; i++) {
            //    allvolumes9[i].textContent = allvolumes9[i].textContent.substring(1)
            //    allvolumes9[i].textContent = ((Number(allvolumes9[i].textContent.substring(-3).replace(/,/g, ''))*(1/susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' SUSU'
            //}
            var marketcap3 = document.getElementsByClassName('marketcaptotal')
            marketcap3[0].textContent = marketcap3[0].textContent.substring(1)
            marketcap3[0].textContent = ((Number(marketcap3[0].textContent.substring(-3).replace(/,/g, '')) * (1 / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SUSU'
        }
        else if (currencystate === 'ewt') {
            var allvolumes10 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes10[i].textContent = allvolumes10[i].textContent.slice(0, -4)
                allvolumes10[i].textContent = ((Number(allvolumes10[i].textContent.substring(-3).replace(/,/g, '')) * (ewtprice / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SUSU'
            }
            var allvolumes11 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes11[i].textContent = allvolumes11[i].textContent.slice(0, -4)
                allvolumes11[i].textContent = ((Number(allvolumes11[i].textContent.substring(-3).replace(/,/g, '')) * (ewtprice / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SUSU'
            }
            //var allvolumes12 = document.getElementsByClassName('volumetwentyfourhour_element')
            //for (let i = 0; i < allnftdata.length; i++) {
            //    allvolumes12[i].textContent = allvolumes12[i].textContent.slice(0, -4)
            //    allvolumes12[i].textContent = ((Number(allvolumes12[i].textContent.substring(-3).replace(/,/g, ''))*(ewtprice/susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' SUSU'
            //}
            var marketcap4 = document.getElementsByClassName('marketcaptotal')
            marketcap4[0].textContent = marketcap4[0].textContent.slice(0, -4)
            marketcap4[0].textContent = ((Number(marketcap4[0].textContent.substring(-3).replace(/,/g, '')) * (ewtprice / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SUSU'
        }
        currencystate = 'susu'
    }

    function changetoewt() {
        document.getElementsByClassName("currencybutton1")[0].disabled = false;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton2")[0].disabled = false;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton3")[0].disabled = true;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0.8)";

        if (currencystate === 'dollar') {
            var allvolumes13 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes13[i].textContent = allvolumes13[i].textContent.substring(1)
                allvolumes13[i].textContent = ((Number(allvolumes13[i].textContent.substring(-3).replace(/,/g, '')) / ewtprice).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' EWT'
            }
            var allvolumes20 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes20[i].textContent = allvolumes20[i].textContent.substring(1)
                allvolumes20[i].textContent = ((Number(allvolumes20[i].textContent.substring(-3).replace(/,/g, '')) / ewtprice).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' EWT'
            }
            //var allvolumes15 = document.getElementsByClassName('volumetwentyfourhour_element')
            //for (let i = 0; i < allnftdata.length; i++) {
            //    allvolumes15[i].textContent = allvolumes15[i].textContent.substring(1)
            //    allvolumes15[i].textContent = ((Number(allvolumes15[i].textContent.substring(-3).replace(/,/g, ''))/ewtprice).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' EWT'
            //}
            var marketcap5 = document.getElementsByClassName('marketcaptotal')
            marketcap5[0].textContent = marketcap5[0].textContent.substring(1)
            marketcap5[0].textContent = ((Number(marketcap5[0].textContent.substring(-3).replace(/,/g, '')) / ewtprice).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' EWT'
        }
        else if (currencystate === 'susu') {
            var allvolumes16 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes16[i].textContent = allvolumes16[i].textContent.slice(0, -5)
                allvolumes16[i].textContent = ((Number(allvolumes16[i].textContent.substring(-3).replace(/,/g, '')) / (ewtprice / susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' EWT'
            }
            var allvolumes18 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < allnftdata.length; i++) {
                allvolumes18[i].textContent = allvolumes18[i].textContent.slice(0, -5)
                allvolumes18[i].textContent = ((Number(allvolumes18[i].textContent.substring(-3).replace(/,/g, '')) / (ewtprice / susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' EWT'
            }
            //var allvolumes19 = document.getElementsByClassName('volumetwentyfourhour_element')
            //for (let i = 0; i < allnftdata.length; i++) {
            //    allvolumes19[i].textContent = allvolumes19[i].textContent.slice(0, -5)
            //    allvolumes19[i].textContent = ((Number(allvolumes19[i].textContent.substring(-3).replace(/,/g, ''))/(ewtprice/susuprice)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' EWT'
            //}
            var marketcap6 = document.getElementsByClassName('marketcaptotal')
            marketcap6[0].textContent = marketcap6[0].textContent.slice(0, -5)
            marketcap6[0].textContent = ((Number(marketcap6[0].textContent.substring(-3).replace(/,/g, '')) / (ewtprice / susuprice)).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' EWT'
        }
        currencystate = 'ewt'
    }

    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full h-full bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                    shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                    <div className="w-full h-full py-2 flex flex-col mx-auto">
                        <div className='text-textprimary dark:text-darktextprimary transition-all p-4'>
                            <h1 className='text-lg md:text-xl font-bold'>Upcoming NFT collections on Energy Web:</h1>
                        </div>
                        <div className='p-4 flex flex-row w-full rounded-xl mx-auto bg-bgprimary dark:bg-darkbgprimary'>
                            <div className='w-[20%] md:w-[18%] lg:w-[15%] xl:w-[12%]'>
                                <img className='w-full aspect-square rounded-2xl'src={ttlogoeggs} alt="" />
                            </div>
                            <div className='pl-3 w-[80%] md:w-[82%] lg:w-[85%] xl:w-[88%] text-textprimary dark:text-darktextprimary transition-all'>
                                <h1 className='text-lg sm:text-xl md:text-2xl font-bold'>Tubby Turtles</h1>
                                <h2 className='text-sm md:text-base'>Tubby Turtles is a stake-able NFT project. The staking rewards are based on the rarities of the turtle's traits.</h2>
                                <h2 className='text-sm md:text-base'>Launch/Minting date: 19:00 UTC Saturday September 17th</h2>
                                <CountdownTimer />
                                <h2 className='text-sm md:text-base'>Website: <a className='underline hover:brightness-200 dark:hover:brightness-125' href='https://tubbyturtles.com'>https://tubbyturtles.com</a></h2>
                                <h2 className='text-xs md:text-sm'>NFT type: ERC-721</h2>
                            </div>
                        </div>
                    </div>
                </div>    
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                    <div className="w-full h-full pt-4 flex flex-col mx-auto">
                        <div>
                            <div className='text-textprimary dark:text-darktextprimary transition-all p-4'>
                                <h1 className='font-bold text-3xl'>EnergyWebNFTs</h1>
                                <h1 className='text-lg'>
                                    All the price data you need of all the NFTs on the Energy Web Chain these can include art,
                                    trading cards, profile characters, representations of IRL items, game items,
                                    RECs, land tiles, and more.</h1>
                                <h1 className='text-lg'>
                                    View the NFT price data in one of your preferred currencies: EWT (EnergyWeb token), SUSU or USD.</h1>
                                <p className='text-lg mt-2'>The combined market cap of all NFTs on the Energy Web chain is: <NumberFormat style={colorStyle} className='marketcaptotal font-bold' id='totalmarketcapp' value={marketcaptotal.toFixed(0)} displayType={'text'} thousandSeparator={','} prefix={'$'} /></p>
                                <h2 className='text-sm'>(If any prices are 0 then that means there are no active sell orders on Greensea or on Raregems for that particular NFT)</h2>
                                <h2 className='text-sm'>(The 7day % price changes only take Greensea orders into account, thus should be viewed as a very rough estimate)</h2>
                            </div>
                        </div>
                        <div className="flex flex-col overflow-x-auto bg-bgprimary dark:bg-darkbgprimary rounded-3xl p-4">
                            <div className='flex flex-row space-between'>
                                <div className='w-1/3 sm:w-1/2'>
                                    <Searchbar placeholder="Search..." data={allnftdata} />
                                </div>
                                <div className='mt-[6px] w-2/3 sm:w-1/2 flex justify-end'>
                                    <button onClick={() => changetodollar()} className='currencybutton currencybutton1 text-sm w-11 h-5 rounded-lg mx-1 md:mx-2 bg-accent1 opacity-[0.8] dark:bg-darkaccent1 dark:opacity-[1] dark:brightness-[120%] text-textprimary dark:text-darktextprimary transition-all'>$</button>
                                    <button onClick={() => changetosusu()} className='currencybutton currencybutton2 text-sm w-11 h-5 rounded-lg mx-1 md:mx-2 bg-accent2 opacity-[0.8] dark:bg-darkaccent2 dark:opacity-[1] dark:brightness-[120%] text-textprimary dark:text-darktextprimary transition-all'>SUSU</button>
                                    <button onClick={() => changetoewt()} className='currencybutton currencybutton3 text-sm w-11 h-5 rounded-lg mx-1 md:mx-2 bg-accent3 opacity-[0.8] dark:bg-darkaccent3 dark:opacity-[1] dark:brightness-[120%] text-textprimary dark:text-darktextprimary transition-all'>EWT</button>
                                </div>
                            </div>
                            <Table />
                        </div>
                    </div>
                </div>
                <FooterHome />
            </div>
        </div>
    );
}

export default Home;
