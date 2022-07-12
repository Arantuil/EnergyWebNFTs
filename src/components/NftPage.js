import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import slugify from 'slugify';
import NumberFormat from 'react-number-format';
import useColorChange from 'use-color-change';
import { AiOutlineLink } from "react-icons/ai"

const NftPage = () => {
    const params = useParams()

    const [currentnft, setCurrentnft] = useState([])

    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();

            if (data !== null) {
                data.sort((a, b) => b.marketcap - a.marketcap);
                Object.values(data).map((nft) => {
                    let slugifiedname = slugify(nft["name"], '_')
                    if (slugifiedname === params.id) {
                        setCurrentnft(nft)
                    }
                    return null
                });
            }
        });
    }, [setCurrentnft]);
    
    let nftpagepercentages = document.getElementsByClassName("nftpagepercentages")
    if (nftpagepercentages !== undefined) {
        for (let i = 0; i < nftpagepercentages.length; i++) {
            if (nftpagepercentages[i].textContent[0] === '-') {
                nftpagepercentages[i].style.color="#EF143A"
            }
            else {
                nftpagepercentages[i].style.color="#068706"
            }
        }
    }

    const colorStyle = useColorChange(currentnft, {
        higher: 'rgba(35, 136, 35, 0.2)',
        lower: 'rgba(210, 34, 45, 0.2)',
        duration: 750
    });

    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full min-h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-3/4 lg:w-2/3 h-[calc(100%-2rem)] sm:h-[calc(100%-5rem)] mx-auto my-4 sm:my-10 rounded-3xl
                    shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                    <div className='p-4 flex flex-col w-full h-full xl:flex-row'>
                        <div className='rounded-xl h-2/4 lg:h-3/4 xl:w-[50vh] 2xl:w-[60vh] flex mx-auto xl:mr-0
                            shadow-[0_0px_10px_2px_rgba(15,23,35,0.8)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                            <img className='h-full w-full rounded-xl bg-black border-gradient'
                                src={currentnft.imageanimated} alt="current NFT" />
                        </div>

                        <div className='xl:mr-auto xl:ml-4 2xl:ml-8'>

                            <div className='flex flex-row justify-center xl:justify-start'>
                                <div className='p-2'>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Name:
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Floorprice:
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Market cap:
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Holders:
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Circulating supply:
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Assettype:
                                        </h1>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                            {currentnft.name}
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='text-textprimary dark:text-darktextprimary transition-all'>
                                            <NumberFormat style={colorStyle} className='marketcap_element' value={currentnft.floorprice} decimalScale={2} displayType={'text'} thousandSeparator={','} prefix={'$'} />
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 className='text-textprimary dark:text-darktextprimary transition-all'>
                                            <NumberFormat style={colorStyle} className='marketcap_element' value={currentnft.marketcap} decimalScale={2} displayType={'text'} thousandSeparator={','} prefix={'$'} />
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                            {currentnft.owners}
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                            {currentnft.circulating}
                                        </h1>
                                    </div>
                                    <div className='text-lg xl:text-xl'>
                                        <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                            {currentnft.assettype}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className='pt-6 flex flex-col justify-center'>
                                <div className='flex flex-row justify-center xl:justify-start'>
                                    <div className='p-2'>
                                        <div className='text-sm sm:text-base xl:text-lg 2xl:text-xl'>
                                            <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                                Non-converted floorprice:
                                            </h1>
                                        </div>
                                        <div className='text-base xl:text-lg 2xl:text-xl'>
                                            <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                                Floorprice exchange:
                                            </h1>
                                        </div>
                                    </div>
                                    <div className='p-2 max-w-[30%]'>
                                        <div className='text-sm sm:text-base xl:text-lg 2xl:text-xl'>
                                            <h1 className='text-textprimary dark:text-darktextprimary transition-all'>
                                                {currentnft.floorpriceoriginal} 
                                            </h1>
                                        </div>
                                        <div className='text-base xl:text-lg 2xl:text-xl'>
                                            <a style={colorStyle} className='flex flex-row text-textprimary dark:text-darktextprimary transition-all' 
                                                href={currentnft.cheapestmarketlink}>
                                                {currentnft.cheapestmarket}<AiOutlineLink/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='pt-6 flex flex-col justify-center'>
                                <h1 className='px-2 pt-2 xl:mx-0 flex mx-auto text-2xl xl:text-3xl font-bold text-textprimary dark:text-darktextprimary transition-all'>Price changes</h1>
                                <div className='flex flex-row justify-center xl:justify-start'>
                                    <div className='flex flex-col p-2'>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (7d)</h1>
                                            <h1 style={colorStyle} className='nftpagepercentages'>{currentnft.floorpricesevenday}</h1>
                                        </div>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (30d)</h1>
                                            <h1 style={colorStyle} className='nftpagepercentages'>{currentnft.floorpricethirtyday}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col p-2'>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (14d)</h1>
                                            <h1 style={colorStyle} className='nftpagepercentages'>{currentnft.floorpricefourteenday}</h1>
                                        </div>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (60d)</h1>
                                            <h1 style={colorStyle} className='nftpagepercentages'>{currentnft.floorpricesixtyday}</h1>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='px-2 text-sm flex mx-auto xl:ml-0 max-w-[400px] text-textprimary dark:text-darktextprimary transition-all'>
                                    <h3>(Price changes are based only on Greensea data, 
                                        because no historical price data is being stored by EnergyWebNFTs.com)<br/>
                                        If any percentages are 0, then that means there are currently no sellorders, or N amount of days ago there were no sellorders.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NftPage;