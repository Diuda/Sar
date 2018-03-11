#!/usr/bin/env python
from __future__ import division
import asyncio
import sys
import websockets


import sys
sys.path.insert(0, 'C:\LeapDeveloperKit_3.2.0+45899_win\LeapSDK\lib')
import os
import csv
import keyboard
import numpy as np
from fastdtw import fastdtw
import glob
from scipy.spatial.distance import euclidean
import requests


from sklearn.externals import joblib
import sklearn.svm

data = []
v_set = []
async def hello(websocket, path):
    global data
    global v_set
    count = 0
    try:
        while True:
            name = await websocket.recv()
            data = name.split('$')
            for i in data:
                count +=1
                data2 = i.split(',')
                data2 = list(filter(lambda a: a != '', data2))
                data2 = [float(i) for i in data2]

                if len(data2):
                    v_mag = np.linalg.norm(np.array((data2[0],data2[1],data2[2])))
                    v_set.append(v_mag)
                    if count%30 == 0:
                        meanVel =  int(sum(v_set)/len(v_set))
                        print (meanVel)
                        v_set = []
                
    except Exception as ex:
        print (ex.__class__.__name__)
    finally:
        sys.exit(0)
start_server = websockets.serve(hello, '192.168.31.190', 8761 )

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
