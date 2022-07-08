const FooterHome = () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function copyToClickBoard(){
        var content = document.getElementById('addressCopy').innerHTML;
    
        navigator.clipboard.writeText(content)
            .then(() => {
            console.log("Text copied to clipboard...")
        })
            .catch(err => {
            console.log('Something went wrong', err);
        })
        document.getElementById('addressCopyButton').innerText = '✅'
        await sleep(1000);
        document.getElementById('addressCopyButton').innerText = '📋'
    }

    return (
        <footer className='w-full h-auto bg-bgprimary dark:bg-darkbgprimary transition-all'>
            <div className='w-[90%] sm:w-2/3 flex mx-auto flex-col px-4 py-8'>
                <h1 className='font-bold text-2xl text-textprimary dark:text-darktextprimary transition-all'>
                    ✨What is NFT market cap?
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
                <h1 className='mt-3 font-bold text-2xl text-textprimary dark:text-darktextprimary transition-all'>
                    🔢How does EnergyWebNFTs calculate the NFT prices?</h1>
                <p className='text-textprimary dark:text-darktextprimary transition-all'>
                    The price is gathered from the public subgraph of Greensea, provided
                    by the Greensea/Carbonswap team.
                </p>
                <h2 className='mt-3 font-bold text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    📄What is 24h volume in the table above?</h2>
                <p className='text-textprimary dark:text-darktextprimary transition-all'>
                    The 24h trading volume refers to the amount a NFT has 
                    been bought and sold on Greensea within the last 24 hours. 
                    For instance, if the 24h volume for the Cryptosoots collection is $2000, 
                    and let's say there have been traded 10 Cryptosoots in the last 24 hours,
                    then the average price each Cryptosoot that day has Changed hands for is $200.
                </p>
                <h1 className='mt-3 font-bold text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    👤How can I contact you?</h1> 
                <p className='text-textprimary dark:text-darktextprimary transition-all'>
                    You can contact me by sending a DM on Telegram: @arantuil or on Twitter: @arantuil
                </p>
                <h1 className='mt-3 font-bold text-xl text-textprimary dark:text-darktextprimary transition-all'>
                    🙏🏻I like this website, how can I thank you?</h1>
                <p className='text-textprimary dark:text-darktextprimary transition-all'>
                    If you found this website useful and want to thank me by sending EWT or SUSU or maybe even an NFT😮, you can do
                    so by sending it to this address: 
                </p>
                <div className='flex flex-row'>
                    <p id='addressCopy' className='break-all w-auto text-transparent bg-clip-text bg-gradient-to-r from-accent1 via-accent2 to-accent3 font-bold text-md sm:text-lg md:text-xl transition-all'>
                        0x26Daf0750B1AB7D1359412ed5656F4e9739D6c31
                    </p>
                    <button className='ml-3' id='addressCopyButton' onClick={()=>copyToClickBoard()}>📋</button>
                </div>
                <p className='text-sm text-textprimary dark:text-darktextprimary transition-all'>
                    All the donations will be used to pay for the cost of the website hosting.
                </p>
            </div>
        </footer>
    );
}

export default FooterHome;