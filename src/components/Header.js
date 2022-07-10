import { Link } from 'react-router-dom';
import Toggle from './Toggle';
import { useQuery, gql } from "@apollo/client";
import susulogo from '../images/susu.png';
import ewtlogo from '../images/ewtlogo.png';
import ewcnftslogo from '../images/logo.png';

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
    const { data, loading, error } = useQuery(PRICEEWTSUSU);

    if (loading) return;
    if (error) return <pre>{error.message}</pre>

    var ewtprice = data["pair"]["token1Price"]
    ewtprice = Number(ewtprice).toFixed(3)

    var susuprice = data["token"]["derivedETH"]
    susuprice = (Number(susuprice) * ewtprice).toFixed(5)
    return (
        <header className='shadow-[0_0px_7px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_7px_2px_rgba(245,245,230,0.30)] z-5 relative w-full h-[64px] bg-bgprimary dark:bg-darkbgprimary transition-all'>
            <div className='w-full h-full
            bg-gradient-to-r from-[#9AEFA2] via-[#8DD7E4] to-[#C8A1FB] 
            dark:bg-gradient-to-r dark:from-[#368B3E] dark:via-[#297380] dark:to-[#643D97]
            transition-all flex flex-row'>
                <div className='w-[30%] sm:w-[52%] h-full ml-2 xs:ml-1 md:ml-10 flex items-center'>
                    <Link to='/' className='flex flex-row'>
                        <img className='2xs:w-[28px!important] 2xs:h-[28px!important] h-12 filter brightness-[90%] dark:brightness-[110%]' src={ewcnftslogo} alt="EnergyWebNFTs Logo" />
                        <h1 className='hidden md:block my-auto font-bold text-2xl ml-1 mr-2 text-textprimary dark:text-darktextprimary transition-all'>
                            EnergyWebNFTs
                        </h1>
                    </Link>
                    <Link to='/markets' className='mx-1 sm:mx-2 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>
                        Markets
                    </Link>
                </div>
                <div className='w-[70%] sm:w-[48%] h-full mr-2 xs:mr-1 md:mr-10 flex flex-row-reverse items-center'>
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
            </div>
        </header>
    );
}

export default Header;

// <div className='animate-pulse w-3 h-3 bg-green-500 rounded-full'></div>