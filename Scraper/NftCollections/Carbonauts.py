import requests
import json
from bs4 import BeautifulSoup
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

cred = credentials.Certificate('serviceAccountKey.json')

#firebase_admin.initialize_app(cred, {
#    'databaseURL': 'https://energywebnfts-default-rtdb.firebaseio.com'
#})

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
"Incoming delivery","Hidden treasure","Celestial guard"
]

allNftList = [
"0x5609f384e8d5840bb6c0815eeb4e0ec518861670-1", "0x5609f384e8d5840bb6c0815eeb4e0ec518861670-2", "0x5609f384e8d5840bb6c0815eeb4e0ec518861670-3"
] 

descriptions = [
    'Carbonauts NFT #1 "Incoming Delivery" is made by an artist that goes by TANU. The Carbonaut is on a journey to deliever the CarbonSwap message of sustainability to all of earth. The community that bestowed the name "Carbonauts" received this NFT as a token of our appreciation.',
    'Carbonauts NFT #2 "Hidden Treasure". Hidden amoung the stars is a Carbonaut who serves as a messenger for both CarbonSwap and EnergyWeb. His service is one that we are eternally grateful for. Can you find the hidden logos?',
    'The first of its kind, this celestial soot takes to space to guard over our beloved blue marble. Endless is its mission to spread the message of hope to all and to inspire a new age of thinking among the rulers.'
]

allNftAmounts = ["2113","116","10"] 

def updateCarbonautsPrices():
    carbonjackran = False
    try:
        url = "https://carbonjack.io/nft-broker/index.html#"
        driver = webdriver.Chrome()
        driver.get(url)
        time.sleep(5)
        driver.find_element(By.ID, 'nav_buy').click()
        driver.implicitly_wait(5)
        select = Select(driver.find_element(By.ID, 'nft_buy_contract_dropdown'))
        driver.implicitly_wait(1)
        select.select_by_value('0x5609f384e8d5840bb6c0815eeb4e0ec518861670')
        orders = driver.find_elements(By.CLASS_NAME, 'nft-card')
        carbonjackprices = []
        for h in range(len(orders)-3):
            price = driver.find_element(By.CSS_SELECTOR, f'#nft_buy_list > div:nth-child({h+1}) > div > ul:nth-child(5) > li').text
            id =  driver.find_element(By.CSS_SELECTOR, f'#nft_buy_list > div:nth-child({h+1}) > div > ul:nth-child(4) > li > span:nth-child(1)').text
            id = id[10:]
            if price[-3:] == 'EWT':
                price = price[7:]
                price = price[:-3]
                price = float(price)
                carbonjackprices.append([price, 'EWT', id, 'Carbonjack'])
            else:
                carbonjackprices.append([0, 'EWT', id, 'Carbonjack'])
        carbonjackran = True
        driver.quit()
    except:
        pass

    for i in range(len(allNftList)):
        query = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset { id assetAddress} buyAsset {id assetId assetType assetAddress}active fills {id buyer{id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query7day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block7dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset {id assetAddress}buyAsset {id assetId assetType assetAddress}active fills {id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query14day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block14dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset{id assetAddress}buyAsset{id assetId assetType assetAddress}active fills{id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query30day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block30dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset {id assetAddress} buyAsset {id assetId assetType assetAddress}active fills {id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''
        query60day = '''{sellOrders: orders(where: {active: true, sellAsset_starts_with: '''+'"'+allNftList[i]+'"}'+''', block: {number: '''+block60dayago+'''} , orderBy: createdAt, orderDirection: desc, skip: 0, first: 1000) {id sellAsset {id assetAddress}buyAsset {id assetId assetType assetAddress } active fills {id buyer {id}complete createdAt order {id}}strategy {askPerUnitNominator askPerUnitDenominator}}}'''

        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query})
        time.sleep(0.1)
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal) == 0:
                    greenseapriceslistoriginal = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal[0]):
                        greenseapriceslistoriginal = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
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

        holders = 0
        url = "https://raregems.io/energyweb/carbonauts/"+f"{i+1}"
        html = getHTMLdocument(url)
        soup = BeautifulSoup(html, 'html.parser')

        owners = soup.find_all('div', class_='value')
        owners = owners[5].string
        holders += int(owners)

        try:
            url = "https://raregems.io/energyweb/carbonauts/"+f"{i+1}"
            html = getHTMLdocument(url)
            soup = BeautifulSoup(html, 'html.parser')
            price = soup.find_all('button', class_='big')
            price = price[0]
            price = price.findChildren()
            price = price[0].string
            pricecurrency = price[-3:]
        except:
            price = 0
            pricecurrency = 'N/A'

        if pricecurrency == "EWT":
            raregemspriceslistoriginal = [float(price[:-3]), 'EWT', f'{i+1}', 'Raregems']
            raregemspriceslistusd = [float(price[:-3])*ewtprice, 'USD', f'{i+1}', 'Raregems']
        else:
            raregemspriceslistoriginal = [0, 'EWT', 'N/A', 'N/A']
            raregemspriceslistusd = [0, 'USD', 'N/A', 'N/A']

    # ------------------------------- Carbonjack ---------------------------------- #
        carbonjackcheapest = []
        for cj in carbonjackprices:
            if len(carbonjackcheapest) == 0:
                if cj[2] == i+1:
                    carbonjackcheapest = cj

        if len(carbonjackcheapest) == 0:
            carbonjackpriceslistoriginal = [0, 'EWT', 'N/A', 'N/A']
            carbonjackpriceslistusd = [0, 'USD', 'N/A', 'N/A']
        else:
            carbonjackpriceslistoriginal = cj
            carbonjackpriceslistusd = [cj[0]*ewtprice, 'EWT', cj[2], cj[3]]
    # ---------------------------------------------------------- #
        combinedlistoriginal = []
        combinedlistoriginal.append(greenseapriceslistoriginal)
        combinedlistoriginal.append(raregemspriceslistoriginal)
        if carbonjackran == True:
            combinedlistoriginal.append(carbonjackpriceslistoriginal)

        combinedlistusd = []
        combinedlistusd.append(greenseapriceslistusd)
        combinedlistusd.append(raregemspriceslistusd)
        if carbonjackran == True:
            combinedlistusd.append(carbonjackpriceslistusd)

        combinedpriceslistoriginal = []
        loop = 0
        for n in combinedlistusd:
            if n[0] != 0:
                if len(combinedpriceslistoriginal) == 0:
                    combinedpriceslistoriginal = combinedlistoriginal[loop]
                else:
                    if n[0] < combinedlistusd[loop][0]:
                        combinedpriceslistoriginal = combinedlistoriginal[loop]
                loop += 1
            else:
                loop += 1

        if len(combinedpriceslistoriginal) == 0:
            combinedpriceslistoriginal = [0, 'EWT', 'N/A', 'N/A']

        combinedpriceslistusd = []
        for m in combinedlistusd:
            if m[0] != 0:
                if len(combinedpriceslistusd) == 0:
                    combinedpriceslistusd = m
                else:
                    if m[0] < combinedpriceslistusd[0]:
                        combinedpriceslistusd = m

        if len(combinedpriceslistusd) == 0:
            combinedpriceslistoriginal = [0, 'USD', 'N/A', 'N/A']
    # ----------------------------------- 7 day ----------------------------------- #
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query7day})
        time.sleep(0.1)
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal7day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal7day) == 0:
                    greenseapriceslistoriginal7day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal7day[0]):
                        greenseapriceslistoriginal7day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                    else:
                        pass

        try:
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
        except:
            greenseapriceslistoriginal7day = [0, 'SUSU', 'N/A', 'N/A']
            greenseapriceslistusd7day = [0, 'USD', 'N/A', 'N/A']

        try: percentage7day = (combinedpriceslistusd[0]/greenseapriceslistusd7day[0]*100)-100
        except: percentage7day = 0.00
        # ----------------------------------- 14 day ---------------------------------- #
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query14day})
        time.sleep(0.1)
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal14day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal14day) == 0:
                    greenseapriceslistoriginal14day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal14day[0]):
                        greenseapriceslistoriginal14day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                    else:
                        pass

        try:
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
        except:
            greenseapriceslistoriginal14day = [0, 'SUSU', 'N/A', 'N/A']
            greenseapriceslistusd14day = [0, 'USD', 'N/A', 'N/A']

        try: percentage14day = (combinedpriceslistusd[0]/greenseapriceslistusd14day[0]*100)-100
        except: percentage14day = 0.00
        # ----------------------------------- 30 day ---------------------------------- #
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query30day})
        time.sleep(0.1)
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal30day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal30day) == 0:
                    greenseapriceslistoriginal30day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal30day[0]):
                        greenseapriceslistoriginal30day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                    else:
                        pass

        try:
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
        except:
            greenseapriceslistoriginal30day = [0, 'SUSU', 'N/A', 'N/A']
            greenseapriceslistusd30day = [0, 'USD', 'N/A', 'N/A']

        try: percentage30day = (combinedpriceslistusd[0]/greenseapriceslistusd30day[0]*100)-100
        except: percentage30day = 0.00
        # ----------------------------------- 60 day ---------------------------------- #
        url = 'https://ewc-subgraph.carbonswap.exchange/subgraphs/name/carbonswap/marketplace'

        request = requests.post(url, json={'query': query60day})
        time.sleep(0.1)
        parsedjson = json.loads(request.text)

        greenseapriceslistoriginal60day = []
        for e in range(len(parsedjson["data"]["sellOrders"])):
            token = str(parsedjson["data"]["sellOrders"][e]["buyAsset"]["assetAddress"])
            if token == "0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc":
                if len(greenseapriceslistoriginal60day) == 0:
                    greenseapriceslistoriginal60day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                else:
                    if round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000) < int(greenseapriceslistoriginal60day[0]):
                        greenseapriceslistoriginal60day = [round(int(parsedjson["data"]["sellOrders"][e]["strategy"]["askPerUnitNominator"])/1000000000000000000), "SUSU", f"{i}", "Greensea"]
                    else:
                        pass
        try:
            if len(combinedpriceslistoriginal[3]) == 0:
                greenseapriceslistoriginal60day = [0, 'SUSU', 'N/A', 'N/A']
                greenseapriceslistusd60day = [0, 'USD', 'N/A', 'N/A']
            elif greenseapriceslistoriginal60day[1] != 'SUSU':
                greenseapriceslistoriginal60day = [0, 'SUSU', 'N/A', 'N/A']
                greenseapriceslistusd60day = [0, 'USD', 'N/A', 'N/A']
            elif greenseapriceslistoriginal60day[1] == 'SUSU':
                greenseapriceslistusd60day = [greenseapriceslistoriginal60day[0]*susuprice60day, "USD", greenseapriceslistoriginal60day[2], greenseapriceslistoriginal60day[3]]
            else:
                greenseapriceslistusd60day = [0, "USD", greenseapriceslistoriginal60day[2], greenseapriceslistoriginal60day[3]]
        except:
            greenseapriceslistoriginal60day = [0, 'SUSU', 'N/A', 'N/A']
            greenseapriceslistusd60day = [0, 'USD', 'N/A', 'N/A']

        try: percentage60day = (combinedpriceslistusd[0]/greenseapriceslistusd60day[0]*100)-100
        except: percentage60day = 0.00
        # -------------------------------------------------------------------------- #
        image = f"/images/CN_{i+1}.png"
        imageanimated = f"/animatedimages/CN_{i+1}.webp"
        assettype = "ERC-1155"
        if combinedpriceslistoriginal[3] == 'Raregems':
            cheapestpricemarketlink = f"https://raregems.io/energyweb/carbonauts/{combinedpriceslistoriginal[2]}"
        elif combinedpriceslistoriginal[3] == 'Greensea':
            cheapestpricemarketlink = f"https://greensea.carbonswap.finance/collection/ERC1155/0x5609f384e8D5840bB6C0815Eeb4E0ec518861670/{combinedpriceslistoriginal[2]}"
        elif combinedpriceslistoriginal[3] == 'Carbonjack':
            cheapestpricemarketlink = "https://carbonjack.io/nft-broker/index.html"
        else:
            cheapestpricemarketlink = ""
        circulating = int(allNftAmounts[i])
        if len(combinedpriceslistusd) == 0:
            combinedpriceslistusd = [0, 'USD', f'{i+1}', 'N/A']
            combinedpriceslistoriginal = [0, 'EWT', f'{i+1}', 'N/A']
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
            "id": i+18,
            "name": nftnameList[i],
            "projectlink": "/",
            "description": descriptions[i],
            "islistedongs": "true",
            "islistedonrg": "true",
            "islistedoncj": "true",
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

        #print(carbonswapNftData)

        db.reference(f"{i+18}").update({"rank": carbonswapNftData["rank"]})
        db.reference(f"{i+18}").update({"id": carbonswapNftData["id"]})
        db.reference(f"{i+18}").update({"name": carbonswapNftData["name"]})
        db.reference(f"{i+18}").update({"projectlink": carbonswapNftData["projectlink"]})
        db.reference(f"{i+18}").update({"description": carbonswapNftData["description"]})
        db.reference(f"{i+18}").update({"islistedongs": carbonswapNftData["islistedongs"]})
        db.reference(f"{i+18}").update({"islistedonrg": carbonswapNftData["islistedonrg"]})
        db.reference(f"{i+18}").update({"islistedoncj": carbonswapNftData["islistedoncj"]})
        db.reference(f"{i+18}").update({"image": carbonswapNftData["image"]})
        db.reference(f"{i+18}").update({"imageanimated": carbonswapNftData["imageanimated"]})
        db.reference(f"{i+18}").update({"cheapestpriceoriginal": carbonswapNftData["cheapestpriceoriginal"]})
        db.reference(f"{i+18}").update({"cheapestpricecurrency": carbonswapNftData["cheapestpricecurrency"]})
        db.reference(f"{i+18}").update({"cheapestmarket": carbonswapNftData["cheapestpricemarket"]})
        db.reference(f"{i+18}").update({"cheapestmarketlink": carbonswapNftData["cheapestpricemarketlink"]})
        db.reference(f"{i+18}").update({"marketcap": carbonswapNftData["marketcap"]})
        db.reference(f"{i+18}").update({"floorpricesevenday": carbonswapNftData["floorpricesevenday"]})
        db.reference(f"{i+18}").update({"floorpricefourteenday": carbonswapNftData["floorpricefourteenday"]})
        db.reference(f"{i+18}").update({"floorpricethirtyday": carbonswapNftData["floorpricethirtyday"]})
        db.reference(f"{i+18}").update({"floorpricesixtyday": carbonswapNftData["floorpricesixtyday"]})
        db.reference(f"{i+18}").update({"percentage7daycolor": carbonswapNftData["percentage7daycolor"]})
        db.reference(f"{i+18}").update({"percentage14daycolor": carbonswapNftData["percentage14daycolor"]})
        db.reference(f"{i+18}").update({"percentage30daycolor": carbonswapNftData["percentage30daycolor"]})
        db.reference(f"{i+18}").update({"percentage60daycolor": carbonswapNftData["percentage60daycolor"]})
        db.reference(f"{i+18}").update({"circulating": carbonswapNftData["circulating"]})
        db.reference(f"{i+18}").update({"floorprice": carbonswapNftData["floorprice"]})
        db.reference(f"{i+18}").update({"owners": carbonswapNftData["owners"]})
        db.reference(f"{i+18}").update({"assettype": carbonswapNftData["assettype"]})
        print(f"Updated NFT with ID: {i+18}")