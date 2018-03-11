import csv
from hmmlearn import hmm
import os
import glob
import pandas as pd
from sklearn.hmm import GMMHMM
from sklearn.externals import joblib
def apply_pca(dataset):
    pcaModel = joblib.load('./pca2.pkl')
    return pcaModel.transform(dataset)

gesture = 'Sorry'
os.chdir('./'+gesture)
file_list = [i for i in glob.glob('*.csv')]
os.chdir('../')
print file_list
lengths = []
X = []
for file_name in file_list:
    print file_name
    dataset = pd.read_csv(gesture+'/'+file_name)
    dataset =  apply_pca(dataset.values)
    lengths.append(len(dataset))
    X.append(dataset)

# print X
model  = GMMHMM(n_components=7,n_mix=128,covariance_type="diag")
model.fit(X)
joblib.dump(model,'./HMMs/'+gesture+'.pkl')
