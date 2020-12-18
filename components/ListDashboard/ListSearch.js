import React, { Component } from 'react';

import {
  Input,
  Wrapper,
  Card,
  Row,
  Copy,
  Button,
  Icon
} from 'app/NativeComponents/common';

class ListSearch extends Component {

  render() {



    return (
      <Card style={{
        marginTop: this.props.isIphoneX ? 42 : this.props.platform == "ios" ? 25 : 12
      }}>
        <Row>
          <Button onPress={this.props.device == "desktop"
            ? () => {this.props.mobileToggleDrawer(!this.props.mobile_toggle_drawer)}
            : () => this.props.toggleDrawer("open")} style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50
          }}>
            <Icon
              icon="menu"
              size={26}
            />
          </Button>
          <Input
            style={{
              borderBottomWidth: 0,
              flex: 1
            }}
            ref="search"
            name="search"
            returnKeyType={"search"}
            blurOnSubmit={true}
            autoCorrect={false}
            autoFocus={false}
            keyboardType="default"
            placeholder={"Search Lists"}
            onChange={this.props.updateListSearch}
            value={this.props.list_search}
            type="text"
          />

        </Row>
      </Card>
    )
  }

}


export default ListSearch;
