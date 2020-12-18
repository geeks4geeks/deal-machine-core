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
          title="Custom Tags:"
          hasButton={false}
          onPress={()=>{}}
        />
          {
            this.props.custom_tags.map((tag, i) => {
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
                        title: "Remove Custom Tag?",
                        description: "Are you sure you want to remove this custom tag?",
                        icon: "error",
                        submit: 'Remove Tag',
                        onPress: ()=>this.props.removeTeamTag({token: this.props.token, tag_id: tag.id, type: "remove"}),
                        cancel: 'Nevermind',
                        onCancel: ()=>{}
                      });
                      this.props.toggleModal({show: true, type: "normal"});

                    }}>
                        <Icon color={this.props.colors.light_text_color} icon={"close"} size={26} />
                    </Button>
                  </Split>
                </CardBody>


              )
            })
          }
        </Wrapper>

    );
  }
}

export default TagList;
