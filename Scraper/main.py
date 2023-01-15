import time
from NftCollections.CarbonswapS1 import updateCarbonSwapS1Prices
from NftCollections.CarbonlandTrust import updateCarbonlandTrustPrices
from NftCollections.SmudgeMeowOfBastet import updateSmudgeMeowOfBastetPrices
from NftCollections.Carbonauts import updateCarbonautsPrices
from NftCollections.Energymon import updateEnergymonPrices
from NftCollections.Cryptosoots import updateCryptoSootsPrices
from NftCollections.NFTrees import updateNFTreesPrices
from NftCollections.Iinu import updateIinuPrices
from NftCollections.SmudgeCatworld import updateSmudgeCatworldPrices
from NftCollections.BeatsBoyz import updateBeatsBoyzPrices
from NftCollections.TubbyTurtles import updateTubbyTurtlesPrices
import sys
import os
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate('serviceAccountKey.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://energywebnfts-default-rtdb.firebaseio.com'
})

# ----------------------------------------------------------------- #

def restart():
    os.execv(sys.executable,['python3'] + sys.argv)

ranTimes = 0
try:
    while True:
        ranTimes += 1
        try:
            start = time.time()
            try: updateCarbonSwapS1Prices()
            except: print('Error at NFT ID: 1')
            try: updateCarbonlandTrustPrices()
            except: print('Error at NFT ID: 2')
            try: updateSmudgeMeowOfBastetPrices()
            except: print('Error at NFT ID: 3')
            try: updateCarbonautsPrices()
            except: print('Error at NFT ID: 4')
            try: updateEnergymonPrices()
            except: print('Error at NFT ID: 5')
            try: updateCryptoSootsPrices()
            except: print('Error at NFT ID: 6')
            try: updateNFTreesPrices()
            except: print('Error at NFT ID: 7')
            try: updateIinuPrices()
            except: print('Error at NFT ID: 8')
            try: updateSmudgeCatworldPrices()
            except: print('Error at NFT ID: 9')
            try: updateBeatsBoyzPrices()
            except: print('Error at NFT ID: 10')
            try: updateTubbyTurtlesPrices()
            except: print('Error at NFT ID: 11')

            end = time.time()
            print("The time of execution of the above program is:", end-start)
            if ranTimes % 5 == 0:
                restart()
        except:
            time.sleep(15)
except KeyboardInterrupt:
    print('interrupted!')