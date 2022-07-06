import Table from './Table';


function Home() {

    return (
        <div className="w-full h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full h-full bg-backgroundimagepage">
                <div className='bg-bgprimary dark:bg-darkbgprimary w-2/3 h-auto mx-auto mt-10 rounded-3xl'>
                    <div className="w-full h-full pt-4 flex flex-col mx-auto">
                        <div>
                            <div className='text-textprimary dark:text-darktextprimary transition-all p-4'>
                                <h1 className='font-bold text-3xl'>EnergyWebNFTs</h1>
                                    <p className='text-lg'>
                                        All the price data you need of all the NFTs on the Energy Web Chain these can include art, 
                                        trading cards, profile characters, representations of IRL items, game items, 
                                        RECs, land tiles, and more.
                                    </p>
                                <h2 className='text-l'>(If any prices are 0 then that means there are no active sell orders on Greensea)</h2>
                            </div>
                        </div>
                        <div className="bg-bgsecondary dark:bg-darkbgsecondary rounded-3xl p-4">
                            <Table />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
