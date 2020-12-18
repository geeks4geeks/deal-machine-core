import React, { Component } from 'react';
import { Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

class HTMLTemplateSelector extends Component{


  constructor(props) {

    super(props);

    this.state = {html_template_array: this.getHTMLTemplateArray(this.props.template_type)}
  }

  getHTMLTemplateArray(template_type){
    var html_template_array = [];

    if(this.props.device == "desktop"){
      html_template_array.push({
        key: -1,
        value: null,
        label: "Select a style"
      });
    }

    for(var i = 0; i<this.props.html_templates.length; i++){

      //make sure to only show templates with this template type
      if(template_type == this.props.html_templates[i].template_type){

        html_template_array.push({
          key: i,
          value: this.props.html_templates[i].id,
          label: this.props.html_templates[i].title
        });
      }
    }

    return html_template_array;

  }

  componentDidUpdate(prevProps){
    if(this.props.template_type != prevProps.template_type){
      this.setState({html_template_array: this.getHTMLTemplateArray(this.props.template_type)})
    }
  }

  render(){

    return (
      <Card>
        <Select
          {...this.props}
          item_ref={"select_html_template"}
          items={this.state.html_template_array}
          title="Select a template style"
          label="Select a style"
          value={this.props.editTemplate.html_template ? this.props.editTemplate.html_template.id : 0}
          text={this.props.editTemplate.html_template ? this.props.editTemplate.html_template.title : "None selected"}
          onSelect={item => {
            var html_template;
            for(var i = 0; i<this.props.html_templates.length; i++){
              if(item == this.props.html_templates[i].id){
                html_template = this.props.html_templates[i];
              }
            }

            //update all sections and colors to default if blank
            if(!this.props.editTemplate.section_a || this.props.editTemplate.section_a == ""){
              this.props.templateFieldChanged({ prop: "section_a", value: null })
            }
            if(!this.props.editTemplate.section_b || this.props.editTemplate.section_b == ""){
              this.props.templateFieldChanged({ prop: "section_b", value: null })
            }
            if(!this.props.editTemplate.section_c || this.props.editTemplate.section_c == ""){
              this.props.templateFieldChanged({ prop: "section_c", value: null })
            }
            if(!this.props.editTemplate.section_d || this.props.editTemplate.section_d == ""){
              this.props.templateFieldChanged({ prop: "section_d", value: null })
            }

            if(!this.props.editTemplate.primary_color || this.props.editTemplate.primary_color == ""){
              this.props.templateFieldChanged({ prop: "primary_color", value: null })
            }
            if(!this.props.editTemplate.secondary_color || this.props.editTemplate.secondary_color == ""){
              this.props.templateFieldChanged({ prop: "secondary_color", value: null })
            }

            this.props.templateFieldChanged({ prop: "html_template", value: html_template })

          }}
        />

      </Card>
    );
  }
}

export default HTMLTemplateSelector;
