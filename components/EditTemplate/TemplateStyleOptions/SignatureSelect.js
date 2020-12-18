import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  dismissMobileKeyboard
} from 'app/NativeActions';

class SignatureSelect extends Component{


  setSignatures(props){
    var signature_array = [];

    if(props.device == "desktop"){
      signature_array.push({
        key: -1,
        value: 0,
        label: "Not Selected"
      });
    }

    for(var i = 0; i<props.signatures.length; i++){
      signature_array.push({
        key: i,
        value: props.signatures[i].id,
        label: props.signatures[i].title ? props.signatures[i].title : ""
      });
    }

    signature_array.push({
      key: -2,
      value: -1,
      label: "Create New Signature"
    });

    this.setState({signature_array: signature_array});

  }

  constructor(props) {

    super(props);

    this.state = {signature_array: []}
  }

  componentDidMount(){
    this.setSignatures(this.props);
  }

  componentDidUpdate(prevProps){
    if(prevProps.signatures != this.props.signatures){
      this.setSignatures(this.props);
    }
  }


  render(){
    if(this.state.signature_array.length > 0){
      return (
        <Card>
          <Select
            {...this.props}
            ref="select_signature_wrapper"
            item_ref={"select_signature"}
            items={this.state.signature_array}
            title="Select a signature"
            label="Select a signature"
            value={this.props.editTemplate ? this.props.editTemplate.template_signature ? this.props.editTemplate.template_signature.id ? this.props.editTemplate.template_signature.id : 0 : 0 : 0}
            text={this.props.editTemplate.template_signature ? this.props.editTemplate.template_signature.id ? this.props.editTemplate.template_signature.title : "None selected" : "None selected"}
            onSelect={item => {


              if(item == -1){
                //prompt create new sig

                if(this.props.device == "mobile"){
                  this.refs.select_signature_wrapper.refs.select_signature.togglePicker();
                }

                this.props.setModal({
                  title: "Create New Signature?",
                  description: "This will take you to a new screen to create a new signature.",
                  icon: "edit",
                  submit: 'Continue',
                  onPress: ()=>{
                    const signature_number = this.props.signatures.length + 1;
                    const signature = {
                      title: "Signature #"+signature_number,
                      signature_text: "Sincerely,",
                      signature_user_id: this.props.user.team_id,
                      signature_other_name: this.props.user.firstname+" "+this.props.user.lastname,
                      email: this.props.user.team_email,
                      phone: this.props.user.team_phone,
                      other_contact: "",
                      include_image: this.props.user.image != "" && this.props.user.image ? 1 : 0,
                      signature_image: "",

                      address: "",
                      address2: "",
                      city: "",
                      state: "",
                      zip: "",

                      disclaimer: ""
                    }
                    this.props.templateFieldChanged({ prop: "template_signature", value: {id: 0, title: "None selected"} })
                    this.props.signatureInit({signature: signature});


                    if(this.props.select_default_sending_options){
                      this.props.setEditReturnLocation("templates");
                      this.props.appRedirect({redirect: "settingsNewSignature"})
                    }else if(this.props.info.id != 0){
                      this.props.setEditReturnLocation("templates");
                      this.props.appRedirect({redirect: "dealNewSignature"})
                    }else{
                      if(this.props.edit_return_location == "campaigns"){
                        this.props.appRedirect({redirect: "campaignsEditSignature"})
                      }else{
                        this.props.setEditReturnLocation("templates");
                        this.props.appRedirect({redirect: "templatesEditSignature"})
                      }
                    }
                  },
                  cancel: 'Not right now',
                  onCancel: ()=>{
                    this.props.templateFieldChanged({ prop: "template_signature", value: {id: 0, title: "None selected"} })
                  }
                });
                this.props.toggleModal({show: true, type: "normal"});

              }else{

                var signature;
                for(var i = 0; i<this.props.signatures.length; i++){
                  if(item == this.props.signatures[i].id){
                    signature = this.props.signatures[i];
                  }
                }

                this.props.templateFieldChanged({ prop: "template_signature", value: signature })
              }
            }}
          />

        </Card>
      );
    }

    return <Wrapper />
  }
}

export default SignatureSelect;
