import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import AddButton from './AddButton';
import OwnerItem from './OwnerItem';
import ScrollingList from './ScrollingList';

import EmailMore from './EmailMore';

class EmailAddressInformation extends Component {

  constructor(props){
    super(props);

    this.state={
      temp_item_id: null,
      temp_item: null,
      force_reload: false,
      selected_email: null
    }
  }

  updateAllRefs(){
    this._add_email_address_button = !this._add_email_address_button ? React.createRef() : React.forwardRef();

    this._email_address_refs = !this._email_address_refs ? {} : this._email_address_refs;
    if(this.props.owner_info){
      if(this.props.owner_info.email_addresses){
        for(let i = 0; i<this.props.owner_info.email_addresses.length; i++){
          this._email_address_refs[this.props.owner_info.email_addresses[i].owner_email_address_id] = this._email_address_refs[this.props.owner_info.email_addresses[i].owner_email_address_id] ? React.createRef() : React.forwardRef();
        }
      }
    }
    this.setState({force_reload: true})
  }

  componentDidMount(){
    this.updateAllRefs();
  }

  componentDidUpdate(prevProps, prevState){

    if(prevState.force_reload === false && this.state.force_reload === true){
      this.setState({force_reload: false})
    }

    if(this.props.owner_info && prevProps.owner_info){
      if(this.props.owner_info.email_addresses){
        if(this.props.owner_info.email_addresses !== prevProps.owner_info.email_addresses){
          this.updateAllRefs();
        }
      }
    }
  }

  updateTempItem(item_id = null, item = null){
    this.setState({
      temp_item_id: item_id,
      temp_item: item
    })
  }

  selectEmail(email = null){
    this.setState({
      selected_email: email
    })
  }

  render(){

    if(this.props.active_property.deal){
      return (
        <Wrapper>
          <EmailMore
            selected_email={this.state.selected_email}
            selectEmail={this.selectEmail.bind(this)}
            {...this.props}
          />
          <ScrollingList
            colors={this.props.colors}
            label="Email Addresses:"
            items={this.props.owner_info.email_addresses ? this.props.owner_info.email_addresses : []}
            renderItem={({item, index})=>{
                if(this.state.temp_item && this.state.temp_item_id === item.owner_email_address_id){
                  return (
                    <Wrapper wrapper_ref={this._email_address_refs[item.owner_email_address_id]} style={{minWidth: 200}}>
                       <OwnerItem
                         disabled={true}
                         device={this.props.device}

                         label={parseInt(item.manual) === 1 ? "Manually Added:" : "Skip Trace:"}
                         line1={this.state.temp_item.email_address}
                         line2={this.state.temp_item.email_label}
                       />
                     </Wrapper>
                   );
                }

                return (
                  <Wrapper wrapper_ref={this._email_address_refs[item.owner_email_address_id]} style={{minWidth: 200}}>
                    <OwnerItem
                      key={index}
                      onPress={()=>{
                        if(parseInt(item.manual) === 1){
                          this.props.setEditModal({
                            title:"Edit Email Address",
                            description: "Edit email address for "+this.props.owner_info.owner_name,
                            slug: "edit-owner-email-address",
                            type: "edit_owner_email_address",
                            fields:{
                              email_label: item.email_label,
                              email_address: item.email_address
                            },
                            save_button_text: "Edit",
                            modalAction: ({fields})=>{
                              this.props.updateOwnerInfo({
                                token: this.props.token,
                                deal_id: this.props.active_property.deal.id,
                                owner_email_address_id: item.owner_email_address_id,
                                type: "edit_email_address",
                                email_label: fields.email_label,
                                email_address: fields.email_address,
                                onSuccess:()=>{
                                  this.updateTempItem()
                                }
                              })
                            },
                            cancelAction:()=>{
                              this.updateTempItem()
                            },
                            fieldsUpdated:(fields)=>{
                              this.updateTempItem(item.owner_email_address_id, fields)
                            },
                            popoverTarget: !this.props.isMobile ? this._email_address_refs[item.owner_email_address_id] ? this._email_address_refs[item.owner_email_address_id].current : null : null,
                            popoverPlacement: this.props.is_expanded ? "right" : "left",
                            can_remove: true,
                            remove_button_text: "Remove",
                            remove_button_description: "Are you sure you want to remove this email address?",
                            removeAction: ()=>{
                              this.props.updateOwnerInfo({
                                token: this.props.token,
                                deal_id: this.props.active_property.deal.id,
                                owner_email_address_id: item.owner_email_address_id,
                                type: "remove_email_address"
                              });
                            }
                          })
                          this.props.appRedirect({redirect: "goForward", payload:{add: "edit-owner-email-address"}});
                        }else if(this.props.isMobile){
                            this.selectEmail(item)
                        }
                      }}
                      disabled={parseInt(item.manual) === 1 && this.props.isMobile === false ? false : true}
                      device={this.props.device}

                      label={parseInt(item.manual) === 1 ? "Manually Added:" : "Skip Trace:"}
                      line1={item.email_address}
                      line2={item.email_label}

                     />
                   </Wrapper>
                )
            }}

            renderFooter={()=>{

              if(this.state.temp_item && this.state.temp_item_id === "new"){
                return (
                   <Wrapper wrapper_ref={this._add_mailing_address_button} style={{minWidth: 200}}>
                     <OwnerItem
                       disabled={true}
                       device={this.props.device}

                       label={"Manually Added:"}
                       line1={this.state.temp_item.email_address}
                       line2={this.state.temp_item.email_label}
                     />
                   </Wrapper>
                 );
              }

               return (
                 <Wrapper wrapper_ref={this._add_email_address_button} style={{minWidth: 200}}>
                    <AddButton
                        colors={this.props.colors}
                        title="Add Email Address"
                        onPress={()=>{
                          this.props.setEditModal({
                            title:"Add Email Address",
                            description: "Add email address for "+this.props.owner_info.owner_name,
                            slug: "add-owner-email-address",
                            type: "add_owner_email_address",
                            fields:{
                              email_label: "",
                              email_address: ""
                            },
                            save_button_text: "Add Email Address",
                            modalAction: ({fields})=>{
                              this.props.updateOwnerInfo({
                                token: this.props.token,
                                deal_id: this.props.active_property.deal.id,
                                type: "create_email_address",
                                email_label: fields.email_label,
                                email_address: fields.email_address,
                                onSuccess:()=>{
                                  this.updateTempItem()
                                }
                              })
                            },
                            cancelAction:()=>{
                              this.updateTempItem()
                            },
                            fieldsUpdated:(fields)=>{
                              this.updateTempItem("new", fields)
                            },
                            popoverTarget: !this.props.isMobile ? this._add_email_address_button.current : null,
                            popoverPlacement: this.props.is_expanded ? "right" : "left"
                          })
                          this.props.appRedirect({redirect: "goForward", payload:{add: "add-owner-email-address"}});
                          /*
                          this.updateTempItem("new", {
                            email_label: "",
                            email_address: ""
                          })
                          */
                        }}
                      />
                    </Wrapper>
                  )
            }}
          />
        </Wrapper>
      )
    }

    return <Wrapper />;


  }


}




export default EmailAddressInformation;
