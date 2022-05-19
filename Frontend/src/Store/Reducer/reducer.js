import * as actions from '../Action/actionType'

const initialState ={
    test:null,
    login_user:null,
    register_user:null,
    hospitals:null,
    doctor:null,
    image:null,
    results:null,
    results_ecg:null
}
 const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actions.TEST):
            return{
                ...state,
                test:1
            }    
        case(actions.LOGIN):
            return{
                ...state,
                login_user:action.payload
            }                            
        case(actions.REGISTER):
            return{
                ...state,
                register_user:action.payload
            }  
        case(actions.HOSPITAL):
            return{
                ...state,
                hospitals:action.payload
            }   
        case(actions.CREATEDOCTOR):
            return{
                ...state,
                doctor:action.payload
            }   
        case(actions.UPLOADIMAGE):
            return{
                ...state,
                image:action.payload
            }      
        case(actions.RESULTS):
            return{
                ...state,
                results:action.payload
            } 
        case(actions.RESULTSECG):
            return{
                ...state,
                results:action.payload
            } 
        default:
            return state    
    }
 }

 export default reducer