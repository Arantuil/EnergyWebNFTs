import time
from NftCollections.CarbonswapS1 import updateCarbonSwapS1Prices
from NftCollections.CarbonlandTrust import updateCarbonlandTrustPrices
from NftCollections.SmudgeMeowOfBastet import updateSmudgeMeowOfBastetPrices
from NftCollections.Carbonauts import updateCarbonautsPrices
from NftCollections.Energymon import updateEnergymonPrices
from NftCollections.Cryptosoots import updateCryptoSootsPrices
from NftCollections.NFTrees import updateNFTreesPrices

# --------------------------------------------- #

start = time.time()

updateCarbonSwapS1Prices()
updateCarbonlandTrustPrices()
updateSmudgeMeowOfBastetPrices()
updateCarbonautsPrices()
updateEnergymonPrices()
updateCryptoSootsPrices()
updateNFTreesPrices()

end = time.time()
print("The time of execution of above program is :", end-start)