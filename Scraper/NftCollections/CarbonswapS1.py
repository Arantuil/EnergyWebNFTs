import requests
import json
from bs4 import BeautifulSoup
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

#cred = credentials.Certificate('serviceAccountKey.json')

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
"Summoner","VIP","Potato peeler","Woodsourcerer","Deejay","Valet","Whale entertainer","Firestarter","Grillmaster","Stowaway"
]

allNftList = [
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-1", "0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-2", "0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-3",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-4", "0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-5", "0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-6",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-7", "0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-8", "0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-9",
"0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a-10"
] 

descriptions = [
    "The first-mover. You didn't even read what you were signing up for, did you? That's how you get rugged good and proper, my friend. Did you even consider for a moment what you were summoning? We could be knee deep in polymorphous tetredunklets from sector 122N right now. You know that right? You know how long they take to expire? Ah, forget it. It's lost on you.",
    "The life of the party. You were handed life on a platter. Congratulations on doing the absolute bare minimum to keep those hors d'oeuvres coming. Still, the people love you and heck, we do too. Just say the word and Queen Frog will make it happen.",
    "The runt of the litter. It's really not fair. Your hands are unrecognizable, they're caked in dirt. It will take months to clean under those nails. Your mind is a vast waste of inactivity, countless are the potatoes that have passed through your hands. So vast is it that you agreed to work full-time on potato mountain. Alas, back to work, more potatoes need peeling...",
    "The unsung hero. Your heart is made of gold. Though you keep getting trampled, your ceaseless trust in people always spurs you on. Your only reward is the pillow on which you lay your heavy head each night. Yet that's enough for you, indeed it's all you ever wanted.",
    "The visionary. You follow your own path. If that takes you to your destination, great. If not, another story awaits. Nowhere is this more evident than when you're laying down sonic arithmetic. The crowd goes one way, you go the other. You tee up the firestarters of our world. Without you we'd all be floating through space with darkness our only friend.",
    "The sheepish. Look, your obsession with lambos (green though they may be) got the better of you. Now, I'm not saying lambos are bad per se (except the ones that guzzle gas) but you gotta stop saying yes to everything. Queen Frog taught you a very valuable lesson (ahem, sorry, I mean her autonomous lambo did - she had nothing to do with it, of course). Let this be an opportunity to grow, to take a stance, even redeem yourself. You may even find that you become something entirely new...",
    "The quixotic. They called you the clown in school, which you took as a compliment. You're a showboater, a whale tickler. You pick fights with wind turbines, but really you mean well. Keep on the good side of the whales and you'll go places you could never have imagined.",
    "The twisted. You normally don't need any encouragement to start setting things on fire. This time you were forced to channel your powers into something constructive. Deep down, however, you know they won't get lucky twice. If only you had the same luck as those party-goers. That dastardly woman struck you down and you're still a little angry red goblin. What happened to her anyway?",
    "The hero we don't deserve. You're the only thing standing between the firestarters and their corruption of nature. You are the yang to their yin, if you believe in that sort of thing. Some say it was the firestarters who arrived first, setting the planet ablaze with reckless abandon. Others say your kind were the original species, living in harmony and taking no more than needed, as hunter-gatherers. Ah, what history we have is regrettably lost. All we know for sure now is that none can live without the other.",
    "The slippery one. I suppose you made it home from the summoning party in one piece, if you were even there. You'd probably have gotten away with bribing the security guard if one of our wood sourcers hadn't ratted you out. Keep on doing your own thing, you beautiful degenerate."
]

allNftAmounts = ["10","28","93","325","44","691","93","89","50","54"] 

def updateCarbonSwapS1Prices():
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
        elif greenseapriceslistoriginal[1] == 'SUSU' and greenseapriceslistoriginal[0] > 0:
            greenseapriceslistusd = [greenseapriceslistoriginal[0]*susuprice, "USD", greenseapriceslistoriginal[2], greenseapriceslistoriginal[3]]
        else:
            greenseapriceslistusd = [0, "USD", greenseapriceslistoriginal[2], greenseapriceslistoriginal[3]]

    # ------------------------------- Beatifulsoup ---------------------------------- #

        def getHTMLdocument(url):
            response = requests.get(url)
            return response.text

        holders = 0
        url = "https://raregems.io/energyweb/carbonswap/"+f"{i+1}"
        html = getHTMLdocument(url)
        soup = BeautifulSoup(html, 'html.parser')

        owners = soup.find_all('div', class_='value')
        owners = owners[5].string
        holders += int(owners)

        try:
            url = "https://raregems.io/energyweb/carbonswap/"+f"{i+1}"
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

        try: percentage7day = (greenseapriceslistusd[0]/greenseapriceslistusd7day[0]*100)-100
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

        try: percentage14day = (greenseapriceslistusd[0]/greenseapriceslistusd14day[0]*100)-100
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

        try: percentage30day = (greenseapriceslistusd[0]/greenseapriceslistusd30day[0]*100)-100
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

        try: percentage60day = (greenseapriceslistusd[0]/greenseapriceslistusd60day[0]*100)-100
        except: percentage60day = 0.00
        # -------------------------------------------------------------------------- #
        image = f"/images/CS1_{i+1}.png"
        imageanimated = f"/animatedimages/CS1_{i+1}.webp"
        assettype = "ERC-1155"
        if combinedpriceslistoriginal[3] == 'Raregems':
            cheapestpricemarketlink = f"https://raregems.io/energyweb/carbonswap/{i+1}"
        elif combinedpriceslistoriginal[3] == 'Greensea':
            cheapestpricemarketlink = f"https://greensea.carbonswap.finance/token/ERC1155/0xf88735fe03b6d3a8f3ca7eda166d2e71dd54452a/{i+1}"
        else:
            cheapestpricemarketlink = ""

        circulating = int(allNftAmounts[i])
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
            "id": i,
            "name": nftnameList[i],
            "description": descriptions[i],
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

        db.reference(f"{i}").update({"rank": carbonswapNftData["rank"]})
        db.reference(f"{i}").update({"id": carbonswapNftData["id"]})
        db.reference(f"{i}").update({"name": carbonswapNftData["name"]})
        db.reference(f"{i}").update({"description": carbonswapNftData["description"]})
        db.reference(f"{i}").update({"image": carbonswapNftData["image"]})
        db.reference(f"{i}").update({"imageanimated": carbonswapNftData["imageanimated"]})
        db.reference(f"{i}").update({"cheapestpriceoriginal": carbonswapNftData["cheapestpriceoriginal"]})
        db.reference(f"{i}").update({"cheapestpricecurrency": carbonswapNftData["cheapestpricecurrency"]})
        db.reference(f"{i}").update({"cheapestmarket": carbonswapNftData["cheapestpricemarket"]})
        db.reference(f"{i}").update({"cheapestmarketlink": carbonswapNftData["cheapestpricemarketlink"]})
        db.reference(f"{i}").update({"marketcap": carbonswapNftData["marketcap"]})
        db.reference(f"{i}").update({"floorpricesevenday": carbonswapNftData["floorpricesevenday"]})
        db.reference(f"{i}").update({"floorpricefourteenday": carbonswapNftData["floorpricefourteenday"]})
        db.reference(f"{i}").update({"floorpricethirtyday": carbonswapNftData["floorpricethirtyday"]})
        db.reference(f"{i}").update({"floorpricesixtyday": carbonswapNftData["floorpricesixtyday"]})
        db.reference(f"{i}").update({"percentage7daycolor": carbonswapNftData["percentage7daycolor"]})
        db.reference(f"{i}").update({"percentage14daycolor": carbonswapNftData["percentage14daycolor"]})
        db.reference(f"{i}").update({"percentage30daycolor": carbonswapNftData["percentage30daycolor"]})
        db.reference(f"{i}").update({"percentage60daycolor": carbonswapNftData["percentage60daycolor"]})
        db.reference(f"{i}").update({"circulating": carbonswapNftData["circulating"]})
        db.reference(f"{i}").update({"floorprice": carbonswapNftData["floorprice"]})
        db.reference(f"{i}").update({"owners": carbonswapNftData["owners"]})
        db.reference(f"{i}").update({"assettype": carbonswapNftData["assettype"]})
        print(f"Updated NFT with ID: {i}")