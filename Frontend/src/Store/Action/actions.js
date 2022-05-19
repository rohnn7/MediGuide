import * as actions from './actionType'
import axios from 'axios'


export const test= ()=>{
    return{
        type:actions.TEST,

    }
}

export const login = data=>{
    return{
        type:actions.LOGIN,
        payload: data
    }
}

export const register = data=>{
    return{
        type:actions.REGISTER,
        payload: data
    }
}

export const hospital = data=>{
    return{
        type:actions.HOSPITAL,
        payload: data
    }
}

export const doctor = data=>{
    return{
        type:actions.CREATEDOCTOR,
        payload: data
    }
}

export const image = data=>{
    return{
        type:actions.UPLOADIMAGE,
        payload: data
    }
}

export const results = data=>{
    return{
        type:actions.RESULTS,
        payload: data
    }
}

export const results_ecg = data=>{
    return{
        type:actions.RESULTSECG,
        payload: data
    }
}



export const onLogin=(authData)=>{
    return dispatch=>{

        axios.post('http://127.0.0.1:8000/api/main/user/login/', authData)
              .then(response=>{
                console.log(response.data)  
                dispatch(login(response.data))   
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}

export const onRegister=(authData)=>{
    return dispatch=>{

        axios.post('http://127.0.0.1:8000/api/main/user/register/', authData)
              .then(response=>{
                console.log(response.data)  
                localStorage.setItem('pk', response.data.pk)
                dispatch(register(response.data))   
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}


export const onHospital=()=>{
    return dispatch=>{

        axios.get('http://127.0.0.1:8000/api/main/hospital/list')
              .then(response=>{
                console.log(response.data)  
                dispatch(hospital(response.data))   
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}

export const onDoctor=(authData)=>{
    return dispatch=>{

        axios.post('http://127.0.0.1:8000/api/main/doctor/create/', authData)
              .then(response=>{
                console.log(response.data)  
                dispatch(doctor(response.data))   
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}

export const onImage=(authData)=>{
    return dispatch=>{

        axios.post('http://127.0.0.1:8000/api/main/image/upload/', authData)
              .then(response=>{
                console.log(response.data)  
                dispatch(image(response.data))   
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}

export const onResult=(authData)=>{
    return dispatch=>{

        axios.post('http://127.0.0.1:8000/api/main/ml/', authData)
              .then(response=>{
                console.log(response.data)  
                dispatch(results(response.data))   
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}

export const onResultECG=(authData)=>{
    return dispatch=>{

        axios.post('http://127.0.0.1:8000/api/main/ml_ecg/', authData)
              .then(response=>{
                console.log(response.data)  
                dispatch(results_ecg(response.data))   
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}

