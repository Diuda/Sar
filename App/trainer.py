import csv
from sklearn.decomposition import PCA
import pandas as pd
import numpy as np
import csv
from sklearn.externals import joblib

X =  []
Y = []
for i in range(1,5):
    # if i==6:
        # continue
    dataset = pd.read_csv('./TrainData/train_data'+str(i)+'.csv')
    # print dataset.values.shape
    # for val in dataset:
    print "Shape: ", dataset.values.shape
    X.extend(dataset.values)
X = np.array(X)
print X.shape
# print X
# count =0 
# for val in X:
#     for sample in val:
#         count = count+1
#     # print val
#     # print "Length:  ", len(val)
#         Y.append(sample)
#         if count==2:
#             print Y

# print Y

pca = PCA(n_components = 18)

# Y = np.array(Y)

# print X.shape
pca=pca.fit(X)
post = pca.transform(X)
with open('./TrainData/train_data_pca2.csv','wb') as csvfile:
    writer = csv.writer(csvfile)
    for feature in post:
        writer.writerow(feature)
print "Chud gaye"
joblib.dump(pca, 'pca3.pkl')     