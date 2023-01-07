![gewggh](https://user-images.githubusercontent.com/67122764/177218297-703745a2-5090-4904-968c-89b252508ccc.png)
# Energy Web NFTs
All the price data you need of all the NFTs on the Energy Web Chain these can include art, trading cards, profile characters, representations of IRL items, game items, RECs, land tiles, and more.

### ✨What is NFT market cap?
NFT market cap is the total value of all the NFTs on the Energy Web chain that have been minted or are in circulation. Market capitalization is used to determine the ranking of the NFTs. The higher the market cap of a particular NFT, the higher its ranking and share of the market. The NFT market cap is calculated by multiplying the total number of NFT's in circulation by its current price.

### 🔢How does EnergyWebNFTs calculate the NFT prices?
EnergyWebNFTs combines data from Greensea and Raregems and displays the order with the lowest price. The Greensea pricedata is gathered from the public subgraph, provided by the Greensea/Carbonswap team.

![ewgewgewgewg](https://user-images.githubusercontent.com/67122764/179548776-90a97e5c-d747-4765-9b5b-355e08ef0322.png)
> Preview image of the home page of the website (data is now dynamic)

### ✨To-do:
- [x] Make server that does the graphql queries and gathers data from the other 2 exchanges and combines all that data into a json file, then store that json file on firebase
- [x] Dynamic table data based on json data gathered from firebase
- [x] Find a fix for the workaround converting between the different currencies
- [x] Something to run the python script that updates the data to firebase 

### ✨Later on:
- [x] Login system + user able to create and save their portfolio of all the NFTs they own and see the total of the floorprices combined, and percentage in price changes, maybe also in graph format
