import { Link } from 'react-router-dom';
import Toggle from './Toggle';
import { useQuery, gql } from "@apollo/client";
import susulogo from '../images/susu.png';
import ewtlogo from '../images/ewtlogo.png';
import ewcnftslogo from '../images/logo.png';
import { useState } from 'react';
import { AiOutlineLink } from "react-icons/ai";

const PRICEEWTSUSU = gql`
{
    pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0") {
        token1Price
    }
    token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc") {
        derivedETH
    }
}
`

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);


    const { data, loading, error } = useQuery(PRICEEWTSUSU);

    if (loading) return;
    if (error) return <pre>{error.message}</pre>

    var ewtprice = data["pair"]["token1Price"]
    ewtprice = Number(ewtprice).toFixed(3)

    var susuprice = data["token"]["derivedETH"]
    susuprice = (Number(susuprice) * ewtprice).toFixed(6)
    return (
        <header className='z-5 w-full h-[64px] bg-bgprimary dark:bg-darkbgprimary transition-all flex items-center justify-between' >
            <div className='shadow-[0_0px_10px_3px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_3px_rgba(245,245,230,0.2)] w-full h-full
            bg-gradient-to-r from-[#9AEFA2] via-[#8DD7E4] to-[#C8A1FB] 
            dark:bg-gradient-to-r dark:from-[#368B3E] dark:via-[#297380] dark:to-[#643D97]
            transition-all flex flex-row'>
                <Link to='/' className='flex flex-row ml-4 sm:ml-6 md:ml-10'>
                    <img className='2xs:w-[28px!important] 2xs:h-[28px!important] h-12 my-auto filter brightness-[90%] dark:brightness-[110%]' src={ewcnftslogo} alt="EnergyWebNFTs Logo" />
                    <h1 className='hidden md:block my-auto font-bold text-2xl ml-1 mr-2 text-textprimary dark:text-darktextprimary transition-all'>
                        EnergyWebNFTs
                    </h1>
                </Link>
                <ul className="DESKTOP-MENU hidden lg:flex items-center">
                    <Link to='/markets' className='mx-1 sm:mx-2 md:mx-3 lg:mx-4 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>
                        Markets
                    </Link>
                    <Link to='/portfolio' className='mx-1 sm:mx-2 md:mx-3 lg:mx-4 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>
                        Portfolio
                    </Link>
                    <p className='absolute top-[2px] translate-x-[220px] rotate-[16deg] rounded-xl px-[5px] bg-[rgba(255,0,0,0.65)] font-bold text-textprimary dark:text-darktextprimary transition-all'>Beta</p>
                    <a className='flex flex-row mx-1 sm:mx-2 md:mx-3 lg:mx-4 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all' href='https://place.energywebnfts.com/'>EW/place
                    <AiOutlineLink />
                    </a>
                </ul>
                <div className='h-full ml-auto mr-0 flex flex-row-reverse items-center'>
                    <Toggle/>
                    <div className="m-1 md:m-2 flex flex-row">
                        <img className="my-auto md:mt-[2px] flex w-6 h-6 mr-[6px] filter brightness-[90%] dark:brightness-[100%]" src={ewtlogo} alt="Energy Web Logo" />
                        <p className="flex my-auto text-lg font-bold text-textprimary dark:text-darktextprimary transition-all">${ewtprice}</p>
                        <div id='blinkingicon' className='ml-1 w-4 h-4 xs:w-3 xs:h-3 rounded-full'></div>
                    </div>
                    <div className="m-1 md:m-2 flex flex-row">
                        <img className="my-auto md:mt-[2px] flex w-6 h-6 mr-[6px] filter brightness-[90%] dark:brightness-[100%]" src={susulogo} alt="Susu Logo" />
                        <p className="flex my-auto text-lg font-bold text-textprimary dark:text-darktextprimary transition-all">${susuprice}</p>
                    </div>
                </div>
                <nav className='mr-4 sm:mr-6 md:mr-10 flex items-center sm:ml-0'>
                    <section className="MOBILE-MENU flex lg:hidden">
                        <div
                            className="HAMBURGER-ICON space-y-2 ml-3"
                            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
                        >
                            <span className="block h-[4px] w-9 rounded-md bg-darkbgprimary dark:bg-bgprimary"></span>
                            <span className="block h-[4px] w-9 rounded-md bg-darkbgprimary dark:bg-bgprimary"></span>
                            <span className="block h-[4px] w-9 rounded-md bg-darkbgprimary dark:bg-bgprimary"></span>
                        </div>
                        <div className={isNavOpen ? "showMenuNav shadow-[0_0px_24px_10px_rgba(15,23,35,0.30)] rounded-bl-3xl rounded-br-3xl dark:shadow-[0_0px_24px_10px_rgba(245,245,230,0.2)] bg-gradient-to-br from-[rgb(166,238,173)] via-[rgb(153,215,226)] to-[rgb(211,179,253)] dark:bg-gradient-to-br dark:from-[#39753f] dark:via-[#316872] dark:to-[#64478a] transition-all" : "hideMenuNav"}>
                            <div
                                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                            >
                                <svg
                                    className="h-8 w-8 text-textprimary dark:text-darktextprimary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[300px]">
                                <Link onClick={() => setIsNavOpen(false)} to='/' className='p-4 hover:invert hover:brightness-110 mx-1 sm:mx-2 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                    Home
                                </Link>
                                <Link onClick={() => setIsNavOpen(false)} to='/markets' className='p-4 hover:invert hover:brightness-110 mx-1 sm:mx-2 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                    Markets
                                </Link>
                                <Link onClick={() => setIsNavOpen(false)} to='/portfolio' className='p-4 hover:invert hover:brightness-110 mx-1 sm:mx-2 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>
                                    Portfolio
                                </Link>
                                <p className='absolute translate-x-[58px] translate-y-[157px] rotate-[16deg] rounded-xl px-[5px] bg-[rgba(255,0,0,0.65)] font-bold text-textprimary dark:text-darktextprimary transition-all'>Beta</p>
                                <a onClick={() => setIsNavOpen(false)} className='p-4 hover:invert translate-x-[12px] flex flex-row mx-1 sm:mx-2 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all' href='https://place.energywebnfts.com/'>EW/place
                                    <AiOutlineLink />
                                </a>
                            </ul>
                        </div>
                    </section>
                </nav>
            </div>
        </header>
    )
}

export default Header;