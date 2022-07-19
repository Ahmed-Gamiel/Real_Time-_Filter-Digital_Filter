import eel
from scipy import signal
import math
eel.init('web')
@eel.expose
def getfactorx(zeros,poles,system):
    polelist=[]
    zerolist=[]
    numlist=[]
    denlist=[]
    for zero in zeros:
        zerolist.append(complex(zero[0],zero[1]))
    for pole in poles:
        polelist.append(complex(pole[0],pole[1]))   
    nu,de=signal.zpk2tf(zerolist, polelist,1)
    for num in nu:
        numlist.append([num.real,num.imag])
    for dem in de:
        denlist.append([dem.real,dem.imag]) 
       
    return [numlist,denlist[1:]] 
eel.start("index.html") 

       