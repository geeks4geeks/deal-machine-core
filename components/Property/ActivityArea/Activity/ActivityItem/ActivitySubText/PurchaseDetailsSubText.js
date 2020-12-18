import React, { Component } from 'react';
import { Row, Card, Wrapper, Copy, Bold, Icon} from 'app/NativeComponents/common';

import moment from 'moment';

import {
  numberWithCommas
} from 'app/NativeActions';

class PurchaseDetailsSubText extends Component{


  formatExitStrategy(exit_strategy){
    let formatted_string = exit_strategy.replace(new RegExp("_", 'g'), " ");
    formatted_string = formatted_string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    return formatted_string;
  }

  renderProfitFieldName(exit_strategy){
    if(exit_strategy == "wholesale"){
      return "Wholesale Fee";
    }else if(exit_strategy == "fix_and_flip"){
      return "Expected Profit";
    }else if(exit_strategy == "buy_and_hold"){
      return "Discount";
    }else{
      return "Your Profit";
    }
  }

  render(){

    if(this.props.item.original_data && this.props.item.next_change_log){

      if(this.props.item.original_data.image == "" || this.props.item.original_data.image == null){
        return(
          <Row>
            <Card style={{
              marginLeft: 0,
              flex: 1
            }}>
              <Wrapper style={{
                padding: 5
              }}>
                <Copy><Bold>Closed Date: </Bold>{this.props.item.next_change_log.closed_date && this.props.item.next_change_log.closed_date != "" ? moment(this.props.item.next_change_log.closed_date).format("MMM Do") : "N/A"}</Copy>
                <Copy><Bold>Purchase Price: </Bold>{this.props.item.next_change_log.purchase_price && this.props.item.next_change_log.purchase_price != "" ? "$"+numberWithCommas(parseInt(this.props.item.next_change_log.purchase_price)) : "N/A"}</Copy>
                <Copy><Bold>Exit Strategy: </Bold>{this.props.item.next_change_log.purchase_exit_strategy && this.props.item.next_change_log.purchase_exit_strategy != "" ? this.formatExitStrategy(this.props.item.next_change_log.purchase_exit_strategy) : "N/A"}</Copy>
                <Copy><Bold>{this.renderProfitFieldName(this.props.item.next_change_log.purchase_exit_strategy)}: </Bold>{this.props.item.next_change_log.purchase_profit && this.props.item.next_change_log.purchase_profit != "" ? "$"+numberWithCommas(parseInt(this.props.item.next_change_log.purchase_profit)) : "N/A"}</Copy>
                <Copy><Bold>Notes: </Bold>{this.props.item.next_change_log.purchase_notes && this.props.item.next_change_log.purchase_notes != "" ? this.props.item.next_change_log.purchase_notes : "N/A"}</Copy>
              </Wrapper>
            </Card>
          </Row>
        )
      }else if(
        this.props.item.original_data.closed_date != "" &&
        this.props.item.original_data.closed_date != null &&
        this.props.item.next_change_log.closed_date != "" &&
        this.props.item.next_change_log.closed_date != null
      ){

        return(
          <Row>
            <Card style={{
              marginLeft: 0,
              flex: 1
            }}>
              <Wrapper style={{
                padding: 5
              }}>
                <Copy><Bold>Closed Date: </Bold>{this.props.item.original_data.closed_date && this.props.item.original_data.closed_date != "" ? moment(this.props.item.original_data.closed_date).format("MMM Do") : "N/A"}</Copy>
                <Copy><Bold>Purchase Price: </Bold>{this.props.item.original_data.purchase_price && this.props.item.original_data.purchase_price != "" ? "$"+numberWithCommas(parseInt(this.props.item.original_data.purchase_price)) : "N/A"}</Copy>
                <Copy><Bold>Exit Strategy: </Bold>{this.props.item.original_data.purchase_exit_strategy && this.props.item.original_data.purchase_exit_strategy != "" ? this.formatExitStrategy(this.props.item.original_data.purchase_exit_strategy) : "N/A"}</Copy>
                <Copy><Bold>{this.renderProfitFieldName(this.props.item.original_data.purchase_exit_strategy)}: </Bold>{this.props.item.original_data.purchase_profit && this.props.item.original_data.purchase_profit != "" ? "$"+numberWithCommas(parseInt(this.props.item.original_data.purchase_profit)) : "N/A"}</Copy>
                <Copy><Bold>Notes: </Bold>{this.props.item.original_data.purchase_notes && this.props.item.original_data.purchase_notes != "" ? this.props.item.original_data.purchase_notes : "N/A"}</Copy>
              </Wrapper>
            </Card>

            <Wrapper style={{
              margin: 0,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Icon
                 size={12}
                 fa_icon={"arrow-right"}
              />
            </Wrapper>

            <Card style={{
              flex: 1
            }}>
              <Wrapper style={{
                padding: 5
              }}>
                <Copy><Bold>Closed Date: </Bold>{this.props.item.next_change_log.closed_date && this.props.item.next_change_log.closed_date != "" ? moment(this.props.item.next_change_log.closed_date).format("MMM Do") : "N/A"}</Copy>
                <Copy><Bold>Purchase Price: </Bold>{this.props.item.next_change_log.purchase_price && this.props.item.next_change_log.purchase_price != "" ? "$"+numberWithCommas(parseInt(this.props.item.next_change_log.purchase_price)) : "N/A"}</Copy>
                <Copy><Bold>Exit Strategy: </Bold>{this.props.item.next_change_log.purchase_exit_strategy && this.props.item.next_change_log.purchase_exit_strategy != "" ? this.formatExitStrategy(this.props.item.next_change_log.purchase_exit_strategy) : "N/A"}</Copy>
                <Copy><Bold>{this.renderProfitFieldName(this.props.item.next_change_log.purchase_exit_strategy)}: </Bold>{this.props.item.next_change_log.purchase_profit && this.props.item.next_change_log.purchase_profit != "" ? "$"+numberWithCommas(parseInt(this.props.item.next_change_log.purchase_profit)) : "N/A"}</Copy>
                <Copy><Bold>Notes: </Bold>{this.props.item.next_change_log.purchase_notes && this.props.item.next_change_log.purchase_notes != "" ? this.props.item.next_change_log.purchase_notes : "N/A"}</Copy>
              </Wrapper>
            </Card>


          </Row>
        )
      }





    }


    return <Wrapper />;
  }
}

export default PurchaseDetailsSubText;
