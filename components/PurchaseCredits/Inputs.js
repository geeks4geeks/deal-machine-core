import React, { Component } from 'react';
import { Card, Input } from 'app/NativeComponents/common';

class Inputs extends Component{


  render(){

    return (
      <Card>

        <Input
          ref="credit_amount"
          name="credit_amount"
          blurOnSubmit={true}
          autoCapitalize="none"
          returnKeyType={"done"}
          keyboardType="numeric"
          placeholder="Dollar Amount"
          onChange={value => this.props.creditPurchaseChanged({ prop: "credit_amount", value: value })}
          onSubmitEditing={()=>this.props.purchaseCredits()}
          value={this.props.editCreditPurchase ? this.props.editCreditPurchase.credit_amount : 0}
          type="number"
        />
      </Card>
    );
  }

}

export default Inputs;
