import React, { Component } from "react";
import {
  Wrapper,
  Card,
  PrimaryButton,
  SecondaryButton
} from "app/NativeComponents/common";
import { RemoveTextButton } from "app/NativeComponents/snippets";

class Buttons extends Component {

  renderCopyButton(){
    if(this.props.checkIfCanCopy()){
      return(
        <Card>
          <PrimaryButton onPress={() => this.props.copyTemplate()}>
            Clone Template
          </PrimaryButton>
        </Card>
      )
    }
  }

  render() {
    if (this.props.checkIfNeedsToSave()) {
      return (
        <Wrapper>
          <Card>
            <PrimaryButton onPress={() => this.props.saveTemplate()} formButton>
              {this.props.editTemplate.id
                ? "Save Template"
                : "Create New Template"}
            </PrimaryButton>
          </Card>
          <Card>
            <SecondaryButton
              onPress={() => {
                this.props.templateFieldChanged({
                  prop: "section_a",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "section_b",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "section_c",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "section_d",
                  value: null
                });

                this.props.templateFieldChanged({
                  prop: "primary_color",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "secondary_color",
                  value: null
                });
              }}
            >
              Restore Style Defaults
            </SecondaryButton>
          </Card>
        </Wrapper>
      );
    } else if (this.props.editTemplate.id) {
      return (
        <Wrapper>

          {
            this.renderCopyButton()
          }

          <Card>
            <SecondaryButton
              onPress={() => {
                this.props.templateFieldChanged({
                  prop: "section_a",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "section_b",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "section_c",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "section_d",
                  value: null
                });

                this.props.templateFieldChanged({
                  prop: "primary_color",
                  value: null
                });
                this.props.templateFieldChanged({
                  prop: "secondary_color",
                  value: null
                });
              }}
            >
              Restore Style Defaults
            </SecondaryButton>
          </Card>
          <RemoveTextButton
            text={"Delete Template"}
            onPress={() => this.props.toggleActionSheet("delete_template")}
          />
        </Wrapper>
      );
    }

    return <Wrapper />;
  }
}

export default Buttons;
