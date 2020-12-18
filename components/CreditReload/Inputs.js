import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  renderPrice
} from 'app/NativeActions';

class Inputs extends Component{


  constructor(props) {

    super(props);
    var credit_reload_array = [
      {
        key: 5,
        value: 50,
        label: "$50.00"
      },
      {
        key: 6,
        value: 60,
        label: "$60.00"
      },
      {
        key: 7,
        value: 70,
        label: "$70.00"
      },
      {
        key: 8,
        value: 80,
        label: "$80.00"
      },
      {
        key: 9,
        value: 90,
        label: "$90.00"
      },
      {
        key: 10,
        value: 100,
        label: "$100.00"
      },
      {
        key: 11,
        value: 200,
        label: "$200.00"
      },
      {
        key: 12,
        value: 500,
        label: "$500.00"
      },
      {
        key: 13,
        value: 1000,
        label: "$1000.00"
      },
    ];

    this.state = {credit_reload_array: credit_reload_array}
  }

  render(){
    return (
      <Card>
        <Select
          item_ref={"default_credit_reload"}
          items={this.state.credit_reload_array}
          title="Select Reload Amount"
          label="Select an amount"
          value={this.props.credit_amount}
          text={this.props.credit_amount ? renderPrice(parseInt(this.props.credit_amount)*100) : "Nothing Selected"}
          onSelect={item => {
            this.props.editCreditAmount(item);
          }}
        />
      </Card>
    );
  }

}

export default Inputs;
