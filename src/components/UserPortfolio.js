import { db, dbTwo } from '../firebase';
import { onValue, ref, update, get } from 'firebase/database';
import { useEffect, useState } from 'react'
//import Web3 from 'web3'
import ewcnfts from '../images/logo.png'
import { useNavigate } from "react-router-dom";

const UserPortfolio = () => {
    window.onerror = function() {
        window.location.reload();
    }

    const axios = require("axios");
    //let account = "";
    const [dbdata, setDbData] = useState([]);
    const [accountaddress, setAccountaddress] = useState("");
    const [reload, setReload] = useState(0);
    let navigate = useNavigate();

    const [createdlist, setCreatedlist] = useState([]);
    useEffect(() => {
        onValue(ref(dbTwo), snapshot => {
            const data = snapshot.val();
            setCreatedlist(data)
        });
    }, []);

    async function connect() {
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            //let web3 = new Web3(ethereum);
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts", });
                setAccountaddress(accounts[0])
                ethereum.on("accountsChanged", (accounts) => {
                    setAccountaddress(accounts[0]);
                    if (createdlist[accountaddress] !== undefined) {
                        navigate(`/portfolio/${accounts[0]}`);
                    }
                    else {
                        navigate(`/portfolio`);
                    }
                });
                ethereum.on("chainChanged", () => {
                    window.location.reload();
                });
            } catch (err) { console.log("Something went wrong."); }
        } else { console.log("Install Metamask."); }
    };

    connect();

    function axiosGetInfo() {const promise = axios({url: 'https://ewc-subgraph-production.carbonswap.exchange/subgraphs/name/carbonswap/uniswapv2',method: 'post',data: {query: `{pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0") {token1Price}token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc") {derivedETH}}`}});const dataPromise = promise.then((response) => response.data);return dataPromise}
    const [ewtcoinprice, setEwtcoinprice] = useState(0)
    const [susucoinprice, setSusucoinprice] = useState(0)
    function getewtprice() {axiosGetInfo().then(data => {var ewtprice = data["data"]["pair"]["token1Price"];ewtprice = Number(ewtprice);setEwtcoinprice(ewtprice);})}
    function getsusuprice() {axiosGetInfo().then(data => {var susuprice = data["data"]["token"]["derivedETH"];susuprice = Number(susuprice) * ewtcoinprice;setSusucoinprice(susuprice);})}
    useEffect(() => {
        if (ewtcoinprice === 0 || susucoinprice === 0) {
            getewtprice();
            getsusuprice();
        }
    }, [accountaddress, reload]);

    const [userdata, setUserdata] = useState([]);
    const [ownedNfts, setOwnedNfts] = useState([]);
    let testlist = []
    useEffect(() => {
        onValue(ref(dbTwo), snapshot => {
            const data = snapshot.val();
            setUserdata(data[String(accountaddress)])
        });
        //for (let index = 0; index < NFTData.length; index++) {
        //    const element = userdata["nfts"][index]["amount"];
        //    if (element > 0) {
        //        testlist.push(index)
        //    }
        //}
    }, [accountaddress]);

    console.log(testlist)

    const [NFTData, setNFTData] = useState([]);
    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();
            setNFTData(data)
        });
    }, []);

    console.log(ownedNfts)

    console.log(userdata)
    console.log(NFTData)

    const [showEditPortfolioButtons, setShowEditPortfolioButtons] = useState(false);
    function toggleEditMode() {
        if (showEditPortfolioButtons === false) {
            onValue(ref(dbTwo), snapshot => {
                const data = snapshot.val();
                setDbData(data)
            });
            setUserdata(dbdata[String(accountaddress)])
            setShowEditPortfolioButtons(true)
            let button = document.getElementById('portfolioeditor')
            button.innerText = 'Hide portfolio editor'
        }
        else if (showEditPortfolioButtons === true) {
            setShowEditPortfolioButtons(false)
            let button = document.getElementById('portfolioeditor')
            button.innerText = 'Show portfolio editor'
        }
    }

    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [totalPortfolioValueEWT, setTotalPortfolioValueEWT] = useState(0);
    const [totalPortfolioValueSUSU, setTotalPortfolioValueSUSU] = useState(0);
    function calcNewTotal() {
        if (accountaddress !== "") {
            onValue(ref(dbTwo), snapshot => {
                const data = snapshot.val();
                setUserdata(data[String(accountaddress)])
            });
        }
        else {
            onValue(ref(dbTwo), snapshot => {
                const data = snapshot.val();
                setUserdata(data[String(window.location["pathname"].substring(11))])
            });
        }

        if (typeof(userdata) == 'undefined') {
            console.log('test')
        }
        else if (NFTData !== [] && NFTData.length > 1 && userdata !== [] && userdata["nfts"] !== undefined) {
            let userlistnftstoloop = userdata["nfts"]
            let newTotal = 0;
            for (let index = 0; index < userlistnftstoloop.length; index++) {
                let nftamount = userlistnftstoloop[index]["amount"];
                let addamount = nftamount * NFTData[index]["floorprice"];
                newTotal += addamount;
            }
            setTotalPortfolioValue(newTotal.toFixed(2));
            setTotalPortfolioValueEWT((newTotal/ewtcoinprice).toFixed(2));
            setTotalPortfolioValueSUSU((newTotal/susucoinprice).toFixed(2));
        }
    }

    async function editNftAmount(nftId, changeValue) {
        let amount = await get(ref(dbTwo, '/' + accountaddress + '/nfts/' + nftId + '/amount'));
        amount = amount["_node"]["value_"]
        amount = Number(amount)
        let newAmount = amount + changeValue;
        if (newAmount < 0) {
            newAmount = 0
        }
        update(ref(dbTwo, '/' + accountaddress + '/nfts/' + nftId), ({ amount: newAmount }));

        let count = document.getElementsByClassName('nftamounts')
        let currentCount = count[nftId].innerText
        let tempCount = String(parseInt(currentCount) + parseInt(changeValue))
        if (tempCount < 0) {
            tempCount = 0
        }
        count[nftId].innerText = tempCount;
        setReload(reload + 1);
    }

    const [loggedin, setLoggedIn] = useState(false);
    var currentLocation;
    useEffect(() => {
        currentLocation = window.location["pathname"].substring(11);

        if (accountaddress === currentLocation) {
            setLoggedIn(true);
        }
        setReload(reload +1)
    }, [accountaddress]);

    useEffect(() => {
        calcNewTotal();
    }, [reload]);

    setInterval(function() {
        if (totalPortfolioValue < 0.000001) {
            setReload(reload +1)
        }
    }, 1000);

    return (
        <div className="w-full min-h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full min-h-[calc(100vh-64px)] bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 h-auto mx-auto my-4 sm:my-10 rounded-3xl
                    shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                    <div className="py-10 text-textprimary dark:text-darktextprimary transition-all w-full h-full flex flex-col mx-auto">
                        <div className='px-2 flex flex-row mx-auto'>
                            <img className='inline w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 mr-1 mb-2' src={ewcnfts} />
                            <h1 className='break-all font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl flex justify-center'>Energy Web NFT portfolio tracker</h1>
                        </div>
                        <div className='p-2 sm:p-3 md:p-4'>
                            {loggedin === true ? (
                                <div>
                                    <div className='text-center text-sm sm:text-base md:text-lg'>
                                        Welcome <span className='break-all py-[1px] px-[3px] text-[#00003A] dark:text-[#c4c4db] rounded-lg bg-[rgba(71,71,151,0.1)]'>{accountaddress}</span>! You are now logged in, and you can edit your portfolio.
                                    </div>
                                    <div className='-translate-y-2'>
                                        <button id='portfolioeditor' onClick={toggleEditMode} className='text-sm sm:text-base md:text-lg hover:brightness-110 my-2 md:my-3 flex mr-0 ml-auto rounded-xl px-[8px] py-[2px] bg-[rgb(224,237,255)] dark:bg-[rgb(6,32,71)] text-textprimary dark:text-darktextprimary transition-all'>Show portfolio editor</button>
                                    </div>
                                    <div>
                                    {showEditPortfolioButtons === false || userdata === undefined ? (
                                        <></>
                                        ) : (
                                        <div className='-translate-y-2 flex flex-wrap w-full'>
                                            {(NFTData.map(nft => (<div style={{ backgroundColor: userdata["nfts"][nft.id]["amount"] > 0 ? 'rgba(161,186,226,0.7)': ''}} className='flex items-center my-[3px] rounded-3xl w-[46%] mx-[2%] md:w-[29%] md:mx-[2%] xl:w-[21%] xl:mx-[2%] 3xl:w-[16%] 3xl:mx-[2%] h-[40px] bg-[rgba(161,186,226,0.2)]'><button onClick={() => editNftAmount(nft.id, -1)} className='hover:brightness-110 rounded-lg pb-[4px] sm:pb-[6px] px-[5px] sm:px-[10px] flex items-center h-[20px] sm:h-[28px] text-red-600 bg-red-200 text-2xl ml-4 md:ml-6 lg:ml-8 mr-auto'>-</button><img className='rounded-xl w-8 h-8 mr-[2px] md:mr-[4px]' src={nft.image} /><div style={{ color: userdata["nfts"][nft.id]["amount"] > 0 ? '#00E216': ''}} className='text-lg md:text-xl nftamounts ml-[2px] md:ml-[4px]'>{userdata["nfts"][nft.id]["amount"]}</div><button onClick={() => editNftAmount(nft.id, 1)} className='hover:brightness-110 rounded-lg pb-[4px] sm:pb-[6px] px-[2px] sm:px-[6px] flex items-center h-[20px] sm:h-[28px] text-green-600 bg-green-200 text-2xl mr-4 md:mr-6 lg:mr-8 ml-auto'>+</button></div>)))}
                                        </div>
                                    )}
                                    </div>
                                    {
                                        NFTData !== [] && userdata !== [] ? (
                                            <div className='text-center'>
                                                <p className='font-bold sm:text-lg md:text-xl lg:text-2xl'>The total worth of your NFT portfolio:</p>
                                                <div className='justify-center flex flex-row sm:text-base md:text-lg lg:text-xl'>
                                                    <p className='mr-[6px] sm:mr-2'>${totalPortfolioValue}</p>
                                                    <p>|</p>
                                                    <p className='mx-[6px] sm:mx-2'>{totalPortfolioValueEWT} EWT</p>
                                                </div>
                                            </div>
                                        ) : (<></>)
                                    }
                                    {NFTData !== undefined && userdata !== undefined ? (
                                        <div className='mt-2 flex flex-wrap w-full justify-center'>
                                            {(NFTData.map(nft => (
                                                <div style={{ backgroundColor: userdata["nfts"][nft.id]["amount"] > 0 ? 'rgba(161,186,226,0.7)': ''}} className='flex justify-center items-center my-[3px] xl:my-[4px] 2xl:my-[5px] rounded-3xl w-[27%] mx-[2.5%] sm:w-[16%] sm:mx-[2%] md:w-[13.5%] md:mx-[1.5%] lg:w-[11%] lg:mx-[1.5%] xl:w-[9.5%] xl:mx-[1.5%] 2xl:w-[100px] 2xl:mx-[10px] h-[40px] bg-[rgba(161,186,226,0.2)]'>
                                                    <img className='rounded-xl w-8 h-8 mr-[2px] md:mr-[4px]' src={nft.image} />
                                                    <div style={{ color: userdata["nfts"][nft.id]["amount"] > 0 ? '#00E216': ''}} className='text-lg md:text-xl nftamounts ml-[2px] md:ml-[4px]'>{userdata["nfts"][nft.id]["amount"]}
                                                    </div>
                                                </div>
                                            )))}
                                        </div>
                                    ) : (<></>)}
                                </div>
                            ) : (
                                <div>
                                    <div className='text-sm sm:text-base md:text-lg'>This is the EWC NFT portfolio of <span className='break-all py-[1px] px-[3px] text-[#00003A] dark:text-[#c4c4db] rounded-lg bg-[rgba(71,71,151,0.1)]'>{window.location["pathname"].substring(11)}</span>! If this is your portfolio and you want to edit it, then you first need to login with Metamask.
                                    </div>
                                    {NFTData !== undefined && userdata !== [] ? (
                                        <div className='text-center'>
                                            <p className='font-bold sm:text-lg md:text-xl lg:text-2xl'>The total NFT portfolio worth:</p>
                                            <div className='justify-center flex flex-row sm:text-base md:text-lg lg:text-xl'>
                                                <p className='mr-[6px] sm:mr-2'>${totalPortfolioValue}</p>
                                                <p>|</p>
                                                <p className='mx-[6px] sm:mx-2'>{totalPortfolioValueEWT} EWT</p>
                                            </div>
                                        </div>
                                    ) : (<></>)}
                                    {NFTData !== undefined && userdata !== undefined ? (
                                        <div className='mt-2 flex flex-wrap w-full justify-center'>
                                            {(NFTData.map(nft => (
                                                <div style={{ backgroundColor: userdata["nfts"][nft.id]["amount"] > 0 ? 'rgba(161,186,226,0.7)': ''}} className='flex justify-center items-center my-[3px] xl:my-[4px] 2xl:my-[5px] rounded-3xl w-[27%] mx-[2.5%] sm:w-[16%] sm:mx-[2%] md:w-[13.5%] md:mx-[1.5%] lg:w-[11%] lg:mx-[1.5%] xl:w-[9.5%] xl:mx-[1.5%] 2xl:w-[100px] 2xl:mx-[10px] h-[40px] bg-[rgba(161,186,226,0.2)]'>
                                                    <img className='rounded-xl w-8 h-8 mr-[2px] md:mr-[4px]' src={nft.image} />
                                                    <div style={{ color: userdata["nfts"][nft.id]["amount"] > 0 ? '#00E216': ''}} className='text-lg md:text-xl nftamounts ml-[2px] md:ml-[4px]'>{userdata["nfts"][nft.id]["amount"]}
                                                    </div>
                                                </div>
                                            )))}
                                        </div>
                                    ) : (<></>)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPortfolio;