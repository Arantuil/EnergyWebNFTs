import LogoGS from '../images/LogoGS.png';
import LogoRG from '../images/LogoRG.png';
import LogoCJ from '../images/LogoCJ.png';

function Exchanges() {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] bg-bgprimary dark:bg-darkbgprimary transition-all flex items-center">
            <div className='bg-backgroundimagepage w-full h-full min-h-[calc(100vh-64px)]'>
                <div className="mt-10 w-full h-full md:w-2/3 mx-auto rounded-3xl bg-bgsecondary dark:bg-darkbgsecondary transition-all flex justify-center items-center shadow-2xl">
                    <ul className="w-full h-full flex justify-center flex-wrap content-around">
                        <li className="rounded-3xl h-[400px] w-[300px] m-8 bg-bgprimary dark:bg-darkbgprimary transition-all shadow-xl">
                            <div className='w-full h-[50%]'>
                                <a href="https://greensea.carbonswap.finance/">
                                    <img className='w-full h-auto flex mx-auto drop-shadow-2xl bg-radialgs' src={LogoGS} alt="" />
                                </a>
                            </div>
                            <div className='w-full h-[50%] flex flex-row'>
                                <div className='w-full h-full my-4'>
                                    <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                        <h1><span className='font-bold'>Name:</span> <span>Greensea</span></h1>
                                        <h1><span className='font-bold'>Non-custodial:</span> <span className='text-red-600'>No</span></h1>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="rounded-3xl h-[400px] w-[300px] m-8 bg-bgprimary dark:bg-darkbgprimary transition-all shadow-xl">
                            <div className='w-full h-[50%]'>
                                <a href="https://raregems.io/">
                                    <img className='w-full h-auto flex mx-auto drop-shadow-2xl bg-radialrg' src={LogoRG} alt="" />
                                </a>
                            </div>
                            <div className='w-full h-[50%] flex flex-row'>
                                <div className='w-full h-full my-4'>
                                    <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                        <h1><span className='font-bold'>Name:</span> <span>Raregems</span></h1>
                                        <h1><span className='font-bold'>Non-custodial:</span> <span className='text-green-600'>Yes</span></h1>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="rounded-3xl h-[400px] w-[300px] m-8 bg-bgprimary dark:bg-darkbgprimary transition-all shadow-xl">
                            <div className='w-full h-[50%]'>
                                <a href="https://carbonjack.io/nft-broker/index.html">
                                    <img className='w-full h-auto flex mx-auto drop-shadow-2xl bg-radialcj' src={LogoCJ} alt="" />
                                </a>
                            </div>
                            <div className='w-full h-[50%] flex flex-row'>
                                <div className='w-full h-full my-4'>
                                    <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                        <h1><span className='font-bold'>Name:</span> <span>Carbonjackers</span></h1>
                                        <h1><span className='font-bold'>Non-custodial:</span> <span className='text-red-600'>No</span></h1>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Exchanges;
