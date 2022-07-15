import { useState } from 'react'

const DonationBar = () => {
    const [balance, setBalance] = useState([])

    let url = "https://explorer.energyweb.org/api?module=account&action=eth_get_balance&address=0xb72d8A0fE0eBa559f99F2CbC7fA3952cc68dda8D"
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
        <div className='mt-2 mb-6 h-[20px] w-full lg:w-2/3'>
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