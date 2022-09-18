import { dbTwo } from '../firebase';
import { getDatabase, set, onValue, ref, update, child, push } from 'firebase/database';
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { useNavigate } from "react-router-dom";
import ewcnfts from '../images/logo.png'

const Portfolio = () => {
    var account = null;
    const [signature, setSignature] = useState([]);
    const [accountaddress, setAccountaddress] = useState("");
    var message = "Sign to login to your EnergyWebNFTs.com account and be able to manage your NFT portfolio.";

    (async () => {
        const { ethereum } = window;
        if (ethereum) {
            await ethereum.send('eth_requestAccounts');
            let web3 = new Web3(ethereum);

            var accounts = await web3.eth.getAccounts();
            account = accounts[0];
            setAccountaddress(account)
            document.getElementById('wallet-address').textContent = account;
        }
    })();

    let navigate = useNavigate();

    async function signMessage() {
        const { ethereum } = window;
        let web3 = new Web3(ethereum);
        let printsignature = await web3.eth.personal.sign(message, account);
        setSignature(printsignature)
        console.log(printsignature)
        if (printsignature !== []) {
            update(ref(dbTwo), ({ [accountaddress]: {signature: String(printsignature), nfts: []} }) );
            return navigate(`/portfolio/${accountaddress}`);
        }
    }

    return ( 
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
        <div className="w-full min-h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
            {accountaddress === "" ? (
            <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                <div className="py-20 text-textprimary dark:text-darktextprimary transition-all w-full h-full flex flex-col mx-auto">
                    <div className='flex flex-row mx-auto'>
                        <img className='inline w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 mr-1 mb-2' src={ewcnfts} />
                        <h1 className='font-bold text-lg md:text-xl lg:text-2xl flex justify-center'>Energy Web NFT portfolio tracker</h1>
                    </div>
                    <p className='mt-2 text-base md:text-lg lg:text-xl flex justify-center'>Connect with Metamask.<span className='ml-2' id='wallet-address'></span></p>
                </div>
            </div>
            ) : (
            <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                <div className="py-20 text-textprimary dark:text-darktextprimary transition-all w-full h-full flex flex-col mx-auto">
                    <div className='flex flex-row mx-auto'>
                        <img className='inline w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 mr-1 mb-2' src={ewcnfts} />
                        <h1 className='font-bold text-lg md:text-xl lg:text-2xl flex justify-center'>Energy Web NFT portfolio tracker</h1>
                    </div>
                    <p className='text-base md:text-lg lg:text-xl flex justify-center'>Wallet address: <span className='ml-2 break-all' id='wallet-address'></span></p>
                    <button className='hover:brightness-110 rounded-xl mt-[10px] pb-[7px] pt-[3px] bg-[rgba(74,222,128,0.6)] mx-auto w-[75px] text-base md:text-lg lg:text-xl' onClick={signMessage}>Log in</button>
                    <p className='mt-2 text-base md:text-lg lg:text-xl flex justify-center'>{signature}</p>
                </div>
            </div>
            )
            }
        </div>
        </div>
    );
}

export default Portfolio;