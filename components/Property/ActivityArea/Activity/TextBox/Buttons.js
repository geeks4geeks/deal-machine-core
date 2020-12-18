import React, { Component } from 'react';

import { Wrapper, Row, Button, Icon } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  postNote(){
    const {token, message, active_property } = this.props;
    if(message.trim().length > 0){
      this.props.updateNote({token, payload: {
        id: 0,
        activity_type: "note",
        text: message,
        date_created: null,
        user_id: this.props.user.id,
        firstname: this.props.user.firstname,
        lastname: this.props.user.lastname,
        email: this.props.user.email,
        image: this.props.user.image
      }, type: "post_note", deal_id: active_property.deal.id});
    }
  }

  renderMoreButtons(){
    return (
      <Row>
        <Button onPress={()=>{
          if(!this.props.mentions.tracker){
            this.props.changeMention({prop: 'tracker', value: true});
          }else{
            this.props.changeMention({prop: 'tracker', value: false});
          }
        }}>
          <Icon
            icon={this.props.mentions.tracker ? "close" : "add"}
            size={28}
          />
        </Button>
      </Row>
    )
  }

  render(){
    return (
      <Row style={{
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10
      }}>
        {this.renderMoreButtons()}
        <Wrapper style={{flex: 1}}/>
        <PillButton innerStyle={{paddingTop: 5, paddingBottom: 5}} primary={true} onPress={this.postNote.bind(this)}>
          Post
        </PillButton>
      </Row>
    )
  }
}

export default Buttons;
