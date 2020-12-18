import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, Scroll, Row, Wrapper, Title, Copy } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  toggleCanPop,
  changeTab,
  lockDrawer,
  updateUserListSettings
} from 'app/NativeActions';

import ListView from './ListView';
import SearchBar from './SearchBar';

class LeadOptions extends Component {

  constructor(props){

    super(props);

    this.state = {
      column_search: "",
      list_columns: props.list_settings ?
        props.list_settings.user_list_columns ?
          props.list_settings.user_list_columns : [] : []
    }
  }

  updateColumnSearch(value){
    this.setState({column_search: value})
  }


  componentDidUpdate(prevProps){
    if(this.props.list_settings !== prevProps.list_settings){
      this.setState({list_columns: this.props.list_settings.user_list_columns ? this.props.list_settings.user_list_columns : []})
    }
  }

  checkListItem(item){
    if(item.main_column !== true){
      this.setState({
        list_columns:this.state.list_columns.map((column)=>{
          if(column.slug === item.slug){
            return{
              ...column,
              show: !column.show
            }
          }
          return column;
        })
      })
    }
  }

  reorderItems(data){
    this.setState({
      list_columns: data
    })
  }

  checkIfNeedsToSave(){
    if(this.props.list_settings){
      if(this.state.list_columns !== this.props.list_settings.user_list_columns){
        return true;
      }
    }
    return false;
  }

  checkIfNeedsToClear(){
    if(this.props.list_settings){
      if(this.state.list_columns !== this.props.list_settings.default_columns){
        return true;
      }
    }
    return false;
  }

  render() {

    return (
      <ModalContainer>
        <Header
          title={"Lead Options"}
          leftButtonIcon={"arrow-back"}
          leftButtonAction={()=>{
            this.props.appRedirect({redirect: "goBack", payload:{remove: "lead-options"}});
          }}

          rightButtonTitle={this.checkIfNeedsToClear() ? "Reset To Defaults" : ""}
          rightButtonAction={()=>{
            this.setState({list_columns: this.props.list_settings.default_columns})
          }}

          rightButtonTitle2={this.checkIfNeedsToSave() ? "Save Options" : ""}
          rightButtonAction2={()=>{
            this.props.updateUserListSettings({token: this.props.token, user_list_columns: this.state.list_columns})
          }}


        />
        <Scroll>
          <Wrapper style={{padding: 20}}>
            <Title>Update your list options</Title>
            <Copy>Re-order the list, show/hide columns, and choose which four columns show on your mobile lists.</Copy>
          </Wrapper>
          <SearchBar
            column_search={this.state.column_search}
            updateColumnSearch={this.updateColumnSearch.bind(this)}
          />
          <ListView
            {...this.props}
            column_search={this.state.column_search}
            reorderItems={this.reorderItems.bind(this)}
            list_columns={this.state.list_columns}
            checkListItem={this.checkListItem.bind(this)}
          />
        </Scroll>
      </ModalContainer>
    );
  }

}

const mapStateToProps = ({ auth, native, settings, filter }) => {
  const { token, user } = auth;
  const { platform, device, isMobile } = native;
  const { colors } = settings;
  const { list_settings } = filter;

  return {
    token,
    user,
    platform,
    colors,
    device,
    isMobile,
    list_settings
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  toggleCanPop,
  changeTab,
  lockDrawer,
  updateUserListSettings
})(LeadOptions);
