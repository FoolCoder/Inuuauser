import {SETDETAILS} from '../actions/actionTypes'

const initialState={
  name:'Jhon Doe',
  number:'+92000000' 
};

const reducer =(state=initialState,action)=>{
  switch(action.type){
    case SETDETAILS:
      return{
        ...state,
            name:action.details.name,
            Number:action.details.number
      }
    default:
      return state;
  }
};

export default reducer;