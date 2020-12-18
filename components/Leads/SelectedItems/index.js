import React, { PureComponent } from 'react';

import {
  Wrapper,
  Row,
  Card,
  Copy,
  Title,
  Bold,
  Button,
  Icon,
  SecondaryButton
} from 'app/NativeComponents/common';
import {TextButton, PillButton} from 'app/NativeComponents/snippets'

import {
  renderPrice,
  getDealStatusSlug,
  startMailers,
  skipTrace,

  exportLeads
} from 'app/NativeActions';

import moment from 'moment';

class SelectedItems extends PureComponent {

  constructor(props){
    super(props);

    this._update_status_button = React.createRef();
    this._add_to_list_button = React.createRef();
    this._mailing_options_button = React.createRef();

    this.state = {
      show_options: false,
      more_drop_down: false
    }
  }

  toggleMoreDropDown(toggle){
    this.setState({more_drop_down: toggle})
  }

  toggleOptions(toggle){
    this.setState({show_options: toggle})
  }

  componentDidUpdate(prevProps){

    if(this.props.selecting !== prevProps.selecting && this.props.selecting === false){
      this.toggleOptions(false)
    }
  }

  renderSelectedText(){

    if(this.props.selected_all_in_account){
      return(
        <Wrapper>
          <Row>
            <Copy style={{fontSize: 12, marginRight: 5}}>All {this.props.total_lead_count} leads are selected.</Copy>
            <Button onPress={()=>{
              this.props.clearAll()
            }}>
              <Copy style={{fontSize: 12}}>
                <Bold>Clear selection</Bold>
              </Copy>
            </Button>
          </Row>
        </Wrapper>
      )
    }

    if(this.props.selected_all && this.props.total_lead_count > this.props.selected_leads.length){
      return(
        <Wrapper>
          <Row>
            <Copy style={{fontSize: 12, marginRight: 5}}>All {this.props.selected_leads.length} leads on this page are selected.</Copy>
            <Button onPress={()=>{
              this.props.selectAllLeadsInAccount()
            }}>
              <Copy style={{fontSize: 12}}>
                <Bold>Select All {this.props.total_lead_count} Leads</Bold>
              </Copy>
            </Button>
          </Row>
        </Wrapper>
      )
    }else if(this.props.selected_all){
      return(
        <Wrapper>
          <Row>
            <Copy style={{fontSize: 12, marginRight: 5}}>All {this.props.selected_leads.length} leads on this page are selected.</Copy>

          </Row>
        </Wrapper>
      )
    }

    if(this.props.isMobile || this.props.device === "mobile"){
      return(
        <Wrapper>
          <Row>
            <Copy style={{fontSize: 12, marginRight: 5}}>
              {this.props.selected_leads.length === 1 ? "1 lead is selected." : this.props.selected_leads.length+" leads are selected."} </Copy>
            <Button onPress={()=>{
              this.props.selectAllLeadsInAccount()
            }}>
              <Copy style={{fontSize: 12}}>
                <Bold>Select All {this.props.total_lead_count} Leads</Bold>
              </Copy>
            </Button>
          </Row>
        </Wrapper>
      )
    }


  }

  renderMoreDropDownInfo(){
    if(this.state.more_drop_down){
      if(this.props.isMobile){

        return(
          <Row style={{alignItems:"center",justifyContent:"center"}}>

            <Button
            style={{flex: 1}}
            onPress={()=>{
              if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_export_data) === 1){


                if(this.props.device == "desktop"){
                  this.toggleOptions(false);
                  this.toggleMoreDropDown(false);
                  this.props.clearAll();
                  exportLeads({
                    token:this.props.token,
                    sort_by: this.props.sort_by ? this.props.sort_by.slug+"_"+this.props.sort_by.type : "date_created_desc",
                    filter_lists: this.props.filter_lists,
                    filters: this.props.applied_filters
                  });
                }else{
                  this.props.setModal({
                    title: "Export on desktop only.",
                    description: "Use our web app on your desktop to export leads.",
                    icon: "computer",
                    submit: 'Dismiss',
                    onPress: ()=>{
                    },
                    cancel: '',
                    onCancel: ()=>{}
                  });
                  this.props.toggleModal({show: true, type: "normal"});
                }

              }else{
                this.props.setModal({
                  title: "You do not have permissions to export.",
                  description: "Talk to your team leader to get the permissions you need.",
                  icon: "error",
                  submit: 'Dismiss',
                  onPress: ()=>{
                  },
                  cancel: '',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});
              }
            }}>
              <Card style={{
                height: 30,
                paddingRight: 15,
                paddingLeft: 15,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Copy><Bold>Export Leads</Bold></Copy>
              </Card>

            </Button>

            <Button
            style={{flex: 1}}
            onPress={()=>{


              this.props.setModal({
                title: "Permanently Delete Leads",
                description: "Are you sure you want to permanently delete these leads? This will completely remove them from your account. If you don't want to do this, try the \"In Trash\" status.  You cannot undo this.",
                icon: "delete",
                submit: "Permanently Delete",
                buttonType: "destroy",
                onPress: ()=>{
                  this.props.updateLead({
                    token: this.props.token,
                    type: "permanently_delete",
                    select_all: this.props.selected_all_in_account ? 1 : 0,
                    total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                    filters: this.props.applied_filters,
                    filter_lists: this.props.filter_lists,
                    deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                        return property.deal.id;
                    }).join(),
                    onSuccess:()=>{
                      this.toggleOptions(false);
                      this.toggleMoreDropDown(false);
                      this.props.clearAll();
                    }
                  })
                },
                cancel: 'Cancel',
                onCancel: ()=>{}
              });
              this.props.toggleModal({show: true, type: "normal"});

            }}>
              <Card style={{
                height: 30,
                paddingRight: 15,
                paddingLeft: 15,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Copy><Bold>Permanently Delete</Bold></Copy>
              </Card>

            </Button>
          </Row>
        )
      }

      return(
        <Card style={{
          position: "absolute",
          top: 18,
          right: 0,
          margin: 0,
          zIndex: 1
        }}>

          <Wrapper>
            <Button
            style={{
              padding: 15
            }}
            onPress={()=>{

              if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_approve_mail) === 1){

                let change_status_modal_title = '';
                let change_status_modal_description
                if(this.props.selected_all_in_account){
                  change_status_modal_title = 'Are you sure you want to pause mailers for '+this.props.total_lead_count+' leads?';
                  change_status_modal_description = "By pausing mailers, you'll be pausing the mailers and changing the status to \"pending approval\". You can resume the mailing sequence at any time.";
                }else{
                  change_status_modal_title = 'Are you sure you want to pause mailers for '+this.props.selected_leads.length+' leads?';
                  change_status_modal_description = "By pausing mailers, you'll be pausing the mailers and changing the status to \"pending approval\". You can resume the mailing sequence at any time.";
                }

                this.props.setModal({
                  title: change_status_modal_title,
                  description: change_status_modal_description,
                  icon: "check-circle",
                  submit: 'Pause Mailers',
                  onPress: ()=>{

                    //trigger add to list
                    this.props.updateLead({
                      token: this.props.token,
                      type: "pause_mailers",
                      select_all: this.props.selected_all_in_account ? 1 : 0,
                      total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                      filters: this.props.applied_filters,
                      filter_lists: this.props.filter_lists,
                      deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                          return property.deal.id;
                      }).join(),
                      onSuccess:()=>{
                        this.toggleOptions(false);
                        this.toggleMoreDropDown(false);
                        this.props.clearAll();
                      }
                    })
                    this.toggleOptions(false);
                    this.toggleMoreDropDown(false);
                    this.props.clearAll();

                  },
                  cancel: 'Nevermind. Cancel Action.',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});

              }else{
                this.props.setModal({
                  title: "You do not have permissions to do start mailers.",
                  description: "Talk to your team leader to get the permissions you need.",
                  icon: "error",
                  submit: 'Dismiss',
                  onPress: ()=>{
                  },
                  cancel: '',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});

              }
            }}>
              <Row>
                <Icon
                  size={18}
                  icon={"pause"}
                />
                <Copy>Pause Mailers</Copy>
              </Row>
            </Button>
          </Wrapper>

          <Wrapper wrapper_ref={this._mailing_options_button}>
            <Button
            style={{
              padding: 15
            }}
            onPress={()=>{

              this.props.setEditModal({
                title:"Edit Mailing Options",
                description: this.props.selected_all_in_account ? "Edit mailing options for all "+this.props.total_lead_count+" leads." :
                  this.props.selected_leads.length === 1 ? "Edit mailing options for "+this.props.selected_leads[0].property_address+"." :
                    "Edit mailing options for your selected "+this.props.selected_leads.length +" leads.",
                slug: "mailing-options",
                type: "edit_mailing_options",
                fields:{
                  template_id: this.props.user.default_template_id,
                  template_name: this.props.user.default_template_name,
                  campaign_id: this.props.user.default_campaign_id,
                  campaign_title: this.props.user.default_campaign_title,

                  resend_freq: parseInt(this.props.user.default_resend_freq),
                  resend_freq_switch: this.props.user.default_resend_freq > 0 ? "on" : "off",
                  resend_limit: parseInt(this.props.user.default_resend_limit),
                  resend_limit_switch: parseInt(this.props.user.default_resend_limit) === 0 ? "on" : "off"
                },
                always_save: true,
                save_button_text: "Save Mailing Options",
                modalAction: ({fields})=>{

                  if(parseInt(fields.start_mailers) === 1){

                    if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_approve_mail) === 1){

                      let change_status_modal_title = '';
                      let change_status_modal_description
                      if(this.props.selected_all_in_account){
                        change_status_modal_title = 'Are you sure you want to start/resume mailers for of '+this.props.total_lead_count+' leads?';
                        change_status_modal_description = "By doing this, you'll be starting mailers for all "+this.props.total_lead_count+" lead, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.total_lead_count)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                      }else{
                        change_status_modal_title = 'Are you sure you want to update the status of '+this.props.selected_leads.length+' leads?';
                        change_status_modal_description = "By doing this you'll be starting mailers for all "+this.props.selected_leads.length+" leads, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.selected_leads.length)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                      }

                      this.props.setModal({
                        title: change_status_modal_title,
                        description: change_status_modal_description,
                        icon: "check-circle",
                        submit: 'Start Mailers',
                        onPress: ()=>{
                          this.props.updateLead({
                            token: this.props.token,
                            type: "edit_mailing_options_for_leads",
                            campaign_id: fields.campaign_id,
                            start_mailers: fields.start_mailers,
                            mail_template_id: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.template_id,
                            resend_freq: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_freq_switch === "off" ? 0 : fields.resend_freq,
                            resend_limit: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_limit_switch === "on" ? 0 : fields.resend_limit,
                            select_all: this.props.selected_all_in_account ? 1 : 0,
                            total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                            filters: this.props.applied_filters,
                            filter_lists: this.props.filter_lists,
                            deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                                return property.deal.id;
                            }).join(),
                            onSuccess:()=>{
                              this.toggleOptions(false);
                              this.toggleMoreDropDown(false);
                              this.props.clearAll();
                            }
                          })

                        },
                        cancel: 'Nevermind. Cancel Action.',
                        onCancel: ()=>{}
                      });
                      this.props.toggleModal({show: true, type: "normal"});

                    }else{
                      this.props.setModal({
                        title: "You do not have permissions to do start mailers.",
                        description: "Talk to your team leader to get the permissions you need.",
                        icon: "error",
                        submit: 'Dismiss',
                        onPress: ()=>{
                        },
                        cancel: '',
                        onCancel: ()=>{}
                      });
                      this.props.toggleModal({show: true, type: "normal"});

                    }

                  }else{
                    this.props.updateLead({
                      token: this.props.token,
                      type: "edit_mailing_options_for_leads",
                      start_mailers: fields.start_mailers,
                      campaign_id: fields.campaign_id,
                      mail_template_id: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.template_id,
                      resend_freq: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_freq_switch === "off" ? 0 : fields.resend_freq,
                      resend_limit: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_limit_switch === "on" ? 0 : fields.resend_limit,
                      select_all: this.props.selected_all_in_account ? 1 : 0,
                      total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                      filters: this.props.applied_filters,
                      filter_lists: this.props.filter_lists,
                      deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                          return property.deal.id;
                      }).join(),
                      onSuccess:()=>{
                        this.toggleOptions(false);
                        this.toggleMoreDropDown(false);
                        this.props.clearAll();
                      }
                    })
                  }

                }
              })

              this.props.appRedirect({
                redirect: "goForward",
                payload: {add: "mailing-options"}
              })
            }}>
              <Row>
                <Icon
                  size={18}
                  icon={"mail-outline"}
                />
                <Copy>Mailing Options</Copy>
              </Row>
            </Button>
          </Wrapper>

          <Wrapper>
            <Button
            style={{
              padding: 15
            }}
            onPress={()=>{

              if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_export_data) === 1){


                if(this.props.device == "desktop"){

                  this.toggleOptions(false);
                  this.toggleMoreDropDown(false);
                  this.props.clearAll();

                  exportLeads({
                    token:this.props.token,
                    select_all: this.props.selected_all_in_account ? 1 : 0,
                    deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                        return property.deal.id;
                    }).join(),
                    sort_by: this.props.sort_by ? this.props.sort_by.slug+"_"+this.props.sort_by.type : "date_created_desc",
                    filter_lists: this.props.filter_lists,
                    filters: this.props.applied_filters
                  })
                }else{
                  this.props.setModal({
                    title: "Export on desktop only.",
                    description: "Use our web app on your desktop to export leads.",
                    icon: "computer",
                    submit: 'Dismiss',
                    onPress: ()=>{
                    },
                    cancel: '',
                    onCancel: ()=>{}
                  });
                  this.props.toggleModal({show: true, type: "normal"});
                }

              }else{
                this.props.setModal({
                  title: "You do not have permissions to export.",
                  description: "Talk to your team leader to get the permissions you need.",
                  icon: "error",
                  submit: 'Dismiss',
                  onPress: ()=>{
                  },
                  cancel: '',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});
              }
            }}>
              <Row>
                <Icon
                  size={18}
                  icon={"get-app"}
                />
                <Copy>Export Leads</Copy>
              </Row>
            </Button>
          </Wrapper>

          <Wrapper>
            <Button
            style={{
              padding: 15
            }}
            onPress={()=>{
              this.props.setModal({
                title: "Permanently Delete Leads",
                description: "Are you sure you want to permanently delete these leads? This will completely remove them from your account. If you don't want to do this, try the \"In Trash\" status. You cannot undo this.",
                icon: "delete",
                submit: "Permanently Delete",
                buttonType: "destroy",
                onPress: ()=>{
                  this.props.updateLead({
                    token: this.props.token,
                    type: "permanently_delete",
                    select_all: this.props.selected_all_in_account ? 1 : 0,
                    total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                    filters: this.props.applied_filters,
                    filter_lists: this.props.filter_lists,
                    deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                        return property.deal.id;
                    }).join(),
                    onSuccess:()=>{
                      this.toggleOptions(false);
                      this.toggleMoreDropDown(false);
                      this.props.clearAll();
                    }
                  })
                },
                cancel: 'Cancel',
                onCancel: ()=>{}
              });
              this.props.toggleModal({show: true, type: "normal"});
            }}>
              <Row>
                <Icon
                  size={18}
                  icon={"delete"}
                />
                <Copy>Permanently Delete</Copy>
              </Row>
            </Button>
          </Wrapper>


        </Card>
      )
    }else{
      if(this.props.isMobile){
        return(
          <Wrapper style={{flex: 1, alignItems: "flex-end", justifyContent: "center"}}>
            <Row>
              <Button
              style={{
                padding: 5,
                paddingRight: 10
              }}onPress={()=>{
                this.toggleMoreDropDown(true)
              }}>
              <Row>
                <Icon
                  size={18}
                  icon={"keyboard-arrow-down"}
                />
                <Copy>More</Copy>
              </Row>
              </Button>
            </Row>
          </Wrapper>
        )
      }
    }
  }

  render() {
    if(this.props.isMobile || this.props.device === "mobile"){
      if((this.props.selected_leads.length > 0 || this.props.selected_all_in_account) && this.props.selecting === true){

        if(this.state.show_options){
          return(
            <Wrapper style={{
              position:this.props.device === "mobile" ? "absolute" : "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              borderTopWidth: 1,
              minHeight: 150,
              borderTopColor: this.props.colors.border_color,
              borderTopStyle: "solid",
              backgroundColor: this.props.colors.card_color,
              alignItems: "flex-start",
              justifyContent: "center",
            }}>
              <Wrapper style={{padding: 20, alignSelf: "stretch"}}>
                <Wrapper style={{marginBottom: 15}}>
                  <Copy>Edit {this.props.selected_all_in_account ? this.props.total_lead_count : this.props.selected_leads.length} Lead(s)</Copy>
                </Wrapper>
                  <Row>

                  <Button
                    style={{flex: 1}}

                    onPress={()=>{

                      startMailers({
                        props: this.props,
                        properties: this.props.selected_all_in_account ? [] : this.props.selected_leads,
                        total_property_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                        onSuccess:()=>{
                          this.toggleOptions(false);
                          this.toggleMoreDropDown(false);
                          this.props.clearAll();
                        }
                      })

                    }}>
                      <Card style={{
                        height: 30,
                        paddingRight: 15,
                        paddingLeft: 15,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Copy><Bold>Start Mailers</Bold></Copy>
                      </Card>

                    </Button>


                    <Button
                      style={{flex: 1}}

                      onPress={()=>{

                        if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_approve_mail) === 1){

                          let change_status_modal_title = '';
                          let change_status_modal_description
                          if(this.props.selected_all_in_account){
                            change_status_modal_title = 'Are you sure you want to pause mailers for '+this.props.total_lead_count+' leads?';
                            change_status_modal_description = "By pausing mailers, you'll be pausing the mailers and changing the status to \"pending approval\". You can resume the mailing sequence at any time.";
                          }else{
                            change_status_modal_title = 'Are you sure you want to pause mailers for '+this.props.selected_leads.length+' leads?';
                            change_status_modal_description = "By pausing mailers, you'll be pausing the mailers and changing the status to \"pending approval\". You can resume the mailing sequence at any time.";
                          }

                          this.props.setModal({
                            title: change_status_modal_title,
                            description: change_status_modal_description,
                            icon: "check-circle",
                            submit: 'Pause Mailers',
                            onPress: ()=>{

                              //trigger add to list
                              this.props.updateLead({
                                token: this.props.token,
                                type: "pause_mailers",
                                select_all: this.props.selected_all_in_account ? 1 : 0,
                                total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                                filters: this.props.applied_filters,
                                filter_lists: this.props.filter_lists,
                                deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                                    return property.deal.id;
                                }).join(),
                                onSuccess:()=>{
                                  this.toggleOptions(false);
                                  this.toggleMoreDropDown(false);
                                  this.props.clearAll();
                                }
                              })
                              this.toggleOptions(false);
                              this.toggleMoreDropDown(false);
                              this.props.clearAll();

                            },
                            cancel: 'Nevermind. Cancel Action.',
                            onCancel: ()=>{}
                          });
                          this.props.toggleModal({show: true, type: "normal"});

                        }else{
                          this.props.setModal({
                            title: "You do not have permissions to do start mailers.",
                            description: "Talk to your team leader to get the permissions you need.",
                            icon: "error",
                            submit: 'Dismiss',
                            onPress: ()=>{
                            },
                            cancel: '',
                            onCancel: ()=>{}
                          });
                          this.props.toggleModal({show: true, type: "normal"});

                        }
                      }}>
                        <Card style={{
                          height: 30,
                          paddingRight: 15,
                          paddingLeft: 15,
                          borderRadius: 30,
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <Copy><Bold>Pause Mailers</Bold></Copy>
                        </Card>

                      </Button>

                    </Row>
                    <Row>

                    <Button
                    style={{flex: 1}}

                    onPress={()=>{




                      this.props.setStatusModal({
                        title: "Edit Status for Leads ",
                        description: this.props.selected_all_in_account ? "Select a new status for all "+this.props.total_lead_count+" leads." :
                          this.props.selected_leads.length === 1 ? "Select a new status for "+this.props.selected_leads[0].property_address+"." :
                            "Select a new status for your selected "+this.props.selected_leads.length +" leads.",
                        type: "edit_status_for_lead",
                        selected_leads:this.props.selected_all_in_account ? "all" : this.props.selected_leads,
                        selected_status: 0,
                        modalAction: ({selected_leads, selected_status})=>{

                          if(getDealStatusSlug(selected_status) === "with_marketing"){

                            if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_approve_mail) === 1){

                              let change_status_modal_title = '';
                              let change_status_modal_description
                              if(this.props.selected_all_in_account){
                                change_status_modal_title = 'Are you sure you want to update the status of '+this.props.total_lead_count+' leads?';
                                change_status_modal_description = "By updating the status to \"With Marketing\", you'll be starting mailers for all "+this.props.total_lead_count+" leads, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.total_lead_count)+"  of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                              }else{
                                change_status_modal_title = 'Are you sure you want to update the status of '+this.props.selected_leads.length+' leads?';
                                change_status_modal_description = "By updating the status to \"With Marketing\", you'll be starting mailers for all "+this.props.selected_leads.length+" leads, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.selected_leads.length)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                              }

                              this.props.setModal({
                                title: change_status_modal_title,
                                description: change_status_modal_description,
                                icon: "check-circle",
                                submit: 'Change Status',
                                onPress: ()=>{

                                  //trigger add to list
                                  this.props.updateLead({
                                    token: this.props.token,
                                    type: "edit_status_for_lead",
                                    deal_status: selected_status,
                                    select_all: this.props.selected_all_in_account ? 1 : 0,
                                    total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : selected_leads.length,
                                    filters: this.props.applied_filters,
                                    filter_lists: this.props.filter_lists,
                                    deal_ids: this.props.selected_all_in_account ? "" : selected_leads.map((property)=>{
                                        return property.deal.id;
                                    }).join(),
                                    onSuccess:()=>{
                                      this.toggleOptions(false);
                                      this.props.clearAll();
                                    }
                                  })
                                  this.toggleOptions(false);
                                  this.props.clearAll();

                                },
                                cancel: 'Nevermind. Cancel Action.',
                                onCancel: ()=>{}
                              });
                              this.props.toggleModal({show: true, type: "normal"});

                            }else{
                              this.props.setModal({
                                title: "You do not have permissions to do start mailers.",
                                description: "Talk to your team leader to get the permissions you need.",
                                icon: "error",
                                submit: 'Dismiss',
                                onPress: ()=>{
                                },
                                cancel: '',
                                onCancel: ()=>{}
                              });
                              this.props.toggleModal({show: true, type: "normal"});

                            }

                          }else{
                            //trigger add to list
                            this.props.updateLead({
                              token: this.props.token,
                              type: "edit_status_for_lead",
                              deal_status: selected_status,
                              select_all: this.props.selected_all_in_account ? 1 : 0,
                              total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : selected_leads.length,
                              filters: this.props.applied_filters,
                              filter_lists: this.props.filter_lists,
                              deal_ids: this.props.selected_all_in_account ? "" : selected_leads.map((property)=>{
                                  return property.deal.id;
                              }).join(),
                              onSuccess:()=>{
                                this.toggleOptions(false);
                                this.props.clearAll();
                              }
                            })
                            this.toggleOptions(false);
                            this.props.clearAll();
                          }


                        }
                      });

                      this.props.appRedirect({redirect: "status", payload: {active_property: this.props.active_property, page_id: this.props.list_properties_page}})
                    }}>
                      <Card style={{
                        height: 30,
                        paddingRight: 15,
                        paddingLeft: 15,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Copy><Bold>Change Status</Bold></Copy>
                      </Card>

                    </Button>
                    <Button
                    style={{flex: 1}}
                    onPress={()=>{
                      this.props.setListModal({
                        title: "Add leads to list(s)",
                        description: this.props.selected_all_in_account ? "Choose a list or mulitple lists to add all "+this.props.total_lead_count+" leads." :
                          this.props.selected_leads.length === 1 ? "Choose a list or mulitple lists to add "+this.props.selected_leads[0].property_address+"." :
                            "Choose a list or mulitple lists to add your selected "+this.props.selected_leads.length +" leads.",
                        type: "add_leads_to_lists",
                        selected_leads:this.props.selected_all_in_account ? "all" : this.props.selected_leads,
                        selected_lists: [],
                        modalAction: ({selected_leads, selected_lists})=>{
                          //trigger add to list

                          this.props.updateLead({
                            token: this.props.token,
                            type: "add_leads_to_lists",
                            list_ids: selected_lists.map((list)=>{
                              return list.id
                            }).join(),
                            select_all: this.props.selected_all_in_account ? 1 : 0,
                            total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : selected_leads.length,
                            filters: this.props.applied_filters,
                            filter_lists: this.props.filter_lists,
                            deal_ids: this.props.selected_all_in_account ? "" : selected_leads.map((property)=>{
                                return property.deal.id;
                            }).join(),
                            onSuccess:()=>{
                              this.toggleOptions(false);
                              this.props.clearAll();
                            }
                          })
                          this.toggleOptions(false);
                          this.props.clearAll();
                        }
                      });

                      this.props.appRedirect({redirect: "lists", payload: {active_property: this.props.active_property, page_id: this.props.list_properties_page}})

                    }}>
                      <Card style={{
                        height: 30,
                        paddingRight: 15,
                        paddingLeft: 15,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Copy><Bold>Add To List</Bold></Copy>
                      </Card>

                    </Button>
                  </Row>
                  <Row>
                    <Button
                    style={{flex: 1}}

                    onPress={()=>{

                      skipTrace({
                        props: this.props,
                        properties: this.props.selected_all_in_account ? [] : this.props.selected_leads,
                        total_property_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                        onSuccess:()=>{
                          this.toggleOptions(false);
                          this.props.clearAll();
                      }})

                    }}>
                      <Card style={{
                        height: 30,
                        paddingRight: 15,
                        paddingLeft: 15,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Copy><Bold>Skip Trace</Bold></Copy>
                      </Card>

                    </Button>
                    <Button
                    style={{flex: 1}}
                    onPress={()=>{
                      this.props.setEditModal({
                        title:"Edit Mailing Options",
                        description: this.props.selected_all_in_account ? "Edit mailing options for all "+this.props.total_lead_count+" leads." :
                          this.props.selected_leads.length === 1 ? "Edit mailing options for "+this.props.selected_leads[0].property_address+"." :
                            "Edit mailing options for your selected "+this.props.selected_leads.length +" leads.",
                        slug: "mailing-options",
                        type: "edit_mailing_options",
                        fields:{
                          start_mailers: 0,
                          template_id: this.props.user.default_template_id,
                          template_name: this.props.user.default_template_name,
                          campaign_id: this.props.user.default_campaign_id,
                          campaign_title: this.props.user.default_campaign_title,

                          resend_freq: parseInt(this.props.user.default_resend_freq),
                          resend_freq_switch: this.props.user.default_resend_freq > 0 ? "on" : "off",
                          resend_limit: parseInt(this.props.user.default_resend_limit),
                          resend_limit_switch: parseInt(this.props.user.default_resend_limit) === 0 ? "on" : "off"
                        },
                        always_save: true,
                        save_button_text: "Save Mailing Options",
                        modalAction: ({fields})=>{


                          if(parseInt(fields.start_mailers) === 1){

                            if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_approve_mail) === 1){

                              let change_status_modal_title = '';
                              let change_status_modal_description
                              if(this.props.selected_all_in_account){
                                change_status_modal_title = 'Are you sure you want to start/resume mailers for of '+this.props.total_lead_count+' leads?';
                                change_status_modal_description = "By doing this, you'll be starting mailers for all "+this.props.total_lead_count+" leads, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.total_lead_count)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                              }else{
                                change_status_modal_title = 'Are you sure you want to update the status of '+this.props.selected_leads.length+' leads?';
                                change_status_modal_description = "By doing this you'll be starting mailers for all "+this.props.selected_leads.length+" leads, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.selected_leads.length)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                              }

                              this.props.setModal({
                                title: change_status_modal_title,
                                description: change_status_modal_description,
                                icon: "check-circle",
                                submit: 'Start Mailers',
                                onPress: ()=>{
                                  this.props.updateLead({
                                    token: this.props.token,
                                    type: "edit_mailing_options_for_leads",
                                    start_mailers: fields.start_mailers,
                                    campaign_id: fields.campaign_id,
                                    mail_template_id: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.template_id,
                                    resend_freq: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_freq_switch === "off" ? 0 : fields.resend_freq,
                                    resend_limit: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_limit_switch === "on" ? 0 : fields.resend_limit,
                                    select_all: this.props.selected_all_in_account ? 1 : 0,
                                    total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                                    filters: this.props.applied_filters,
                                    filter_lists: this.props.filter_lists,
                                    deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                                        return property.deal.id;
                                    }).join(),
                                    onSuccess:()=>{
                                      this.toggleOptions(false);
                                      this.props.clearAll();
                                    }
                                  })

                                },
                                cancel: 'Nevermind. Cancel Action.',
                                onCancel: ()=>{}
                              });
                              this.props.toggleModal({show: true, type: "normal"});

                            }else{
                              this.props.setModal({
                                title: "You do not have permissions to do start mailers.",
                                description: "Talk to your team leader to get the permissions you need.",
                                icon: "error",
                                submit: 'Dismiss',
                                onPress: ()=>{
                                },
                                cancel: '',
                                onCancel: ()=>{}
                              });
                              this.props.toggleModal({show: true, type: "normal"});

                            }

                          }else{
                            this.props.updateLead({
                              token: this.props.token,
                              type: "edit_mailing_options_for_leads",
                              start_mailers: fields.start_mailers,
                              campaign_id: fields.campaign_id,
                              mail_template_id: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.template_id,
                              resend_freq: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_freq_switch === "off" ? 0 : fields.resend_freq,
                              resend_limit: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_limit_switch === "on" ? 0 : fields.resend_limit,
                              select_all: this.props.selected_all_in_account ? 1 : 0,
                              total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                              filters: this.props.applied_filters,
                              filter_lists: this.props.filter_lists,
                              deal_ids: this.props.selected_all_in_account ? "" : this.props.selected_leads.map((property)=>{
                                  return property.deal.id;
                              }).join(),
                              onSuccess:()=>{
                                this.toggleOptions(false);
                                this.props.clearAll();
                              }
                            })
                          }

                        }
                      })
                      this.props.appRedirect({
                        redirect: "goForward",
                        payload: {add: "mailing-options"}
                      })
                    }}>
                      <Card style={{
                        height: 30,
                        paddingRight: 15,
                        paddingLeft: 15,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Copy><Bold>Mailing Options</Bold></Copy>
                      </Card>

                    </Button>
                  </Row>


                  {this.renderMoreDropDownInfo()}



                <TextButton
                  onPress={()=>{
                    this.toggleOptions(false);
                    this.toggleMoreDropDown(false);
                    //this.props.clearAll();
                  }}
                  text={"Keep Selecting"}
                />

              </Wrapper>
            </Wrapper>
          )

        }

        return(
          <Wrapper style={{
            position:this.props.device === "mobile" ? "absolute" : "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            minHeight: 150,
            borderTopWidth: 1,
            borderTopColor: this.props.colors.border_color,
            borderTopStyle: "solid",
            backgroundColor: this.props.colors.card_color,
            alignItems: "flex-start",
            justifyContent: "center",
          }}>
            <Wrapper style={{padding: 20}}>

              <Wrapper>
                <Title>{this.props.selected_all_in_account ? this.props.total_lead_count : this.props.selected_leads.length} Selected</Title>
              </Wrapper>
              {this.renderSelectedText()}
              <Row style={{marginTop: 15}}>
                <PillButton style={{margin: 0}} primary={true} onPress={()=>this.toggleOptions(true)}>
                  Edit Selected
                </PillButton>
              </Row>
            </Wrapper>
          </Wrapper>
        )
      }
    }

    if(this.props.selected_leads.length > 0 || this.props.selected_all_in_account){
      return (
        <Wrapper style={{
          paddingRight: 10,
          paddingLeft: 10,

          alignItems: "flex-start",
          justifyContent: "center",

          height: 55,
          whiteSpace: "nowrap"
        }}>
          <Row>
            <Wrapper>
              <Copy><Bold>{this.props.selected_all_in_account ? this.props.total_lead_count : this.props.selected_leads.length} Selected</Bold></Copy>
            </Wrapper>

            <Wrapper>
              <Button
              style={{
                marginLeft: 15
              }}
              onPress={()=>{

                startMailers({
                  props: this.props,
                  properties: this.props.selected_all_in_account ? [] : this.props.selected_leads,
                  total_property_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                  onSuccess:()=>{
                    this.toggleOptions(false);
                    this.toggleMoreDropDown(false);
                    this.props.clearAll();
                  }
                })

              }}>
                <Row>
                  <Icon
                    size={18}
                    icon={"check"}
                  />
                  <Copy>Start Mailers</Copy>
                </Row>
              </Button>
            </Wrapper>

            <Wrapper wrapper_ref={this._update_status_button}>
              <Button
              style={{
                marginLeft: 15
              }}
              onPress={()=>{
                  this.props.setStatusModal({
                    title: "Edit Status for Leads ",
                    description: this.props.selected_all_in_account ? "Select a new status for all "+this.props.total_lead_count+" leads." :
                      this.props.selected_leads.length === 1 ? "Select a new status for "+this.props.selected_leads[0].property_address+"." :
                        "Select a new status for your selected "+this.props.selected_leads.length +" leads.",
                    type: "edit_status_for_lead",
                    selected_leads:this.props.selected_all_in_account ? "all" : this.props.selected_leads,
                    selected_status: 0,
                    modalAction: ({selected_leads, selected_status})=>{

                      if(getDealStatusSlug(selected_status) === "with_marketing"){

                        if(this.props.user.team_clearance_level > 1 || parseInt(this.props.user.can_approve_mail) === 1){

                          let change_status_modal_title = '';
                          let change_status_modal_description
                          if(this.props.selected_all_in_account){
                            change_status_modal_title = 'Are you sure you want to update the status of '+this.props.total_lead_count+' leads?';
                            change_status_modal_description = "By updating the status to \"With Marketing\", you'll be starting mailers for all "+this.props.total_lead_count+" leads, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.total_lead_count)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                          }else{
                            change_status_modal_title = 'Are you sure you want to update the status of '+this.props.selected_leads.length+' leads?';
                            change_status_modal_description = "By updating the status to \"With Marketing\", you'll be starting mailers for all "+this.props.selected_leads.length+" leads, you'll be using "+renderPrice(this.props.pricing.mailer_price*this.props.selected_leads.length)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.";
                          }

                          this.props.setModal({
                            title: change_status_modal_title,
                            description: change_status_modal_description,
                            icon: "check-circle",
                            submit: 'Change Status',
                            onPress: ()=>{

                              this.props.updateLead({
                                token: this.props.token,
                                type: "edit_status_for_lead",
                                deal_status: selected_status,
                                select_all: this.props.selected_all_in_account ? 1 : 0,
                                total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : selected_leads.length,
                                filters: this.props.applied_filters,
                                filter_lists: this.props.filter_lists,
                                deal_ids: this.props.selected_all_in_account ? "" : selected_leads.map((property)=>{
                                    return property.deal.id;
                                }).join(),
                                onSuccess:()=>{
                                  this.toggleOptions(false);
                                  this.toggleMoreDropDown(false);
                                  this.props.clearAll();
                                }
                              })

                            },
                            cancel: 'Nevermind. Cancel Action.',
                            onCancel: ()=>{}
                          });
                          this.props.toggleModal({show: true, type: "normal"});

                        }else{
                          this.props.setModal({
                            title: "You do not have permissions to do start mailers.",
                            description: "Talk to your team leader to get the permissions you need.",
                            icon: "error",
                            submit: 'Dismiss',
                            onPress: ()=>{
                            },
                            cancel: '',
                            onCancel: ()=>{}
                          });
                          this.props.toggleModal({show: true, type: "normal"});

                        }

                      }else{
                        this.props.updateLead({
                          token: this.props.token,
                          type: "edit_status_for_lead",
                          deal_status: selected_status,
                          select_all: this.props.selected_all_in_account ? 1 : 0,
                          total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : selected_leads.length,
                          filters: this.props.applied_filters,
                          filter_lists: this.props.filter_lists,
                          deal_ids: this.props.selected_all_in_account ? "" : selected_leads.map((property)=>{
                              return property.deal.id;
                          }).join(),
                          onSuccess:()=>{
                            this.toggleOptions(false);
                            this.toggleMoreDropDown(false);
                            this.props.clearAll();
                          }
                        })
                      }
                    }
                  });

                  this.props.appRedirect({redirect: "status", payload: {active_property: this.props.active_property, page_id: this.props.list_properties_page}})
              }}>
                <Row>
                  <Icon
                    size={18}
                    icon={"swap-horiz"}
                  />
                  <Copy>Change Status</Copy>
                </Row>
              </Button>
            </Wrapper>
            <Wrapper style={{
                marginLeft: 15
              }} wrapper_ref={this._add_to_list_button}>
              <Button

              onPress={()=>{

                this.props.setListModal({
                  title: "Add leads to list(s)",
                  description: this.props.selected_all_in_account ? "Choose a list or mulitple lists to add all "+this.props.total_lead_count+" leads." :
                    this.props.selected_leads.length === 1 ? "Choose a list or mulitple lists to add "+this.props.selected_leads[0].property_address+"." :
                      "Choose a list or mulitple lists to add your selected "+this.props.selected_leads.length +" leads.",
                  type: "add_leads_to_lists",
                  selected_leads:this.props.selected_all_in_account ? "all" : this.props.selected_leads,
                  selected_lists: [],
                  modalAction: ({selected_leads, selected_lists})=>{
                    //trigger add to list

                    this.props.updateLead({
                      token: this.props.token,
                      type: "add_leads_to_lists",
                      list_ids: selected_lists.map((list)=>{
                        return list.id
                      }).join(),
                      select_all: this.props.selected_all_in_account ? 1 : 0,
                      total_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : selected_leads.length,
                      filters: this.props.applied_filters,
                      filter_lists: this.props.filter_lists,
                      deal_ids: this.props.selected_all_in_account ? "" : selected_leads.map((property)=>{
                          return property.deal.id;
                      }).join(),
                      onSuccess:()=>{
                        this.toggleOptions(false);
                        this.toggleMoreDropDown(false);
                        this.props.clearAll();
                      }
                    })
                  }
                });

                this.props.appRedirect({redirect: "lists", payload: {active_property: this.props.active_property, page_id: this.props.list_properties_page}})
              }}>
                <Row>
                  <Icon
                    size={18}
                    icon={"add"}
                  />
                  <Copy>Add To List</Copy>
                </Row>
              </Button>
            </Wrapper>

            <Button
            style={{
              marginLeft: 15
            }}
            onPress={()=>{
              skipTrace({
                props: this.props,
                properties: this.props.selected_all_in_account ? [] : this.props.selected_leads,
                total_property_count: this.props.selected_all_in_account && !this.props.total_lead_count_loading ? this.props.total_lead_count : this.props.selected_leads.length,
                onSuccess:()=>{
                  this.toggleOptions(false);
                  this.props.clearAll();
              }})
            }}>
              <Row>
                <Icon
                  size={18}
                  icon={"search"}
                />
                <Copy>Skip Trace</Copy>
              </Row>
            </Button>


            <Wrapper style={{position:"relative"}}>
              <Button
                style={{
                  marginLeft: 15
                }}
                onPress={()=>{
                  this.toggleMoreDropDown(!this.state.more_drop_down)
                }}>
                  <Row>
                    <Icon
                      size={18}
                      icon={this.state.more_drop_down ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    />
                    <Copy>More</Copy>
                  </Row>
                </Button>

              {this.renderMoreDropDownInfo()}
            </Wrapper>

            {/*
            <Button
            style={{
              marginLeft: 15
            }}
            onPress={()=>{
            }}>
              <Row>
                <Icon
                  size={18}
                  icon={"keyboard-arrow-down"}
                />
                <Copy>More</Copy>
              </Row>
            </Button>
            */}


          </Row>
          {this.renderSelectedText()}

        </Wrapper>
      );
    }

    return <Wrapper />
  }
}



export default SelectedItems;
