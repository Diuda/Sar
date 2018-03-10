import os, sys, inspect, thread, time

import sys
sys.path.insert(0, '/home/codeplayer/Desktop/LeapMotion/LeapDeveloperKit_2.3.1+31549_linux/LeapSDK/lib')
import Leap
# from Leap import Controller
import csv
feature_set_list = []

class LeapListener(Leap.Listener):

    def on_connect(self,controller):
        print "Connected"

    def on_init(self, controller):
        self.frameCount = 0
        self.prev_frame = []
        print ("Initialized")
    
    def on_frame(self,controller):
        if self.frameCount == 200:
            # controller.set_policy(Leap.Controller.POLICY_ALLOW_PAUSE_RESUME)
            # controller.set_paused(True)
            with open('./TrainData/train_data3.csv','wb') as csvfile:
                writer = csv.writer(csvfile)
                for feature in feature_set_list:
                    writer.writerow(feature)
            print "done"
            
        self.frameCount = self.frameCount+1
        frame =  controller.frame()
        hands = frame.hands
        feature_set = []
        hand_present = False
        for hand in hands:
            hand_present = True
            finger_set = []
            palm_position = hand.palm_position
            for finger in hand.fingers:
                tip = finger.tip_position
                finger_set.append(tip)
            finger_set.append(palm_position)
        
        if not hand_present:
            return

        if  self.frameCount==1:
            self.prev_frame = finger_set
        else:
            # cur_set = finger_set-self.prev_frame
            cur_set =  zip(finger_set,self.prev_frame)
            cur_feature_set = []
            for val in cur_set:
                diff_vec = val[0]-val[1]
                cur_feature_set.append(diff_vec)
            
        

            self.prev_frame = finger_set
            for feature in cur_feature_set:
                feature_set.append(feature.x)
                feature_set.append(feature.y)
                feature_set.append(feature.z)
            feature_set_list.append(feature_set)


    

    def on_disconnect(self,controller):
        pass
    
    def on_exit(self,controller):
        pass
    
    

def main():


    listener = LeapListener()
    controller = Leap.Controller()
    controller.add_listener(listener)
    # Keep this process running until Enter is pressed
    print "Press Enter to quit..."
    try:
        sys.stdin.readline()
    except KeyboardInterrupt:
        pass
    finally:
        controller.remove_listener(listener)

if __name__ == "__main__":
    main()