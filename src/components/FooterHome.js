const FooterHome = () => {
    return (
        <footer className='w-full h-auto bg-bgprimary dark:bg-darkbgprimary transition-all
        shadow-[0_0px_7px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_7px_2px_rgba(245,245,230,0.2)]'>
            <div className='w-[95%] sm:w-2/3 flex mx-auto flex-col px-4 py-8'>
                <h1 className='font-bold text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    ✨What is the NFT market cap?
                </h1>
                <p className='text-sm sm:text-base text-textprimary dark:text-darktextprimary transition-all'>
                    The NFT market cap is the total value of all the NFTs on the 
                    Energy Web chain that have been minted or are in circulation. 
                    Market capitalization is used to determine the ranking of 
                    the NFTs. The higher the market cap of a particular 
                    NFT, the higher its ranking and share of the market. 
                    The NFT market cap is calculated by multiplying the total number 
                    of NFT's in circulation by its current price.
                </p>
                <h1 className='mt-4 font-bold text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    🔢How does EnergyWebNFTs calculate the NFT prices?</h1>
                <p className='text-sm sm:text-base text-textprimary dark:text-darktextprimary transition-all'>
                    EnergyWebNFTs combines data from Greensea and Raregems and displays the order with the lowest price. 
                    The Greensea pricedata is gathered from the public subgraph, provided by the Greensea/Carbonswap team.
                </p>
                <h1 className='mt-4 font-bold text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    🟢What is the blinking dot in the top right corner?</h1> 
                <p className='text-sm sm:text-base text-textprimary dark:text-darktextprimary transition-all'>
                    The blinking colored icon indicates how up-to-date the data in 
                    the table on the homepage is. 
                    (However the data on the individual NFT pages does actively change)
                </p>
                    <ul className='text-sm sm:text-base text-textprimary dark:text-darktextprimary transition-all'>
                        <li>
                            • If the blinking dot is green then the data is less then 2 minutes old.
                        </li>
                        <li>
                            • If the blinking dot is yellow then the data is between 2 and 5 minutes old.
                        </li>
                        <li>
                            • If the blinking dot is orange then the data is between 5 and 10 minutes old.
                        </li>
                        <li>
                            • If the blinking dot is red then the data is more then 10 minutes old.
                        </li>
                    </ul>
                <h1 className='mt-4 font-bold text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    👤How can I contact you?</h1> 
                <p className='text-sm sm:text-base text-textprimary dark:text-darktextprimary transition-all'>
                    You can contact me by sending a DM on Telegram: @arantuil or on Twitter: @arantuil
                </p>
                <h1 className='mt-4 font-bold text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    🔴Disclaimer</h1> 
                <p className='text-sm sm:text-base text-textprimary dark:text-darktextprimary transition-all'>
                    Although the data is objectively presented, a small disclaimer: The creator of EnergyWebNFTs.com is also the creator of the Tubby Turtles NFT collection.
                    <br/>
                    EnergyWebNFTs.com is not affiliated with the Energy Web foundation.
                </p>
            </div>
        </footer>
    );
}

export default FooterHome;