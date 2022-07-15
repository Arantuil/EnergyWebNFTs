import { useState } from 'react'

const DonationBar = () => {
    const [balance, setBalance] = useState([])

    let url = "https://explorer.energyweb.org/api?module=account&action=eth_get_balance&address=0x26Daf0750B1AB7D1359412ed5656F4e9739D6c31"
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        let number = parseInt(data["result"], 16);
        let ewt = 20
        if (number > 0) {
            number = number/10000000000000000000
        }
        setBalance(number.toFixed(5)/ewt);
    })


    return ( 
        <div className='mt-2 mb-6 pb-4 h-[35px] w-full lg:w-2/3'>
            <div className='h-full border-2 border-textprimary dark:border-darktextprimary rounded-lg'>
                <div className='h-full rounded-md max-w-[100%]' style={{width: `${balance*100}%`, backgroundColor: "#4EC44E"}}>
                </div>
            </div>
            <div>
                <h1 className='mt-2 text-textprimary dark:text-darktextprimary transition-all'>If the bar is at 100% then that means the website hosting is free for me :)</h1>
            </div>
        </div>
    );
}

export default DonationBar;