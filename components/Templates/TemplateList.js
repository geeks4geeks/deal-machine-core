import React, { Component } from "react";
import {
  Wrapper,
  Card,
  PrimaryButton,
  SecondaryButton
} from "app/NativeComponents/common";
import { List } from "app/NativeComponents/snippets";

import TemplateItem from "./TemplateItem";

class TemplateList extends Component {
  render() {
    return (
      <Wrapper style={{ flex: 1 }}>
        <List
          rowNumber={1}
          style={{ flex: 1 }}
          items={this.props.templates}
          infiniteScroll={false}
          itemStruture={({ item }) => {
            return (
              <TemplateItem
                platform={this.props.platform}
                key={item.id}
                template={item}
                token={this.props.token}
                onPress={() => {
                  //SET Template
                  this.props.templateInit({ template: item });
                  this.props.appRedirect({
                    redirect: "editTemplate",
                    payload: { id: item.id }
                  });
                }}
              />
            );
          }}
          canRefresh={true}
          onRefresh={() => {
            this.props.getTemplates({
              token: this.props.token,
              type: "refresh"
            });
          }}
          is_refreshing={this.props.refreshing}
          canLoadMore={false}
          listFooter={() => {
            return (
              <Wrapper>
                <Card>
                  <PrimaryButton
                    onPress={() => {
                      //set template blank
                      this.props.newTemplate();
                    }}
                  >
                    Create New Template
                  </PrimaryButton>
                </Card>
              </Wrapper>
            );
          }}
        />
      </Wrapper>
    );
  }
}

export default TemplateList;
