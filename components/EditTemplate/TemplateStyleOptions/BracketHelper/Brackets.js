import React, { Component } from 'react';
import {
  Wrapper,
  Row,
  Copy,
  Button,
  Card,
} from 'app/NativeComponents/common';

class Brackets extends Component{

  constructor(props){
    super(props);

    const bracket_array = [

      {
        label: "Signature Name",
        slug: "{{signature_name}}"
      },
      {
        label: "Owner Name",
        slug: "{{owner_name}}"
      },
      {
        label: "Owner First Name",
        slug: "{{owner_firstname}}"
      },
      {
        label: "Owner Last Name",
        slug: "{{owner_lastname}}"
      },
      {
        label: "Signature Phone",
        slug: "{{signature_phone}}"
      },
      {
        label: "Signature Email",
        slug: "{{signature_email}}"
      },
      {
        label: "Address Line 1",
        slug: "{{address1}}"
      },
      {
        label: "Address Line 2",
        slug: "{{address2}}"
      },

      {
        label: "City",
        slug: "{{city}}"
      },
      {
        label: "State",
        slug: "{{state}}"
      },

      {
        label: "Zip",
        slug: "{{zip}}"
      },
      {
        label: "Full Address",
        slug: "{{address}}"
      }
    ];


    this.state = {
      brackets: bracket_array
    }

  }

  render(){
    return (
      <Row style={this.props.device == "desktop" ? {
        flexWrap: "wrap"
      } : {}}>
          {

            this.state.brackets.map( (bracket, i) =>{

              return (

                <Button
                  onPress = {() => this.props.insertBracket(this.props.value, bracket.slug, this.props.prop)}
                  key={i}
                >
                  <Card style={{
                    marginRight: 0
                  }}

                  >
                    <Row style={{
                      padding: 10,
                      paddingLeft: 15,
                      paddingRight: 15
                    }}>
                      <Copy>{bracket.label}</Copy>
                    </Row>
                  </Card>
                </Button>

              );

            })

          }

      </Row>
    );


  }
}

export default Brackets;
