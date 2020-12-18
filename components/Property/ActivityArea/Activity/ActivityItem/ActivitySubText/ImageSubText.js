import React, { Component } from 'react';
import { Row, Card, Wrapper, Copy, Bold, Icon, ExternalImage} from 'app/NativeComponents/common';

class ImageSubText extends Component{

  render(){

    if(this.props.item.original_data && this.props.item.next_change_log){

      if(this.props.item.original_data.image == "" || this.props.item.original_data.image == null){
        return(
          <Row>
            <Card style={{
              marginLeft: 0,
              flex: 1
            }}>
              <ExternalImage
                style={{
                  height: 100,
                  width: "100%",
                  backgroundColor: this.props.colors.gray_color,
                  borderRadius: 5
                }}
                image={this.props.item.next_change_log.image}
                date_created={this.props.item.date_created}
              />
            </Card>
          </Row>
        )
      }else if(this.props.item.next_change_log.image == "" || this.props.item.next_change_log.image == null){
        return(
          <Copy>You removed the image for this property.</Copy>
        );
      }else if(
        this.props.item.original_data.image != "" &&
        this.props.item.original_data.image != null &&
        this.props.item.next_change_log.image != "" &&
        this.props.item.next_change_log.image != null
      ){

        return(
          <Row>
            <Card style={{
              marginLeft: 0,
              flex: 1
            }}>
              <ExternalImage
                style={{
                  height: 100,
                  width: "100%",
                  backgroundColor: this.props.colors.gray_color,
                  borderRadius: 5
                }}
                image={this.props.item.original_data.image}
                date_created={this.props.item.date_created}
              />
            </Card>

            <Wrapper style={{
              margin: 0,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Icon
                 size={12}
                 fa_icon={"arrow-right"}
              />
            </Wrapper>

            <Card style={{
              flex: 1
            }}>
              <ExternalImage
                style={{
                  height: 100,
                  width: "100%",
                  backgroundColor: this.props.colors.gray_color,
                  borderRadius: 5
                }}
                image={this.props.item.next_change_log.image}
                date_created={this.props.item.date_created}
              />
            </Card>


          </Row>
        )
      }





    }


    return <Wrapper />;
  }
}

export default ImageSubText;
