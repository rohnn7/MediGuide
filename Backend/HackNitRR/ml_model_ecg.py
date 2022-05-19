import numpy as np
import tensorflow as tf                                
import matplotlib.pyplot as plt
import os
plt.switch_backend('agg') 

###### Defining Architecture

#with tpu_strategy.scope():

#### Defining Hyperparameters
num_layers = 2
d_model = 128
num_heads = 8
dff = 256
max_seq_len = 186 #X_train.shape[1]
pe_input = 186
rate = 0.3
num_features = 1

###### Defining Layers
Input_layer = tf.keras.layers.Input(shape=(max_seq_len,num_features))

##### Convolutional Filters

### Layer-1
conv1 = tf.keras.layers.Conv1D(32,15,padding='same',activation='relu')
conv11 = tf.keras.layers.Conv1D(32,15,padding='same',activation='relu')
conv12 = tf.keras.layers.Conv1D(32,15,padding='same',activation='relu')
conv13 = tf.keras.layers.Conv1D(32,15,padding='same',activation='relu')

### Layer-2
conv2 = tf.keras.layers.Conv1D(64,15,padding='same',activation='relu')
conv21 = tf.keras.layers.Conv1D(64,15,padding='same',activation='relu')
conv22 = tf.keras.layers.Conv1D(64,15,padding='same',activation='relu')
conv23 = tf.keras.layers.Conv1D(64,15,padding='same',activation='relu')

### Layer-3
conv3 = tf.keras.layers.Conv1D(128,15,padding='same',activation='relu')
conv31 = tf.keras.layers.Conv1D(128,15,padding='same',activation='relu')
conv32 = tf.keras.layers.Conv1D(128,15,padding='same',activation='relu')
conv33 = tf.keras.layers.Conv1D(128,15,padding='same',activation='relu')

#### Channel Attention Module
#cam_module = CAM_Module(128,1)

##### Transfromer Layer
#transformer = Transformer(num_layers,d_model,num_heads,dff,pe_input,rate)

##### Output Layer
gap_layer = tf.keras.layers.GlobalAveragePooling1D()

###### Defining Architecture
##### Input Layer
Inputs = Input_layer

##### Network
#### Layer-1
conv1_up = conv1(Inputs)
conv_11 = conv11(conv1_up) 
conv_12 = conv12(conv_11)
conv_13 = conv13(conv_12)
conv_13 = tf.keras.layers.Add()([conv_13,conv_11])

#### Layer-2
conv2_up = conv2(conv_13)
conv_21 = conv21(conv2_up)
conv_22 = conv22(conv_21)
conv_23 = conv23(conv_22)
conv_23 = tf.keras.layers.Add()([conv_23,conv_21])

#### Layer-3
conv3_up = conv3(conv_23)
conv_31 = conv31(conv3_up)
conv_32 = conv32(conv_31)
conv_33 = conv33(conv_32)
conv_33 = tf.keras.layers.Add()([conv_33,conv_31])

##### Transformer
#embeddings =  transformer(inp=conv_33,enc_padding_mask=None)

##### CAM Module
#cam_op = cam_module(conv_33)
#cam_op = tf.keras.layers.Add()([cam_op,embeddings])

##### Output Layers
#### Initial Layers
gap_op = gap_layer(conv_33)
dense1 = tf.keras.layers.Dense(256,activation='relu')(gap_op)
dropout1 = tf.keras.layers.Dropout(0.3)(dense1)
dense2 = tf.keras.layers.Dense(256,activation='relu')(dropout1)
dense3 = tf.keras.layers.Dense(5,activation='softmax')(dense2)

##### Compiling Architecture            
model = tf.keras.models.Model(inputs=Inputs,outputs=dense3)
model.load_weights('./CSMR_ECG.h5')
model.compile(optimizer=tf.keras.optimizers.Adam(lr=1e-4),loss='sparse_categorical_crossentropy',metrics=['accuracy'])

###### Model Training 

##### Model Checkpointing
filepath = './CSMR_ECG.h5'
checkpoint = tf.keras.callbacks.ModelCheckpoint(filepath,monitor='val_accuracy',save_best_only=True,mode='max',save_weights_only=True)

###### Predictor Model
model_new = tf.keras.models.Model(inputs=model.input,outputs=model.layers[-2].output)
model_new.compile(tf.keras.optimizers.Adam(lr=1e-4,beta_1=0.99,beta_2=0.999,epsilon=1e-8),loss='sparse_categorical_crossentropy',metrics=['accuracy'])
model_new.summary()

###### Loading Dataset
X_dbs = np.array(np.load('X_dbs_ECG.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
y_dbs = np.array(np.load('y_dbs_ECG.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
Query_db = np.array(np.load('Query_db_ECG.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
Query_labels = np.array(np.load('Query_labels_ECG.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
Image_Database = np.array(np.load('Image_Database_ECG.npz',allow_pickle=True)['arr_0'],dtype=np.float16)

##### Function for index retrieval
def index_retrieve(query_img,model,m_total):
    
    """  
    Function to retrieve indexes of similar images from the 
    database of images.
    
    INPUTS:-
    1)query_img: The query image
    2)model: Deep Learning model for feature extraction
    3)m_total: Total number of images to be retrieved
    
    OUTPUTS:-
    1)rank_structure: Ranked list of dimension-(m_total*1)
                    consisting of sorted indexes of the 
                    the most relevant images from the 
                    database
                    
    Note:- compare_scores contains sorted data of similarity scores
    """
    
    ### Query Image Feature Extraction
    #query_img = tf.keras.preprocessing.image.apply_brightness_shift(query_img,(1.1))
    #query_img = tf.keras.preprocessing.image.apply_affine_transform(query_img,zx=0.7,zy=0.7)
    query_features = model.predict(np.reshape(query_img,(1,186,1)))

    ### Function to compare similarity between query and an image
    def compare(img1,img2):
        comp_op = np.sqrt(np.sum(np.square(img1-img2)))
        if(comp_op < 0):
            comp_op = -comp_op
        return comp_op
    
    ### Comparison and Sorting
    compare_scores = []
    for item in Image_Database:
        compare_scores.append(compare(item,query_features))
    
    sorted_compare_scores = list(np.sort(compare_scores))

    ### Indexing
    rank_structure = []
    for score_main in sorted_compare_scores:
        for idx,score_sub in enumerate(compare_scores):
            if((score_main == score_sub) and (idx not in rank_structure)):
                rank_structure.append(idx)
                break
    
    return (np.array(rank_structure)[:m_total])

##### Function to retrieve images as per ranked structure

def image_retrieve(rank_structure,query_label):
    
    """
    Function to retrieve the images
        
    INPUTS:-
    1)rank_structure: Ranked list of dimension-(m_total*1)
                    consisting of sorted indexes of the 
                    the most relevant images from the 
                    database
    2)query_label: Ground truth label of the query image
    
    """
    #### Image Retrieval
    
    X = []
    y = []
    
    for index_term in rank_structure:
        X.append(X_dbs[int(index_term)])
        #y.append(y_dbs[int(index_term)])
        #plt.imshow((X_dbs[int(index_term)])[:,:,0])
        #plt.show()
        #print('query label:'+' '+str(query_label))
        #print('image label:'+' '+str(y_dbs[int(index_term)])) 
        
    print(y)    
    X = np.array(X)
    y = np.array(y)
    print(X.shape)
    
    for i in range(10):
        plt.plot(np.arange(186),X[i])
        plt.savefig('./media/Results_ECG/'+str(i)+'.jpeg')
        plt.close()

    #for item in X:
    #   print(item)
        #plt.imshow(item[:,:,0],cmap='gray')
        #plt.show()
        #print('query label:'+' '+str(query_label))
        #print('Current Index = '+str(batch[i][1]))

    #batch = data_gen_dev.flow(X,y,shuffle=False,batch_size=1)
    #for i in range(10):
        #print('query label:'+' '+str(query_label))
        #print('Current Index = '+str(batch[i][1]))
        #plt.imshow((batch[i][0])[0,:,:,:])
        #plt.show()


#for i in range(30):
#    plt.savefig('./Graphs/tSNE/RDAHGR_SOLI_Tiny_CD_Train.png')
 
### Retrieval Results

for i in range(50): 
    plt.plot(np.arange(186),Query_db[i])
    plt.savefig('./media/Input_Files_ECG/'+str(i)+'.jpeg')
    plt.close()


# query_img = Query_db[20]
# rank_structure = index_retrieve(query_img,model_new,10)
# print(rank_structure)
# image_retrieve(rank_structure,0)
# print('========================================')
  
def model_function(i):
    query_img = Query_db[i]
    rank_structure = index_retrieve(query_img,model_new,10)
    print(rank_structure)
    image_retrieve(rank_structure,0)
    print('========================================')
 
