import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';

class MailingOptions extends Component{


  render(){
    if(this.props.user.team_clearance_level > 0){
      return (
        <Card>

          <MenuItem
            to="/app/settings/mailing-options"
            onPress={()=>{
              this.props.selectDefaultSendingOptions(true);
              this.props.appRedirect({redirect: "sendingOptions"});
            }}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"
            }}
            title="Default Mailing Options"
            text={""}
          />

          <MenuItem
            to="/app/settings/property-tags"
            onPress={()=>{this.props.appRedirect({redirect: "customTags"});}}
            title="Property Tags"
            text="Manage your property tags"
          />

        </Card>
      );
    }

    return <Wrapper />


  }

}

export default MailingOptions;
