import React from 'react';
import {
  Wrapper,
  Button,
  Icon,
} from 'app/NativeComponents/common';

import {
  dismissMobileKeyboard
} from 'app/NativeActions'

const MenuButton = (props) =>{

  if(props.focused || props.autocomplete_items.length > 0){
    return(
      <Button onPress={()=>{
        dismissMobileKeyboard();

        props.clearAutocomplete();
        props.updateSearchBar({prop: "showAutocompleteOptions", value: false});
        props.updateSearchBar({prop: "searchText", value: ""});
      }}
        style={{
          width: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          icon={"close"}
          size={28}
        />
      </Button>
    )

  }else{


    if(props.device == "desktop"){
      return(
        <Button
          onPress={()=>props.mobileToggleDrawer(!props.mobile_toggle_drawer)}
          style={{
          width: 50,
          alignItems:"center",
          justifyContent: "center",
        }}>

          <Icon
            icon={"menu"}
            size={28}
          />
        </Button>
      );
    }


    return(
      <Button onPress={()=>{
        props.toggleIsPanDraging(true);
        props.toggleDrawer("open");
      }}
        style={{
          width: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          icon={"menu"}
          size={28}
        />
      </Button>
    )
  }
}


export default React.memo(MenuButton);
