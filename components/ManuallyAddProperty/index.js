import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, Scroll, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  addDeal,
  appRedirect,
  clearAutocomplete,
  getAutocomplete,
  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class ManuallyAddProperty extends Component{


  constructor(props){
    super(props);

    this.state = {
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: ""
    }
  }

  handleBack(){
    /*mobile*/
    dismissMobileKeyboard();

    this.props.appRedirect({redirect: "goBack", payload:{remove: "manually-add-lead"}})

  }

  addProperty(){
    this.props.addDeal({
      token:this.props.token,
      property: {
        from_data_source_id: "manual",
        from_data_source: "address"
      },
      add_type: "manual",
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      devicetype: this.props.device+"_manual"
    })

  }

  updateAddressState({prop, value}){
    this.setState({[prop]: value});
  }

  autocompleteAddress(){

  }

  componentWillUnmount(){
    clearInterval(this._autocomplete_interval);
    clearInterval(this._blur_interval);
  }

  triggerAutocomplete(value){

    this.props.clearAutocomplete();
    if(value.length > 3 && !this.props.autocomplete_loading){
     clearInterval(this._autocomplete_interval);
     this._autocomplete_interval = setTimeout(()=>{
       this.props.getAutocomplete({
        token: this.props.token,
        type: "address",
        search: value
       });
     }, 250);
   }
  }

  setAddressFields({address, address2, city, state, zip}){
    this.setState({
      address: address,
      address2: address2,
      city: city,
      state: state,
      zip: zip
    })
  }


  render(){

    return(
      <ModalContainer style={{maxWidth: 700}}>
        <Header
          title="Manually Add Lead"
          leftButtonIcon="arrow-back"

          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon="check"
          rightButtonAction={this.addProperty.bind(this)}
        />
        <Scroll>
          <KeyboardView>
            <Body
              {...this.props}
              triggerAutocomplete={this.triggerAutocomplete.bind(this)}
              setAddressFields={this.setAddressFields.bind(this)}
              addProperty={this.addProperty.bind(this)}
              updateAddressState={this.updateAddressState.bind(this)}
              address={this.state.address}
              address2={this.state.address2}
              city={this.state.city}
              state={this.state.state}
              zip={this.state.zip}

            />
          </KeyboardView>
        </Scroll>
      </ModalContainer>
    )
  }
}

const mapStateToProps = ({ auth, native, property_map, settings }) => {
  const { token, user } = auth;
  const { states, colors } = settings;
  const { device } = native;

  const {
    autocomplete_loading, autocomplete_items, autocomplete_error
  } = property_map;

  return {
    token,
    user,
    states,
    device,
    colors,
    autocomplete_loading, autocomplete_items, autocomplete_error
  }
}



export default connect(mapStateToProps, {
  addDeal,
  clearAutocomplete,
  getAutocomplete,
  appRedirect
})(ManuallyAddProperty);
