
import React, { Component } from 'react';
import { Wrapper, MultiLineInput } from 'app/NativeComponents/common';
import BracketHelper from './BracketHelper';

class SectionC extends Component{

  render(){
    if(this.props.editTemplate.html_template.section_c.max_length > 0){
      return (
        <BracketHelper
          name="section_c"
          section_title={this.props.editTemplate.html_template.section_c.title}
          onChange={value => this.props.checkForLongWords(value, (value)=>{
            this.props.templateFieldChanged({ prop: "section_c", value })
          })}
          templateFieldChanged={this.props.templateFieldChanged}
          prop={"section_c"}
          value={this.props.editTemplate.section_c == null ?
            this.props.editTemplate.html_template.section_c.default_text :
            this.props.editTemplate.section_c
          }
          device={this.props.device}
          maxLength={this.props.editTemplate.html_template.section_c.max_length}
          {...this.props}

        />
      );
    }

    return <Wrapper />

  }
}

export default SectionC;
