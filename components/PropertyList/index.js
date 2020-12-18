import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RightPanelContainer, Wrapper, Title, Scroll} from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';
import PropertyItem from 'app/DealMachineCore/snippets/PropertyItem';

import {
  addDeal,
  setStatusModal,
  appRedirect,
  updateLead,
  selectActiveProperty
} from 'app/NativeActions';

import {
  determineHighlightArray
} from 'app/DealMachineCore/components/PropertyMap/MapActions';


class PropertyList extends Component {

  constructor(props){
    super(props);

    this.state = {
      highlight_array: []
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.map_properties !== this.props.map_properties ||
      prevProps.applied_filters !== this.props.applied_filters
    ){
      const highlight_array = determineHighlightArray(this.props.map_properties, null, this.props.user);
      this.setState({
        highlight_array: highlight_array
      });
    }
  }

  pressProperty(property){
    this.props.selectActiveProperty(property)
    this.props.appRedirect({redirect: "property", payload:{property_id: property.property_id, map: true}})
  }

  render(){
    if(this.props.map_properties.length > 0 && !this.props.isMobile && !this.props.hide_property_list && this.props.user.team_clearance_level > 0){

      return(
        <RightPanelContainer style={{backgroundColor: this.props.colors.card_color}}>
          <Scroll style={{height: "100%"}}>
            <Wrapper style={{padding: 20, borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color, borderBottomStyle: "solid"}}>
              <Title>{
                this.state.highlight_array.length === 0 ? "Showing All Properties" :
                this.state.highlight_array.length === 1 ? "Showing 1 Highlighted Property" :
                "Showing "+this.state.highlight_array.length+" Highlighted Properties"
              }</Title>
            </Wrapper>
            <List
              rowNumber={1}
              style={{flex: 1}}
              items={this.state.highlight_array.length === 0 ? this.props.map_properties : this.state.highlight_array}
              infiniteScroll={false}
              itemStruture={({item}) => {
                return <PropertyItem
                          key={item.property_id}
                          property={item}
                          user={this.props.user}
                          onPress={(property)=>this.pressProperty(property)}
                          no_active={true}
                          selected_leads={[]}
                          checkLead={()=>{}}
                          selecting={false}
                          selected_all={false}
                          bypass_start_mailers_button={true}
                       />
              }}
              canRefresh={true}
              onRefresh={()=>{
                this.props.getProperties("refresh", 1);
              }}
              is_refreshing={false}
              canLoadMore={false}
              isLoadingMore={false}
              onLoadMore={()=>{}}
            />
          </Scroll>
        </RightPanelContainer>
      )

    }

    return <Wrapper />;
  }
}

const mapStateToProps = ({ auth, settings, property_map, lead, native, filter }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { device, isMobile } = native;
  const {
    hide_property_list,
    map_properties_loading, map_properties_error, map_properties, active_property, add_deal_loading,
  } = property_map;

  const {
    list_settings,
    applied_filters
  } = filter;

  return {
    token,
    user,
    colors,
    device,
    isMobile,
    hide_property_list,
    map_properties_loading,
    map_properties_error,
    map_properties,
    active_property,
    add_deal_loading,
    list_settings,
    applied_filters
  }
}


export default connect(mapStateToProps, {
  addDeal,
  setStatusModal,
  appRedirect,
  updateLead,
  selectActiveProperty
})(PropertyList);
