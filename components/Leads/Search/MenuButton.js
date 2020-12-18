import React, { Component } from 'react';
import {
  Wrapper,
  Button,
  Icon,
} from 'app/NativeComponents/common';

import {
  dismissMobileKeyboard
} from 'app/NativeActions'

class MenuButton extends Component{

  constructor(props) {
    super(props);
  }

  render(){



    if(this.props.focused || this.props.autocomplete_items.length > 0){

      return(
        <Button onPress={()=>{
          dismissMobileKeyboard();

          this.props.clearAutocomplete();
          this.props.updateSearchBar({prop: "showAutocompleteOptions", value: false});
          this.props.updateSearchBar({prop: "searchText", value: ""});
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

    }

    if(this.props.navigation && this.props.device == "mobile"){
      if(this.props.navigation.state){
        if(this.props.navigation.state.params){
          if(this.props.navigation.state.params.back_button == true){
            return(
              <Button onPress={()=>{
                dismissMobileKeyboard();
                this.props.appRedirect({redirect: "goBack"});
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
        }
      }
    }


    if(this.props.device == "desktop"){
      return(
        <Button
          onPress={()=>this.props.mobileToggleDrawer(!this.props.mobile_toggle_drawer)}
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
        this.props.toggleDrawer("open");
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


export default MenuButton;
