import React from "react";

const PageNotFound = () => {
    return ( 
        <div className="w-full h-[calc(100vh-64px)] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full h-full bg-backgroundimagepage bg-no-repeat bg-cover">
                <h1 className='text-textprimary dark:text-darktextprimary transition-all font-bold text-4xl flex justify-center mt-10'>page not found</h1>
            </div>
        </div>
    );
}

export default PageNotFound;