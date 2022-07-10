import LogoGS from '../images/LogoGS.png';
import LogoRG from '../images/LogoRG.png';
import LogoCJ from '../images/LogoCJ.png';

function Markets() {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] bg-bgprimary dark:bg-darkbgprimary transition-all flex items-center">
            <div className='bg-backgroundimagepage bg-no-repeat bg-cover w-full h-full min-h-[calc(100vh-64px)]'>
                <div className='pt-4 my-4 sm:my-10 bg-bgsecondary dark:bg-darkbgsecondary 
                shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]
                transition-all w-[95%] md:w-2/3 flex flex-col justify-center mx-auto rounded-3xl'>
                    <h1 className='p-4 text-textprimary dark:text-darktextprimary transition-all font-bold text-2xl'>All the markets on the Energy Web chain where you can trade NFTs</h1>
                    <p className='px-4 text-textprimary dark:text-darktextprimary transition-all'>
                        Below are all the markets on the Energy Web chain displayed where you
                        are currently able to trade NFTs on. Information about the way NFTs are
                        traded on the exchange (custodial or non-custodial) are also shown,
                        and the percentage fees per traded NFT on the platform.</p>
                    <div className="mt-4 sm:mt-10 w-full h-full rounded-3xl bg-bgprimary dark:bg-darkbgprimary transition-all items-center">
                        <ul className="w-full h-full flex justify-center flex-wrap content-around">
                            <li className="rounded-b-3xl h-[400px] w-[300px] m-8 bg-bgsecondary dark:bg-darkbgsecondary transition-all
                            shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]">
                                <div className='w-full h-[50%]'>
                                    <a href="https://greensea.carbonswap.finance/">
                                        <img className='w-full h-auto flex mx-auto bg-lineargs' src={LogoGS} alt="Logo exchange 1" />
                                    </a>
                                </div>
                                <div className='w-full h-[50%] flex flex-row'>
                                    <div className='w-full h-full my-4'>
                                        <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Name:</span> <span className='text-xl'>Greensea</span></h1>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Non-custodial:</span> <span className='text-red-600 text-xl'>No</span></h1>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Fee:</span> <span className='text-xl'>1%</span></h1>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="rounded-b-3xl h-[400px] w-[300px] m-8 bg-bgsecondary dark:bg-darkbgsecondary transition-all
                            shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]">
                                <div className='w-full h-[50%]'>
                                    <a href="https://raregems.io/">
                                        <img className='w-full h-auto flex mx-auto bg-linearrg' src={LogoRG} alt="Logo exchange 2" />
                                    </a>
                                </div>
                                <div className='w-full h-[50%] flex flex-row'>
                                    <div className='w-full h-full my-4'>
                                        <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Name:</span> <span className='text-xl'>Raregems</span></h1>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Non-custodial:</span> <span className='text-green-600 text-xl'>Yes</span></h1>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Fee:</span> <span className='text-xl'>1%</span></h1>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="rounded-b-3xl h-[400px] w-[300px] m-8 bg-bgsecondary dark:bg-darkbgsecondary transition-all
                            shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]">
                                <div className='w-full h-[50%]'>
                                    <a href="https://carbonjack.io/nft-broker/index.html">
                                        <img className='w-full h-auto flex mx-auto bg-linearcj' src={LogoCJ} alt="Logo exchange 3" />
                                    </a>
                                </div>
                                <div className='w-full h-[50%] flex flex-row'>
                                    <div className='w-full h-full my-4'>
                                        <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Name:</span> <span className='text-xl'>Carbonjackers</span></h1>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Non-custodial:</span> <span className='text-red-600 text-xl'>No</span></h1>
                                            <h1 className='w-[75%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-xl'>Fee:</span> <span className='text-xl'>2.5%</span></h1>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Markets;
