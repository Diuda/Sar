#!/usr/bin/env python
from __future__ import division
import asyncio
import traceback
import sys
import websockets

from collections import Counter

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


dimensions = 81
wordSet = ['hi','Sorry','My','Name','How','You','Good']
data = []
v_set = []
arm_dir_set = []
palm_set = []
f_tip_set = []
f_angle_set = []
phlanx_set_pre = []
phlanx_set = []
feature_set_list = []
dynamic = None
static = None
fuck=0
responseString = ''
async def hello(websocket, path):
    global dynamic
    global feature_set_list
    global static
    global data
    global v_set
    global arm_dir_set
    global f_tip_set
    global f_angle_set
    global phlanx_set_pre
    global phlanx_set
    global palm_set
    count = 0
    global responseString
    ele = ''
    elelist = []
    try:
        while True:
            arm_dir_set = []
            palm_set = []
            f_tip_set = []
            f_angle_set = []
            phlanx_set_pre = []
            phlanx_set = []
            
            feature_set = []
            elelist = []
            name = await websocket.recv()
            # print ("here")
            print (name)
            sys.exit(0)
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
            # print (elelist)
        #    keeping count for palm velocity
            count +=1
            # pitch roll yaw
            # arm_dir_set.extend((elelist[9], elelist[10], elelist[11]))
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
            
            feature_set.append((palm_set,f_tip_set,f_angle_set,phlanx_set))
            palm_set = []
            f_angle_set = []
            f_tip_set = []
            phlanx_set = []
            # print (feature_set)
            feature_list = []
            for feature in feature_set:
                for value in feature:
                    for val in value:
                        feature_list.append(val)
            
            feature_set = []
            # print (feature_list)
            feature_set_list.append(feature_list)
            # print feature_set_list
            if count%30 == 0:

                majority_vote = Counter()
                
                meanVel =  int(sum(v_set)/len(v_set))
                if meanVel < 100:
                    if dynamic == True:
                        responseString+=' '
                    static = True
                    dynamic = False
                    count=0
                    model = joblib.load('StaticData/StaticClassifier.pkl')
                    print ("Hello")
                    for sample in feature_set_list:
                        print(sample)                        
                        output= model.predict(np.array(sample).reshape(-1,dimensions))
                        print (chr(output+ord('a')) )
                        sys.exit(0)
                        majority_vote[chr(output+ord('a'))]+=1


                    prediction = Counter(majority_vote).most_common(1)[0]  
                    responseString+=prediction
                    feature_set_list = []
                    
                else:
                    if static == True:
                        responseString+=' '
                    dynamic = True
                    static = False
                    
                # print (meanVel)
                v_set = []
            
            # Only consider dynamic if 160 frames passed
            if dynamic and count>=160:

                best_possible = [] # stores the best score for each gesture
                for val in wordSet:
                        os.chdir('{}'.format(val)) #Enter gesture directory
                        distVal = []
                        for i in range(1,11): #Sample the 10 samples
                            sequence_set = []
                            with open('{}{}.csv'.format(val,i),'r') as csvfile:
                                reader = csv.reader(csvfile,lineterminator='\n')
                                for row in reader:
                                    sequence_set.append([float(x) for x in row])

                            print(feature_set_list)
                            distance,path = fastdtw(feature_set_list,sequence_set,dist=euclidean)
                            distVal.append((distance,val))

                        best_possible.append(min(distVal))
                        os.chdir('../')
                prediction = min(best_possible[1]) 
                count=0
                feature_set_list = []
                dynamic=False
            
    except Exception as ex:
        tb = traceback.format_exc()
        print ("Ye fuck kr rha hai: ",fuck)
        print (ex.__class__.__name__)
    finally:
        print (tb)
        sys.exit(0)
start_server = websockets.serve(hello, '192.168.31.92', 8761 )

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


def angle_between(v1, v2):
    c = np.dot(v1,v2)/np.linalg.norm(v1)/np.linalg.norm(v2)
    return c

