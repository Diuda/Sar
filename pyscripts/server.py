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
# from numpy import (array, dot)
# from numpy.linalg import norm

from sklearn.externals import joblib
import sklearn.svm



data = []
v_set = []
arm_dir_set = []
palm_set = []
f_tip_set = []
f_angle_set = []
phlanx_set_pre = []
phlanx_set = []
dynamic = False
static = False
fuck=0
async def hello(websocket, path):
    global dynamic
    global static
    global data
    global v_set
    global arm_dir_set
    global f_tip_set
    global f_angle_set
    global phlanx_set_pre
    global phlanx_set
    count = 0
    ele = ''
    elelist = []
    try:
        while True:
            name = await websocket.recv()
            for i in name:
                # getting all the elements before a ',' as the data comes as string
                if i != ',':
                    ele = ele + i
                else:
                    # append the values in a list
                    elelist.append(ele)
                    ele = '' 
            # delete the last empty value
            del elelist[-1]
            # convert the list into float values
            elelist = [float(i) for i in elelist]
           
        #    keeping count for palm velocity
            count +=1
            # pitch roll yaw
            arm_dir_set.extend((elelist[9], elelist[10], elelist[11]))
            # palm position and pal normal
            palm_set.extend((elelist[3], elelist[4], elelist[5], elelist[6], elelist[7], elelist[8]))
            # finger tip position directions
            f_tip_set.extend((elelist[12], elelist[13], elelist[14], elelist[15], elelist[16], elelist[17], elelist[18], elelist[19], elelist[20], elelist[21], elelist[22], elelist[23], elelist[24], elelist[25], elelist[26]))
            for i in range(27, 84):
                # bone position difference form palm position
                phlanx_set_pre.append(elelist[i])  
            phlanx_set.extend(phlanx_set_pre)        
            # phlanx_set.extend((elelist[27], elelist[28], elelist[29], elelist[30], elelist[31], elelist[32], elelist[33], elelist[34], elelist[35], elelist[36], elelist[37], elelist[38], elelist[39], elelist[40], elelist[41], elelist[42], elelist[43], elelist[44], elelist[45]))
            
            # angle between thumb_index, index_ring, ring_pinky fingers
            f_angle_set.extend((elelist[84], elelist[85], elelist[86]))
            v_mag = np.linalg.norm(np.array((elelist[0],elelist[1],elelist[2])))
            v_set.append(v_mag)
            if count%30 == 0:
                
                meanVel =  int(sum(v_set)/len(v_set))
                if meanVel < 100:
                    static = True
                    dynamic = False
                else:
                    dynamic = True
                    static = False
                
                # print (meanVel)
                v_set = []
            
            print (phlanx_set)
            elelist = []
            phlanx_set = []
            f_angle_set = []
                
    except Exception as ex:
        print ("Ye fuck kr rha hai: ",fuck)
        print (ex.__class__.__name__)
    finally:
        sys.exit(0)
start_server = websockets.serve(hello, '192.168.31.190', 8761 )

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


def angle_between(v1, v2):
    c = np.dot(v1,v2)/np.linalg.norm(v1)/np.linalg.norm(v2)
    return c

