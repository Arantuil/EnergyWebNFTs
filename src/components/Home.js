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
    
        console.log(ewtprice)
        console.log(susuprice)
    })

    var totalmarketcap = 0

    for (let i = 0; i < NFTdata.length; i++) {
        var el = NFTdata[i]["marketcap"];
        el = Number(el)
        totalmarketcap += el
    }

    window.addEventListener('load', function () {
        document.getElementsByClassName("currencybutton1")[0].disabled = true;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton2")[0].disabled = false;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0.5)";
        document.getElementsByClassName("currencybutton3")[0].disabled = true;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0.9)";
    })


    var allbuttons = document.getElementsByClassName('currencybutton')
    console.log(allbuttons)

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function changetodollar() {
        document.getElementsByClassName("currencybutton1")[0].disabled = true;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton2")[0].disabled = false;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0.5)";
        document.getElementsByClassName("currencybutton3")[0].disabled = true;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0.9)";
    
        var allvolumes = document.getElementsByClassName('volume_element')
        for (let i = 0; i < NFTdata.length; i++) {
            allvolumes[i].textContent = (allvolumes[i].textContent).replace(/\D/g,'')
            allvolumes[i].textContent = '$'+(numberWithSpaces((Math.round(Number(allvolumes[i].textContent)*2.412))))
        }
    }

    function changetosusu() {
        document.getElementsByClassName("currencybutton1")[0].disabled = true;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0.9)";
        document.getElementsByClassName("currencybutton2")[0].disabled = true;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0)";
        document.getElementsByClassName("currencybutton3")[0].disabled = false;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0.5)";
    
        var allvolumes = document.getElementsByClassName('volume_element')
        for (let i = 0; i < NFTdata.length; i++) {
            allvolumes[i].textContent = (allvolumes[i].textContent).replace(/\D/g,'')
            allvolumes[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes[i].textContent)/0.001822))))+' SUSU'
        }
    }

    function changetoewt() {
        document.getElementsByClassName("currencybutton1")[0].disabled = false;
        document.getElementsByClassName("currencybutton1")[0].style.filter = "grayscale(0.5)";
        document.getElementsByClassName("currencybutton2")[0].disabled = true;
        document.getElementsByClassName("currencybutton2")[0].style.filter = "grayscale(0.9)";
        document.getElementsByClassName("currencybutton3")[0].disabled = true;
        document.getElementsByClassName("currencybutton3")[0].style.filter = "grayscale(0)";
        
        var allvolumes = document.getElementsByClassName('volume_element')
        for (let i = 0; i < NFTdata.length; i++) {
            allvolumes[i].textContent = (allvolumes[i].textContent).replace(/\D/g,'')
            allvolumes[i].textContent = (numberWithSpaces((Math.round(Number(allvolumes[i].textContent)/(2.412/0.001822)))))+' EWT'
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full h-full bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] sm:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl shadow-2xl'>
                    <div className="w-full h-full pt-4 flex flex-col mx-auto">
                        <div>
                            <div className='text-textprimary dark:text-darktextprimary transition-all p-4'>
                                <h1 className='font-bold text-3xl'>EnergyWebNFTs</h1>
                                <p className='text-lg'>
                                        All the price data you need of all the NFTs on the Energy Web Chain these can include art, 
                                        trading cards, profile characters, representations of IRL items, game items, 
                                        RECs, land tiles, and more.</p>
                                <p className='text-lg my-2'>The combined market cap of all NFTs on the Energy Web chain is: <NumberFormat value={totalmarketcap} displayType={'text'} thousandSeparator={' '} prefix={'$'} /></p>
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
