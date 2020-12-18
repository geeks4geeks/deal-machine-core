import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Wrapper, Row, Spin, Copy } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  getTemplates
} from 'app/NativeActions';

class TemplateFilter extends Component{

  constructor(props) {

    super(props);

    var mail_template_array = [];

    this.state = {mail_template_array: []}

  }

  formatArray(){
    var mail_template_array = [];

    //add default
    mail_template_array.push({
      key: -1,
      value: "none",
      label: "All Templates"
    });
    for(var i = 0; i<this.props.templates.length; i++){
      mail_template_array.push({
        key: i,
        value: this.props.templates[i].id,
        label: this.props.templates[i].name
      });
    }


    this.setState({mail_template_array: mail_template_array})
  }

  getItems(){
    if(!this.props.template_loading){
      this.props.getTemplates({ token: this.props.token, type: "load" });
    }
  }

  componentDidMount(){
    this.formatArray();
    if(this.props.templates.length === 0){
      this.getItems();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.templates !== this.props.templates){
      this.formatArray()
    }
  }


  renderTitle(template){
    var template_title = "";
    for(var i = 0; i<this.state.mail_template_array.length; i++){
      if(template == this.state.mail_template_array[i].value){
        template_title = this.state.mail_template_array[i].label;
      }
    }
    return template_title;
  }


  render(){
    if(this.props.analytics_type == "all"){

      if(this.props.template_loading){
        return (
          <Wrapper style={{
            padding: 20
          }}>
            <Row>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading Templates...</Copy>
            </Row>
          </Wrapper>
        )
      }

      if(this.props.filters.campaign == "none" ||
          this.props.filters.campaign == null ||
          this.props.filters.campaign == 0 ||
          this.props.filters.campaign == ""
        ){
          return(
              <Select
                item_ref={"select_mail_template"}
                items={this.state.mail_template_array}
                title="Filter By Mail Template:"
                label="Select a template"
                value={this.props.filters.template}
                text={this.props.filters.template_title}
                onSelect={item => {

                  this.props.updateFilter({prop: "template", value: item});
                  this.props.updateFilter({prop: "template_title", value: this.renderTitle(item)});
                  //update campaign filter
                  if(item != 0 && item != "none"){
                    this.props.updateFilter({prop: "campaign", value: "none"});
                    this.props.updateFilter({prop: "campaign_title", value: "N/A"});
                  }
                }}
              />
            );

        }
      }

      return <Wrapper />
  }

}

const mapStateToProps = ({ auth, native, template }) => {
  const { token, user } = auth;
  const { templates, template_loading } = template;

  return {
    token,
    user,
    templates,
    template_loading
  };
}


export default connect(mapStateToProps, {
  getTemplates
})(TemplateFilter);
