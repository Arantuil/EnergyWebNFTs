import { useQuery, gql } from "@apollo/client";

const PRICESUSUEWT = gql`
query cryptosoots {
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
    const { data, loading, error } = useQuery(PRICESUSUEWT);

    if (loading) return;
    if (error) return <pre>{error.message}</pre>
    console.log(data)

    return ( 
        null
    );
}

export default GetNFTdata;