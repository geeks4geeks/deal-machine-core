import React, { PureComponent   } from 'react';
import {
  Wrapper,
  Card
} from 'app/NativeComponents/common';

import {
  Select
} from 'app/NativeComponents/snippets';

class SortByButton extends PureComponent {

  constructor(props){
    super(props);

    this.state={
      options:[{
        label: "Date Added Descending",
        value: "date_created_desc"
      },{
        label: "Date Added Asending",
        value: "date_created_asc"
      },{
        label: "Sale Price Descending",
        value: "saleprice_desc"
      },{
        label: "Sale Price Asending",
        value: "saleprice_asc"
      },{
        label: "Sale Date Descending",
        value: "saledate_desc"
      },{
        label: "Sale Date Asending",
        value: "saledate_asc"
      },{
        label: "Assessed Value Descending",
        value: "calculated_total_value_desc"
      },{
        label: "Assessed Value Asending",
        value: "calculated_total_value_asc"
      }]
    }
  }

  renderSortText(){
    for(let i =0; i<this.state.options.length; i++){
      if(this.props.sort_by.slug+"_"+this.props.sort_by.type === this.state.options[i].value){
        return this.state.options[i].label;
      }
    }

    return "N/A";
  }

  render(){

    return (
      <Card style={{
        borderRadius: 20,
        height: 30,
        marginLeft: 0,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Wrapper style={{
          padding: 0,
          paddingRight: 15,
          paddingLeft: 15,
          alignItems: "center",
          justifyContent: "center"
        }}>

          <Select
            item_ref={"sort_by"}
            size={"small"}
            items={this.state.options}
            title={""}
            label="Select an option"
            value={this.props.sort_by.slug+"_"+this.props.sort_by.type}
            text={"Sort By"}
            onSelect={value => {

              let items = value.split("_");
              let sort_type = "";
              let sort_slug = "";

              for(let i = 0; i<items.length; i++){
                if(i === 0){
                  sort_slug += items[i];
                }else if(i === (items.length - 1)){
                  sort_type = items[i];
                }else{
                  sort_slug += "_"+items[i];
                }
              }

              this.props.changeSortBy({
                slug: sort_slug,
                type: sort_type
              })

            }}
          />
        </Wrapper>
      </Card>
    )
  }
}



export default SortByButton;
