import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  CardBody,
  Title,
  Copy,
  PrimaryButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  editCredits,
  toggleActionSheet,

  /* common functions */
  renderPrice
} from 'app/NativeActions';

class PurchaseCredits extends Component {

  render() {

    if(this.props.actionSheet == "purchase_credits" && this.props.editCreditPurchase){


      return (

        <ModalOverlay
          isVisible={true}
          onPress={()=>this.props.toggleActionSheet(null)}
        >
          <Modal actionSheet>
            <Card style={{
              minWidth: "95%",
              paddingBottom: this.props.device == "mobile" ? 10 : 0
            }}>
              <CardBody>
                <Title style={{textAlign: "center"}}>Confirm Purchase</Title>
                <Copy style={{textAlign: "center"}}>Confirm your purchase of {renderPrice(100*parseInt(this.props.editCreditPurchase.credit_amount))}?</Copy>
              </CardBody>
                <Card>
                  <PrimaryButton onPress={()=>{
                    this.props.editCredits({
                      token: this.props.token,
                      type: "purchase_credits",
                      payload:{
                        amount: this.props.editCreditPurchase.credit_amount
                      }
                    })
                    this.props.toggleActionSheet(null);
                  }}>
                    Complete Purchase
                  </PrimaryButton>
                </Card>
                <TextButton
                  onPress={()=>this.props.toggleActionSheet(null)}
                  text={"Cancel"}
                />
            </Card>
          </Modal>
        </ModalOverlay>

      );
    }
    return <Wrapper />
  }
}
const mapStateToProps = ({ auth, native, drawer, billing }) => {
  const { token } = auth;
  const { actionSheet, device } = native;
  const { stats } = drawer;
  const { editCreditPurchase } = billing;

  return {
    token,
    actionSheet,
    device,
    stats,
    editCreditPurchase
  }
}


export default connect(mapStateToProps, {
  editCredits,
  toggleActionSheet,
})(PurchaseCredits);
