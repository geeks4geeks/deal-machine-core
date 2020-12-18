import React, { Component } from 'react';
import {
  Button,
  Card,
  Row,
  Wrapper,
  CardBody,
  Split,
  Stretch,
  Title,
  Icon,
  CenterCenter,
  Copy
} from 'app/NativeComponents/common';
import { MenuItem, TemplatePreview } from 'app/NativeComponents/snippets';


class TemplateItem extends Component{


  render(){
    return (
      <Button onPress={this.props.onPress} to={"/app/templates/edit/"+this.props.template.id}>
        <Card>
          <Row>
            <TemplatePreview
              platform={this.props.platform}
              template_id={this.props.template.id}
              template_type={this.props.template.html_template ? this.props.template.html_template.template_type : "postcard"}
              token={this.props.token}
              image={this.props.template.template_preview}
              save_info={true}
              width={150}
            />
            <Wrapper style={{
              flex: 1
            }}
            >

              <CardBody>
                <Split>
                  <Stretch>
                    <Title>{this.props.template.name}</Title>
                    <Copy>{this.props.template.html_template ? this.props.template.html_template.title : ""}</Copy>
                  </Stretch>

                  <Wrapper>
                    <CenterCenter>
                      <Icon
                        style={{marginLeft: 10}}
                        icon={"keyboard-arrow-right"}
                      />
                    </CenterCenter>
                  </Wrapper>
                </Split>
              </CardBody>



            </Wrapper>
          </Row>
        </Card>
      </Button>
    )
  }

}

export default TemplateItem;
