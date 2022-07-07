import Toggle from './Toggle';
import { useQuery, gql } from "@apollo/client";
import ewcnftslogo from '../images/logo.png';
import { Link } from 'react-router-dom';

const blocknumber = gql`
{
    _meta {
        block {
            number
        }
    }
}
`

function Footer() {
    const { data, loading, error } = useQuery(blocknumber);

    if (loading) return;
    if (error) return <pre>{error.message}</pre>

    var currentblocknumber = data["_meta"]["block"]["number"]

    return (
        <footer id='footer' className='shadow-[0_0px_10px_3px_rgba(0,0,0,0.35)] dark:shadow-[0_0px_10px_3px_rgba(245,245,230,0.35)] z-5 relative w-full h-[64px] bg-bgprimary dark:bg-darkbgprimary transition-all'>
            <div className='w-full h-full
            bg-gradient-to-r from-[#9AEFA2] via-[#8DD7E4] to-[#C8A1FB] 
            dark:bg-gradient-to-r dark:from-[#368B3E] dark:via-[#297380] dark:to-[#643D97]
            transition-all flex flex-row'>
                <div className='w-[15%] md:w-[40%] h-full ml-2 md:ml-10 flex items-center'>
                    <div className='flex flex-row'>
                        <Link className='flex flex-row' to='/'>
                            <img className='h-12 filter brightness-[90%] dark:brightness-[110%]' src={ewcnftslogo} alt="" />
                            <h1 className='hidden md:block my-auto font-bold text-2xl mr-2 text-textprimary dark:text-darktextprimary transition-all'>
                                EnergyWebNFTs
                            </h1>
                        </Link>
                    </div>
                </div>
                <div className='w-[85%] md:w-[60%] h-full mr-2 md:mr-10 flex flex-row-reverse items-center'>
                    <Toggle/>
                    <div className='flex flex-row mr-4'>
                        <div className='text-lg font-bold text-textprimary dark:text-darktextprimary transition-all mr-1'>
                            Current blocknumber:
                        </div>
                        <div className='text-lg font-bold text-textprimary dark:text-darktextprimary transition-all'>
                            {currentblocknumber}
                        </div>
                        <div className='animate-pulse w-3 h-3 bg-green-500 rounded-full'></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;