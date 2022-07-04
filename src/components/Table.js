import Cryptosoots from '../nftdata/cryptosoots/Cryptosoots'

function Table() {
    //let arrayalldata = Cryptosoots `${Cryptosoots}`

    //console.log(arrayalldata)

    return (
        <table className="table-auto w-full text-textprimary dark:text-darktextprimary transition-all">
            <thead>
                <Cryptosoots></Cryptosoots>
                <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                </tr>
                <tr>
                    <td>Witchy Woman</td>
                    <td>The Eagles</td>
                    <td>1972</td>
                </tr>
                <tr>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>1975</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;