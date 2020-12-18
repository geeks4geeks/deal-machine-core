import React, { Component } from 'react';
import { Wrapper, Button, Card } from 'app/NativeComponents/common';
import { TemplatePreview } from 'app/NativeComponents/snippets';

class EditTemplatePreview extends Component{

  render(){

    if(this.props.editTemplate.html_template != null){
      return (
        <Button
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          onPress={()=>{
          this.props.showTemplatePreview({
            show: true,
            template_id: this.props.editTemplate.id,
            html_template_id: this.props.editTemplate.html_template.id,
            payload:{
              section_a: this.props.editTemplate.section_a == null ?
                this.props.editTemplate.html_template.section_a.default_text :
                this.props.editTemplate.section_a,
              section_b: this.props.editTemplate.section_b == null ?
                this.props.editTemplate.html_template.section_b.default_text :
                this.props.editTemplate.section_b,
              section_c: this.props.editTemplate.section_c == null ?
                this.props.editTemplate.html_template.section_c.default_text :
                this.props.editTemplate.section_c,
              section_d: this.props.editTemplate.section_d == null ?
                this.props.editTemplate.html_template.section_d.default_text :
                this.props.editTemplate.section_d,
              primary_color: this.props.editTemplate.primary_color == null ?
                this.props.editTemplate.html_template.default_primary_color.hex :
                this.props.editTemplate.primary_color,
              secondary_color: this.props.editTemplate.secondary_color == null ?
                this.props.editTemplate.html_template.default_secondary_color.hex :
                this.props.editTemplate.secondary_color,
              signature_id: this.props.editTemplate ? this.props.editTemplate.template_signature ? this.props.editTemplate.template_signature.id ? this.props.editTemplate.template_signature.id : null : null : null
            },
            template_preview: this.props.preview_image_front,
            template_preview_back: this.props.preview_image_back,
            reloadId: this.props.editTemplate.id,
            reload: true
          });
        }}>
          <Card style={{
            width: 200
          }}>

            <TemplatePreview
              platform={this.props.platform}
              template_id={this.props.editTemplate.id}
              html_template_id={this.props.editTemplate.html_template.id}
              payload={{
                section_a: this.props.editTemplate.section_a == null ?
                  this.props.editTemplate.html_template.section_a.default_text :
                  this.props.editTemplate.section_a,
                section_b: this.props.editTemplate.section_b == null ?
                  this.props.editTemplate.html_template.section_b.default_text :
                  this.props.editTemplate.section_b,
                section_c: this.props.editTemplate.section_c == null ?
                  this.props.editTemplate.html_template.section_c.default_text :
                  this.props.editTemplate.section_c,
                section_d: this.props.editTemplate.section_d == null ?
                  this.props.editTemplate.html_template.section_d.default_text :
                  this.props.editTemplate.section_d,
                primary_color: this.props.editTemplate.primary_color == null ?
                  this.props.editTemplate.html_template.default_primary_color.hex :
                  this.props.editTemplate.primary_color,
                secondary_color: this.props.editTemplate.secondary_color == null ?
                  this.props.editTemplate.html_template.default_secondary_color.hex :
                  this.props.editTemplate.secondary_color,
                  signature_id: this.props.editTemplate ? this.props.editTemplate.template_signature ? this.props.editTemplate.template_signature.id ? this.props.editTemplate.template_signature.id : null : null : null

              }}
              image={this.props.preview_image_front}
              token={this.props.token}
              width={200}
              is_preview={true}

            />

          </Card>
        </Button>
      );
    }

    return <Wrapper />

  }
}

export default EditTemplatePreview;
