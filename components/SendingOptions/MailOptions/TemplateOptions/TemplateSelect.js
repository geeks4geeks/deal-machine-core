import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

class TemplateSelect extends Component{

  setTemplates(props){
    var template_array = [];

    if(props.device == "desktop"){
      template_array.push({
        key: -1,
        value: 0,
        label: "Not Selected"
      });
    }

    for(var i = 0; i<props.templates.length; i++){
      template_array.push({
        key: i,
        value: props.templates[i].id,
        label: props.templates[i].name
      });
    }

    template_array.push({
      key: -2,
      value: -1,
      label: "Create New Template"
    });

    this.setState({template_array: template_array});

  }

  constructor(props) {

    super(props);
    this.state = {template_array: []};
  }

  componentDidMount(){
    this.setTemplates(this.props);

    if(this.props.templates.length == 0){
      this.props.getTemplates({ token: this.props.token, type: "load" });
    }

  }

  componentDidUpdate(prevProps){
    if(prevProps.templates != this.props.templates){
      this.setTemplates(this.props);
    }
  }

  render(){
    if(!this.props.onboarding && this.state.template_array.length > 0){
      return (
        <Card>
          <Select
            ref={"select_template_wrapper"}
            item_ref={"select_template"}
            items={this.state.template_array}
            title={this.props.select_default_sending_options ? "My default template" : "Select a template:"}
            label="Select a template"
            value={this.props.select_default_sending_options ? this.props.editUser.default_template_id : this.props.editHouse.mail_template_id}
            text={
              this.props.select_default_sending_options ?
                this.props.editUser.default_template_id == 0 || this.props.editUser.default_template_id == null ?
                "Not Selected" :
                  this.props.editUser.default_template_name :
                this.props.editHouse.mail_template_id == 0 || this.props.editHouse.mail_template_id == null ?
                "Not Selected" :
                this.props.editHouse.mail_template_name
              }
            onSelect={item => {

              if(item == -1){

                if(this.props.device == "mobile"){
                  this.refs.select_template_wrapper.refs.select_template.togglePicker();
                }

                this.props.setModal({
                  title: "Create New Template?",
                  description: "This will take you to a new screen to create a new template.",
                  icon: "edit",
                  submit: 'Continue',
                  onPress: ()=>{

                    if(this.props.select_default_sending_options){
                      this.props.updateUserFieldChange({ prop: "default_template_id", value: 0 });
                      this.props.updateUserFieldChange({ prop: "default_template_name", value: "Not Selected" });
                    }else{
                      this.props.editHouseFieldChange({ prop: "mail_template_id", value: 0 });
                      this.props.editHouseFieldChange({ prop: "mail_template_name", value: "Not Selected" });
                    }

                    //init template
                    var signature = null;
                    if(this.props.signatures.length > 0){
                      signature = this.props.signatures[0];
                    }
                    const template_number = this.props.templates.length + 1;
                    const template = {
                      name: "Template #"+template_number,
                      template_signature: signature,
                      section_a: null,
                      section_b: null,
                      section_c: null,
                      section_d: null,
                      primary_color: null,
                      secondary_color: null,
                      html_template: null
                    }
                    this.props.templateInit({template: template});


                    if(this.props.select_default_sending_options){
                      this.props.setEditReturnLocation("sending_options");
                      this.props.appRedirect({redirect: "settingsNewTemplate"});
                    }else{

                      this.props.setEditReturnLocation("mailing_options");
                      this.props.appRedirect({redirect: "dealNewTemplate"});
                    }

                  },
                  cancel: 'Not right now',
                  onCancel: ()=>{

                    if(this.props.select_default_sending_options){
                      this.props.updateUserFieldChange({ prop: "default_template_id", value: 0 });
                      this.props.updateUserFieldChange({ prop: "default_template_name", value: "Not Selected" });
                    }else{
                      this.props.editHouseFieldChange({ prop: "mail_template_id", value: 0 });
                      this.props.editHouseFieldChange({ prop: "mail_template_name", value: "Not Selected" });
                    }
                  }
                });
                this.props.toggleModal({show: true, type: "normal"});


              }else{

                var template_name;
                for(var i = 0; i<this.props.templates.length; i++){
                  if(item == this.props.templates[i].id){
                    template_name = this.props.templates[i].name;
                  }
                }

                if(this.props.select_default_sending_options){
                  this.props.updateUserFieldChange({ prop: "default_template_id", value: item });
                  this.props.updateUserFieldChange({ prop: "default_template_name", value: template_name });
                }else{
                  this.props.editHouseFieldChange({ prop: "mail_template_id", value: item });
                  this.props.editHouseFieldChange({ prop: "mail_template_name", value: template_name });
                }

              }
            }}
          />
        </Card>
      );
    }

    return <Wrapper />;


  }

}

export default TemplateSelect;
