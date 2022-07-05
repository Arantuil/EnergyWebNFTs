import Header from './components/Header';
import Home from './components/Home';
import Exchanges from './components/Exchanges';
import PageNotFound from './components/PageNotFound';
import NftPage from './components/NftPage';
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://ewc-subgraph-production.carbonswap.exchange/subgraphs/name/carbonswap/uniswapv2",
    fetchOptions: {
        mode: 'cors',
    },
    cache: new InMemoryCache()
});

export default function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <Header />
            </ApolloProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route exact path="/404" element={<PageNotFound />} />
                <Route path='/nft/:id' element={<NftPage />}></Route>
            </Routes>
        </Router>
    );
}