import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  Form,
  Icon,
  CardBody,
  Title,
  Row,
  Copy,
  PrimaryButton
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';


import {
  toggleDealCreditModal,
  appRedirect,

  renderPrice
} from 'app/NativeActions';

import {
  TextButton
} from 'app/NativeComponents/snippets';

import DealCredits from './DealCredits';

class DealCreditModal extends PureComponent {

  onSubmit(){
    this.props.toggleDealCreditModal(false);
    if(this.props.user.team_owner == 1){
      this.props.appRedirect({redirect: "purchaseCredits"})
    }
  }


  renderSubmit(){
    if(this.props.user.team_owner == 1 && this.props.platform != "ios"){
      return(
        <Row style={{alignItems: "center", justifyContent: "center"}}>
          <PillButton
            primary={true}
            style={{margin: 0}}
            onPress={()=>this.onSubmit()}
            formButton>
              {"Add DealCredit To Account"}
          </PillButton>
        </Row>
      );
    }
  }

  render() {


    if(this.props.deal_credit_modal_show && (this.props.user.team_owner == 1 || this.props.user.team_clearance_level > 0)){

      return (

        <ModalOverlay isVisible={true} onPress={()=>{
          this.props.toggleDealCreditModal(false)
        }}>
          <Modal>
            <Card style={{
              minWidth: 320,
            }}>
              <Form onSubmit={()=>{
                this.onSubmit();
              }} style={{
              }}>
                <CardBody>
                  <Wrapper style={{
                    marginBottom: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Icon
                      icon={"fiber-smart-record"}
                      size={44}
                    />
                  </Wrapper>
                  <Title style={{textAlign: "center", marginBottom: 5}}>
                    {
                    "You've Got DealCredit"
                    }
                  </Title>
                  <Copy style={{textAlign: "center", marginBottom:10}}>DealCredit is used for sending mail or skip tracing within DealMachine.</Copy>
                  <DealCredits {...this.props}/>

                </CardBody>

                {this.renderSubmit()}

                <TextButton
                  onPress={()=>this.props.toggleDealCreditModal(false)}
                  text={"Dismiss"}
                />
              </Form>
            </Card>
          </Modal>
        </ModalOverlay>

      );
    }
    return <Wrapper />
  }
}

const mapStateToProps = ({ native, modal, auth, billing }) => {
  const { user } = auth;
  const { deal_credits } = billing;
  const { device, platform } = native;
  const {
    deal_credit_modal_show
  } = modal;

  return {
    device,
    platform,
    user,
    deal_credits,
    deal_credit_modal_show
  };
}

export default connect(mapStateToProps, {
  toggleDealCreditModal,
  appRedirect
})(DealCreditModal);
