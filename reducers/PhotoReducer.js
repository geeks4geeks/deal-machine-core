import {
  LOGOUT,
  TOGGLE_IMAGE_PICKER,
  CANCEL_IMAGE_PICKER,
  SELECT_PHOTO,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
  UPLOAD_PROGRESS,
  UPLOAD_ANIMATION,
  RESET_PHOTO,
  TOGGLE_CAMERA
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  toggleImagePicker: false,
  source: null,
  uploading: false,
  uploaded: false,
  uploaded_animation: false,
  progress: 0,
  error: "",
  location: "",
  toggle_camera: true
}

export default (state = INITIAL_STATE, action) => {

  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case RESET_PHOTO:
      return {
        ...state,
        ...INITIAL_STATE
      }
    case CANCEL_IMAGE_PICKER:
      return {
        ...state,
        ...INITIAL_STATE,
        toggleImagePicker: false
      }
    case TOGGLE_IMAGE_PICKER:
      return {
        ...state,
        toggleImagePicker: action.payload
      }
    case SELECT_PHOTO:
      return {
        ...state,
        source: action.payload,
        location: action.payload

      }
    case UPLOAD_PHOTO:
      return {
        ...state,
        uploading: true,
        error: '',
        location: ''
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        location: action.payload
      }
    case UPLOAD_PHOTO_FAIL:
      return {
        ...state,
        uploading: false,
        progress: 0,
        error: action.payload
      }
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload.progress
      }
    case UPLOAD_ANIMATION:
      return{
        ...state,
        uploaded_animation: true
      }
    case TOGGLE_CAMERA:
      return{
        ...state,
        toggle_camera: action.payload
      }
    default:
      return state;
  }
}
