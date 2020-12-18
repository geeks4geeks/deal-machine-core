import React, { Component } from 'react';
import {
  Wrapper,
  Button,
  Icon
} from 'app/NativeComponents/common';

class ClearButton extends Component{

  constructor(props) {
    super(props);
  }

  render(){

    if(this.props.focused && this.props.searchText){
      return(
        <Button onPress={()=>{
          this.props.clearAutocomplete();
          this.props.updateSearchBar({prop: "searchText", value: ""});

        }}
          style={{
            width: 30,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon
            icon={"cancel"}
            color={this.props.colors.light_text_color}
            size={18}
          />
        </Button>
      )
    }

    return <Wrapper />

  }
}


export default ClearButton;
