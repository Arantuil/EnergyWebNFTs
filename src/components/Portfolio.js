import { dbTwo } from '../firebase';
import { getDatabase, onValue, ref, update, child, push } from 'firebase/database';
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
    var account = null;
    const [signature, setSignature] = useState([]);
    const [accountaddress, setAccountaddress] = useState("");
    const [loggedin, setLoggedin] = useState(false);
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
    useEffect(() => {
        if (signature !== []) {
            setLoggedin(true)
        }
    }, [signature])

    async function signMessage() {
        const { ethereum } = window;
        let web3 = new Web3(ethereum);
        let printsignature = await web3.eth.personal.sign(message, account);
        setSignature(printsignature)
        console.log(printsignature)
        if (printsignature !== []) {
            update(ref(dbTwo), ({ [accountaddress]: {signature: String(printsignature), listnftsowned: ["4_5, 2_7, 3_1"]} }) );
            //update(child(ref(accountaddress)), ({ signature: String(printsignature) }))
            //update(ref(accountaddress), ({ signature: String(printsignature) }));
            return navigate(`/${printsignature}`);
        }
    }

    return ( 
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
        <div className="w-full min-h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
            {loggedin === false && signature !== [] ? (
            <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                <div className="w-full h-full py-2 flex flex-col mx-auto">
                    <p className='text-xl flex justify-center'>Wallet address: <span className='ml-2' id='wallet-address'></span></p>
                    <button className='text-xl' onClick={signMessage}>Login</button>
                </div>
            </div>
            ) : (
            <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                <div className="w-full h-full py-2 flex flex-col mx-auto">
                    <p className='text-xl flex justify-center'>Wallet address: <span className='ml-2' id='wallet-address'></span></p>
                    <button className='text-xl' onClick={signMessage}>Login</button>
                    <p className='text-xl flex justify-center'>{signature}</p>
                </div>
            </div>
            )
            }
        </div>
        </div>
    );
}

export default Portfolio;