import React, { Component } from 'react';
import { Wrapper, Form, Card, Input } from 'app/NativeComponents/common';

import TemplateTypeSelector from './TemplateTypeSelector';
import HTMLTemplateSelector from './HTMLTemplateSelector';
import TemplateStyleOptions from './TemplateStyleOptions';

import Buttons from './Buttons';

class Body extends Component{


  render(){
    if(this.props.editTemplate){
      return(
        <Form style={{
          paddingBottom:200
        }}
        onSubmit={()=>this.props.saveTemplate()}>
          <Card>
            <Input
              ref="name"
              name="name"
              returnKeyType="done"
              blurOnSubmit={true}
              autoCapitalize="words"
              keyboardType="default"
              placeholder="Template Name"
              onChange={value => this.props.templateFieldChanged({ prop: "name", value })}
              value={this.props.editTemplate.name}
            />
          </Card>
          <TemplateTypeSelector {...this.props} />
          <HTMLTemplateSelector {...this.props} />
          <TemplateStyleOptions {...this.props}/>
          <Buttons {...this.props}/>
        </Form>
      );
    }

    return <Wrapper />
  }
}

export default Body;
