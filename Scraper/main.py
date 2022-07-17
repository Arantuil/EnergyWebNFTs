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
import sys
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('serviceAccountKey.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://energywebnfts-default-rtdb.firebaseio.com'
})

# ----------------------------------------------------------------- #

def restart():
    os.execv(sys.executable,['python3'] + sys.argv)

while (True):
    try:
        start = time.time()

        updateCarbonSwapS1Prices()
        updateCarbonlandTrustPrices()
        updateSmudgeMeowOfBastetPrices()
        updateCarbonautsPrices()
        updateEnergymonPrices()
        updateCryptoSootsPrices()
        updateNFTreesPrices()
        updateIinuPrices()
        updateSmudgeCatworldPrices()

        end = time.time()
        print("The time of execution of the above program is:", end-start)
    except:
        restart()