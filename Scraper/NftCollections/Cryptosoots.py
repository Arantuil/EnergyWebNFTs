import requests
import json
from bs4 import BeautifulSoup
import pyrebase

from firebasedata import FIREBASECONFIG
firebase = pyrebase.initialize_app(FIREBASECONFIG)

db=firebase.database()

url = "https://ewc-subgraph-production.carbonswap.exchange/subgraphs/name/carbonswap/uniswapv2"

pricesquery = """{pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0") {token1Price}token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc") {derivedETH}_meta {block {number}}}"""
request = requests.post(url, json={'query': pricesquery})
parsedjson = json.loads(request.text)
ewtprice = float(parsedjson["data"]["pair"]["token1Price"])
susuprice = ewtprice*(float(parsedjson["data"]["token"]["derivedETH"]))
currentblock = parsedjson["data"]["_meta"]["block"]["number"]

block7dayago = str(currentblock - 120960)
block14dayago = str(currentblock - 241920)
block30dayago = str(currentblock - 518400)
block60dayago = str(currentblock - 1036800)

pricesquery7day = """{pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0", block: {number: """+block7dayago+"""}) {token1Price}token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc", block: {number: """+block7dayago+"""}) {derivedETH}}"""
request7day = requests.post(url, json={'query': pricesquery7day})
parsedjson7day = json.loads(request7day.text)
ewtprice7day = float(parsedjson7day["data"]["pair"]["token1Price"])
susuprice7day = ewtprice7day*(float(parsedjson7day["data"]["token"]["derivedETH"]))

pricesquery14day = """{pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0", block: {number: """+block14dayago+"""}) {token1Price}token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc", block: {number: """+block14dayago+"""}) {derivedETH}}"""
request14day = requests.post(url, json={'query': pricesquery14day})
parsedjson14day = json.loads(request14day.text)
ewtprice14day = float(parsedjson14day["data"]["pair"]["token1Price"])
susuprice14day = ewtprice14day*(float(parsedjson14day["data"]["token"]["derivedETH"]))

pricesquery30day = """{pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0", block: {number: """+block30dayago+"""}) {token1Price}token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc", block: {number: """+block30dayago+"""}) {derivedETH}}"""
request30day = requests.post(url, json={'query': pricesquery30day})
parsedjson30day = json.loads(request30day.text)
ewtprice30day = float(parsedjson30day["data"]["pair"]["token1Price"])
susuprice30day = ewtprice30day*(float(parsedjson30day["data"]["token"]["derivedETH"]))

pricesquery60day = """{pair(id: "0x5cec0ccc21d2eb89a0613f6ca4b19b07c75909b0", block: {number: """+block60dayago+"""}) {token1Price}token(id: "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc", block: {number: """+block60dayago+"""}) {derivedETH}}"""
request60day = requests.post(url, json={'query': pricesquery60day})
parsedjson60day = json.loads(request60day.text)
ewtprice60day = float(parsedjson60day["data"]["pair"]["token1Price"])
susuprice60day = ewtprice60day*(float(parsedjson60day["data"]["token"]["derivedETH"]))

nftnameList = [
"CryptoSoots"
]

allNftList = [
"0x79bd1e42ca16e7f66f900f01b474901e33839a58"
] 

allNftAmounts = ["1337"] 

def updateCryptoSootsPrices():
    for i in range(len(allNftList)):
        query = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset { id assetAddress} buyAsset {id assetId assetType assetAddress}active fills {id buyer{id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query7day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block7dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset {id assetAddress}buyAsset {id assetId assetType assetAddress}active fills {id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query14day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block14dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset{id assetAddress}buyAsset{id assetId assetType assetAddress}active fills{id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query30day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block30dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset {id assetAddress} buyAsset {id assetId assetType assetAddress}active fills {id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query60day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block60dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset {id assetAddress}buyAsset {id assetId assetType assetAddress } active fills {id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''

        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query})
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal) == 0:
                    sootid = (parsedjson["data"]["sellOrders"][e]["sellAsset"]["id"]).split("-",1)[1]
                    greenseapriceslistoriginal = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", sootid, "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal[0]):
                        sootid = (parsedjson["data"]["sellOrders"][e]["sellAsset"]["id"]).split("-",1)[1]
                        greenseapriceslistoriginal = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", sootid, "Greensea"]
                    else:
                        pass

    if len(greenseapriceslistoriginal) == 0:
        greenseapriceslistoriginal = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal[1] != 'SUSU':
        greenseapriceslistoriginal = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal[1] == 'SUSU':
        greenseapriceslistusd = [greenseapriceslistoriginal[0]*susuprice, "USD", greenseapriceslistoriginal[2], greenseapriceslistoriginal[3]]
    else:
        greenseapriceslistusd = [0, "USD", greenseapriceslistoriginal[2], greenseapriceslistoriginal[3]]

    # ------------------------------- Beatifulsoup ---------------------------------- #

    def getHTMLdocument(url):
        response = requests.get(url)
        return response.text

    url = "https://raregems.io/energyweb/cryptosoots"
    html = getHTMLdocument(url)
    soup = BeautifulSoup(html, 'html.parser')

    owners = soup.find_all('div', class_='value')
    owners = owners[1].string
    holders = int(owners)

    price = soup.find_all('button', class_='small')
    price = price[0]
    price = price.findChildren()
    price = price[0].string
    pricecurrency = price[-3:]

    floornftid = soup.find('ul', class_='items')
    floornftid = floornftid.findChildren()
    floornftid = floornftid[0]
    floornftid = floornftid.find(href=True)
    floornftid = floornftid['href']
    num1 = floornftid[-2]
    num2 = floornftid[-3]
    num3 = floornftid[-4]
    if num1 == '/':
        floornftid = str(floornftid[-1])
    elif num2 == '/':
        floornftid = str(floornftid[-2])+str(floornftid[-1])
    elif num3 == '/':
        floornftid = str(floornftid[-3])+str(floornftid[-2])+str(floornftid[-1])

    if pricecurrency == "EWT":
        raregemspriceslistoriginal = [float(price[:-3]), 'EWT', f'{floornftid}', 'Raregems']
        raregemspriceslistusd = [float(price[:-3])*ewtprice, 'USD', f'{floornftid}', 'Raregems']
    else:
        raregemspriceslistoriginal = [0, 'EWT', 'N/A', 'N/A']
        raregemspriceslistusd = [0, 'USD', 'N/A', 'N/A']
    # ---------------------------------------------------------- #
    if greenseapriceslistoriginal[0] == 0:
        combinedpriceslistoriginal = raregemspriceslistoriginal
    elif raregemspriceslistoriginal[0] == 0:
        combinedpriceslistoriginal = greenseapriceslistoriginal
    elif greenseapriceslistusd[0] < raregemspriceslistusd[0]:
        combinedpriceslistoriginal = greenseapriceslistoriginal
    elif raregemspriceslistusd[0] < greenseapriceslistusd[0]:
        combinedpriceslistoriginal = raregemspriceslistoriginal
    # ---------------------------------------------------------- #
    if greenseapriceslistusd[0] == 0:
        combinedpriceslistusd = raregemspriceslistusd
    elif raregemspriceslistusd[0] == 0:
        combinedpriceslistusd = greenseapriceslistusd
    elif greenseapriceslistusd[0] < raregemspriceslistusd[0]:
        combinedpriceslistusd = greenseapriceslistusd
    elif raregemspriceslistusd[0] < greenseapriceslistusd[0]:
        combinedpriceslistusd = raregemspriceslistusd
    # --------------------------------------------- #
    # ----------------------------------- 7 day ----------------------------------- #
    for i3 in range(len(allNftList)):
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query7day})
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal7day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal7day) == 0:
                    greenseapriceslistoriginal7day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i3}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal7day[0]):
                        greenseapriceslistoriginal7day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i3}", "Greensea"]
                    else:
                        pass

    if len(greenseapriceslistoriginal7day) == 0:
        greenseapriceslistoriginal7day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd7day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal7day[1] != 'SUSU':
        greenseapriceslistoriginal7day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd7day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal7day[1] == 'SUSU':
        greenseapriceslistusd7day = [greenseapriceslistoriginal7day[0]*susuprice7day, "USD", greenseapriceslistoriginal7day[2], greenseapriceslistoriginal7day[3]]
    else:
        greenseapriceslistusd7day = [0, "USD", greenseapriceslistoriginal7day[2], greenseapriceslistoriginal7day[3]]

    percentage7day = (greenseapriceslistusd[0]/greenseapriceslistusd7day[0]*100)-100
    # ----------------------------------- 14 day ---------------------------------- #
    for i4 in range(len(allNftList)):
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query14day})
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal14day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal14day) == 0:
                    greenseapriceslistoriginal14day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i4}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal14day[0]):
                        greenseapriceslistoriginal14day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i4}", "Greensea"]
                    else:
                        pass

    if len(greenseapriceslistoriginal14day) == 0:
        greenseapriceslistoriginal14day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd14day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal14day[1] != 'SUSU':
        greenseapriceslistoriginal14day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd14day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal14day[1] == 'SUSU':
        greenseapriceslistusd14day = [greenseapriceslistoriginal14day[0]*susuprice14day, "USD", greenseapriceslistoriginal14day[2], greenseapriceslistoriginal14day[3]]
    else:
        greenseapriceslistusd14day = [0, "USD", greenseapriceslistoriginal14day[2], greenseapriceslistoriginal14day[3]]
    
    percentage14day = (greenseapriceslistusd[0]/greenseapriceslistusd14day[0]*100)-100
    # ----------------------------------- 30 day ---------------------------------- #
    for i5 in range(len(allNftList)):
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query30day})
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal30day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal30day) == 0:
                    greenseapriceslistoriginal30day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i5}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal30day[0]):
                        greenseapriceslistoriginal30day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i5}", "Greensea"]
                    else:
                        pass

    if len(greenseapriceslistoriginal30day) == 0:
        greenseapriceslistoriginal30day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd30day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal30day[1] != 'SUSU':
        greenseapriceslistoriginal30day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd30day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal30day[1] == 'SUSU':
        greenseapriceslistusd30day = [greenseapriceslistoriginal30day[0]*susuprice30day, "USD", greenseapriceslistoriginal30day[2], greenseapriceslistoriginal30day[3]]
    else:
        greenseapriceslistusd30day = [0, "USD", greenseapriceslistoriginal30day[2], greenseapriceslistoriginal30day[3]]
    
    percentage30day = (greenseapriceslistusd[0]/greenseapriceslistusd30day[0]*100)-100
    # ----------------------------------- 60 day ---------------------------------- #
    for i6 in range(len(allNftList)):
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query60day})
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal60day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal60day) == 0:
                    greenseapriceslistoriginal60day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i6}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal60day[0]):
                        greenseapriceslistoriginal60day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i6}", "Greensea"]
                    else:
                        pass

    if len(greenseapriceslistoriginal60day) == 0:
        greenseapriceslistoriginal60day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd60day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal60day[1] != 'SUSU':
        greenseapriceslistoriginal60day = [0, 'SUSU', 'N/A', 'N/A']
        greenseapriceslistusd60day = [0, 'USD', 'N/A', 'N/A']
    elif greenseapriceslistoriginal60day[1] == 'SUSU':
        greenseapriceslistusd60day = [greenseapriceslistoriginal60day[0]*susuprice60day, "USD", greenseapriceslistoriginal60day[2], greenseapriceslistoriginal60day[3]]
    else:
        greenseapriceslistusd60day = [0, "USD", greenseapriceslistoriginal60day[2], greenseapriceslistoriginal60day[3]]
    
    percentage60day = (greenseapriceslistusd[0]/greenseapriceslistusd60day[0]*100)-100
    # -------------------------------------------------------------------------- #
    image = f"/images/Cryptosoots.png"
    imageanimated = f"/animatedimages/Cryptosoots.png"
    assettype = "ERC-721"
    if combinedpriceslistoriginal[3] == 'Raregems':
        cheapestpricemarketlink = f"https://raregems.io/energyweb/cryptosoots/{combinedpriceslistoriginal[2]}"
    if combinedpriceslistoriginal[3] == 'Greensea':
        cheapestpricemarketlink = f"https://greensea.carbonswap.finance/token/ERC721/0x79bd1e42ca16e7f66f900f01b474901e33839a58/{combinedpriceslistoriginal[2]}"
    else:
        cheapestpricemarketlink = ""

    circulating = 0
    for x in allNftAmounts:
        circulating += int(x)
    marketcap = circulating*combinedpriceslistusd[0]

    if percentage7day > 0: percentage7daycolor = '#4EC44E'
    elif percentage7day < 0: percentage7daycolor = '#D1323C'
    if percentage14day > 0: percentage14daycolor = '#4EC44E'
    elif percentage14day < 0: percentage14daycolor = '#D1323C'
    if percentage30day > 0: percentage30daycolor = '#4EC44E'
    elif percentage30day < 0: percentage30daycolor = '#D1323C'
    if percentage60day > 0: percentage60daycolor = '#4EC44E'
    elif percentage60day < 0: percentage60daycolor = '#D1323C'

    percentage7day = format(percentage7day, ".2f")
    percentage14day = format(percentage14day, ".2f")
    percentage30day = format(percentage30day, ".2f")
    percentage60day = format(percentage60day, ".2f")
    if float(percentage7day) >= 0: percentage7day = '+'+str(percentage7day)+'%'
    else: percentage7day = str(percentage7day)+'%'
    if float(percentage14day) >= 0: percentage14day = '+'+str(percentage14day)+'%'
    else: percentage14day = str(percentage14day)+'%'
    if float(percentage30day) >= 0: percentage30day = '+'+str(percentage30day)+'%'
    else: percentage30day = str(percentage30day)+'%'
    if float(percentage60day) >= 0: percentage60day = '+'+str(percentage60day)+'%'
    else: percentage60day = str(percentage60day)+'%'

    if percentage7day == '+0.00%': percentage7daycolor = '#808080'
    if percentage14day == '+0.00%': percentage14daycolor = '#808080'
    if percentage30day == '+0.00%': percentage30daycolor = '#808080'
    if percentage60day == '+0.00%': percentage60daycolor = '#808080'

    carbonswapNftData = {
        "rank": "unset",
        "id": 22,
        "name": "CryptoSoots",
        "description": "CryptoSoots are said to reflect the magic of each owner, unique as they are. What will your Soot say to the world?",
        "image": image,
        "imageanimated": imageanimated,
        "cheapestpriceoriginal": combinedpriceslistoriginal[0],
        "cheapestpricecurrency": combinedpriceslistoriginal[1],
        "cheapestpricemarket": combinedpriceslistoriginal[3],
        "cheapestpricemarketlink": cheapestpricemarketlink,
        "marketcap": marketcap,
        "floorpricesevenday": percentage7day,
        "floorpricefourteenday": percentage14day,
        "floorpricethirtyday": percentage30day,
        "floorpricesixtyday": percentage60day,
        "percentage7daycolor": percentage7daycolor,
        "percentage14daycolor": percentage14daycolor,
        "percentage30daycolor": percentage30daycolor,
        "percentage60daycolor": percentage60daycolor,
        "circulating": circulating,
        "floorprice": combinedpriceslistusd[0],
        "owners": holders,
        "assettype": assettype
    }

    db.child(f"{22}").update({"rank": carbonswapNftData["rank"]})
    db.child(f"{22}").update({"id": carbonswapNftData["id"]})
    db.child(f"{22}").update({"name": carbonswapNftData["name"]})
    db.child(f"{22}").update({"description": carbonswapNftData["description"]})
    db.child(f"{22}").update({"image": carbonswapNftData["image"]})
    db.child(f"{22}").update({"imageanimated": carbonswapNftData["imageanimated"]})
    db.child(f"{22}").update({"cheapestpriceoriginal": carbonswapNftData["cheapestpriceoriginal"]})
    db.child(f"{22}").update({"cheapestpricecurrency": carbonswapNftData["cheapestpricecurrency"]})
    db.child(f"{22}").update({"cheapestmarket": carbonswapNftData["cheapestpricemarket"]})
    db.child(f"{22}").update({"cheapestmarketlink": carbonswapNftData["cheapestpricemarketlink"]})
    db.child(f"{22}").update({"marketcap": carbonswapNftData["marketcap"]})
    db.child(f"{22}").update({"floorpricesevenday": carbonswapNftData["floorpricesevenday"]})
    db.child(f"{22}").update({"floorpricefourteenday": carbonswapNftData["floorpricefourteenday"]})
    db.child(f"{22}").update({"floorpricethirtyday": carbonswapNftData["floorpricethirtyday"]})
    db.child(f"{22}").update({"floorpricesixtyday": carbonswapNftData["floorpricesixtyday"]})
    db.child(f"{22}").update({"percentage7daycolor": carbonswapNftData["percentage7daycolor"]})
    db.child(f"{22}").update({"percentage14daycolor": carbonswapNftData["percentage14daycolor"]})
    db.child(f"{22}").update({"percentage30daycolor": carbonswapNftData["percentage30daycolor"]})
    db.child(f"{22}").update({"percentage60daycolor": carbonswapNftData["percentage60daycolor"]})
    db.child(f"{22}").update({"circulating": carbonswapNftData["circulating"]})
    db.child(f"{22}").update({"floorprice": carbonswapNftData["floorprice"]})
    db.child(f"{22}").update({"owners": carbonswapNftData["owners"]})
    db.child(f"{22}").update({"assettype": carbonswapNftData["assettype"]})
    print(f"Updated NFT with ID: {22}")