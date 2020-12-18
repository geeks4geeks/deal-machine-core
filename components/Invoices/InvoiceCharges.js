import React, {Component} from 'react';
import moment from 'moment';

import {
  Card,
  CardBody,
  Title,
  Wrapper
 } from 'app/NativeComponents/common';

 import {
   CardLabel
 } from 'app/NativeComponents/snippets';


 import {
   renderPrice
 } from 'app/NativeActions';


class InvoiceCharges extends Component{

  render(){


    if(!this.props.start_date && !this.props.end_date){
      return(
        <Card>

          <CardLabel
            title="All Charges:"
            fa_icon={"calculator"}
            hasBorder={true}
            hasButton={false}
            onPress={()=>{}}
          />
            <CardBody>
              <Title style={{fontSize: 32, color: this.props.colors.active_color}}>
                {renderPrice(this.props.total_spent)}
              </Title>
            </CardBody>
        </Card>
      );
    }

    return(
      <Card>
        <CardLabel
          title={"Charges from " + moment(this.props.start_date).format("MMM Do, YYYY") + " to " + moment(this.props.end_date).format("MMM Do, YYYY")}
          fa_icon={"calculator"}
          hasBorder={true}
          hasButton={false}
          onPress={()=>{}}
        />
        <CardBody>
          <Title style={{fontSize: 32}}>
            {renderPrice(this.props.total_spent)}
          </Title>
        </CardBody>
      </Card>
    );


    return <Wrapper />;

  }

}

export default InvoiceCharges;
