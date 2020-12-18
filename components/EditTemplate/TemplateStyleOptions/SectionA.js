import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import BracketHelper from './BracketHelper';

class SectionA extends Component{

  render(){
    if(this.props.editTemplate.html_template.section_a.max_length > 0){
      return (
        <BracketHelper
          name="section_a"
          section_title={this.props.editTemplate.html_template.section_a.title}
          onChange={value => this.props.checkForLongWords(value, (value)=>{
            this.props.templateFieldChanged({ prop: "section_a", value })
          })}
          templateFieldChanged={this.props.templateFieldChanged}
          prop={"section_a"}
          value={this.props.editTemplate.section_a == null ?
            this.props.editTemplate.html_template.section_a.default_text :
            this.props.editTemplate.section_a
          }
          device={this.props.device}
          maxLength={this.props.editTemplate.html_template.section_a.max_length}
          {...this.props}

        />
      );
    }

    return <Wrapper />

  }
}

export default SectionA;
