import React from 'react';
import {
  Wrapper,
  Button,
  Icon
} from 'app/NativeComponents/common';

const ClearButton = (props) =>{
  if(props.focused && props.searchText){
    return(
      <Button onPress={()=>{
        props.clearAutocomplete();
        props.updateSearchBar({prop: "searchText", value: ""});
      }}
        style={{
          width: 30,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          icon={"cancel"}
          color={props.colors.light_text_color}
          size={18}
        />
      </Button>
    )
  }
  return <Wrapper />;
}


export default React.memo(ClearButton);
