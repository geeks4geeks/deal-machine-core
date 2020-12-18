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
  SecondaryButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  toggleActionSheet,
  updateUser,
  setModal,
  toggleModal
} from 'app/NativeActions';

class DefaultMailingOptions extends Component {



  render() {

    if(this.props.actionSheet == "default_mailing_options"){

      const {
        pause_sending,
        auto_approve,
        default_campaign_id,
        default_template_id,
        default_resend_freq,
        default_resend_freq_switch,
        default_resend_limit,
        default_resend_limit_switch
      } = this.props.editUser;

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
                <Title style={{textAlign: "center"}}>Select An Option</Title>
                <Copy style={{textAlign: "center"}}>Do you want these options to apply to only future deals or update all existing deals.</Copy>
              </CardBody>
                <Card>
                  <SecondaryButton onPress={()=>{
                    this.props.updateUser({
                      token: this.props.token,
                      type: "mailing_options",
                      payload: {
                        pause_sending: pause_sending,
                        auto_approve: auto_approve,
                        campaign_id: default_campaign_id,
                        mail_template_id: default_campaign_id != 0 && default_campaign_id != null ? 0 : default_template_id,
                        resend_freq: default_campaign_id != 0 && default_campaign_id != null ? 0 : default_resend_freq_switch == "off" ? 0 : default_resend_freq,
                        resend_limit: default_campaign_id != 0 && default_campaign_id != null ? 0 :default_resend_freq_switch == "off" ? 0 :
                          default_resend_limit_switch == "on" ? 0 : default_resend_limit
                      }
                    });
                    this.props.toggleActionSheet(null);
                  }}>
                    Update Default Options Only
                  </SecondaryButton>
                </Card>
                <Card>
                  <SecondaryButton onPress={()=>{

                    this.props.toggleActionSheet(null);
                    this.props.setModal({
                        title: 'Are you sure you want to continue?',
                        description: "This will update every deal in your system. If you're updating repeat mail or campaign settings, double check your settings because you might send mail to every property on your account.",
                        icon: "error",
                        submit: 'Continue',
                        onPress: ()=>{
                          this.props.updateUser({
                            token: this.props.token,
                            type: "mailing_options_and_update_deals",
                            payload: {
                              pause_sending: pause_sending,
                              auto_approve: auto_approve,
                              campaign_id: default_campaign_id,
                              mail_template_id: default_campaign_id != 0 && default_campaign_id != null ? 0 : default_template_id,
                              resend_freq: default_campaign_id != 0 && default_campaign_id != null ? 0 : default_resend_freq_switch == "off" ? 0 : default_resend_freq,
                              resend_limit: default_campaign_id != 0 && default_campaign_id != null ? 0 :default_resend_freq_switch == "off" ? 0 :
                                default_resend_limit_switch == "on" ? 0 : default_resend_limit
                            }
                          });
                        },
                        cancel: 'Nevermind. Cancel Action.',
                        onCancel: ()=>{}
                      });
                      this.props.toggleModal({show: true, type: "normal"});

                  }}>
                    Update Default Options And All Deals
                  </SecondaryButton>
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

const mapStateToProps = ({ auth, native, settings }) => {
  const { token } = auth;
  const { actionSheet, device } = native;
  const { editUser } = settings;
  return {
    token,
    actionSheet,
    device,
    editUser
  }
}

export default connect(mapStateToProps, {
  toggleActionSheet,
  updateUser,
  setModal,
  toggleModal
})(DefaultMailingOptions);
