import { useQuery, gql } from "@apollo/client";
import Valet from '../nftdata/carbonswapS1/Valet';

const listofnfts = [
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-1",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-2",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-3",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-4",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-5",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-6",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-7",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-8",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-9",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-10"
]

var querynftdata = gql`
query {
_meta {
    block {
        number
    }
}
sellOrders: orders(where: {active: true, sellAsset_starts_with: "0x79bd1e42ca16e7f66f900f01b474901e33839a58"}, orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {
    id
    sellAsset {
        id
        assetAddress
    }
    buyAsset {
        id
        assetId
        assetType
        assetAddress
    }
    strategy {
        askPerUnitNominator
    }
    active
    fills {
        id
        buyer {
            id
        }
        complete
        createdAt
        order {
            id
        }
    }
}
}
`

const GetNFTdata = () => {
    const { data, loading, error } = useQuery(querynftdata);

    if (loading) return;
    if (error) return <pre>{error.message}</pre>
    console.log(data)

    console.log(Valet["data"])

    return ( 
        <Valet.data/>
    );
}

export default GetNFTdata;