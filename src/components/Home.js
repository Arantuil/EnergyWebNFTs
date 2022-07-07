import Table from './Table';
import FooterHome from '../components/FooterHome';
import NFTdata from './NFTdata.json';
import NumberFormat from 'react-number-format';
//import { useQuery, gql } from "@apollo/client";

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

    axiosGetInfo().then(data => {
        var ewtprice = data["data"]["pair"]["token1Price"]
        ewtprice = Number(ewtprice)
        var susuprice = data["data"]["token"]["derivedETH"]
        susuprice = Number(susuprice) * ewtprice
    })

    var totalmarketcap = 0

    for (let i = 0; i < NFTdata.length; i++) {
        var el = NFTdata[i]["marketcap"];
        el = Number(el)
        totalmarketcap += el
    }

    window.addEventListener('load', function () {
        document.getElementsByClassName("currencybutton1")[0].disabled = true;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0.8)";
        document.getElementsByClassName("currencybutton2")[0].disabled = false;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton3")[0].disabled = false;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0)";
    })

    var ewtprice = 2.47
    var susuprice = 0.001865

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

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
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes[i].textContent = (allvolumes[i].textContent).replace(/\D/g,'')
                allvolumes[i].textContent = '$'+(numberWithSpaces((Math.round(Number(allvolumes[i].textContent)/(1/susuprice)))))
            }
            var allvolumes2 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes2[i].textContent = (allvolumes2[i].textContent).replace(/\D/g,'')
                allvolumes2[i].textContent = '$'+(numberWithSpaces((Math.round(Number(allvolumes2[i].textContent)/(1/susuprice)))))
            }
            var allvolumes3 = document.getElementsByClassName('volume_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes3[i].textContent = (allvolumes3[i].textContent).replace(/\D/g,'')
                allvolumes3[i].textContent = '$'+(numberWithSpaces((Math.round(Number(allvolumes3[i].textContent)/(1/susuprice)))))
            }
        }
        else if (currencystate === 'ewt') {
            var allvolumes4 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes4[i].textContent = (allvolumes4[i].textContent).replace(/\D/g,'')
                allvolumes4[i].textContent = '$'+(numberWithSpaces((Math.round(Number(allvolumes4[i].textContent)*ewtprice))))
            }
            var allvolumes5 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes5[i].textContent = (allvolumes5[i].textContent).replace(/\D/g,'')
                allvolumes5[i].textContent = '$'+(numberWithSpaces((Math.round(Number(allvolumes5[i].textContent)*ewtprice))))
            }
            var allvolumes6 = document.getElementsByClassName('volume_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes6[i].textContent = (allvolumes6[i].textContent).replace(/\D/g,'')
                allvolumes6[i].textContent = '$'+(numberWithSpaces((Math.round(Number(allvolumes6[i].textContent)*ewtprice))))
            }
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
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes7[i].textContent = (allvolumes7[i].textContent).replace(/\D/g,'')
                allvolumes7[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes7[i].textContent)*(1/susuprice)))))+' SUSU'
            }
            var allvolumes8 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes8[i].textContent = (allvolumes8[i].textContent).replace(/\D/g,'')
                allvolumes8[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes8[i].textContent)*(1/susuprice)))))+' SUSU'
            }
            var allvolumes9 = document.getElementsByClassName('volume_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes9[i].textContent = (allvolumes9[i].textContent).replace(/\D/g,'')
                allvolumes9[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes9[i].textContent)*(1/susuprice)))))+' SUSU'
            }
        }
        else if (currencystate === 'ewt') {
            var allvolumes10 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes10[i].textContent = (allvolumes10[i].textContent).replace(/\D/g,'')
                allvolumes10[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes10[i].textContent)*(ewtprice/susuprice)))))+' SUSU'
            }
            var allvolumes11 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes11[i].textContent = (allvolumes11[i].textContent).replace(/\D/g,'')
                allvolumes11[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes11[i].textContent)*(ewtprice/susuprice)))))+' SUSU'
            }
            var allvolumes12 = document.getElementsByClassName('volume_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes12[i].textContent = (allvolumes12[i].textContent).replace(/\D/g,'')
                allvolumes12[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes12[i].textContent)*(ewtprice/susuprice)))))+' SUSU'
            }
            var marketcap = document.getElementsByClassName('marketcaptotal')
            console.log(marketcap)
            marketcap[0].textContent = (marketcap[0].textContent).replace(/\D/g,'')
            marketcap[0].textContent = (numberWithSpaces((Math.round(Number(marketcap[0].textContent)*(ewtprice/susuprice)))))+' SUSU'
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
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes13[i].textContent = (allvolumes13[i].textContent).replace(/\D/g,'')
                allvolumes13[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes13[i].textContent)/ewtprice))))+' EWT'
            }
            var allvolumes14 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes14[i].textContent = (allvolumes14[i].textContent).replace(/\D/g,'')
                allvolumes14[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes14[i].textContent)/ewtprice))))+' EWT'
            }
            var allvolumes15 = document.getElementsByClassName('volume_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes15[i].textContent = (allvolumes15[i].textContent).replace(/\D/g,'')
                allvolumes15[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes15[i].textContent)/ewtprice))))+' EWT'
            }
        }
        else if (currencystate === 'susu') {
            var allvolumes16 = document.getElementsByClassName('floorprice_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes16[i].textContent = (allvolumes16[i].textContent).replace(/\D/g,'')
                allvolumes16[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes16[i].textContent)/(ewtprice/susuprice)))))+' EWT'
            }
            var allvolumes17 = document.getElementsByClassName('marketcap_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes17[i].textContent = (allvolumes17[i].textContent).replace(/\D/g,'')
                allvolumes17[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes17[i].textContent)/(ewtprice/susuprice)))))+' EWT'
            }
            var allvolumes18 = document.getElementsByClassName('volume_element')
            for (let i = 0; i < NFTdata.length; i++) {
                allvolumes18[i].textContent = (allvolumes18[i].textContent).replace(/\D/g,'')
                allvolumes18[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes18[i].textContent)/(ewtprice/susuprice)))))+' EWT'
            }
        }
        currencystate = 'ewt'
    }

    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full h-full bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl shadow-2xl'>
                    <div className="w-full h-full pt-4 flex flex-col mx-auto">
                        <div>
                            <div className='text-textprimary dark:text-darktextprimary transition-all p-4'>
                                <h1 className='font-bold text-3xl'>EnergyWebNFTs</h1>
                                <p className='text-lg'>
                                        All the price data you need of all the NFTs on the Energy Web Chain these can include art, 
                                        trading cards, profile characters, representations of IRL items, game items, 
                                        RECs, land tiles, and more.</p>
                                <p className='text-lg my-2'>The combined market cap of all NFTs on the Energy Web chain is: <NumberFormat className='marketcaptotal' value={totalmarketcap} displayType={'text'} thousandSeparator={' '} prefix={'$'} /></p>
                                <h2 className='text-l'>(If any prices are 0 then that means there are no active sell orders on Greensea for that particular NFT)</h2>
                            </div>
                        </div>
                        <div className="overflow-x-auto bg-bgprimary dark:bg-darkbgprimary rounded-3xl p-4">
                            <div className='flex justify-end'>
                                <button onClick={()=>changetodollar()} className='currencybutton currencybutton1 text-sm w-11 h-5 rounded-lg mx-2 bg-accent1 opacity-[0.8] dark:bg-darkaccent1 dark:opacity-[1] dark:brightness-[120%] text-textprimary dark:text-darktextprimary transition-all'>$</button>
                                <button onClick={()=>changetosusu()} className='currencybutton currencybutton2 text-sm w-11 h-5 rounded-lg mx-2 bg-accent2 opacity-[0.8] dark:bg-darkaccent2 dark:opacity-[1] dark:brightness-[120%] text-textprimary dark:text-darktextprimary transition-all'>SUSU</button>
                                <button onClick={()=>changetoewt()} className='currencybutton currencybutton3 text-sm w-11 h-5 rounded-lg mx-2 bg-accent3 opacity-[0.8] dark:bg-darkaccent3 dark:opacity-[1] dark:brightness-[120%] text-textprimary dark:text-darktextprimary transition-all'>EWT</button>
                            </div>
                            <Table />
                        </div>
                    </div>
                </div>
                <FooterHome/>
            </div>
        </div>
    );
}

export default Home;
