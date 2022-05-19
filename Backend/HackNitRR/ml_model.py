import numpy as np
import tensorflow as tf                                
import matplotlib.pyplot as plt
import os

plt.switch_backend('agg')


conv_model = tf.keras.applications.DenseNet121(input_shape=(224,224,3),weights=None,include_top=False)
model = conv_model.output
model = tf.keras.layers.GlobalAveragePooling2D()(model)
model = tf.keras.layers.Flatten()(model)
model = tf.keras.layers.BatchNormalization()(model)
model = tf.keras.layers.Dense(units=256,activation='relu',kernel_regularizer=tf.keras.regularizers.l2(0.01))(model)
model = tf.keras.layers.BatchNormalization()(model)
model = tf.keras.layers.Dense(units=128,activation='relu',kernel_regularizer=tf.keras.regularizers.l2(0.01))(model)
model = tf.keras.layers.BatchNormalization()(model)
model = tf.keras.layers.Dense(units=3,activation='softmax')(model) 
model = tf.keras.models.Model(inputs=conv_model.input,outputs=model)    

model.load_weights("DenseNet121_WLF.h5")
model.compile(tf.keras.optimizers.Adam(lr=1e-4,beta_1=0.99,beta_2=0.999,epsilon=1e-8),loss='sparse_categorical_crossentropy',metrics=['accuracy'])
model.summary()

model_new = tf.keras.models.Model(inputs=model.input,outputs=model.layers[-3].output)
model_new.compile(tf.keras.optimizers.Adam(lr=1e-4,beta_1=0.99,beta_2=0.999,epsilon=1e-8),loss='sparse_categorical_crossentropy',metrics=['accuracy'])


###### Loading Dataset
X_dbs = np.array(np.load('X_dbs.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
y_dbs = np.array(np.load('y_dbs.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
Query_db = np.array(np.load('Query_db.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
Query_labels = np.array(np.load('Query_labels.npz',allow_pickle=True)['arr_0'],dtype=np.float16)
Image_Database = np.array(np.load('Image_Database.npz',allow_pickle=True)['arr_0'],dtype=np.float16)

data_gen_dev = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./225,brightness_range=[1.1,1.1])

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
    query_img = tf.keras.preprocessing.image.apply_brightness_shift(query_img,(1.1))
    query_img = tf.keras.preprocessing.image.apply_affine_transform(query_img,zx=0.7,zy=0.7)
    query_features = model.predict(np.reshape(query_img,(1,224,224,3)))

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
        plt.imsave('./media/Results/'+str(i)+'.jpeg',X[i][:,:,0],cmap='gray')
        #plt.imhow(np.array(X[i]),cmap='gray')
        #plt.savefig('../media/Results/'+str(i)+'.jpeg')
        #plt.close()

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

#for i in range(30):
    #plt.imshow(np.array(Query_db[i]),cmap='gray')
#    plt.imsave('../media/Input_Files/'+str(i)+'.jpeg',Query_db[i][:,:,0],cmap='gray')
    #plt.savefig('../media/Input_Files/'+str(i)+'.png')
    #plt.close()



def model_function():
    query_img = Query_db[20]
    rank_structure = index_retrieve(query_img,model_new,10)
    print(rank_structure)
    image_retrieve(rank_structure,0)
    print('========================================')

# query_img = Query_db[2]
# rank_structure = index_retrieve(query_img,model_new,10)
# print(rank_structure)
# image_retrieve(rank_structure,0)
# print('========================================')

query_img = Query_db[2]
#rank_structure = index_retrieve(query_img,model_new,10)
#print(rank_structure)
#image_retrieve(rank_structure,0)
#print('========================================')
# '../media/Results'
#query_img = Query_db[5]
#rank_structure = index_retrieve(query_img,model_new,10)
#print(rank_structure)
#image_retrieve(rank_structure,0)
#print('========================================')
