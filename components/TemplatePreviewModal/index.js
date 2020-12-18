import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  ModalOverlay,
  Modal,
  Wrapper,
  Scroll,
  Card,
  Button
} from 'app/NativeComponents/common';

import { TemplatePreview } from 'app/NativeComponents/snippets';

import {
  showTemplatePreview
} from 'app/NativeActions';

class TemplatePreviewModal extends PureComponent{

  render(){
    if(this.props.preview_info.show == true){
      if(this.props.preview_info.template_type == "handwritten"){

        return (
          <ModalOverlay
          isVisible={true}
          onPress={()=>{
            this.props.showTemplatePreview({
              show: false
            })
          }}>

            <Modal>


              <Wrapper>
                  <Card style={{
                    width: this.props.device == "desktop" ? 500 : 320
                  }}>
                    <TemplatePreview

                      platform={this.props.platform}
                      deal_id={this.props.preview_info.deal_id}
                      template_id={this.props.preview_info.template_id}
                      template_type={this.props.preview_info.template_type}
                      html_template_id={this.props.preview_info.html_template_id}

                      payload={this.props.preview_info.payload}
                      date={this.props.preview_info.date}
                      image={this.props.preview_info.template_preview}

                      token={this.props.token}
                      width={this.props.device == "desktop" ? 500 : 320}
                      save_info={this.props.preview_info.save_info}
                      is_preview={true}
                    />
                  </Card>

                  <Card style={{
                    width: this.props.device == "desktop" ? 500 : 320
                  }}>
                    <TemplatePreview

                      platform={this.props.platform}
                      deal_id={this.props.preview_info.deal_id}
                      template_id={this.props.preview_info.template_id}
                      html_template_id={this.props.preview_info.html_template_id}
                      payload={this.props.preview_info.payload}
                      date={this.props.preview_info.date}
                      image={this.props.preview_info.template_preview_back}

                      side="back"
                      token={this.props.token}
                      width={this.props.device == "desktop" ? 500 : 320}
                      save_info={this.props.preview_info.save_info}
                      is_preview={true}

                    />
                  </Card>

              </Wrapper>
            </Modal>

          </ModalOverlay>
        );


      }

      return (
        <ModalOverlay
        isVisible={true}
        onPress={()=>{
          this.props.showTemplatePreview({
            show: false
          })
        }}>

          <Modal>


            <Wrapper>
                <Card style={{
                  width: this.props.device == "desktop" ? 500 : 320
                }}>
                  <TemplatePreview

                    platform={this.props.platform}
                    deal_id={this.props.preview_info.deal_id}
                    template_id={this.props.preview_info.template_id}
                    html_template_id={this.props.preview_info.html_template_id}

                    payload={this.props.preview_info.payload}
                    date={this.props.preview_info.date}
                    image={this.props.preview_info.template_preview}

                    token={this.props.token}
                    width={this.props.device == "desktop" ? 500 : 320}
                    save_info={this.props.preview_info.save_info}
                    is_preview={true}
                  />
                </Card>
                <Card style={{
                  width: this.props.device == "desktop" ? 500 : 320
                }}>
                  <TemplatePreview

                    platform={this.props.platform}
                    deal_id={this.props.preview_info.deal_id}
                    template_id={this.props.preview_info.template_id}
                    html_template_id={this.props.preview_info.html_template_id}
                    payload={this.props.preview_info.payload}
                    date={this.props.preview_info.date}
                    image={this.props.preview_info.template_preview_back}

                    side="back"
                    token={this.props.token}
                    width={this.props.device == "desktop" ? 500 : 320}
                    save_info={this.props.preview_info.save_info}
                    is_preview={true}

                  />
                </Card>
            </Wrapper>
          </Modal>

        </ModalOverlay>
      );
    }

    return <Wrapper />;

  }
}



const mapStateToProps = ({ auth, native, template }) => {
  const { token } = auth;
  const { device, platform } = native;
  const {
    preview_info
  } = template;



  return {
    token,
    device,
    platform,
    preview_info
  };
}


export default connect(mapStateToProps, {
  showTemplatePreview
})(TemplatePreviewModal);
