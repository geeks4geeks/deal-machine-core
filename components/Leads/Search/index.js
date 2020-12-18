import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Card,
  Row,
  Icon,
  Copy,
  Bold,
  Button,
  Form,
  Input,
  DropzoneButton
} from 'app/NativeComponents/common';

import {
  mobileToggleDrawer,
  toggleDrawer,
  toggleActionSheet,
  updateMapLocation,
  selectActiveProperty,
  getAutocomplete,
  clearAutocomplete,
  focusSearchBar,
  uploadList,
  appRedirect
} from 'app/NativeActions';

import MenuButton from './MenuButton';
import ClearButton from './ClearButton';
import OptionsButton from './OptionsButton';
import SearchItems from './SearchItems';

class Search extends Component{

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      searchText: ""
    }
  }

  updateSearchBar({prop, value}){

    this.setState({
      [prop]: value
    });

    if(prop === "focused"){
      this.props.focusSearchBar(value)
    }
  }

  componentDidMount(){
    this.props.clearAutocomplete();
  }
  componentWillUnmount(){
    clearInterval(this._search_interval);
    clearInterval(this._blur_interval);
  }

  triggerSearch(value){

    this.props.clearAutocomplete();
    if(value.length > 3){

       clearInterval(this._search_interval);
       this._search_interval = setTimeout(()=>{

         this.props.getAutocomplete({
          token: this.props.token,
          type: "leads",
          search: value
         });
       }, 250);
     }
  }

  renderUploadButton(){
    if(!this.props.isMobile && this.props.device == "desktop" && this.props.user.team_clearance_level > 0){
      return(
        <DropzoneButton
          accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onDrop={(acceptedFiles)=>{
            this.props.uploadList({
              acceptedFiles: acceptedFiles,
              token: this.props.token,
              type: "bulk_list"
            });
          }}
        >
          <Wrapper style={{padding: 20, paddingRight: 10, alignItems: "center", justifyContent: "center"}} className="deal-button">
            <Row>
              <Icon
                icon="file-upload"
                size={18}
                style={{marginRight: 5}}
              />
              <Copy><Bold>Import List</Bold></Copy>
            </Row>
          </Wrapper>
        </DropzoneButton>
      )
    }
  }

  render(){

    if(!this.props.tap_to_add){
      return (
          <Wrapper style={{
            width: "100%"
          }}>
            <Card style={{marginTop: this.props.isIphoneX ? 42 : this.props.platform === "ios" ? 25 : 12}}>
              <Row>
                <MenuButton
                focused={this.state.focused}
                updateSearchBar={this.updateSearchBar.bind(this)}
                {...this.props}
                />

                <Form onSubmit={()=>{
                  //this.triggerSearch(this.state.searchText);
                }} style={{
                  flex: 1
                }}>
                  <Input
                    style={{
                      borderBottomWidth: 0,
                      flex: 1
                    }}
                    ref="search"
                    name="search"
                    returnKeyType={"search"}
                    blurOnSubmit={true}
                    autoCorrect={false}
                    autoFocus={false}
                    keyboardType="default"
                    placeholder={this.props.user.team_clearance_level > 0 ? "Search Leads" : "Search My Leads"}
                    onChange={value => {
                      //location search

                      this.triggerSearch(value);
                      this.updateSearchBar({prop: "searchText", value})
                    }}
                    onSubmitEditing={()=>{
                      this.props.clearAutocomplete();
                      this.triggerSearch(this.state.searchText);
                    }}

                    onFocus={()=>{
                      this.updateSearchBar({prop: "focused", value: true})
                    }}
                    onBlur={()=>{
                      clearInterval(this._blur_interval);
                      this._blur_interval = setTimeout(()=>{
                        this.updateSearchBar({prop: "focused", value: false});
                      }, 100);
                    }}

                    value={this.state.searchText}
                    type="text"
                  />

                </Form>
                <ClearButton
                  {...this.props}
                  focused={this.state.focused}
                  searchText={this.state.searchText}
                  updateSearchBar={this.updateSearchBar.bind(this)}
                />

                {
                  this.renderUploadButton()
                }
                <Button style={{padding: 20, paddingLeft: 10, alignItems: "center", justifyContent: "center"}} onPress={()=>{
                  this.props.appRedirect({
                    redirect: "goForward",
                    payload:{
                      add: "manually-add-lead"
                    }
                  })
                }}>
                  <Row>
                    <Icon
                      icon="add"
                      size={18}
                      style={{marginRight: 5}}
                    />
                    <Copy><Bold>Add Lead</Bold></Copy>
                  </Row>
                </Button>

              </Row>
              <SearchItems
                {...this.props}
                focused={this.state.focused}
                updateSearchBar={this.updateSearchBar.bind(this)}
              />
            </Card>
          </Wrapper>
      )
    }

    return <Wrapper />
  }
}



const mapStateToProps = ({ auth, settings, property_map, lead, native }) => {

  const { token, user } = auth;
  const { window_width, window_height, isIphoneX, platform, device, mobile_toggle_drawer, isMobile } = native;
  const { colors } = settings;
  const {
    autocomplete_loading, autocomplete_items, autocomplete_error
  } = property_map;

  const {
    list_properties_page
  } = lead;

  return {
    token,
    user,
    colors,
    window_width,
    window_height,
    isIphoneX,
    isMobile,
    platform,
    autocomplete_loading,
    autocomplete_items,
    autocomplete_error,

    device,
    mobile_toggle_drawer,

    list_properties_page
  }
}


export default connect(mapStateToProps, {
  mobileToggleDrawer,
  toggleDrawer,
  toggleActionSheet,
  updateMapLocation,
  selectActiveProperty,
  getAutocomplete,
  clearAutocomplete,
  focusSearchBar,
  uploadList,

  appRedirect
})(Search);
