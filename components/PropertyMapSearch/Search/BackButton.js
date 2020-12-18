import React from 'react';
import {
  Wrapper,
  Button,
  Icon,
} from 'app/NativeComponents/common';

import {
  dismissMobileKeyboard
} from 'app/NativeActions'

const BackButton = (props) =>{

  return(
    <Button onPress={()=>{
      dismissMobileKeyboard();

      props.clearAutocomplete();
      props.updateSearchBar({prop: "searchText", value: ""});
      props.appRedirect({redirect: "goBack"})
    }}
      style={{
        width: 50,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Icon
        icon={"arrow-back"}
        size={28}
      />
    </Button>
  )

}


export default React.memo(BackButton);
