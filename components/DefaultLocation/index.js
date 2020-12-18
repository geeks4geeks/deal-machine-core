import React, { Component } from "react";
import { connect } from "react-redux";

import { ModalContainer, WebContainer, Wrapper, Copy, Input, Card, Row, Spin, Bold, Button } from "app/NativeComponents/common";
import { Header, PillButton } from "app/NativeComponents/snippets";


import {
  appRedirect,
  dismissMobileKeyboard,
  clearAutocomplete,
  getAutocomplete,
  updateUser
} from "app/NativeActions";

import OnboardingText from "app/DealMachineCore/snippets/OnboardingText";

class DefaultLocation extends Component {

  constructor(props){
    super(props);
    this.state={
      address: "",
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {

  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{remove: "default-location"}})
  }

  renderAutoComplete(){
    if(this.props.autocomplete_loading){
      return(
        <Wrapper style={{
          borderTopWidth: 1,
        borderTopColor: this.props.colors.border_color,
        borderTopStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid",
        backgroundColor: this.props.colors.background_color, padding:20, paddingTop: 10, paddingBottom: 10}}>
          <Row>
            <Spin size="small" /><Copy style={{marginLeft:10}}>Loading Suggestions...</Copy>
          </Row>
        </Wrapper>
      )
    }else if(this.props.autocomplete_items.length > 0 && this.state.address.length > 3){
      return(
        <Wrapper style={{backgroundColor: this.props.colors.background_color,
        borderTopWidth: 1,
        borderTopColor: this.props.colors.border_color,
        borderTopStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid"
      }}>
          <Wrapper style={{padding:20, paddingTop: 10, paddingBottom: 10}}>
            <Copy><Bold>Select An Option:</Bold></Copy>
          </Wrapper>
          {this.props.autocomplete_items.map((item, i)=>{
            return(
              <Button key={i} style={{padding:20, paddingTop: 10, paddingBottom: 10}} onPress={()=>{

                this.setState({
                  address: item.property_address_full,
                  latitude: parseFloat(item.location.latitude),
                  longitude: parseFloat(item.location.longitude),
                })
                this.props.clearAutocomplete();
              }}>
                <Copy>
                  {item.property_address_full}
                </Copy>
              </Button>
            )
          })}
        </Wrapper>
      )
    }
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




  saveDefaultLocation(){
    if(this.state.latitude && this.state.longitude){
      this.props.updateUser({
        token: this.props.token,
        type: "default_location",
        payload: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        }
      })
    }
  }

  renderSaveButton(){
    if(this.state.latitude && this.state.longitude){
      return(
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton onPress={()=>{
            this.saveDefaultLocation()
          }} primary={true}>
            Set Default Location
          </PillButton>
        </Row>
      )
    }
  }

  render() {

    return(
      <ModalContainer>
        <Header
          title="Set Default Location"
          leftButtonIcon={this.props.onboarding ? "blank" : "arrow-back"}
          leftButtonAction={()=>this.handleBack()}
        />
        <WebContainer>
          <Wrapper style={{padding: 20}}>
            <OnboardingText
              slug="defaultLocation"
              style={{
                padding: 0
              }}
              innerStyle={{
                padding: 20
              }}
            />
        
            <Card>
              <Wrapper>
                <Input
                  ref="address"
                  name="address"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  autoCapitalize="words"
                  keyboardType="default"
                  placeholder="Enter an address"
                  onChange={value => {
                    this.triggerAutocomplete(value);
                    this.setState({address: value, latitude: null, longitude: null})
                  }}

                  onSubmitEditing={()=>{}}
                  value={this.state.address}
                  type="text"
                />
                {this.renderAutoComplete()}
              </Wrapper>
            </Card>
            {this.renderSaveButton()}
          </Wrapper>
        </WebContainer>
      </ModalContainer>
    );



  }
}

const mapStateToProps = ({ auth, settings, native, property_map }) => {
  const { token, user, onboarding } = auth;
  const { colors } = settings;
  const { device, platform, isMobile } = native;

  const {
    autocomplete_loading, autocomplete_items, autocomplete_error
  } = property_map;
  return {
    token,
    user,
    colors,
    onboarding,
    device,
    platform,
    isMobile,
    autocomplete_loading, autocomplete_items, autocomplete_error
  }
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    clearAutocomplete,
    getAutocomplete,
    updateUser
  }
)(DefaultLocation);
