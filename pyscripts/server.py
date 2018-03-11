#!/usr/bin/env python

import asyncio
import sys
import websockets

from __future__ import division
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

async def hello(websocket, path):
    try:
        while True:
            name = await websocket.recv()
            print (name)
        # await consumer(name)
    except websockets.exceptions.ConnectionClosed:
        print ("Toot gaya")
    finally:
        sys.exit(0)
start_server = websockets.serve(hello, '192.168.31.190', 8761 )

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
