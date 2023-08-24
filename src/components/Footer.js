import Toggle from './Toggle';
import { useQuery, gql } from "@apollo/client";
import ewcnftslogo from '../images/logo.png';
import { Link } from 'react-router-dom';

const blocknumber = gql`{_meta{block{number}}}`

function Footer() {
    const { data, loading, error } = useQuery(blocknumber);
    if (loading) return;
    if (error) return <pre>{error.message}</pre>
    var currentblocknumber = data["_meta"]["block"]["number"]
    
    return (
        <footer id='footer' className='shadow-[0_0px_7px_2px_rgba(0,0,0,0.30)] dark:shadow-[0_0px_4px_1px_rgba(245,245,230,0.2)] z-5 relative w-full h-[64px] bg-bgprimary dark:bg-darkbgprimary transition-all'>
            <div className='w-full h-full
            bg-gradient-to-r from-[#9AEFA2] via-[#8DD7E4] to-[#C8A1FB] 
            dark:bg-gradient-to-r dark:from-[#368B3E] dark:via-[#297380] dark:to-[#643D97]
            transition-all flex flex-row'>
                <div className='w-[25%] md:w-[40%] h-full ml-4 sm:ml-6 md:ml-10 flex items-center'>
                    <div className='h-full flex flex-row w-auto'>
                        <Link className='flex flex-row' to='/'>
                            <img className='h-12 my-auto filter brightness-[90%] dark:brightness-[110%]' src={ewcnftslogo} alt="EnergyWebNFTs Logo" />
                            <h1 className='hidden md:block my-auto font-bold text-2xl mr-2 text-textprimary dark:text-darktextprimary transition-all'>
                                EnergyWebNFTs
                            </h1>
                        </Link>
                        <a className='justify-center items-center h-full flex flex-row w-[20%] np2:ml-2' href='https://twitter.com/Arantuil' target="_blank" rel="noreferrer">
                            <svg width={'90%'} height={'90%'} xmlns="http://www.w3.org/2000/svg" x="0" y="0" enableBackground="new 0 0 1668.56 1221.19" version="1.1" viewBox="0 0 1668.56 1221.19" xmlSpace="preserve" >
                                <g transform="translate(52.39 -25.059)">
                                    <path d="M283.94 167.31l386.39 516.64L281.5 1104h87.51l340.42-367.76L984.48 1104h297.8L874.15 558.3l361.92-390.99h-87.51l-313.51 338.7-253.31-338.7h-297.8zm128.69 64.46h136.81l604.13 807.76h-136.81L412.63 231.77z"></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className='w-[75%] md:w-[60%] h-full mr-4 sm:mr-6 md:mr-10 flex flex-row-reverse items-center'>
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