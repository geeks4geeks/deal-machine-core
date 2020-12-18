import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalContainer, KeyboardView, Wrapper } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  updateHouse,

  dismissMobileKeyboard
} from 'app/NativeActions';

import Body from './Body';
import moment from 'moment';
class EditDealWon extends Component{

  constructor(props){
    super(props);

    this.state = {
      closed_date: props.active_property ? props.active_property.deal ? props.active_property.deal.closed_date ? props.active_property.deal.closed_date : moment().format("YYYY-MM-DD") : moment().format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
      purchase_price: props.active_property ? props.active_property.deal ? props.active_property.deal.purchase_price : "" : "",
      purchase_exit_strategy: props.active_property ? props.active_property.deal ? props.active_property.deal.purchase_exit_strategy : "" : "",
      purchase_profit: props.active_property ? props.active_property.deal ? props.active_property.deal.purchase_profit : "" : "",
      purchase_notes: props.active_property ? props.active_property.deal ? props.active_property.deal.purchase_notes : "" : "",
    }
  }


  componentDidMount(){
    if(!this.props.active_property){
      this.props.appRedirect({redirect: "leads"})
    }else if(!this.props.active_property.deal){
      this.props.appRedirect({redirect: "leads"})
    }else if((this.props.active_property.deal.closed != 1 || this.props.user.team_clearance_level == 0)){
      this.props.appRedirect({redirect: "leads"})
    }

  }

  editWonField({prop, value}){
    this.setState({
      [prop]: value
    })
  }

  saveDealWon(){
    dismissMobileKeyboard();

    this.props.updateHouse({
      token: this.props.token,
      type: "purchase_details",
      deal_id: this.props.active_property.deal.id,
      payload: {
        closed_date:this.state.closed_date,
        purchase_price:this.state.purchase_price,
        purchase_exit_strategy:this.state.purchase_exit_strategy,
        purchase_profit:this.state.purchase_profit,
        purchase_notes:this.state.purchase_notes
    }})
  }

handleBack(){
  dismissMobileKeyboard();
  this.props.appRedirect({redirect: "goBack", payload: {remove: "purchase-details"}});
}

  checkIfNeedsToSave(){
    if(
      this.state.closed_date &&
      this.state.purchase_price &&
      this.state.purchase_exit_strategy &&
      this.state.purchase_profit &&
      (
        this.state.closed_date !== this.props.active_property.deal.closed_date ||
        this.state.purchase_price !== this.props.active_property.deal.purchase_price ||
        this.state.purchase_exit_strategy !== this.props.active_property.deal.purchase_exit_strategy ||
        this.state.purchase_profit !== this.props.active_property.deal.purchase_profit ||
        this.state.purchase_notes !== this.props.active_property.deal.purchase_notes

      )
    ){
      return true;
    }else{
      return false;
    }
  }

  render(){
    if(this.props.active_property){
      if(this.props.active_property.deal){
        return(
          <ModalContainer>
            <Header
              title={"Edit Purchase Details"}
              leftButtonIcon={this.props.active_property.deal.purchase_price ? "arrow-back" : "attach-money"}
              leftButtonAction={this.props.active_property.deal.purchase_price ? this.handleBack.bind(this) : ()=>{}}
              rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
              rightButtonAction={this.checkIfNeedsToSave() ? this.saveDealWon.bind(this) : ()=>{}}
            />
            <KeyboardView>
              <Body
                {...this.props}
                checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
                saveDealWon={this.saveDealWon.bind(this)}
                editWonField={this.editWonField.bind(this)}
                closed_date={this.state.closed_date}
                purchase_price={this.state.purchase_price}
                purchase_exit_strategy={this.state.purchase_exit_strategy}
                purchase_profit={this.state.purchase_profit}
                purchase_notes={this.state.purchase_notes}

              />
            </KeyboardView>
          </ModalContainer>
        )
      }
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, settings, property_map, native }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { device } = native;
  const { active_property } = property_map;
  return {
    token,
    user,
    colors,
    device,
    active_property
  }
}

export default connect(mapStateToProps, {
  appRedirect,
  updateHouse,

})(EditDealWon);
