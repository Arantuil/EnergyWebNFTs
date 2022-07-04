import { Link } from 'react-router-dom';
import Toggle from './Toggle'
import { useQuery, gql } from "@apollo/client";
import ewtlogo from '../images/ewtlogo.png';
import ewcnftslogo from '../images/logo.png';

const PRICESUSUEWT = gql`
{
    pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0") {
    token1Price
    }   
}
`

function Header() {
    const { data, loading, error } = useQuery(PRICESUSUEWT);

    if (loading) return;
    if (error) return <pre>{error.message}</pre>
    var susuprice = data["pair"]["token1Price"]
    susuprice = Number(susuprice).toFixed(5)

    return (
        <header className='w-full h-[64px] bg-bgprimary dark:bg-darkbgprimary transition-all'>
            <div className='w-full h-full
            bg-gradient-to-r from-[#74E97F] via-[#62C8DA] to-[#B47DFA] 
            dark:bg-gradient-to-r dark:from-[#4BC156] dark:via-[#39A0B2] dark:to-[#8B55D2]
            transition-all flex flex-row'>
                <div className='w-1/2 sm:w-2/3 h-full ml-10 flex items-center'>
                    <Link to='/' className='flex flex-row'>
                        <img className='h-12' src={ewcnftslogo} alt="" />
                        <h1 className='hidden sm:block my-auto font-bold text-2xl mr-2 text-textprimary dark:text-darktextprimary transition-all'>
                            EnergyWebNFTs
                        </h1>
                    </Link>
                    <Link to='/exchanges' className='mx-2 text-2xl font-bold text-textprimary dark:text-darktextprimary transition-all'>
                        Exchanges
                    </Link>
                </div>
                <div className='w-1/2 sm:w-1/3 h-full mr-10 flex flex-row-reverse items-center'>
                    <Toggle/>
                    <div className="m-4 flex flex-row">
                        <img className="flex my-auto w-10 h-10 mr-2" src={ewtlogo} alt="" />
                        <p className="flex my-auto text-xl font-bold text-textprimary dark:text-darktextprimary transition-all">${susuprice}</p>
                        <div className='pingslow w-3 h-3 bg-green-500 rounded-full'></div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export var susuprice;
export default Header;