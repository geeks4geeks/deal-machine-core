import React, { Component } from 'react';
import { Card, Wrapper } from 'app/NativeComponents/common';

import {
  RadioButton,
  CardLabel,
  FeatureLockButton
} from 'app/NativeComponents/snippets';

class TemplateTypeSelector extends Component{

  constructor(props){
    super(props);

    this.state = {
      has_mailer_pro: false
    }

  }

  checkForMailerPro(){
    if(this.props.billing_addons){
      for(var i = 0; i<this.props.billing_addons.length; i++){
        if(this.props.billing_addons[i].slug == "mailer"){
          if(this.props.billing_addons[i].team_has_addon == 1 ||
            this.props.billing_addons[i].included_in_team_plan == 1
          ){
            this.setState({ has_mailer_pro: true })
          }
        }
      }
    }
  }

  componentDidMount() {
    this.checkForMailerPro();
  }


  render(){
    return(
      <Card>
        <CardLabel
          title={"Select a type of mailer: "}
          hasButton={false}
          onPress={()=>{}}
          hasBorder={true}
        />
        {

          this.props.html_template_types.map((template_type, i)=>{

            //make this button locked if the type is handwritten mailers
            if(template_type.slug == "handwritten"){
              return(
                <RadioButton
                  key={template_type.id}
                  onPress={() => {
                    this.props.selectTemplateType(template_type.slug);
                  }}
                  value={template_type.slug == this.props.template_type ? 1 : 0}
                  title={template_type.title}
                  text={template_type.description}
                />
              )
            }

            return(
              <RadioButton
                key={template_type.id}
                onPress={() => {
                  this.props.selectTemplateType(template_type.slug)
                }}
                value={template_type.slug == this.props.template_type ? 1 : 0}
                title={template_type.title}
                text={template_type.description}

              />
            )
          })
        }
      </Card>
    );
  }
}

export default TemplateTypeSelector;
