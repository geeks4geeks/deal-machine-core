import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Container, Wrapper, Copy, Spin, Row, KeyboardView } from 'app/NativeComponents/common';
import { Header, PillButton } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  updateList,
  getLists,
  toggleActionSheet,
  setActiveList,
  updateListFilter,
  clearAllLeadFilters
} from 'app/NativeActions';

import Body from './Body';

class EditList extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
      edit_active_list: props.active_list
    }

    this.editActiveList = this.editActiveList.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount(){
    if(!this.props.active_list){
      if(this.props.device == "desktop"){
        this.props.getLists({
          token: this.props.token,
          load_type: "refresh_single_list",
          list_id: this.props.match.params.id
        })
      }else{
        this.handleBack();
      }
    }else{
      this.props.getLists({
        token: this.props.token,
        load_type: "single_list",
        list_id: this.props.active_list.id
      })
    }
  }

  editActiveList({prop, value}){
    this.setState({
      edit_active_list: {
        ...this.state.edit_active_list,
        [prop]: value
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.active_list !== prevProps.active_list){
      this.setState({
        edit_active_list: this.props.active_list
      });

      if(this.props.active_list && prevProps.active_list){
        if(this.props.active_list.id != prevProps.active_list.id){
          this.props.getLists({
            token: this.props.token,
            load_type: "single_list",
            list_id: this.props.active_list.id
          })
        }
      }

    }
  }

  handleBack(){
    this.props.setActiveList(null);
    this.props.appRedirect({redirect: "goBack", payload:{type: "list_builder"}})
  }

  checkIfNeedsToSave(){
    if(this.props.active_list && this.state.edit_active_list){
      if(this.props.active_list.title !== this.state.edit_active_list.title ||
        parseInt(this.props.active_list.smart_list) !== parseInt(this.state.edit_active_list.smart_list) ||
        parseInt(this.props.active_list.start_marketing) !== parseInt(this.state.edit_active_list.start_marketing)

      ){
        return true;
      }
    }

    return false;
  }

  renderSaveButton(){
    if(this.checkIfNeedsToSave()){
      return(
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton primary={true} onPress={()=>this.saveList()}>
            Save List
          </PillButton>
        </Row>
      )
    }
  }

  saveList(){
    const { edit_active_list } = this.state;
    if(this.checkIfNeedsToSave()){
      this.props.updateList({
        token: this.props.token,
        type: "update_list",
        smart_list: edit_active_list.smart_list,
        start_marketing: edit_active_list.smart_list == 0 ? 0 : edit_active_list.start_marketing ? edit_active_list.start_marketing : 0,
        title: edit_active_list.title,
        list_id: edit_active_list.id
      })
    }
  }

  render(){
    if(this.props.refreshing_single_list_item){
      return(
        <Container>
          <Header
            title={"Edit List"}
            leftButtonIcon="arrow-back"
            leftButtonAction={this.handleBack}
          />
          <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
            <Row>
              <Spin size={"small"}/>
              <Copy style={{marginLeft: 10}}>Loading List...</Copy>
            </Row>
          </Wrapper>
        </Container>
      )
    }else if(this.props.active_list){
      return (
        <Container>
          <Header
            title={"Edit List"}
            leftButtonIcon="arrow-back"
            leftButtonAction={this.handleBack}
            rightButtonIcon={this.checkIfNeedsToSave() ? "check" : this.props.active_list.building == 1 ? "" : "more-vert"}
            rightButtonAction={this.checkIfNeedsToSave() ? ()=>{this.saveList()} : this.props.active_list.building == 1 ? ()=>{} : ()=>{
              this.props.toggleActionSheet("list_more");
            }}
          />
          <KeyboardView>
            <Body
              {...this.props}
              editActiveList={this.editActiveList}
              edit_active_list={this.state.edit_active_list}
            />
            {this.renderSaveButton()}
          </KeyboardView>
        </Container>
      )
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, native, settings, list, billing }) => {
  const { token, user } = auth;
  const { device, isMobile, platform, isIphoneX } = native;
  const { colors } = settings;
  const { plan_modules, card_info } = billing;

  const {
    active_list,
    loading_single_list_item,
    refreshing_single_list_item
  } = list;

  return {
    token,
    user,
    device,
    isMobile,
    platform, isIphoneX,
    colors,

    active_list,
    loading_single_list_item,
    refreshing_single_list_item,

    plan_modules, card_info
  }
}



export default connect(mapStateToProps, {
  appRedirect,
  updateList,
  getLists,
  toggleActionSheet,
  setActiveList,
  updateListFilter,
  clearAllLeadFilters
})(EditList);
