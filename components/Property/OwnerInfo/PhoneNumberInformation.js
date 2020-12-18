import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import AddButton from './AddButton';
import OwnerItem from './OwnerItem';
import ScrollingList from './ScrollingList';

import PhoneMore from './PhoneMore';

class PhoneNumberInformation extends Component {

  constructor(props){
    super(props);

    this.state={
      temp_item_id: null,
      temp_item: null,
      force_reload: false,
      selected_phone: null
    }
  }

  updateAllRefs(){
    this._add_phone_number_button = !this._add_phone_number_button ? React.createRef() : React.forwardRef();

    this._phone_number_refs = !this._phone_number_refs ? {} : this._phone_number_refs;
    if(this.props.owner_info){
      if(this.props.owner_info.phone_numbers){
        for(let i = 0; i<this.props.owner_info.phone_numbers.length; i++){
          this._phone_number_refs[this.props.owner_info.phone_numbers[i].owner_phone_number_id] = this._phone_number_refs[this.props.owner_info.phone_numbers[i].owner_phone_number_id] ? React.createRef() : React.forwardRef();
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
      if(this.props.owner_info.phone_numbers){
        if(this.props.owner_info.phone_numbers !== prevProps.owner_info.phone_numbers){
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

  selectPhone(phone_item = null){
    this.setState({selected_phone: phone_item})
  }

  render(){

    if(this.props.active_property.deal){
      return (
        <Wrapper>
          <PhoneMore
            selected_phone={this.state.selected_phone}
            selectPhone={this.selectPhone.bind(this)}
            {...this.props}
          />
          <ScrollingList
            colors={this.props.colors}
            label="Phone Numbers:"
            items={this.props.owner_info.phone_numbers ? this.props.owner_info.phone_numbers : []}
            renderItem={({item, index})=>{
                if(this.state.temp_item && this.state.temp_item_id === item.owner_phone_number_id){
                  return (
                    <Wrapper wrapper_ref={this._phone_number_refs[item.owner_phone_number_id]} style={{minWidth: 200}}>
                       <OwnerItem
                         disabled={true}
                         device={this.props.device}
                         bad_item={this.state.temp_item.bad_phone == 1 ? true : false}
                         label={parseInt(item.manual) === 1 ? "Manually Added:" : "Skip Trace:"}
                         line1={this.state.temp_item.phone_number}
                         line2={this.state.temp_item.phone_label}
                       />
                     </Wrapper>
                   );
                }

                return (
                  <Wrapper wrapper_ref={this._phone_number_refs[item.owner_phone_number_id]} style={{minWidth: 200}}>
                    <OwnerItem
                      key={index}
                      bad_item={item.bad_phone == 1 ? true : false}
                      onPress={()=>{
                          //if(parseInt(item.manual) === 1){

                            this.props.setEditModal({
                              title:"Edit Phone Number",
                              description: "Edit phone number for "+this.props.owner_info.owner_name,
                              slug: "edit-owner-phone-number",
                              type: "edit_owner_phone_number",
                              fields:{
                                manual_number: parseInt(item.manual),
                                bad_phone: parseInt(item.bad_phone),
                                phone_label: item.phone_label,
                                phone_number: item.phone_number
                              },
                              save_button_text: "Edit",
                              modalAction: ({fields})=>{
                                this.props.updateOwnerInfo({
                                  token: this.props.token,
                                  deal_id: this.props.active_property.deal.id,
                                  owner_phone_number_id: item.owner_phone_number_id,
                                  type: "edit_phone_number",
                                  phone_label: fields.phone_label,
                                  phone_number: fields.phone_number,
                                  bad_phone: fields.bad_phone,
                                  onSuccess:()=>{
                                    this.updateTempItem()
                                  }
                                })
                              },
                              cancelAction:()=>{
                                this.updateTempItem()
                              },
                              fieldsUpdated:(fields)=>{
                                this.updateTempItem(item.owner_phone_number_id, fields)
                              },
                              popoverTarget: !this.props.isMobile ? this._phone_number_refs[item.owner_phone_number_id] ? this._phone_number_refs[item.owner_phone_number_id].current : null : null,
                              popoverPlacement: this.props.is_expanded ? "right" : "left",
                              can_remove: parseInt(item.manual) ? true : false,
                              remove_button_text: "Remove",
                              remove_button_description: "Are you sure you want to remove this phone number?",
                              removeAction: ()=>{
                                this.props.updateOwnerInfo({
                                  token: this.props.token,
                                  deal_id: this.props.active_property.deal.id,
                                  owner_phone_number_id: item.owner_phone_number_id,
                                  type: "remove_phone_number"
                                });
                              }
                            })
                            this.props.appRedirect({redirect: "goForward", payload:{add: "edit-owner-phone-number"}});

                          //}else if(this.props.isMobile){
                          //  this.selectPhone(item);
                          //}
                        }}
                        disabled={false}

                        device={this.props.device}

                        label={parseInt(item.manual) === 1 ? "Manually Added:" : "Skip Trace:"}
                        line1={item.phone_number}
                        line2={item.phone_label}

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
                       line1={this.state.temp_item.phone_number}
                       line2={this.state.temp_item.phone_label}
                     />
                   </Wrapper>
                 );
              }

               return (
                 <Wrapper wrapper_ref={this._add_phone_number_button} style={{minWidth: 200}}>
                    <AddButton
                      colors={this.props.colors}

                        title="Add Phone Number"
                        onPress={()=>{
                          this.props.setEditModal({
                            title:"Add Phone Number",
                            description: "Add phone number for "+this.props.owner_info.owner_name,
                            slug: "add-owner-phone-number",
                            type: "add_owner_phone_number",
                            fields:{
                              phone_label: "",
                              phone_number: ""
                            },
                            save_button_text: "Add Phone Number",
                            modalAction: ({fields})=>{
                              this.props.updateOwnerInfo({
                                token: this.props.token,
                                deal_id: this.props.active_property.deal.id,
                                type: "create_phone_number",
                                phone_label: fields.phone_label,
                                phone_number: fields.phone_number,
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
                            popoverTarget: !this.props.isMobile ? this._add_phone_number_button.current : null,
                            popoverPlacement: this.props.is_expanded ? "right" : "left"
                          })
                          this.props.appRedirect({redirect: "goForward", payload:{add: "add-owner-phone-number"}});
                          /*
                          this.updateTempItem("new", {
                            phone_label: "",
                            phone_number: ""
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




export default PhoneNumberInformation;
