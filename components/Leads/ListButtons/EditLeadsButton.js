import React from "react";
import {
  Button,
  Wrapper,
  Card,
  Icon,
  Row,
  Copy
} from "app/NativeComponents/common";

const EditLeadsButton = props => {

  return (
    <Button
      onPress={() => {
        props.toggleSelecting(!props.selecting);
      }}
    >
      <Card
        style={{
          borderRadius: 20,
          height: 30,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Wrapper
          style={{
            padding: 0,
            paddingRight: 15,
            paddingLeft: 15,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Row
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon
              icon={props.selecting ? "close" : "check-box"}
              size={14}
              color={props.colors.light_text_color}
              style={{
                marginRight: 5
              }}
            />
            <Copy>
              {props.selecting
                ? props.selected_leads.length === 0 &&
                  props.selected_all_in_account === false
                  ? "Stop Selecting"
                  : "Clear Selection"
                : "Select"}
            </Copy>
          </Row>
        </Wrapper>
      </Card>
    </Button>
  );
};

export default EditLeadsButton;
