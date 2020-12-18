import {
  LOGOUT,
  GET_TEMPLATES_SUCCESS,
  CREATE_TEMPLATE_SUCCESS,
  GET_TEMPLATE_SUCCESS,

  GET_SIGNATURES,
  REFRESH_SIGNATURES,
  GET_SIGNATURES_FAIL,
  GET_SIGNATURES_SUCCESS,
  GET_SIGNATURE,
  GET_SIGNATURE_FAIL,
  GET_SIGNATURE_SUCCESS,

  SIGNATURE_INIT,
  SIGNATURE_RESET,
  SIGNATURE_FIELD_CHANGED,
  SAVE_SIGNATURE,
  SAVE_SIGNATURE_SUCCESS,
  CREATE_SIGNATURE_SUCCESS,
  SAVE_SIGNATURE_FAIL,
  DELETE_SIGNATURE,

  SELECT_SIGNATURE_PHOTO,
  UPLOAD_SIGNATURE_PHOTO_SUCCESS

} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  signatures: [],
  signature_error: '',
  signature_loading: false,
  refreshing: false,
  editSignature:null,
  originalSignature: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case GET_TEMPLATE_SUCCESS:
    case GET_TEMPLATES_SUCCESS:
    case CREATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        signatures: action.payload.signatures ? action.payload.signatures : state.signatures,
      };

    case GET_SIGNATURE:
      return {
        ...state,
        signature_loading: true,
        editSignature: INITIAL_STATE.editSignature,
        originalSignature: INITIAL_STATE.originalSignature,
        signature_error: ''
      };
    case GET_SIGNATURE_SUCCESS:
      return {
        ...state,
        signature_loading: false,
        editSignature: action.payload.signature,
        originalSignature: action.payload.signature
      };
    case GET_SIGNATURES:
      return {
        ...state,
        signature_loading: true,
        signatures: [],
        signature_error: ''
      };
    case GET_SIGNATURES_FAIL:
      return {
        ...state,
        refreshing: false,
        signature_loading: false,
        signature_error: action.payload
      };
    case REFRESH_SIGNATURES:
      return {
        ...state,
        refreshing: true,
        signatures: [],
        signature_error: ''
      };
    case GET_SIGNATURES_SUCCESS:
      return {
        ...state,
        signature_loading: false,
        refreshing: false,
        signatures: action.payload.signatures
      };
    case SAVE_SIGNATURE_FAIL:
      return {
        ...state,
        refreshing: false,
        signature_error: action.payload
      };
    case SAVE_SIGNATURE:
      return {
        ...state,
        signature_error: ''
      };
    case CREATE_SIGNATURE_SUCCESS:
      return {
        ...state,
        refreshing: false,
        signatures: action.payload.signatures ? action.payload.signatures : state.signatures
      };
    case SAVE_SIGNATURE_SUCCESS:
      return {
        ...state,
        refreshing: false,
        signatures: action.payload.signature ?
          state.signatures.map(
             (signature, i) => signature.id == action.payload.signature.id ? action.payload.signature : signature
          ) : state.signatures
      };
    case DELETE_SIGNATURE:
      return{
        ...state,
        signatures: state.signatures.filter(({id}) => id != action.payload.signature_id)
      }
    case SIGNATURE_INIT:
      return {
        ...state,
        editSignature: action.payload.signature,
        originalSignature: action.payload.signature
      };
    case SIGNATURE_RESET:
      return {
        ...state,
        editSignature: INITIAL_STATE.editSignature,
        originalSignature: INITIAL_STATE.originalSignature
      };

    case SIGNATURE_FIELD_CHANGED:
      return {
        ...state,
        editSignature: {
          ...state.editSignature,
          [action.payload.prop]: action.payload.value
        }
      };
    case SELECT_SIGNATURE_PHOTO:
      return {
        ...state,
        editSignature:{
          ...state.editSignature,
          signature_image: action.payload.uri
        }
      };
    case UPLOAD_SIGNATURE_PHOTO_SUCCESS:
      return {
        ...state,
        editSignature:{
          ...state.editSignature,
          signature_image: action.payload
        }
      }
    default:
      return state;
  }
}
