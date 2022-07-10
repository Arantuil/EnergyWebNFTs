import React, { useState } from "react";
import slugify from 'slugify';

function Searchbar({ placeholder, data }) {
    const [filtereddata, setFiltereddata] = useState([]);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        console.log(filtereddata)

        if (searchWord === "") {
            setFiltereddata([]);
        } else {
            setFiltereddata(newFilter);
        }

        window.setInterval(function(){
            if (document.getElementById('searchinput') !== document.activeElement) {
                setFiltereddata([]);
            }
        }, 1000);
    }


    return (
        <div className='w-full'>
            <div className='w-full'>
                <input autocomplete="off" id='searchinput' onChange={handleFilter} placeholder={placeholder} className='mb-1 p-[2px]
                text-textprimary dark:text-darktextprimary transition-all border-solid border-2 rounded-md 
                border-[rgba(20,20,20,0.4)] focus:border-[rgba(20,20,20,0.85)] dark:border-[rgba(245,245,230,0.4)] dark:focus:border-[rgba(245,245,230,0.85)]
                focus:outline-none dark:focus:outline-none 
                bg-bgsecondary dark:bg-darkbgsecondary 
                w-full sm:w-[60%] md:w-[50%] lg:w-[40%]'
                type="text" />
            </div>
            {filtereddata.length !== 0 && (
            <div id='searchresults' className='max-h-[266px]
            shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.25)]
            rounded-md w-[88vw] sm:w-[70vw] md:w-[40vw] lg:w-[25vw] bg-bgsecondary dark:bg-darkbgsecondary z-[49] absolute flex flex-col overflow-hidden'>
                {filtereddata.map((value,key) => {
                    return ( 
                        <div className='p-[2px] z-50 w-full h-[38px]
                            bg-gradient-to-r from-[rgba(90,229,103,0.7)] via-[rgba(68,190,212,0.7)] to-[rgba(166,101,250,0.7)]
                            '>
                            <a href={`/nft/${slugify(value.name, '_')}`}>
                                <div className='h-[34px] w-full flex flex-row bg-bgprimary dark:bg-darkbgprimary rounded-md'>
                                    <img className='h-[80%] my-auto pl-2 flex flex-center align-middle' src={value.image} alt="" />
                                    <a className='px-[8px] pt-[4px] flex
                                    z-50 text-textprimary dark:text-darktextprimary transition-all' href={`/nft/${slugify(value.name, '_')}`}>{value.name}
                                    </a>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
            )}
        </div>
    );
}

export default Searchbar;