import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import TemplateCopy from './TemplateCopy';

import {
  getTemplates,
  setModal,
  toggleModal,
  templateInit,
  setEditReturnLocation,
  appRedirect
} from 'app/NativeActions';

class TemplateSelect extends Component{

  setTemplates(props){
    var template_array = [];

    if(props.device === "desktop"){
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
    if(this.props.templates.length === 0){
      //get campaigns
      this.props.getTemplates({ token: this.props.token, type: "load" });
    }else{
      this.setTemplates(this.props);
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.templates !== this.props.templates){
      this.setTemplates(this.props);
    }
  }

  render(){

    if(this.state.template_array.length > 0){
      return (
        <Wrapper>
          <TemplateCopy {...this.props}/>
          <Card>
            <Select
              ref={"select_template_wrapper"}
              item_ref={"select_template"}
              items={this.state.template_array}
              title={"Select a template:"}
              label="Select a template"
              value={this.props.fields.template_id}
              text={
                this.props.fields.template_id === 0 ? "Not Selected" :
                  this.props.fields.template_name
              }
              onSelect={item => {

                if(parseInt(item) === -1){
                  if(this.props.device === "mobile"){
                    this.refs.select_template_wrapper.refs.select_template.togglePicker();
                  }

                  this.props.setModal({
                    title: "Create New Template?",
                    description: "This will take you to a new screen to create a new template.",
                    icon: "edit",
                    submit: 'Continue',
                    onPress: ()=>{

                      this.props.updateField({ prop: "template_id", value: 0 });
                      this.props.updateField({ prop: "template_name", value: "Not Selected" });

                      //init template
                      var signature = null;
                      if(this.props.signatures.length === 1){
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


                      /*
                      if(this.props.select_default_sending_options){
                        this.props.setEditReturnLocation("sending_options");
                        this.props.appRedirect({redirect: "settingsNewTemplate"});
                      }else{

                      }
                      */

                      this.props.setEditReturnLocation("mailing_options");
                      this.props.appRedirect({redirect: "dealNewTemplate"});


                    },
                    cancel: 'Not right now',
                    onCancel: ()=>{

                      this.props.updateField({ prop: "template_id", value: 0 });
                      this.props.updateField({ prop: "template_name", value: "Not Selected" });

                    }
                  });
                  this.props.toggleModal({show: true, type: "normal"});

                }else{

                  var template_name;
                  for(var i = 0; i<this.props.templates.length; i++){
                    if(parseInt(item) === parseInt(this.props.templates[i].id)){
                      template_name = this.props.templates[i].name;
                    }
                  }
                  this.props.updateField({ prop: "template_id", value: item });
                  this.props.updateField({ prop: "template_name", value: template_name });
                }
              }}
            />
          </Card>
        </Wrapper>
      );
    }

    return <Wrapper />;


  }

}
const mapStateToProps = ({ template, signature, campaign }) => {

  const { templates } = template;
  const { signatures } = signature;
  const { campaigns } = campaign;
  return {
    templates,
    signatures,
    campaigns
  }
}

export default connect(mapStateToProps, {
  getTemplates,
  setModal,
  toggleModal,
  templateInit,
  setEditReturnLocation,
  appRedirect
})(TemplateSelect);
