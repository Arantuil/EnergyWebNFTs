import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import slugify from 'slugify';
import NumberFormat from 'react-number-format';
import useColorChange from 'use-color-change';
import { AiOutlineLink } from "react-icons/ai";
import LogoGS from '../images/LogoGS.png';
import LogoRG from '../images/LogoRG.png';
import LogoCJ from '../images/LogoCJ.png';

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
    }, [setCurrentnft, params.id]);

    let nftpagepercentage7day = document.getElementsByClassName("nftpagepercentage7day")
    if (nftpagepercentage7day !== undefined) {
        for (let i = 0; i < nftpagepercentage7day.length; i++) {
            nftpagepercentage7day[i].style.color = currentnft.percentage7daycolor
        }
    }
    let nftpagepercentage14day = document.getElementsByClassName("nftpagepercentage14day")
    if (nftpagepercentage14day !== undefined) {
        for (let i = 0; i < nftpagepercentage14day.length; i++) {
            nftpagepercentage14day[i].style.color = currentnft.percentage14daycolor
        }
    }
    let nftpagepercentage30day = document.getElementsByClassName("nftpagepercentage30day")
    if (nftpagepercentage30day !== undefined) {
        for (let i = 0; i < nftpagepercentage30day.length; i++) {
            nftpagepercentage30day[i].style.color = currentnft.percentage30daycolor
        }
    }
    let nftpagepercentage60day = document.getElementsByClassName("nftpagepercentage60day")
    if (nftpagepercentage60day !== undefined) {
        for (let i = 0; i < nftpagepercentage60day.length; i++) {
            nftpagepercentage60day[i].style.color = currentnft.percentage60daycolor
        }
    }

    const colorStyle = useColorChange(currentnft, {
        higher: 'rgba(35, 136, 35, 0.2)',
        lower: 'rgba(210, 34, 45, 0.2)',
        duration: 750
    });

    let islistedongs = ''
    if (currentnft.islistedongs === 'true') {
        islistedongs = <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#4ec44e"/><path d="m22.273 33.783c-0.26014 0-0.51337-0.08748-0.7194-0.25208l-8.6328-6.9063c-0.4961-0.39711-0.57667-1.1211-0.17956-1.6172 0.39941-0.4961 1.1223-0.57667 1.6184-0.17956l7.674 6.1397 11.383-16.26c0.36373-0.52257 1.082-0.64689 1.6034-0.28316 0.52142 0.36488 0.64689 1.082 0.28316 1.6034l-12.086 17.266c-0.18186 0.26129-0.46387 0.43394-0.77926 0.47998-0.05524 0.0058-0.1105 0.0092-0.1646 0.0092z" fill="#3b5172" stroke-width="1.151"/></svg>
    }
    else if (currentnft.islistedongs === 'false') {
        islistedongs = <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><circle cx="24" cy="24" r="20" fill="#d1323c"/></g><g fill="#3b5172" stroke-width=".62964"><path d="m31.569 14.205 2.2265 2.2266-17.364 17.363-2.2265-2.2266z"/><path d="m33.794 31.57-2.2264 2.2258-17.362-17.366 2.2264-2.2258z"/></g></svg>
    }
    let islistedonrg = ''
    if (currentnft.islistedonrg === 'true') {
        islistedonrg = <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#4ec44e"/><path d="m22.273 33.783c-0.26014 0-0.51337-0.08748-0.7194-0.25208l-8.6328-6.9063c-0.4961-0.39711-0.57667-1.1211-0.17956-1.6172 0.39941-0.4961 1.1223-0.57667 1.6184-0.17956l7.674 6.1397 11.383-16.26c0.36373-0.52257 1.082-0.64689 1.6034-0.28316 0.52142 0.36488 0.64689 1.082 0.28316 1.6034l-12.086 17.266c-0.18186 0.26129-0.46387 0.43394-0.77926 0.47998-0.05524 0.0058-0.1105 0.0092-0.1646 0.0092z" fill="#3b5172" stroke-width="1.151"/></svg>
    }
    else if (currentnft.islistedonrg === 'false') {
        islistedonrg = <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><circle cx="24" cy="24" r="20" fill="#d1323c"/></g><g fill="#3b5172" stroke-width=".62964"><path d="m31.569 14.205 2.2265 2.2266-17.364 17.363-2.2265-2.2266z"/><path d="m33.794 31.57-2.2264 2.2258-17.362-17.366 2.2264-2.2258z"/></g></svg>
    }
    let islistedoncj = ''
    if (currentnft.islistedoncj === 'true') {
        islistedoncj = <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#4ec44e"/><path d="m22.273 33.783c-0.26014 0-0.51337-0.08748-0.7194-0.25208l-8.6328-6.9063c-0.4961-0.39711-0.57667-1.1211-0.17956-1.6172 0.39941-0.4961 1.1223-0.57667 1.6184-0.17956l7.674 6.1397 11.383-16.26c0.36373-0.52257 1.082-0.64689 1.6034-0.28316 0.52142 0.36488 0.64689 1.082 0.28316 1.6034l-12.086 17.266c-0.18186 0.26129-0.46387 0.43394-0.77926 0.47998-0.05524 0.0058-0.1105 0.0092-0.1646 0.0092z" fill="#3b5172" stroke-width="1.151"/></svg>
    }
    else if (currentnft.islistedoncj === 'false') {
        islistedoncj = <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><circle cx="24" cy="24" r="20" fill="#d1323c"/></g><g fill="#3b5172" stroke-width=".62964"><path d="m31.569 14.205 2.2265 2.2266-17.364 17.363-2.2265-2.2266z"/><path d="m33.794 31.57-2.2264 2.2258-17.362-17.366 2.2264-2.2258z"/></g></svg>
    }


    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full min-h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-3/4 lg:w-2/3 h-[calc(100%-2rem)] sm:h-[calc(100%-5rem)] mx-auto my-4 sm:my-10 rounded-3xl
                    shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                    <div className='p-4 flex flex-col w-full h-full xl:flex-row'>
                        <div className='rounded-2xl h-2/4 lg:h-3/4 xl:w-[50vh] 2xl:w-[60vh] flex mx-auto xl:mr-0
                            shadow-[0_0px_10px_2px_rgba(15,23,35,0.8)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                            <img className='h-full w-full rounded-2xl bg-black border-gradient'
                                src={currentnft.imageanimated} alt="current NFT" />
                        </div>

                        <div className='xl:mr-auto xl:ml-4 2xl:ml-8'>

                            <div className='flex flex-row justify-center xl:justify-start'>
                                <div className='flex flex-row pb-2'>
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
                            </div>

                            <div className='border-b-2 pb-2 border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)] max-w-[400px] pt-2 flex mx-auto xl:mx-0 flex-col justify-center'>
                                <div className='justify-center xl:justify-start border-t-2 pt-2 border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)] px-2 text-sm flex xl:ml-0 max-w-[400px] text-textprimary dark:text-darktextprimary transition-all'>
                                    <h3 className='flex flex-row text-sm sm:text-base'>
                                        <span className='font-bold mr-2 mb-2'>Website: </span>
                                        <a href={currentnft.projectlink}>{currentnft.projectlink}</a>
                                        <AiOutlineLink />
                                    </h3>
                                </div>
                                <div className='justify-center xl:justify-start border-b-2 pb-2 border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)] px-2 text-sm flex xl:ml-0 max-w-[400px] text-textprimary dark:text-darktextprimary transition-all'>
                                    <h3 className='text-sm sm:text-base'>
                                        <span className='font-bold'>Description: </span>
                                        {currentnft.description}
                                    </h3>
                                </div>
                                <div className='flex flex-row justify-center xl:justify-start'>
                                    <div className='p-2'>
                                        <div className='text-sm sm:text-base 2xl:text-lg'>
                                            <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                                Non-converted floorprice:
                                            </h1>
                                        </div>
                                        <div className='text-sm sm:text-base 2xl:text-lg'>
                                            <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                                Floorprice exchange:
                                            </h1>
                                        </div>
                                    </div>
                                    <div className='p-2 max-w-[30%]'>
                                        <div className='text-sm sm:text-base 2xl:text-lg'>
                                            <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                                {currentnft.cheapestpriceoriginal} {currentnft.cheapestpricecurrency}
                                            </h1>
                                        </div>
                                        <div className='text-sm sm:text-base 2xl:text-lg'>
                                            <a style={colorStyle} className='flex flex-row text-textprimary dark:text-darktextprimary transition-all'
                                                href={currentnft.cheapestmarketlink}>
                                                {currentnft.cheapestmarket}<AiOutlineLink />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='pt-2 max-w-[400px] mx-auto xl:mx-0 flex flex-col justify-center border-b-2 pb-2 border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'>
                            <h1 className='px-2 pt-2 xl:mx-0 flex mx-auto text-base xl:text-lg font-bold text-textprimary dark:text-darktextprimary transition-all'>Listed on exchanges:</h1>
                                <div className='flex justify-around flex-row px-2'>
                                    <div className='w-1/4'>
                                        <a href="https://greensea.carbonswap.finance/">
                                            <img src={LogoGS} alt="Greensea icon" />
                                        </a>
                                        <div className='flex justify-center mx-auto w-[30px] h-[30px]'>
                                            {islistedongs}
                                        </div>
                                    </div>
                                    <div className='w-1/4'>
                                        <a href="https://raregems.io/">
                                            <img src={LogoRG} alt="Raregems icon" />
                                        </a>
                                        <div className='flex justify-center mx-auto w-[30px] h-[30px]'>
                                            {islistedonrg}
                                        </div>
                                    </div>
                                    <div className='w-1/4'>
                                        <a href="https://carbonjack.io/nft-broker/index.html">
                                            <img src={LogoCJ} alt="Carbonjack icon" />
                                        </a>
                                        <div className='flex justify-center mx-auto w-[30px] h-[30px]'>
                                            {islistedoncj}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='pt-2 md:pt-4 flex flex-col justify-center'>
                                <h1 className='px-2 pt-2 xl:mx-0 flex mx-auto text-base xl:text-lg font-bold text-textprimary dark:text-darktextprimary transition-all'>Price changes ($)</h1>
                                <div className='flex flex-row justify-center xl:justify-start'>
                                    <div className='flex flex-col px-2'>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (7d)</h1>
                                            <h1 style={colorStyle} className={'nftpagepercentage7day'}>{currentnft.floorpricesevenday}</h1>
                                        </div>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (30d)</h1>
                                            <h1 style={colorStyle} className='nftpagepercentage30day'>{currentnft.floorpricethirtyday}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col px-2'>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (14d)</h1>

                                            <h1 style={colorStyle} className='nftpagepercentage14day'>{currentnft.floorpricefourteenday}</h1>
                                        </div>
                                        <div className='text-sm sm:text-md xl:text-lg text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className=''>Price change (60d)</h1>
                                            <h1 style={colorStyle} className='nftpagepercentage60day'>{currentnft.floorpricesixtyday}</h1>
                                        </div>
                                    </div>

                                </div>
                                <div className='px-2 text-xs flex mx-auto xl:ml-0 max-w-[400px] text-textprimary dark:text-darktextprimary transition-all'>
                                    <h3>(Price changes are based only on Greensea data,
                                        because no historical price data is being stored by EnergyWebNFTs.com)<br />
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