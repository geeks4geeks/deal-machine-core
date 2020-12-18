import React, { Component } from 'react';
import { Row, Card, Wrapper, Copy, Bold, Icon} from 'app/NativeComponents/common';

import {
  formatAddress
} from 'app/NativeActions';

class OwnerInfoSubText extends Component{

  render(){

    if(this.props.item.original_data && this.props.item.next_change_log){

      if(this.props.item.original_data.owner_name == "" || this.props.item.original_data.owner_name == null){


        return(
          <Row>

            <Card style={{
              marginLeft: 0,
              flex: 1
            }}>
              <Wrapper style={{
                padding: 5
              }}>
                <Copy style={{fontSize: 10}}><Bold>{this.props.item.next_change_log.owner_name}</Bold></Copy>
                <Copy style={{fontSize: 10}}>
                  {
                    formatAddress({address: {
                      address: this.props.item.next_change_log.owner_address,
                      address2: this.props.item.next_change_log.owner_address2,
                      address_city: this.props.item.next_change_log.owner_address_city,
                      address_state: this.props.item.next_change_log.owner_address_state,
                      address_zip: this.props.item.next_change_log.owner_address_zip
                    }}).line1
                  }
                </Copy>
                <Copy style={{fontSize: 10}}>
                  {
                    formatAddress({address: {
                      address: this.props.item.next_change_log.owner_address,
                      address2: this.props.item.next_change_log.owner_address2,
                      address_city: this.props.item.next_change_log.owner_address_city,
                      address_state: this.props.item.next_change_log.owner_address_state,
                      address_zip: this.props.item.next_change_log.owner_address_zip
                    }}).line2
                  }
                </Copy>

              </Wrapper>
            </Card>


          </Row>
        )

      }

      return(
        <Row>
          <Card style={{
            marginLeft: 0,
            flex: 1
          }}>
            <Wrapper style={{
              padding: 5
            }}>
              <Copy style={{fontSize: 10}}><Bold>{this.props.item.original_data.owner_name}</Bold></Copy>
              <Copy style={{fontSize: 10}}>
                {
                  formatAddress({address: {
                    address: this.props.item.original_data.owner_address,
                    address2: this.props.item.original_data.owner_address2,
                    address_city: this.props.item.original_data.owner_address_city,
                    address_state: this.props.item.original_data.owner_address_state,
                    address_zip: this.props.item.original_data.owner_address_zip
                  }}).line1
                }
              </Copy>
              <Copy style={{fontSize: 10}}>
                {
                  formatAddress({address: {
                    address: this.props.item.original_data.owner_address,
                    address2: this.props.item.original_data.owner_address2,
                    address_city: this.props.item.original_data.owner_address_city,
                    address_state: this.props.item.original_data.owner_address_state,
                    address_zip: this.props.item.original_data.owner_address_zip
                  }}).line2
                }
              </Copy>

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
              <Copy style={{fontSize: 10}}><Bold>{this.props.item.next_change_log.owner_name}</Bold></Copy>
              <Copy style={{fontSize: 10}}>
                {
                  formatAddress({address: {
                    address: this.props.item.next_change_log.owner_address,
                    address2: this.props.item.next_change_log.owner_address2,
                    address_city: this.props.item.next_change_log.owner_address_city,
                    address_state: this.props.item.next_change_log.owner_address_state,
                    address_zip: this.props.item.next_change_log.owner_address_zip
                  }}).line1
                }
              </Copy>
              <Copy style={{fontSize: 10}}>
                {
                  formatAddress({address: {
                    address: this.props.item.next_change_log.owner_address,
                    address2: this.props.item.next_change_log.owner_address2,
                    address_city: this.props.item.next_change_log.owner_address_city,
                    address_state: this.props.item.next_change_log.owner_address_state,
                    address_zip: this.props.item.next_change_log.owner_address_zip
                  }}).line2
                }
              </Copy>

            </Wrapper>
          </Card>


        </Row>
      )


    }


    return <Wrapper />;
  }
}

export default OwnerInfoSubText;
