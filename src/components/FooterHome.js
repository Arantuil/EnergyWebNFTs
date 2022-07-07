const FooterHome = () => {
    return (
        <header className='w-full h-auto bg-bgprimary dark:bg-darkbgprimary transition-all'>
            <div className='w-[90%] sm:w-2/3 flex mx-auto flex-col px-4 py-8'>
                <h1 className='font-bold text-2xl text-textprimary dark:text-darktextprimary transition-all'>
                    What is NFT market cap?
                </h1>
                <p className='text-textprimary dark:text-darktextprimary transition-all'>
                    NFT market cap is the total value of all the NFTs on the 
                    Energy Web chain that have been minted or are in circulation. 
                    Market capitalization is used to determine the ranking of 
                    the NFTs. The higher the market cap of a particular 
                    NFT, the higher its ranking and share of the market. 
                    The NFT market cap is calculated by multiplying the total number 
                    of NFT's in circulation by its current price.
                </p>
                <h1 className='mt-3 font-bold text-2xl text-textprimary dark:text-darktextprimary transition-all'>How does EnergyWebNFTs calculate the NFT prices?</h1>
                <p className='text-textprimary dark:text-darktextprimary transition-all'>
                    The price is gathered from the public subgraph of Greensea, provided
                    by the Greensea/Carbonswap team.
                </p>
                <h2 className='mt-3 font-bold text-xl text-textprimary dark:text-darktextprimary transition-all'>What is 24h volume in the table above?</h2>
                <p className='text-textprimary dark:text-darktextprimary transition-all'>
                    The 24h trading volume refers to the amount a NFT has 
                    been bought and sold on Greensea within the last 24 hours. 
                    For instance, if the 24h volume for the Cryptosoots collection is $2000 
                    , and let's say there have been traded 10 Cryptosoots in the last 24 hours,
                    then the average price each Cryptosoot that day has Changed hands for is $200.
                </p>
            </div>
        </header>
    );
}

export default FooterHome;