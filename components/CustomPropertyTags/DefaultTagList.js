import React, { Component } from 'react';

import {
  Wrapper,
  CardBody,
  Split,
  Stretch,
  Button,
  Icon,
  Title,
  CenterCenter
} from 'app/NativeComponents/common';

import {
  CardLabel
} from 'app/NativeComponents/snippets';


class TagList extends Component{




  render(){
    return (
      <Wrapper>
        <CardLabel
          title="Default Tags:"
          hasButton={false}
          onPress={()=>{}}
        />
          {
            this.props.default_tags.map((tag, i) => {
              if(tag.hidden_tag != 1){
              return(

                <CardBody
                  key={i}
                  style={{
                    borderTopColor: this.props.colors.border_color,
                    borderTopWidth: 1,
                    borderTopStyle: "solid"
                  }}>
                  <Split>
                    <Stretch>
                      <Title>{tag.title}</Title>
                    </Stretch>

                    <Button style={{
                      width: 50,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={()=>{

                      this.props.setModal({
                        title: "Hide Default Tag?",
                        description: "Are you sure you want to hide this default tag?",
                        icon: "visibility-off",
                        submit: 'Hide Tag',
                        onPress: ()=> {
                          this.props.hideDefaultTag({token: this.props.token, tag_id: tag.id, type: "hide"})
                          this.props.getTags(this.props.token)
                        },
                        cancel: 'Not right now.',
                        onCancel: ()=>{}
                      });
                      this.props.toggleModal({show: true, type: "normal"});

                    }}>

                    <Icon color={this.props.colors.light_text_color} icon={"visibility"} size={26} />

                    </Button>

                  </Split>
                </CardBody>


              )
            }
            else{

              return(

                <CardBody
                  key={i}
                  style={{
                    borderTopColor: this.props.colors.border_color,
                    borderTopWidth: 1,
                    borderTopStyle: "solid"
                  }}>
                  <Split>
                    <Stretch>
                      <Title>{tag.title}</Title>
                    </Stretch>

                    <Button style={{
                      width: 50,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={()=>{

                      this.props.setModal({
                        title: "Show Default Tag?",
                        description: "Are you sure you want to show this default tag?",
                        icon: "visibility",
                        submit: 'Show Tag',
                        onPress: ()=> {this.props.showDefaultTag({token: this.props.token, tag_id: tag.id, type: "show"}, this.props.getTags(this.props.token))},
                        cancel: 'Not right now.',
                        onCancel: ()=>{}
                      });
                      this.props.toggleModal({show: true, type: "normal"});

                    }}>

                    <Icon color={this.props.colors.light_text_color} icon={"visibility-off"} size={26} />

                    </Button>

                  </Split>
                </CardBody>


              )


            }





            })
          }
        </Wrapper>

    );
  }
}

export default TagList;
