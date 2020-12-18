import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Card,
  CardBody,
  Wrapper,
  Row,
  Button,
  Icon,
  Copy,
  Bold,
  Title
} from 'app/NativeComponents/common';

import OwnerImage from './OwnerImage';
import MailingInformation from './MailingInformation';
import PhoneNumberInformation from './PhoneNumberInformation';
import EmailAddressInformation from './EmailAddressInformation';

import {
  getOwnerInfo,
  setEditModal,
  updateOwnerInfo,
  determineMainOwnerInfo,

  skipTrace
} from 'app/NativeActions';

class OwnerInfo extends Component {


  constructor(props){
    super(props);

    this.state = {
      owner_info: determineMainOwnerInfo(props.active_property),
      temp_owner_name: null
    }
  }

  componentDidMount(){
    if(this.props.active_property.deal){
      this.props.getOwnerInfo({token: this.props.token, deal_id: this.props.active_property.deal.id});
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.active_property && prevProps.active_property){
      if(this.props.active_property.property_id !== prevProps.active_property.property_id){
        this.setState({owner_info: determineMainOwnerInfo(this.props.active_property)});
        if(this.props.active_property.deal){
          this.props.getOwnerInfo({token: this.props.token, deal_id: this.props.active_property.deal.id});
        }
      }
    }else if(this.props.active_property && !prevProps.active_property){
      this.setState({owner_info: determineMainOwnerInfo(this.props.active_property)});
      if(this.props.active_property.deal){
        this.props.getOwnerInfo({token: this.props.token, deal_id: this.props.active_property.deal.id});
      }
    }

    if(this.props.main_owner_info && this.props.main_owner_info !== prevProps.main_owner_info){
      this.setState({owner_info: this.props.main_owner_info});
    }
  }

  setTempOwnerName(owner_name = null){
    this.setState({temp_owner_name: owner_name})
  }


  renderEditOwnerButton(){
    if(this.props.active_property.deal){

      if(!this.state.owner_info.owner_name || this.state.owner_info.owner_name === ""){
        return(
          <Button onPress={()=>{
            this.props.setEditModal({
              title:"Add Owner",
              description: "Add owner to "+this.props.active_property.property_address,
              slug: "add-owner",
              type: "add_owner",
              fields:{
                owner_name: "",
                address: "",
                address2: "",
                city: "",
                state: "",
                zip: ""
              },
              save_button_text: "Add Owner",
              modalAction: ({fields})=>{
                this.props.updateOwnerInfo({
                  token: this.props.token,
                  deal_id: this.props.active_property.deal.id,
                  type: "owner_name_and_address",
                  owner_name: fields.owner_name,
                  address: fields.address,
                  address2: fields.address2,
                  city: fields.city,
                  state: fields.state,
                  zip: fields.zip,
                  send_to_address: 1
                })
              }
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "add-owner"}})
          }}>
            <Row>
              <Icon
                color={this.props.colors.active_color}
                icon={"add"}
                size={14}
              />
              <Copy style={{color: this.props.colors.active_color, fontSize: 10}}>Add Owner</Copy>
            </Row>
          </Button>
        )
      }else{
        return(
          <Row>
            <Button onPress={()=>{
              this.props.setEditModal({
                title:"Edit Owner",
                description: "Edit owner for "+this.props.active_property.property_address,
                slug: "edit-owner",
                type: "edit_owner",
                fields:{
                  owner_name: this.state.owner_info.owner_name,
                  address: this.state.owner_info.owner_address,
                  address2: this.state.owner_info.owner_address2,
                  city: this.state.owner_info.owner_address_city,
                  state: this.state.owner_info.owner_address_state,
                  zip: this.state.owner_info.owner_address_zip,
                  send_to_address: this.state.owner_info.send_to_owner_address
                },
                save_button_text: "Edit Owner",
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
                    send_to_address: fields.send_to_address
                  })
                }
              })
              this.props.appRedirect({redirect: "goForward", payload:{add: "edit-owner"}});
            }}
            style={{marginRight: 10}}
            >
              <Row>
                <Icon
                  color={this.props.colors.active_color}
                  icon={"edit"}
                  size={14}
                />
                <Copy style={{color: this.props.colors.active_color, fontSize: 10}}>Edit Owner</Copy>
              </Row>
            </Button>
            {this.renderRestoreOwnerButton()}
          </Row>
        )

      }
    }
  }

  renderRestoreOwnerButton(){
    if(this.props.active_property.owner_name &&
      this.props.active_property.owner_name !== "" &&
      this.state.owner_info.custom_owner === true &&
      this.props.active_property.property_data_type != "phantom"
    ){
      return(
        <Button onPress={()=>{
          this.props.updateOwnerInfo({
            token: this.props.token,
            deal_id: this.props.active_property.deal.id,
            type: "sync_owner_name_and_address",
            owner_name: this.props.active_property.owner_name,
            address: this.props.active_property.owner_address,
            address2: this.props.active_property.owner_address2,
            city: this.props.active_property.owner_address_city,
            state: this.props.active_property.owner_address_state,
            zip: this.props.active_property.owner_address_zip,
            send_to_address: this.state.owner_info.send_to_owner_address
          })
        }}
        style={{marginRight: 10}}
        >
          <Row>
            <Icon
              color={this.props.colors.active_color}
              icon={"refresh"}
              size={14}
            />
            <Copy style={{color: this.props.colors.active_color, fontSize: 10}}>Sync With County Records</Copy>
          </Row>
        </Button>
      )
    }
  }

  renderSkipTraceText(){
    var item_string = "";
    var contact_string = "";

    var has_phones = false;
    var has_emails = false;
    var has_addresses = false;

    var address_count = 0;
    var email_count = 0;
    var phone_count = 0;

    if(this.state.owner_info.phone_numbers != null){
        for(var i = 0; i < this.state.owner_info.phone_numbers.length; i++){
          if(parseInt(this.state.owner_info.phone_numbers[i].manual) !== 1){
            phone_count++;
          }
        }
        if(phone_count > 0){
          has_phones = true;
        }
    }

    if(this.state.owner_info.email_addresses != null){
      for(let i = 0; i < this.state.owner_info.email_addresses.length; i++){
        if(parseInt(this.state.owner_info.email_addresses[i].manual) !== 1){
          email_count++;
        }
      }
      if(email_count > 0){
        has_emails = true;
      }
    }

    if(this.state.owner_info.mailing_addresses != null){

      for(let i = 0; i < this.state.owner_info.mailing_addresses.length; i++){
        if(parseInt(this.state.owner_info.mailing_addresses[i].manual) !== 1){
          address_count++;
        }
      }

      if(address_count > 0){
        has_addresses = true;
      }
    }
    if(has_phones){
      if(phone_count === 1){
        item_string += "1 phone number";
      }else{
        item_string += phone_count+" phone numbers";
      }

      if(!has_emails && !has_addresses){
        item_string += "!";
      }
    }
    if(has_emails){

      if(has_phones && has_addresses){
        item_string += ", ";
      }else if(has_phones && !has_addresses){
        item_string += " and ";
      }

      if(email_count === 1){
        item_string += "1 email";
      }else{
        item_string += email_count+" emails";
      }

      if(!has_addresses){
        if(email_count === 1){
          item_string += " address!";
        }else{
          item_string += " addresses!";
        }
      }

    }

    if(has_addresses){
      if(has_phones && has_emails){
        item_string += ", ";
      }else if((has_phones && !has_emails) || (!has_phones && has_emails)){
        item_string += " and ";
      }

      if(address_count === 1){
        item_string += "1 additional address";
      }else{
        item_string += address_count+" additional addresses";
      }

      item_string += "!";
    }

    if(has_emails || has_phones){
      if(has_emails && has_phones){
        contact_string = " You can now choose to contact the owner via email, phone or ";
      }else if(has_emails && !has_phones){
        contact_string = " You can now choose to contact the owner via email or ";
      }else if(has_phones){
        contact_string = " You can now choose to contact the owner via phone or ";
      }
    }else{
      contact_string = " You can now";
    }
    var bold_contract_string = "";
    if(has_addresses){
      if(this.state.owner_info.mailing_addresses.length === 1){
        bold_contract_string = " send mail to both associated owner addresses. ";
      }else{
        var all_address_count = this.state.owner_info.mailing_addresses.length + 1;
        bold_contract_string = " send mail to all "+all_address_count+" associated owner addresses. ";
      }
    }else{
      bold_contract_string = " send mail to the original owner address. ";
    }

    return <Copy>We added <Bold>{item_string}</Bold>{contact_string}<Bold>{bold_contract_string}</Bold></Copy>;
  }

  renderSkipTraceButton(){
    if(this.props.active_property.deal){
      if(this.state.owner_info.owner_name && this.state.owner_info.owner_name !== ""){

        if(parseInt(this.state.owner_info.did_skip_trace) !== 1){

          return(
            <Button onPress={()=>{

              skipTrace({
                props: this.props,
                properties: [this.props.active_property],
                total_property_count: 1
              });
            }}>
              <CardBody>
                <Row>
                  <Wrapper>
                    <Icon
                      icon={"search"}
                      size={26}
                      style={{marginRight: 15}}
                    />
                  </Wrapper>
                  <Wrapper style={{flex: 1}}>
                    <Title>Skip Trace Owner</Title>
                    <Copy>Search phone numbers, email addresses and additional mailing addresses</Copy>
                  </Wrapper>
                </Row>
              </CardBody>
            </Button>
          )

        }else if(parseInt(this.state.owner_info.skip_trace_successful) === 1){

          return(
            <CardBody>
              <Row>
                <Wrapper>
                  <Title>Skip Trace Successful</Title>
                  {this.renderSkipTraceText()}

                </Wrapper>
              </Row>
            </CardBody>
          )
        }else if(parseInt(this.state.owner_info.skip_trace_successful) === 0){
          return(
            <CardBody>
              <Row>

                <Wrapper>
                  <Title>Skip Trace Failed</Title>
                  <Copy>We could not find any phone numbers, email addresses or mailing addresses associated with this owner.</Copy>
                </Wrapper>
              </Row>
            </CardBody>
          )
        }
      }
    }
  }

  renderBusinessOwnerName(){
    if(this.state.owner_info.did_skip_trace === 1 && this.state.owner_info.skip_trace_successful === 1 && this.state.owner_info.owner_status_info.slug === "corporate_owner"){
      if(this.state.owner_info.skip_trace_owner_name && this.state.owner_info.skip_trace_owner_name != ""){
        return <Copy>Business Owner: {this.state.owner_info.skip_trace_owner_name}</Copy>
      }
    }
  }

  renderOwnerTitle(){
    if(this.state.owner_info.owner_name && this.state.owner_info.owner_name !== ""){
      return(
        <Wrapper>
          <Title>{this.state.temp_owner_name && this.state.temp_owner_name !== "" ? this.state.temp_owner_name : this.state.owner_info.owner_name}</Title>
          {this.renderBusinessOwnerName()}
        </Wrapper>
      )
    }
  }

  renderMoreOwnerInformation(){
    if(this.state.owner_info.owner_name && this.state.owner_info.owner_name !== ""){
      return(
        <Wrapper style={{borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: this.props.colors.border_color,
            borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: this.props.colors.border_color}}>
          <MailingInformation {...this.props} owner_info={this.state.owner_info} setTempOwnerName={this.setTempOwnerName.bind(this)} />
          <PhoneNumberInformation {...this.props} owner_info={this.state.owner_info} />
          <EmailAddressInformation {...this.props} owner_info={this.state.owner_info} />
        </Wrapper>
      )
    }
  }

  render(){

    if(this.state.owner_info && !this.props.owner_loading && this.props.user.team_clearance_level > 0){

      return (
        <Card>
          <CardBody>
            <Row>
              <OwnerImage
                colors={this.props.colors}
                owner_name={this.state.temp_owner_name && this.state.temp_owner_name !== "" ? this.state.temp_owner_name : this.state.owner_info.owner_name}
                owner_firstname={this.state.owner_info.owner_firstname}
                owner_lastname={this.state.owner_info.owner_lastname}
                owner_status_info={this.state.owner_info.owner_status_info}
                owner_image={""}
              />
              <Wrapper>
                <Row>
                  <Copy><Bold>{
                    this.state.owner_info.owner_name && this.state.owner_info.owner_name !== "" ?
                      this.state.owner_info.owner_status_info ?
                        this.state.owner_info.owner_status_info.text :
                          "Owner Not Found" :
                        "Owner Not Found"
                    }</Bold></Copy>
                </Row>
                {this.renderOwnerTitle()}
                <Row>
                  {this.renderEditOwnerButton()}

                </Row>

              </Wrapper>
            </Row>
          </CardBody>

          {
            this.renderMoreOwnerInformation()
          }

          {this.renderSkipTraceButton()}

        </Card>
      )
    }

    return <Wrapper />


  }


}

const mapStateToProps = ({ owner, native }) => {
  const { main_owner_info, owner_loading } = owner;
  const { device, isMobile } = native;
  return {
    main_owner_info,
    owner_loading,
    device, isMobile
  }
}


export default connect(mapStateToProps, {
  getOwnerInfo,
  updateOwnerInfo,
  setEditModal
})(OwnerInfo);
