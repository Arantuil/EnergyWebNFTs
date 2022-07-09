import React, { useState, useEffect } from 'react';
import NFTdata from './NFTdata.json';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import slugify from 'slugify';

const NftPage = () => {
    const params = useParams()

    const [currentnft, setCurrentnft] = useState([])

    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();

            if (data !== null) {
                data.sort((a,b) => b.marketcap - a.marketcap);
                Object.values(data).map((nft) => {
                    let slugifiedname = slugify(nft["name"], '_')
                    if (slugifiedname === params.id) {
                        setCurrentnft(nft)
                    }
                });
            }
        });
    }, []);  

    console.log(currentnft)
    console.log(params.id)


    return ( 
        <div className='w-full h-[calc(100vh-64px)]'>
            <div>
                <h1 className='flex flex-col'>
                    {currentnft.name} name
                </h1>
                <img src={currentnft.image} alt="current NFT image" />
                <h1 className='flex flex-col'>
                    {currentnft.price} price
                </h1>
                <h1 className='flex flex-col'>
                    {currentnft.marketcap} marketcap
                </h1>
            </div>
        </div>
    );
}

export default NftPage;