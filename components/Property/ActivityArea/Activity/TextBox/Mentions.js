import React, { Component } from 'react';
import { Scroll, Wrapper, Button, Icon, ProfilePic, Row, Title, Copy } from 'app/NativeComponents/common';

class Mentions extends Component{

  handleSelection(username, user){
   var comment = this.props.message.slice(0, this.props.message.length-this.props.mentions.keyword.length)
   this.props.messageFieldChange(comment+"@"+username+" ");

   this.props.changeMention({prop: 'keyword', value: ''});
   this.props.changeMention({prop: 'prev_char', value: ' '});
   this.props.changeMention({prop: 'tracker', value: false});
  }



  filterData(){
    //const max_limit = 2;
    const member_array = this.props.team_members;

    var output_array = [];

    if(this.props.mentions.tracker){
      if(member_array.length > 0){
        for(var i = 0; i<member_array.length; i++){
          const member = member_array[i];
          if(member.id != this.props.user.id && (member.team_clearance_level > 0 || this.props.active_property.deal.creator_id == member.id)){
            const keyword = this.props.mentions.keyword.replace("@", "");
            if(member.username.toLowerCase().startsWith(keyword.toLowerCase())){
              output_array.push(member);
            }else if(member.firstname.toLowerCase().startsWith(keyword.toLowerCase())){
              output_array.push(member);
            }
          }
        }
      }
    }
    return output_array;
  }

  render() {
    return (
      <Scroll style={{
        width: "100%",
        maxHeight: 100
        }} keyboardShouldPersistTaps={'always'}
      >
        {
          this.filterData().map((item) =>{
            return (
              <Wrapper key={item.id} style={{
                width: "100%",
                height: 50
              }}>
                <Button
                  style={{flex: 1}}
                  onPress={()=>this.handleSelection(item.username, item)}
                >
                  <Row>
                    <Wrapper style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 60
                    }}>
                      <ProfilePic email={item.email} image={item.image} size={30} />
                    </Wrapper>
                    <Wrapper style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "flex-start",
                      height: 50,
                    }}>
                      <Title>{"@"+item.username}</Title>
                      <Copy>{item.firstname+" "+item.lastname}</Copy>
                    </Wrapper>
                  </Row>
                </Button>
              </Wrapper>
            );
          })
        }
      </Scroll>
    );
  }
};

export default Mentions;
