import LogoGS from '../images/LogoGS.png';
import LogoRG from '../images/LogoRG.png';

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
                        and the fee per traded NFT on the platform.</p>
                    <div className="mt-4 sm:mt-10 w-full h-full rounded-3xl bg-bgprimary dark:bg-darkbgprimary transition-all items-center">
                        <ul className="w-full h-full flex justify-center flex-wrap content-around">
                            <li className="rounded-b-3xl h-[400px] w-[300px] m-8 bg-bgsecondary dark:bg-darkbgsecondary transition-all
                            shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]">
                                <div className='w-full h-[50%]'>
                                    <a href="https://greensea.carbonswap.finance/">
                                        <img className='w-full h-auto flex mx-auto bg-[rgba(124,190,116,0.85)]' src={LogoGS} alt="Logo exchange 1" />
                                    </a>
                                </div>
                                <div className='w-full h-[50%] flex flex-row'>
                                    <div className='w-full h-full my-4'>
                                        <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-lg'>Name:</span> <span className='text-lg'>Greensea</span></h2>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-lg'>Non-custodial:</span> <span className='text-red-600 text-lg'>No</span></h2>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-lg'>Fee:</span> <span className='text-lg'>1%</span></h2>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-base'>Tracked on EWCNFTs:</span> <span className='text-green-600 text-base'>Yes</span></h2>
                                        </p>
                                        <div className='w-[100%] h-[30px] justify-center flex flex-row'>
                                            <a className='mx-1 mt-[2px] h-full' href="https://greensea.carbonswap.finance/" target="_blank" rel="noreferrer">
                                                <svg className='h-full w-[23px] aspect-square my-auto mx-auto brightness-[0.1] dark:brightness-[1.5]' xmlns="http://www.w3.org/2000/svg" width="141.732" height="141.732" version="1.1" viewBox="0 0 141.732 141.732" xmlSpace="preserve">
                                                    <path fill="#c0c4a3" d="M57.217 63.271L20.853 99.637c-4.612 4.608-7.15 10.738-7.15 17.259 0 6.524 2.541 12.653 7.151 17.261a24.265 24.265 0 0017.259 7.15h.002c6.52 0 12.648-2.54 17.257-7.15L91.738 97.79c7.484-7.484 9.261-18.854 4.573-28.188l-7.984 7.985a14.193 14.193 0 01-3.831 12.957l-37.28 37.277-.026-.023a14.411 14.411 0 01-9.527 3.579c-3.768 0-7.295-1.453-9.937-4.092-2.681-2.68-4.13-6.259-4.093-10.078a14.449 14.449 0 013.584-9.39l-.021-.02.511-.515a6.86 6.86 0 01.206-.211c.021-.021.043-.044.064-.062l.123-.125 36.364-36.366a14.07 14.07 0 0110.008-4.144c.977 0 1.947.101 2.899.298l7.993-7.995a24.422 24.422 0 00-10.889-2.554 24.26 24.26 0 00-17.258 7.148m70.592-38.934c0-6.52-2.541-12.65-7.15-17.258-4.61-4.613-10.74-7.151-17.261-7.151a24.237 24.237 0 00-17.257 7.151L49.774 43.442c-7.479 7.478-9.26 18.84-4.585 28.17l7.646-7.646c-.877-4.368.358-8.964 3.315-12.356l-.021-.022.502-.507.201-.206.062-.06.126-.127 36.363-36.364a14.068 14.068 0 0110.014-4.147c3.784 0 7.339 1.472 10.014 4.147 5.522 5.521 5.522 14.51 0 20.027L76.138 71.629l-.026-.026a14.411 14.411 0 01-9.526 3.581c-.951 0-1.891-.094-2.814-.278l-7.645 7.645a24.442 24.442 0 0010.907 2.563c6.523 0 12.652-2.539 17.261-7.148l36.365-36.365c4.61-4.613 7.149-10.742 7.149-17.264"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="rounded-b-3xl h-[400px] w-[300px] m-8 bg-bgsecondary dark:bg-darkbgsecondary transition-all
                            shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]">
                                <div className='w-full h-[50%]'>
                                    <a href="https://raregems.io/">
                                        <img className='w-full h-auto flex mx-auto bg-[rgba(189,138,223,0.85)]' src={LogoRG} alt="Logo exchange 2" />
                                    </a>
                                </div>
                                <div className='w-full h-[50%] flex flex-row'>
                                    <div className='w-full h-full my-4'>
                                        <p className='text-center flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-lg'>Name:</span> <span className='text-lg'>Raregems</span></h2>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-lg'>Non-custodial:</span> <span className='text-green-600 text-lg'>Yes</span></h2>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-lg'>Fee:</span> <span className='text-lg'>1%</span></h2>
                                            <h2 className='w-[85%] flex mx-auto justify-center border-b-2 border-solid border-[rgba(50,50,50,0.20)] dark:border-[rgba(220,220,220,0.20)]'><span className='mr-2 font-bold text-base'>Tracked on EWCNFTs:</span> <span className='text-green-600 text-base'>Yes</span></h2>
                                        </p>
                                        <div className='w-[100%] h-[30px] justify-center flex flex-row'>
                                            <a className='mx-1 mt-[2px] h-full' href="https://raregems.io/" target="_blank" rel="noreferrer">
                                                <svg className='h-full w-[23px] aspect-square my-auto mx-auto brightness-[0.1] dark:brightness-[1.5]' xmlns="http://www.w3.org/2000/svg" width="141.732" height="141.732" version="1.1" viewBox="0 0 141.732 141.732" xmlSpace="preserve">
                                                    <path fill="#c0c4a3" d="M57.217 63.271L20.853 99.637c-4.612 4.608-7.15 10.738-7.15 17.259 0 6.524 2.541 12.653 7.151 17.261a24.265 24.265 0 0017.259 7.15h.002c6.52 0 12.648-2.54 17.257-7.15L91.738 97.79c7.484-7.484 9.261-18.854 4.573-28.188l-7.984 7.985a14.193 14.193 0 01-3.831 12.957l-37.28 37.277-.026-.023a14.411 14.411 0 01-9.527 3.579c-3.768 0-7.295-1.453-9.937-4.092-2.681-2.68-4.13-6.259-4.093-10.078a14.449 14.449 0 013.584-9.39l-.021-.02.511-.515a6.86 6.86 0 01.206-.211c.021-.021.043-.044.064-.062l.123-.125 36.364-36.366a14.07 14.07 0 0110.008-4.144c.977 0 1.947.101 2.899.298l7.993-7.995a24.422 24.422 0 00-10.889-2.554 24.26 24.26 0 00-17.258 7.148m70.592-38.934c0-6.52-2.541-12.65-7.15-17.258-4.61-4.613-10.74-7.151-17.261-7.151a24.237 24.237 0 00-17.257 7.151L49.774 43.442c-7.479 7.478-9.26 18.84-4.585 28.17l7.646-7.646c-.877-4.368.358-8.964 3.315-12.356l-.021-.022.502-.507.201-.206.062-.06.126-.127 36.363-36.364a14.068 14.068 0 0110.014-4.147c3.784 0 7.339 1.472 10.014 4.147 5.522 5.521 5.522 14.51 0 20.027L76.138 71.629l-.026-.026a14.411 14.411 0 01-9.526 3.581c-.951 0-1.891-.094-2.814-.278l-7.645 7.645a24.442 24.442 0 0010.907 2.563c6.523 0 12.652-2.539 17.261-7.148l36.365-36.365c4.61-4.613 7.149-10.742 7.149-17.264"></path>
                                                </svg>
                                            </a>
                                            <a className='mx-1 h-full' href="https://twitter.com/RareGems_io" target="_blank" rel="noreferrer">
                                                <svg className='mt-1 w-[26px] h-[85%] aspect-square my-auto mx-auto brightness-[0.1] dark:brightness-[1.5]' xmlns="http://www.w3.org/2000/svg" width="256" height="209" preserveAspectRatio="xMidYMid" viewBox="0 0 256 209">
                                                    <path fill="#c0c4a3" d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 01-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 01-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 01-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 00256 25.45">
                                                    </path>
                                                </svg>
                                            </a>
                                            <a className='mx-1 h-full' href="https://t.me/cryptosoots" target="_blank" rel="noreferrer">
                                                <svg className='h-full w-[26px] aspect-square my-auto mx-auto brightness-[0.1] dark:brightness-[1.5]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" clipRule="evenodd">
                                                    <path fill="#c0c4a3" d="M18.384 22.779a1.19 1.19 0 001.107.145 1.16 1.16 0 00.724-.84C21.084 18 23.192 7.663 23.983 3.948a.78.78 0 00-.26-.758.8.8 0 00-.797-.14C18.733 4.602 5.82 9.447.542 11.4a.827.827 0 00-.542.799c.012.354.25.661.593.764 2.367.708 5.474 1.693 5.474 1.693s1.452 4.385 2.209 6.615c.095.28.314.5.603.576a.866.866 0 00.811-.207l3.096-2.923s3.572 2.619 5.598 4.062zm-11.01-8.677l1.679 5.538.373-3.507 10.185-9.186a.277.277 0 00.033-.377.284.284 0 00-.376-.064L7.374 14.102z"></path>
                                                </svg>
                                            </a>
                                        </div>
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
