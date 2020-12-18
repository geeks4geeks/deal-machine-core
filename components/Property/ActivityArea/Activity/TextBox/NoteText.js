import React, { Component } from 'react';
import { Wrapper, Row, MultiLineInput } from 'app/NativeComponents/common';

class NoteText extends Component{

  componentDidUpdate(prevProps) {
    if (!prevProps.message && prevProps.message != "") {
      this.resetTextbox();
    }
  }

  startTracking() {
    this.props.changeMention({prop: 'tracker', value: true});

  }

  stopTracking() {
    this.props.changeMention({prop: 'tracker', value: false});
  }


  componentWillUnmount(){

    clearInterval(this._mention_interval);
  }

  updateSuggestions(lastKeyword) {
    //set tracker
    this.props.changeMention({prop: 'keyword', value: lastKeyword});

    clearInterval(this._mention_interval);
    this._mention_interval = setTimeout(()=>{
      this.props.getTeam(lastKeyword);
    }, 250)
  }

  identifyKeyword(val) {
    if(this.props.mentions.tracker) {
      const boundary = 'B';
      const trigger = '@';
      const pattern = new RegExp(`\\${boundary}${trigger}[a-z0-9_-]+|\\${boundary}${trigger}`, `gi`);
      const keywordArray = val.match(pattern);
      if (keywordArray && !!keywordArray.length) {
        const lastKeyword = keywordArray[keywordArray.length - 1];
        this.updateSuggestions(lastKeyword);
      }
    }
  }

  onChange(event) {
    var val = "";
    if(this.props.device == "desktop"){
      val = event;
    }else{
      val = event.nativeEvent.text;
    }
    this.props.messageFieldChange(val);

    const lastChar = val.substr(val.length - 1);
    const wordBoundry = this.props.mentions.prev_char.trim().length == 0;
    if (lastChar == "@" && wordBoundry) {
      this.startTracking();
      this.props.changeMention({prop: 'keyword', value: lastChar});

    } else if ((lastChar == ' ' || lastChar == '\n') && this.props.mentions.tracker || val == "") {
      this.stopTracking();
    }
    this.props.changeMention({prop: 'prev_char', value: lastChar});
    this.identifyKeyword(val);

  }

  resetTextbox() {
    this.props.changeMention({prop: 'prev_char', value: ' '});
    this.stopTracking();

    //reset tracker
    this.props.changeMention({prop: 'keyword', value: ''});
  }

  render(){
    return (
      <Row style={{
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10
      }}>
        <MultiLineInput
          name={"message"}
          no_container
          placeholder={"Enter your note here."}
          label={"Enter your note here."}

          style={[{
            flex: 1,
            fontSize: 14,
            maxHeight: 120,
            marginRight: 0,
            marginLeft: 0
          }, {
            height: Math.max(35, this.props.message_height) > 105 ? 105 : Math.max(35, this.props.message_height)
          }]}
          value={this.props.message}
          spellCheck={false}
          onChange={(event) => {
            this.onChange(event)
          }}
          all_changes={true}
          onContentSizeChange={(event) => {
            this.props.setMessageHeight(event.nativeEvent.contentSize.height)
          }}
        />
      </Row>
    )
  }
}

export default NoteText;
