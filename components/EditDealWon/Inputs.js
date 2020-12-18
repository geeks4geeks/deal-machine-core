import React, { Component } from 'react';

import {
  Wrapper,
  Copy,
  CardBody,
  Title,
  Card,
  Input,
  MultiLineInput,
  PrimaryButton,
  Icon,
  Animation,
  Bold,

  InputDatePicker
} from 'app/NativeComponents/common';

import {
  CardLabel,
  Select
} from 'app/NativeComponents/snippets';

import {
  numberFormat
} from 'app/NativeActions';

class Inputs extends Component{


  constructor(props){
    super(props);

    let exit_array = [];

    if(this.props.device == "desktop"){
      exit_array.push({
        key: -1,
        value: null,
        label: "Select an option"
      });
    }

    exit_array.push({
      key: 0,
      value: "wholesale",
      label: "Wholesale"
    });

    exit_array.push({
      key: 1,
      value: "fix_and_flip",
      label: "Fix and Flip"
    });

    exit_array.push({
      key: 2,
      value: "buy_and_hold",
      label: "Buy and Hold"
    });

    exit_array.push({
      key: 3,
      value: "other",
      label: "Other"
    });

    let exit_strategy_title = "Select an option";
    for(var i = 0; i<exit_array.length; i++){
      if(this.props.purchase_exit_strategy == exit_array[i].value){
        exit_strategy_title = exit_array[i].label;
      }
    }

    this.state ={
      exit_array: exit_array,
      exit_strategy_title:exit_strategy_title
    };

  }

  renderProfitFieldName(exit_strategy){
    if(exit_strategy == "wholesale"){
      return "Wholesale Fee";
    }else if(exit_strategy == "fix_and_flip"){
      return "Expected Profit";
    }else if(exit_strategy == "buy_and_hold"){
      return "Equity";
    }else{
      return "Your Profit";
    }
  }

  setExitStrategyTitle(exit_strategy){

    let exit_strategy_title = "Select an option";
    for(let i = 0; i<this.state.exit_array.length; i++){
      if(this.state.exit_array[i].value == exit_strategy){
        exit_strategy_title = this.state.exit_array[i].label;
      }
    }
    this.setState({exit_strategy_title: exit_strategy_title})
  }


  componentDidUpdate(prevProps){
    if(this.props.purchase_exit_strategy != prevProps.purchase_exit_strategy){
      this.setExitStrategyTitle(this.props.purchase_exit_strategy);
    }
  }

  render(){
    return(
      <Wrapper>

          <Card>
            <InputDatePicker
              placeholder="Closed Date:"
              onChange={(date)=>{
                this.props.editWonField({ prop: "closed_date", value: date })
              }}
              date={this.props.closed_date}
            />
          </Card>

          <Card>
            <Select
              item_ref={"purchase_exit_strategy"}
              items={this.state.exit_array}
              value={this.props.purchase_exit_strategy}
              text={this.state.exit_strategy_title}
              title="Exit Strategy:"
              label="Select an option"
              onSelect={item => {

                this.setExitStrategyTitle(item)
                this.props.editWonField({ prop: "purchase_exit_strategy", value: item })

              }}
            />
          </Card>
          <Card>


            <Input
              ref="purchase_price"
              name="purchase_price"
              //icon="insert-drive-file"
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="numeric"
              placeholder="Initial Purchase Price"
              onChange={value => this.props.editWonField({prop: "purchase_price", value})}
              value={this.props.purchase_price}
              type="number"
            />
            <Input
              ref="purchase_profit"
              name="purchase_profit"
              //icon="attach-money"
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="numeric"
              placeholder={this.renderProfitFieldName(this.props.purchase_exit_strategy)}
              onChange={value => this.props.editWonField({ prop: "purchase_profit", value })}
              value={this.props.purchase_profit}
              type="number"
            />
          </Card>
          <Card>
            <MultiLineInput
              ref={"purchase_notes"}
              name="purchase_notes"
              autoCapitalize="sentences"
              blurOnSubmit={true}
              returnKeyType="done"
              keyboardType="default"
              placeholder={"Enter any notes about the purchase here."}
              type={"text"}
              label="Purchase Notes:"
              value={this.props.purchase_notes}
              onChange={value => this.props.editWonField({ prop: "purchase_notes", value })}
            />
          </Card>
          <Card>
            {
              this.props.checkIfNeedsToSave() ?
              <PrimaryButton onPress={this.props.saveDealWon}>Save Purchase Details</PrimaryButton> : <Wrapper/>
            }
          </Card>
    </Wrapper>
    );
  }
}

export default Inputs;
