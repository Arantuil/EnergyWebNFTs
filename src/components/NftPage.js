import React, { useState, useEffect } from 'react';
import NFTdata from './NFTdata.json';

const NftPage = () => {
    return ( 
        <div>NftPage
            <p>
                {NFTdata?.price} price
            </p>
        </div>
    );
}

export default NftPage;