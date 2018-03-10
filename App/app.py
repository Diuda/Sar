import os, sys, inspect, thread, time
import numpy as np
import sys
sys.path.insert(0, 'C:\Users\diuda\Desktop\LeapDeveloperKit_3.2.0+45899_win\LeapSDK\lib')
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
        if self.frameCount == 300:
            # controller.set_policy(Leap.Controller.POLICY_ALLOW_PAUSE_RESUME)
            # controller.set_paused(True)
            with open('./Little/Little9.csv','wb') as csvfile:
                writer = csv.writer(csvfile)
                for feature in feature_set_list:
                    writer.writerow(feature)
            print "done"
            return
            
        frame =  controller.frame()
        hands = frame.hands
        if len(hands)==0:
            # print "bleh"
            return
        if self.frameCount==0:
            print "Starting"
            time.sleep(2)
        self.frameCount = self.frameCount+1
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
            return
        else:
            # cur_set = finger_set-self.prev_frame
            cur_set =  zip(finger_set,self.prev_frame)
            cur_feature_set = []

            for val in cur_set[:-1]:
                diff_vec = val[0]-val[1]
                x_comp = diff_vec.x
                y_comp = diff_vec.y
                z_comp = diff_vec.z
                vec = np.array([x_comp,y_comp,z_comp])
                magnitude = np.linalg.norm(vec)
                vec = vec/magnitude
                cur_feature_set.append(vec)


            self.prev_frame = finger_set
            for feature in finger_set:
                feature_set.append(feature.x)
                feature_set.append(feature.y)
                feature_set.append(feature.z)
            for feature in cur_feature_set:
                feature_set.append(feature[0])
                feature_set.append(feature[1])
                feature_set.append(feature[2])
            
            feature_set_list.append(feature_set)
                
            print feature_set

    

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