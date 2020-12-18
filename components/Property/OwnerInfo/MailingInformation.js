import React, { Component } from 'react';

import { Wrapper } from 'app/NativeComponents/common'

import {
  formatAddress
} from 'app/NativeActions';

import AddButton from './AddButton';
import OwnerItem from './OwnerItem';
import ScrollingList from './ScrollingList';

class MailingInformation extends Component {


  constructor(props){
    super(props);

    this.state={
      temp_item_id: null,
      temp_item: null,
      force_reload: false
    }
  }

  updateAllRefs(){
    this._add_mailing_address_button = !this._add_mailing_address_button ? React.createRef() : React.forwardRef();
    this._edit_owner_info_button = !this._edit_owner_info_button ? React.createRef() : React.forwardRef();

    this._mailing_address_refs = !this._mailing_address_refs ? {} : this._mailing_address_refs;
    if(this.props.owner_info){
      if(this.props.owner_info.mailing_addresses){
        for(let i = 0; i<this.props.owner_info.mailing_addresses.length; i++){
          this._mailing_address_refs[this.props.owner_info.mailing_addresses[i].owner_mailing_address_id] = this._mailing_address_refs[this.props.owner_info.mailing_addresses[i].owner_mailing_address_id] ? React.createRef() : React.forwardRef();
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
      if(this.props.owner_info.mailing_addresses){
        if(this.props.owner_info.mailing_addresses !== prevProps.owner_info.mailing_addresses){
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

  render(){


    return (
      <ScrollingList
        colors={this.props.colors}
        label="Mailing Addresses:"
        items={this.props.owner_info.mailing_addresses ? this.props.owner_info.mailing_addresses : []}
        renderHeader={()=>{

          if(this.state.temp_item && this.state.temp_item_id === "owner_info"){
            return (
               <Wrapper wrapper_ref={this._edit_owner_info_button} style={{minWidth: 200}}>
                 <OwnerItem
                   disabled={true}
                   device={this.props.device}
                   label={this.props.owner_info.custom_owner ? "Manually Added:" : "County Records:"}
                   selectable={true}
                   selected={parseInt(this.state.temp_item.send_to_address) === 1 ? true : false}

                   line1={formatAddress({address: {
                     address: this.state.temp_item.address,
                     address2: this.state.temp_item.address2,
                     address_city: this.state.temp_item.city,
                     address_state: this.state.temp_item.state,
                     address_zip: this.state.temp_item.zip
                   }}).line1}
                   line2={formatAddress({address: {
                     address: this.state.temp_item.address,
                     address2: this.state.temp_item.address2,
                     address_city: this.state.temp_item.city,
                     address_state: this.state.temp_item.state,
                     address_zip: this.state.temp_item.zip
                   }}).line2}
                 />
               </Wrapper>
             );
          }

          return (
            <Wrapper wrapper_ref={this._edit_owner_info_button}>
              <OwnerItem
                disabled={!this.props.owner_info.custom_owner}
                device={this.props.device}
                onPress={()=>{
                  if(this.props.owner_info.custom_owner){

                    this.props.setEditModal({
                      title:"Edit Owner",
                      description: "Edit owner for "+this.props.active_property.property_address,
                      slug: "edit-owner",
                      type: "edit_owner",
                      fields:{
                        owner_name: this.props.owner_info.owner_name,
                        address: this.props.owner_info.owner_address,
                        address2: this.props.owner_info.owner_address2,
                        city: this.props.owner_info.owner_address_city,
                        state: this.props.owner_info.owner_address_state,
                        zip: this.props.owner_info.owner_address_zip,
                        send_to_address: this.props.owner_info.send_to_owner_address

                      },
                      save_button_text: "Edit",
                      modalAction: ({fields})=>{
                        this.props.updateOwnerInfo({
                          token: this.props.token,
                          deal_id: this.props.active_property.deal.id,
                          type: "edit_owner_name_and_address",
                          owner_name: fields.owner_name,
                          address: fields.address,
                          address2: fields.address2,
                          city: fields.city,
                          state: fields.state,
                          zip: fields.zip,
                          send_to_address: fields.send_to_address,
                          onSuccess:()=>{
                            this.updateTempItem()
                            this.props.setTempOwnerName()
                          }
                        })
                      },
                      cancelAction:()=>{
                        this.updateTempItem()
                        this.props.setTempOwnerName()
                      },
                      fieldsUpdated:(fields)=>{
                        this.updateTempItem("owner_info", fields)
                        this.props.setTempOwnerName(fields.owner_name)
                      },
                      popoverTarget: !this.props.isMobile ? this._edit_owner_info_button.current : null,
                      popoverPlacement: this.props.is_expanded ? "right" : "left",
                    })
                    this.props.appRedirect({redirect: "goForward", payload:{add: "edit-owner"}});
                    this.updateTempItem("owner_info", {
                      owner_name: this.props.owner_info.owner_name,
                      address: this.props.owner_info.owner_address,
                      address2: this.props.owner_info.owner_address2,
                      city: this.props.owner_info.owner_address_city,
                      state: this.props.owner_info.owner_address_state,
                      zip: this.props.owner_info.owner_address_zip,
                      send_to_address: this.props.owner_info.send_to_owner_address

                    })
                  }
                }}
                selectItem={(selected)=>{
                  this.props.updateOwnerInfo({
                    token: this.props.token,
                    deal_id: this.props.active_property.deal.id,
                    owner_mailing_address_id: "main_address",
                    type: "toggle_owner_address",
                    send_to_address: selected === true ? 1 : 0,
                    onSuccess:()=>{
                      this.updateTempItem()
                    }
                  })
                }}
                label={this.props.owner_info.custom_owner ? "Manually Added:" : "County Records:"}
                selectable={this.props.active_property.deal ? true : false}
                selected={parseInt(this.props.owner_info.send_to_owner_address) === 1 ? true : false}
                line1={formatAddress({address: {
                  address: this.props.owner_info.owner_address,
                  address2: this.props.owner_info.owner_address2,
                  address_city: this.props.owner_info.owner_address_city,
                  address_state: this.props.owner_info.owner_address_state,
                  address_zip: this.props.owner_info.owner_address_zip
                }}).line1}
                line2={formatAddress({address: {
                  address: this.props.owner_info.owner_address,
                  address2: this.props.owner_info.owner_address2,
                  address_city: this.props.owner_info.owner_address_city,
                  address_state: this.props.owner_info.owner_address_state,
                  address_zip: this.props.owner_info.owner_address_zip
                }}).line2}

               />
             </Wrapper>
          )
        }}
        renderItem={({item, index})=>{

          if(this.state.temp_item && this.state.temp_item_id === item.owner_mailing_address_id){
            return (
               <Wrapper wrapper_ref={this._mailing_address_refs[item.owner_mailing_address_id]} style={{minWidth: 200}}>
                 <OwnerItem
                   disabled={true}
                   device={this.props.device}
                   label={parseInt(item.manual) === 1 ? "Manually Added:" : "Skip Trace:"}
                   selectable={true}
                   selected={parseInt(this.state.temp_item.send_to_address) === 1 ? true : false}

                   line1={formatAddress({address: {
                     address: this.state.temp_item.address,
                     address2: this.state.temp_item.address2,
                     address_city: this.state.temp_item.city,
                     address_state: this.state.temp_item.state,
                     address_zip: this.state.temp_item.zip
                   }}).line1}
                   line2={formatAddress({address: {
                     address: this.state.temp_item.address,
                     address2: this.state.temp_item.address2,
                     address_city: this.state.temp_item.city,
                     address_state: this.state.temp_item.state,
                     address_zip: this.state.temp_item.zip
                   }}).line2}
                 />
               </Wrapper>
             );
          }

          return (

                <Wrapper wrapper_ref={this._mailing_address_refs[item.owner_mailing_address_id]}>
                  <OwnerItem
                    key={index}
                    onPress={()=>{

                      this.props.setEditModal({
                        title:"Edit Mailing Address",
                        description: "Edit mailing address for "+this.props.owner_info.owner_name,
                        slug: "edit-owner-mailing-address",
                        type: "edit_owner_mailing_address",
                        fields:{
                          address: item.address,
                          address2: item.address2,
                          city: item.city,
                          state: item.state,
                          zip: item.zip,
                          send_to_address: item.send_to_address
                        },
                        save_button_text: "Edit",
                        modalAction: ({fields})=>{
                          this.props.updateOwnerInfo({
                            token: this.props.token,
                            deal_id: this.props.active_property.deal.id,
                            owner_mailing_address_id: item.owner_mailing_address_id,
                            type: "edit_mailing_address",
                            address: fields.address,
                            address2: fields.address2,
                            city: fields.city,
                            state: fields.state,
                            zip: fields.zip,
                            send_to_address: fields.send_to_address,
                            onSuccess:()=>{
                              this.updateTempItem()
                            }
                          })
                        },
                        cancelAction:()=>{
                          this.updateTempItem()
                        },
                        fieldsUpdated:(fields)=>{
                          this.updateTempItem(item.owner_mailing_address_id, fields)
                        },
                        popoverTarget: !this.props.isMobile ? this._mailing_address_refs[item.owner_mailing_address_id] ? this._mailing_address_refs[item.owner_mailing_address_id].current : null : null,
                        popoverPlacement: this.props.is_expanded ? "right" : "left",
                        can_remove: true,
                        remove_button_text: "Remove",
                        remove_button_description: "Are you sure you want to remove this mailing address?",
                        removeAction: ()=>{
                          this.props.updateOwnerInfo({
                            token: this.props.token,
                            deal_id: this.props.active_property.deal.id,
                            owner_mailing_address_id: item.owner_mailing_address_id,
                            type: "remove_mailing_address"
                          });
                        }
                      })

                      this.updateTempItem(item.owner_mailing_address_id, {
                        address: item.address,
                        address2: item.address2,
                        city: item.city,
                        state: item.state,
                        zip: item.zip,
                        send_to_address: item.send_to_address
                      })
                      this.props.appRedirect({redirect: "goForward", payload:{add: "edit-owner-mailing-address"}});

                    }}
                    disabled={parseInt(item.manual) === 1 ? false : true}
                    device={this.props.device}

                    selectItem={(selected)=>{
                      this.props.updateOwnerInfo({
                        token: this.props.token,
                        deal_id: this.props.active_property.deal.id,
                        owner_mailing_address_id: item.owner_mailing_address_id,
                        type: "toggle_owner_address",
                        send_to_address: selected === true ? 1 : 0
                      })
                    }}
                    selectable={true}
                    selected={parseInt(item.send_to_address) === 1 ? true : false}

                    label={parseInt(item.manual) === 1 ? "Manually Added:" : "Skip Trace:"}
                    line1={formatAddress({address: {
                      address: item.address,
                      address2: item.address2,
                      address_city: item.city,
                      address_state: item.state,
                      address_zip: item.zip
                    }}).line1}
                    line2={formatAddress({address: {
                      address: item.address,
                      address2: item.address2,
                      address_city: item.city,
                      address_state: item.state,
                      address_zip: item.zip
                    }}).line2}
                   />
                 </Wrapper>
               );
        }}

        renderFooter={()=>{
          if(this.props.active_property.deal){

           if(this.state.temp_item && this.state.temp_item_id === "new"){
             return (
                <Wrapper wrapper_ref={this._add_mailing_address_button} style={{minWidth: 200}}>
                  <OwnerItem
                    disabled={true}
                    device={this.props.device}

                    label={"Manually Added:"}
                    selectable={true}
                    selected={parseInt(this.state.temp_item.send_to_address) === 1 ? true : false}

                    line1={formatAddress({address: {
                      address: this.state.temp_item.address,
                      address2: this.state.temp_item.address2,
                      address_city: this.state.temp_item.city,
                      address_state: this.state.temp_item.state,
                      address_zip: this.state.temp_item.zip
                    }}).line1}
                    line2={formatAddress({address: {
                      address: this.state.temp_item.address,
                      address2: this.state.temp_item.address2,
                      address_city: this.state.temp_item.city,
                      address_state: this.state.temp_item.state,
                      address_zip: this.state.temp_item.zip
                    }}).line2}
                  />
                </Wrapper>
              );
           }

           return (
              <Wrapper wrapper_ref={this._add_mailing_address_button}>
                <AddButton
                  colors={this.props.colors}

                    title="Add Mailing Address"
                    onPress={()=>{

                      this.props.setEditModal({
                        title:"Add Mailing Address",
                        description: "Add an additional mailing address for "+this.props.owner_info.owner_name,
                        slug: "add-owner-mailing-address",
                        type: "add_owner_mailing_address",
                        fields:{
                          address: "",
                          address2: "",
                          city: "",
                          state: "",
                          zip: "",
                          send_to_address: 0
                        },
                        save_button_text: "Add Mailing Address",
                        modalAction: ({fields})=>{

                          this.props.updateOwnerInfo({
                            token: this.props.token,
                            deal_id: this.props.active_property.deal.id,
                            type: "create_mailing_address",
                            address: fields.address,
                            address2: fields.address2,
                            city: fields.city,
                            state: fields.state,
                            zip: fields.zip,
                            send_to_address: fields.send_to_address,
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
                        popoverTarget: !this.props.isMobile ? this._add_mailing_address_button.current : null,
                        popoverPlacement: this.props.is_expanded ? "right" : "left"
                      })
                      /*
                      this.updateTempItem("new", {
                        address: "",
                        address2: "",
                        city: "",
                        state: "",
                        zip: "",
                        send_to_address: 0
                      })
                      */
                      this.props.appRedirect({redirect: "goForward", payload:{add: "add-owner-mailing-address"}});

                    }}
                  />
                </Wrapper>
              )
          }
        }}
      />
    )


  }


}




export default MailingInformation;
