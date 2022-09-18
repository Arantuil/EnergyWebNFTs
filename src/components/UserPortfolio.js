import { dbTwo } from '../firebase';
import { getDatabase, onValue, ref, update, child, push } from 'firebase/database';
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import ewcnfts from '../images/logo.png'

const UserPortfolio = () => {
    var account = null;
    const [dbdata, setDbData] = useState([]);
    const [accountaddress, setAccountaddress] = useState("");
    var currentLocation = window.location["pathname"].substring(11);

    (async () => {
        const { ethereum } = window;
        if (ethereum) {
            await ethereum.send('eth_requestAccounts');
            let web3 = new Web3(ethereum);

            var accounts = await web3.eth.getAccounts();
            account = accounts[0];
            setAccountaddress(account)
        }
    })();

    const [userdata, setUserdata] = useState({});

    useEffect(() => {
        onValue(ref(dbTwo), snapshot => {
            const data = snapshot.val();
            setDbData(data)
        });
        setUserdata(dbdata[String(accountaddress)])
    }, []);

    //console.log(accountaddress)
    //console.log(dbdata);

    console.log(userdata)


    return ( 
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full min-h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                    shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                    <div className="py-10 text-textprimary dark:text-darktextprimary transition-all w-full h-full flex flex-col mx-auto">
                        <div className='flex flex-row mx-auto'>
                            <img className='inline w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 mr-1 mb-2' src={ewcnfts} />
                            <h1 className='font-bold text-lg md:text-xl lg:text-2xl flex justify-center'>Energy Web NFT portfolio tracker</h1>
                        </div>
                        <div>
                            {currentLocation === accountaddress ? (
                                <div>LOGGED IN</div>
                            ) : (
                                <div>NOT</div>
                            )}
                    
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    );
}

export default UserPortfolio;