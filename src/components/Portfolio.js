import { dbTwo } from '../firebase';
import { getDatabase, set, onValue, ref, update, child, create, push, get } from 'firebase/database';
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { useNavigate } from "react-router-dom";
import ewcnfts from '../images/logo.png'

const Portfolio = () => {
    const [signature, setSignature] = useState([]);
    const [accountaddress, setAccountaddress] = useState("");
    let account;
    var message = "Sign to log in to your EnergyWebNFTs.com account and be able to manage your NFT portfolio.";
    let navigate = useNavigate();

    async function connect() {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            let web3 = new Web3(ethereum);
            try {
                const accounts = await ethereum.request({method: "eth_requestAccounts",});
                setAccountaddress(accounts[0].toLowerCase())
                ethereum.on("accountsChanged", (accounts) => {
                    setAccountaddress(accounts[0].toLowerCase());
                });
                ethereum.on("chainChanged", () => {
                    window.location.reload();
                });
                if (accountaddress !== "") {
                    if (createdlist[accountaddress]["nfts"] !== undefined) {
                        navigate(`/portfolio/${accountaddress}`);
                    }
                }
            } catch (err) { console.log("Something went wrong."); }
        } else {console.log("Install Metamask.");}
    };

    const [createdlist, setCreatedlist] = useState([]);
    useEffect(() => {
        onValue(ref(dbTwo), snapshot => {
            const data = snapshot.val();
            setCreatedlist(data)
        });
    }, []);

    async function signMessage() {
        let portiscreated = false;
        const { ethereum } = window;
        let web3 = new Web3(ethereum);
        let printsignature = await web3.eth.personal.sign(message, accountaddress);
        setSignature(printsignature)

        if (createdlist[accountaddress] !== undefined) {
            portiscreated = true;
        }

        if (portiscreated !== true) {
            set(ref(dbTwo, `/${accountaddress.toLowerCase()}`), ({
                signature: String(printsignature), nfts: [
                    { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 },
                    { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }]
            }
            ), { merge: true });
            return navigate(`/portfolio/${accountaddress}`);
        }
        else { return navigate(`/portfolio/${accountaddress}`) }
    }

    connect();

    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full min-h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
                    <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                        <div className="px-2 sm:px-3 md:px-4 py-20 text-textprimary dark:text-darktextprimary transition-all w-full h-full flex flex-col mx-auto">
                            <div className='flex flex-row mx-auto'>
                                <img className='inline w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 mr-1 mb-2' src={ewcnfts} />
                                <h1 className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl flex justify-center'>Energy Web NFT portfolio tracker</h1>
                            </div>
                            {accountaddress !== "" ? (
                            <div className='flex flex-col justify-center'>
                                <p className='text-center'>Welcome {accountaddress}!</p>
                                <p className='text-center'>You can create your own portfolio by pressing the 'log in' button below.</p>
                                <button className='hover:brightness-110 rounded-xl mt-[10px] pb-[7px] pt-[3px] bg-[rgba(74,222,128,0.6)] mx-auto w-[75px] text-base md:text-lg lg:text-xl' onClick={signMessage}>Log in</button>
                            </div>
                            ) : (
                            <div className='flex flex-col justify-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] mx-auto'>
                                <p className='text-center'>{accountaddress}</p>
                                <p className='font-bold mx-auto text-base md:text-lg lg:text-xl text-center'>Welcome to the EnergyWebNFTs.com NFT portfolio tracker!</p>
                                <p className='mx-auto text-base md:text-lg lg:text-xl text-center'>First you need to create a NFT portfolio (that will be attached to your wallet address).</p>
                                <p className='mx-auto text-base md:text-lg lg:text-xl text-center'>Then you can add any NFTs to the portfolio you want to track the combined value of, this could be either all the NFTs you own spread out in different wallets for example, or you can track the combined value of a particular set of NFTs you don't necessarily own.</p>
                                <p className='mt-4 font-bold mx-auto text-base md:text-lg lg:text-xl text-center'>To start, log in with Metamask</p>
                            </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Portfolio;