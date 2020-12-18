import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Scroll,
  Copy,
  ModalContainer
} from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect
} from 'app/NativeActions';

import ListView from './ListView';

class ItemSelector extends Component {


  constructor(props){
    super(props);
    this.state = {
      selected_items: props.item_selector_modal ? props.item_selector_modal.selected_items : []
    }
  }

  componentDidMount(){
    if(!this.props.item_selector_modal){
      this.props.appRedirect({redirect: "goBack", payload:{type: "leads"}});
    }
  }

  checkItem(item){
    if(this.props.item_selector_modal.item_limit === 1){
      this.setState({
        selected_items: [item.id]
      })
    }else{
      let found_item = false;
      for(let i = 0; i<this.state.selected_items.length; i++){
        if(this.state.selected_items[i].value === item.value){
          found_item = true;
        }
      }
      if(found_item){
        this.setState({
          selected_items: this.state.selected_items.filter(({value}) => value !== item.value)
        })
      }else{
        this.setState({
          selected_items: [...this.state.selected_items, item]
        })
      }
    }
  }

  clearAll(){
    this.setState({
      selected_items: []
    })
  }

  confirmUpdate(){
    if(this.props.item_selector_modal.modalAction){
      this.props.item_selector_modal.modalAction({
        selected_items:this.state.selected_items
      });
      //this.props.appRedirect({redirect: "goBack", payload:{remove: this.props.item_selector_modal.slug}});
    }
  }

  renderRightButtonText(){
    return this.state.selected_items.length > 0 ? this.state.selected_items.length === 1 ?
        "Use Selected" :
        "Use "+this.state.selected_items.length+" Selected" : "Confirm";
  }

  render() {
    if(this.props.item_selector_modal){
      return (

        <ModalContainer>
          <Header
            title={this.props.item_selector_modal.title}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={()=>{
              this.props.appRedirect({redirect: "goBack", payload:{remove: this.props.item_selector_modal.slug}});
            }}

            rightButtonTitle2={this.renderRightButtonText()}

            rightButtonAction2={()=>this.confirmUpdate()}

            rightButtonTitle={this.state.selected_items.length > 0 ? "Clear All" : ""}
            rightButtonAction={()=>this.clearAll()}

          />
          <Scroll style={{height: "100%"}}>
            <Wrapper style={{
              padding: 20
            }}>
              <Copy>{this.props.item_selector_modal.description}</Copy>
            </Wrapper>
            <ListView
              {...this.props}

              checkItem={this.checkItem.bind(this)}
              confirmUpdate={this.confirmUpdate.bind(this)}
              selected_items={this.state.selected_items}
              renderRightButtonText={this.renderRightButtonText.bind(this)}
            />
          </Scroll>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }

}

const mapStateToProps = ({ auth, native, filter }) => {
  const { token, user } = auth;
  const { platform, device } = native;
  const { item_selector_modal  } = filter;
  return {
    token,
    user,
    platform,
    device,
    item_selector_modal
  };
}


export default connect(mapStateToProps, {
  appRedirect

})(ItemSelector);
