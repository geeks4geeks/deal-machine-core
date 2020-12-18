import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import RepeatStepOptions from './RepeatStepOptions';
import SendAfter from './SendAfter'
class StepBody extends Component{


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
        label: props.templates[i].name ? props.templates[i].name : ""
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
  }

  componentDidUpdate(prevProps){
    if(prevProps.templates != this.props.templates){
      this.setTemplates(this.props);
    }
  }

  render(){

    if(this.props.editCampaign.current_step == this.props.step.index && this.state.template_array.length > 0){
      return (
        <Wrapper>
          <Select
            ref="select_mail_template_wrapper"
            item_ref={"select_mail_template"}
            items={this.state.template_array}
            title="Send mailer with template:"
            label="Select a mail template"
            value={this.props.step.template_id}
            text={this.props.step.template_title && this.props.step.template_title != "" ? this.props.step.template_title : "Not Selected"}
            onSelect={item => {

              if(item == -1){

                if(this.props.device == "mobile"){
                  this.refs.select_mail_template_wrapper.refs.select_mail_template.togglePicker();
                }

                this.props.setModal({
                  title: "Create New Template?",
                  description: "This will take you to a new screen to create a new template.",
                  icon: "edit",
                  submit: 'Continue',
                  onPress: ()=>{

                    if(this.props.step.index == 1){
                      this.props.campaignFieldChanged({ prop: "original_template_id", value: 0 });
                      this.props.campaignFieldChanged({ prop: "original_template_title", value: "Not Selected" })

                    }else{
                      //update campaign step
                      this.props.editCampaignStep({
                        id: this.props.step.id,
                        index: this.props.step.index,
                        prop: "template_id",
                        value: 0
                      });
                      this.props.editCampaignStep({
                        id: this.props.step.id,
                        index: this.props.step.index,
                        prop: "template_title",
                        value: "Not Selected"
                      });
                    }

                    var signature = null;
                    if(this.props.signatures.length > 0){
                      signature = this.props.signatures[0];
                    }
                    //init template
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

                    this.props.setEditReturnLocation("campaigns");
                    this.props.appRedirect({redirect: "campaignsEditTemplate"})

                  },
                  cancel: 'Not right now',
                  onCancel: ()=>{

                    if(this.props.step.index == 1){
                      this.props.campaignFieldChanged({ prop: "original_template_id", value: 0 });
                      this.props.campaignFieldChanged({ prop: "original_template_title", value: "Not Selected" })

                    }else{
                      //update campaign step
                      this.props.editCampaignStep({
                        id: this.props.step.id,
                        index: this.props.step.index,
                        prop: "template_id",
                        value: 0
                      });
                      this.props.editCampaignStep({
                        id: this.props.step.id,
                        index: this.props.step.index,
                        prop: "template_title",
                        value: "Not Selected"
                      });
                    }
                  }
                });
                this.props.toggleModal({show: true, type: "normal"});

              }else{

                var template_title;
                for(var i = 0; i<this.props.templates.length; i++){
                  if(item == this.props.templates[i].id){
                    template_title = this.props.templates[i].name;
                  }
                }
                if(this.props.step.index == 1){
                  this.props.campaignFieldChanged({ prop: "original_template_id", value: item });
                  this.props.campaignFieldChanged({ prop: "original_template_title", value: template_title })

                }else{
                  //update campaign step
                  this.props.editCampaignStep({
                    id: this.props.step.id,
                    index: this.props.step.index,
                    prop: "template_id",
                    value: item
                  });
                  this.props.editCampaignStep({
                    id: this.props.step.id,
                    index: this.props.step.index,
                    prop: "template_title",
                    value: template_title
                  });
                }
              }

            }}
          />
          <SendAfter {...this.props} />
          <RepeatStepOptions {...this.props}/>
        </Wrapper>
      )
    }

    return <Wrapper />
  }
}

export default StepBody;
