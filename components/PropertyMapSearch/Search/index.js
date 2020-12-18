import React, { PureComponent } from 'react';
import {
  Wrapper,
  Card,
  Row,
  Form,
  Input
} from 'app/NativeComponents/common';


import BackButton from './BackButton';
import ClearButton from './ClearButton';
import SearchItems from './SearchItems';

class Search extends PureComponent{

  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    }
  }

  updateSearchBar({prop, value}){
    this.setState({
      [prop]: value
    });
  }

  componentWillUnmount(){
    clearInterval(this._search_interval);
    clearInterval(this._blur_interval);
  }

  triggerSearch(value){

    this.props.clearAutocomplete();
    if(value.length > 2){

       clearInterval(this._search_interval);
       this._search_interval = setTimeout(()=>{

         this.props.getAutocomplete({
          token: this.props.token,
          search: value
         });
       }, 250);
     }
  }

  render(){

    return (
        <Wrapper style={{
          width: "100%"
        }}>
          <Card style={{marginTop: this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12}}>
            <Row>
              <BackButton
                updateSearchBar={this.updateSearchBar.bind(this)}
                clearAutocomplete={this.props.clearAutocomplete}
                mobileToggleDrawer={this.props.mobileToggleDrawer}
                device={this.props.device}
                mobile_toggle_drawer={this.props.mobile_toggle_drawer}
                toggleIsPanDraging={this.props.toggleIsPanDraging}
                toggleDrawer={this.props.toggleDrawer}
                autocomplete_items={this.props.autocomplete_items}
                appRedirect={this.props.appRedirect}
              />

              <Form onSubmit={()=>{
                //this.triggerSearch(this.state.searchText);
              }} style={{
                flex: 1
              }}>
                <Input
                  style={{
                    borderBottomWidth: 0
                  }}
                  ref="search"
                  name="search"
                  returnKeyType={"search"}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  autoFocus={true}
                  keyboardType="default"
                  placeholder={this.props.user.team_clearance_level > 0 ? "Search Map" : "Search Map"}
                  onChange={value => {
                    //location search

                    this.triggerSearch(value);
                    this.updateSearchBar({prop: "searchText", value})
                  }}
                  onSubmitEditing={()=>{
                    this.props.clearAutocomplete();
                    this.triggerSearch(this.state.searchText);
                  }}



                  value={this.state.searchText}
                  type="text"
                />

              </Form>
              <ClearButton
                {...this.props}
                searchText={this.state.searchText}
                updateSearchBar={this.updateSearchBar.bind(this)}
                colors={this.props.colors}
              />
            </Row>
            <SearchItems
              {...this.props}
              updateSearchBar={this.updateSearchBar.bind(this)}

            />


          </Card>
        </Wrapper>
    )

  }
}


export default Search;
