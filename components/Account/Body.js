import React, { Component } from 'react';
import { Scroll, Card, CardBody, DeleteButton, Title, Copy } from 'app/NativeComponents/common';
import { MenuItem, RemoveTextButton } from 'app/NativeComponents/snippets';

class Body extends Component{

  render(){
    return (
      <Scroll>
        <Card>
          <MenuItem
            to="/app/settings/profile/user-information"
            onPress={()=>this.props.appRedirect({redirect:"editUserInfo"})}
            title="Update User Information"
            text={this.props.user.firstname+" "+this.props.user.lastname}
          />
        </Card>
        <Card>
          <MenuItem
            style={{
              borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"
            }}
            to="/app/settings/profile/change-email"
            onPress={()=>this.props.appRedirect({redirect:"editEmail"})}
            title="Change Email"
            text={this.props.user.email}
          />
          <MenuItem
            to="/app/settings/profile/change-password"
            onPress={()=>this.props.appRedirect({redirect:"editPassword"})}
            title="Change Password"
            text={"********"}
          />
        </Card>

        <RemoveTextButton
          text={"Logout"}
          onPress={()=>this.props.toggleActionSheet("logout")}
        />

      </Scroll>
    );
  }

}

export default Body;
