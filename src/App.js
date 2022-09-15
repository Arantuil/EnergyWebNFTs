import Header from './components/Header';
import Home from './components/Home';
import Markets from './components/Markets';
import PageNotFound from './components/PageNotFound';
import NftPage from './components/NftPage';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';
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
                <Route path="/markets" element={<Markets />} />
                <Route path='/portfolio' element={<Portfolio />} />
                <Route path='/nft/:id' element={<NftPage />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
                <Footer/>
        </Router>
    );
}