import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Card,
  Form,
  KeyboardView,
  Copy,
  ModalContainer
} from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import ListView from './ListView';
import {
  appRedirect,
  getTags,
  updateTagSearch,

  updateLead,

  dismissMobileKeyboard
} from 'app/NativeActions';

import SearchBar from './SearchBar';
import Footer from './Footer'
class Lists extends Component {


  constructor(props){
    super(props);

    this.state = {
      selected_tags: props.tag_modal ? props.tag_modal.selected_tags : [],
      selected_leads: props.tag_modal ? props.tag_modal.selected_leads : []
    }
  }

  componentDidMount(){
    if(!this.props.tag_modal){
      this.handleBack();
    }else if(this.props.all_tags.length === 0){
      this.searchTags();
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.selected_tags && this.state.selected_tags && this.props.tag_modal){
      if(prevState.selected_tags.length !== this.state.selected_tags.length){
        if(this.props.tag_modal.fieldsUpdated){
          this.props.tag_modal.fieldsUpdated(this.state.selected_tags);
        }
      }
    }
  }

  checkItem(tag_item){

    let found_tag = false;
    for(let i = 0; i<this.state.selected_tags.length; i++){
      if(this.state.selected_tags[i].id === tag_item.id){
        found_tag = true;
      }
    }
    if(found_tag){
      this.setState({
        selected_tags: this.state.selected_tags.filter(({id}) => id !== tag_item.id)
      })
    }else{
      this.setState({
        selected_tags: [...this.state.selected_tags, tag_item]
      })
    }

  }

  confirmUpdate(){

    dismissMobileKeyboard();

    if(this.props.tag_modal.modalAction){
      this.props.tag_modal.modalAction({
        selected_leads:this.state.selected_leads,
        selected_tags:this.state.selected_tags
      })
    }
  }

  clearAll(){
    this.setState({
      selected_tags: []
    })
  }

  searchTags(search){
    if(!this.props.tags_loading){
      this.props.getTags(this.props.token, search)
    }
  }

  renderRightButtonText(){

    if(this.props.isMobile){
      return "Update Lead";
    }

    return this.state.selected_tags.length > 0 ? this.state.selected_tags.length === 1 ?
        "Update with 1 Selected Tag" :
        "Update with "+this.state.selected_tags.length+" Selected Tags" : "Update Lead";
  }


  handleBack(){

    dismissMobileKeyboard();

    if(this.props.tag_modal){
      if(this.props.tag_modal.cancelAction){
        this.props.tag_modal.cancelAction();
      }
    }
    this.props.appRedirect({redirect: "goBack", payload:{remove: "tags"}});
  }


  render() {
    if(this.props.tag_modal){
      return (

        <ModalContainer
          is_loading={this.props.is_loading}
          popoverWidth={300}
          popoverTarget={
            this.props.tag_modal.popoverTarget ?
              this.props.tag_modal.popoverTarget : null}
            hidePopover={this.props.tag_modal.popoverTarget ? ()=>{

              this.handleBack();
            } : ()=>{}}
            popoverPlacement={this.props.tag_modal.popoverPlacement}
        >

          <Header
            title={this.props.tag_modal.title}
            leftButtonIcon={this.props.tag_modal.popoverTarget && this.props.device === "desktop" ? "close" : "arrow-back"}
            leftButtonAction={()=>{
              this.handleBack();
            }}

            rightButtonTitle={this.state.selected_tags.length > 0 ? "Clear All" : ""}
            rightButtonAction={
              this.state.selected_tags.length > 0 ? ()=>this.clearAll() : ()=>{}
            }

            rightButtonTitle2={!this.props.tag_modal.popoverTarget || this.props.device !== "desktop" ? this.renderRightButtonText() : ""}
            rightButtonAction2={
              this.state.selected_tags.length > 0 ||
              this.props.tag_modal.type === "edit_tags_for_lead" ?
              ()=>this.confirmUpdate() : ()=>{}
            }
          />
          <Form onSubmit={()=>this.confirmUpdate()} style={{flex: 1}}>
            <KeyboardView style={{height: this.props.tag_modal.popoverTarget && this.props.device === "desktop" ? 300 : "100%" }}>
              <Wrapper style={{
                padding: this.props.tag_modal.popoverTarget && this.props.device === "desktop" ? 10 : 20
              }}>
                <Copy>{this.props.tag_modal.description}</Copy>
              </Wrapper>
              <Card>
                <SearchBar
                  {...this.props}
                  searchTags={this.searchTags.bind(this)}
                />
              </Card>
              <ListView
                {...this.props}
                searchTags={this.searchTags.bind(this)}
                selected_tags={this.state.selected_tags}
                checkItem={this.checkItem.bind(this)}
                confirmUpdate={this.confirmUpdate.bind(this)}
                renderRightButtonText={this.renderRightButtonText.bind(this)}
              />
            </KeyboardView>

            <Footer {...this.props}
              confirmUpdate={this.confirmUpdate.bind(this)}
              selected_leads={this.state.selected_leads}
              selected_tags={this.state.selected_tags}
              renderRightButtonText={this.renderRightButtonText.bind(this)}
            />
          </Form>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }

}

const mapStateToProps = ({ auth, settings, native, property_tags, deal, filter, modal }) => {
  const { token, user } = auth;
  const { colors } = settings;

  const { platform, device, isMobile } = native;
  const { is_loading } = modal;
  const { all_tags } = deal;
  const { tags_loading } = property_tags;
  const { tag_modal, tag_search} = filter;

  return {
    token,
    user,
    colors,
    platform,
    device,
    isMobile,
    is_loading,

    all_tags,
    tags_loading,
    tag_modal,
    tag_search
  };
}


export default connect(mapStateToProps, {
  appRedirect,
  getTags,
  updateTagSearch,
  updateLead
})(Lists);
