import React, { useState, useEffect } from 'react';
import NFTdata from './NFTdata.json';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import slugify from 'slugify';
import NumberFormat from 'react-number-format';
import useColorChange from 'use-color-change';

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
                });
            }
        });
    }, []);

    const colorStyle = useColorChange(currentnft, {
        higher: 'rgba(35, 136, 35, 0.4)',
        lower: 'rgba(210, 34, 45, 0.4)',
        duration: 1500
    });

    //console.log(currentnft)
    //console.log(params.id)


    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] lg:w-2/3 h-[calc(100%-2rem)] sm:h-[calc(100%-5rem)] mx-auto my-4 sm:my-10 rounded-3xl shadow-2xl'>
                    <div className='p-4 flex flex-col w-full h-full md:flex-row'>
                        <img className='flex mx-auto aspect-square rounded-2xl bg-black border-gradient' src={currentnft.imageanimated} alt="current NFT image" />
                        <div className=''>
                            <div className=''>
                                <div className=''>
                                    <div className='text-lg'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Rank:
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Name:
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Floorprice:
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Market cap:
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Volume 24h:
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                            Assettype:
                                        </h1>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='text-lg'>
                                        <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                            {currentnft.rank}
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                            {currentnft.name}
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='text-textprimary dark:text-darktextprimary transition-all'>
                                            <NumberFormat style={colorStyle} className='marketcap_element' value={currentnft.floorprice} displayType={'text'} thousandSeparator={' '} prefix={'$'} />
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='text-textprimary dark:text-darktextprimary transition-all'>
                                            <NumberFormat style={colorStyle} className='marketcap_element' value={currentnft.marketcap} displayType={'text'} thousandSeparator={' '} prefix={'$'} />
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 className='text-textprimary dark:text-darktextprimary transition-all'>
                                            <NumberFormat style={colorStyle} className='marketcap_element' value={currentnft.volumetwentyfourhour} displayType={'text'} thousandSeparator={' '} prefix={'$'} />
                                        </h1>
                                    </div>
                                    <div className='text-lg'>
                                        <h1 style={colorStyle} className='text-textprimary dark:text-darktextprimary transition-all'>
                                            {currentnft.assettype}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className=''>
                                <h1 className='text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>Price changes</h1>
                                <div className=''>
                                    <div className='text-sm sm:text-md text-textprimary dark:text-darktextprimary transition-all'>
                                        <h1 className=''>Price change (7d)</h1>
                                        <h1 className=''>{currentnft.floorpricesevenday}</h1>
                                    </div>
                                    <div className='text-sm sm:text-md text-textprimary dark:text-darktextprimary transition-all'>
                                        <h1 className=''>Price change (14d)</h1>
                                        <h1 className=''>{currentnft.floorpricefourteenday}</h1>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='text-sm sm:text-md text-textprimary dark:text-darktextprimary transition-all'>
                                        <h1 className=''>Price change (30d)</h1>
                                        <h1 className=''>{currentnft.floorpricethirtyday}</h1>
                                    </div>
                                    <div className='text-sm sm:text-md text-textprimary dark:text-darktextprimary transition-all'>
                                        <h1 className=''>Price change (60d)</h1>
                                        <h1 className=''>{currentnft.floorpricesixtyday}</h1>
                                    </div>
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