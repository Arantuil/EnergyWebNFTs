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
        <footer id='footer' className='shadow-[0_0px_7px_2px_rgba(0,0,0,0.30)] dark:shadow-[0_0px_7px_2px_rgba(245,245,230,0.2)] z-5 relative w-full h-[64px] bg-bgprimary dark:bg-darkbgprimary transition-all'>
            <div className='w-full h-full
            bg-gradient-to-r from-[#9AEFA2] via-[#8DD7E4] to-[#C8A1FB] 
            dark:bg-gradient-to-r dark:from-[#368B3E] dark:via-[#297380] dark:to-[#643D97]
            transition-all flex flex-row'>
                <div className='w-[25%] md:w-[40%] h-full ml-2 xs:ml-1 md:ml-10 flex items-center'>
                    <div className='h-full flex flex-row w-auto'>
                        <Link className='flex flex-row' to='/'>
                            <img className='h-12 my-auto filter brightness-[90%] dark:brightness-[110%]' src={ewcnftslogo} alt="EnergyWebNFTs Logo" />
                            <h1 className='hidden md:block my-auto font-bold text-2xl mr-2 text-textprimary dark:text-darktextprimary transition-all'>
                                EnergyWebNFTs
                            </h1>
                        </Link>
                        <a className='h-full flex flex-row w-[20%] np2:ml-2' href='https://twitter.com/Arantuil' target="_blank" rel="noreferrer">
                            <svg className='w-[100px] lg:w-[70px] xl:w-[55px] h-[40%] aspect-square my-auto brightness-[0.1] dark:brightness-[1.5]' xmlns="http://www.w3.org/2000/svg" width="256" height="209" preserveAspectRatio="xMidYMid" viewBox="0 0 256 209">
                                <path fill="#c0c4a3" d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 01-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 01-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 01-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 00256 25.45">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className='w-[75%] md:w-[60%] h-full mr-2 xs:mr-1 md:mr-10 flex flex-row-reverse items-center'>
                    <Toggle/>
                    <div className='flex flex-row mr-4'>
                        <div className='text-lg font-bold text-textprimary dark:text-darktextprimary transition-all mr-1'>
                            Blocknumber:
                        </div>
                        <div className='text-lg font-bold text-textprimary dark:text-darktextprimary transition-all'>
                            {currentblocknumber}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;