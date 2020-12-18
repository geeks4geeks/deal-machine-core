import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, Container, ModalContainer, KeyboardView } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import {
  appRedirect,
  toggleModal,
  setModal,
  getTeamFilters,
  updateList,
  buildList,
  setActiveList,
  setFilters,
  setFeatureModal,
  getLists,

  checkIfUserHasModule,
  checkIfFilterChanged
} from "app/NativeActions";

import SelectLocationType from './SelectLocationType';
import SelectFilters from './SelectFilters';
import NameList from './NameList';
import SelectSmartList from './SelectSmartList';
import StartMarketing from './StartMarketing';
import Buttons from './Buttons';
import Count from './Count';

import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';

class BuildList extends Component {

  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "lists"})
    this.state = {
      plan_module_info: plan_module_info,
      location_type: "zip",
      preset: -1,
      preset_object: null,
      zip: "",
      city: "",
      state: "",
      drawing_coordinates: [],
      location_success: false,
      preset_success: false,
      list_name: "",
      name_success: false,
      smart_success: true,
      smart_list: 0,
      start_marketing: 0
    }

    this.startBuilding = this.startBuilding.bind(this);
    this.editListBuilderField = this.editListBuilderField.bind(this);
    this.switchLocationType = this.switchLocationType.bind(this);
    this.switchPreset = this.switchPreset.bind(this);
  }




  switchLocationType(location_type){
    this.setState({location_type})
  }

  switchPreset({preset, preset_object}){
    this.setState({preset: preset, preset_object: preset_object})
  }

  editListBuilderField({prop, value}){
    this.setState({[prop]: value})
  }




  componentDidMount() {
    this.props.setActiveList("build")

    if(this.props.user.team_clearance_level == 0){
      this.handleBack();
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.team_filters !== this.props.team_filters){
      if(this.props.team_filters){
        for(let i = 0; i<this.props.team_filters.length; i++){
          if(this.state.preset == this.props.team_filters[i].id){
            this.switchPreset({preset:this.props.team_filters[i].id, preset_object: this.props.team_filters[i]})
            this.props.setFilters(this.props.team_filters[i].filter_json)
          }
        }
      }
    }else{
      if(((this.state.preset !== prevState.preset) || (this.state.preset_object !== prevState.preset_object)) && this.state.preset !== null){
        this.props.setFilters(this.state.preset_object.filter_json)
      }else if(
        this.state.preset !== null && this.state.preset_object !== null && prevState.preset !== null &&
        checkIfFilterChanged(this.props.filters, prevProps.filters)
      ){
        if(checkIfFilterChanged({
          ...this.props.original_filters,
          ...this.state.preset_object.filter_json
        }, this.props.filters)){
          this.switchPreset({preset: null, preset_object: null})
        }
      }else if(prevProps.filters && checkIfFilterChanged(this.props.filters, prevProps.filters)){
        this.switchPreset({preset: null, preset_object: null})
      }
    }

    if(prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: "lists"});
        this.setState({plan_module_info: plan_module_info});
        this.props.getLists({
          token: this.props.token,
          load_type: "refresh",
          begin: 0
        })
      }
    }
  }

  handleBack(){
    this.props.setActiveList(null)
    this.props.appRedirect({redirect: "goBack", payload:{remove: "build-list"}})
  }

  startBuilding(){

    this.props.buildList({
      token:this.props.token,
      title: this.state.list_name,
      list_type: "build_list",
      smart_list: this.state.smart_list,
      start_marketing: this.state.start_marketing,
      list_preset: this.state.preset > 0 ? this.state.preset : null,
      list_filters: this.state.preset == null || this.state.preset_object == null ? this.props.filters : this.state.preset_object.filter_json,
      list_area_type: this.state.location_type,
      list_area: this.state.location_type == "zip" ? this.state.zip : this.state.location_type == "city" ? this.state.city : "",
      list_area_2: this.state.location_type == "city" ? this.state.state : "",
      list_geo_fence: this.state.location_type == "draw" ? this.state.drawing_coordinates : [],
      estimated_count: this.props.get_list_count && this.props.get_list_count > 0 ? this.props.get_list_count : 0
    })
  }

  render() {
    if(!this.state.plan_module_info.has_module || this.props.card_info.bad_card == 1){
      return(
        <OnboardingContainer
          slug="lists"
          contentful_slug="lists"
          title={"Build List"}
          plan_module_info={this.state.plan_module_info}
          leftButtonIcon={this.props.isMobile ? "arrow-back" : "close"}
          leftButtonAction={()=>this.handleBack()}
        />
      );

    }

    return(
      <Wrapper style={{flex: 1}}>
        <Container>
          <Header
            title={"Build List"}
            leftButtonIcon={this.props.isMobile ? "arrow-back" : "close"}
            leftButtonAction={()=>{
              this.handleBack()
            }}
          />
          <KeyboardView>
            <Wrapper style={{padding: this.props.isMobile ? 0 : 20, paddingBottom: 100}}>
              <SelectLocationType
                {...this.props}
                location_type={this.state.location_type}
                zip={this.state.zip}
                city={this.state.city}
                state={this.state.state}
                drawing_coordinates={this.state.drawing_coordinates}
                switchLocationType={this.switchLocationType}
                editListBuilderField={this.editListBuilderField}
              />

              <SelectFilters
                {...this.props}
                preset={this.state.preset}
                preset_object={this.state.preset_object}
                location_success={this.state.location_success}
                switchPreset={this.switchPreset}
                editListBuilderField={this.editListBuilderField}
                plan_module_info={this.state.plan_module_info}

              />

              <NameList
                {...this.props}

                location_type={this.state.location_type}
                preset={this.state.preset}
                preset_object={this.state.preset_object}
                list_name={this.state.list_name}
                zip={this.state.zip}
                city={this.state.city}
                state={this.state.state}

                location_success={this.state.location_success}
                preset_success={this.state.preset_success}

                editListBuilderField={this.editListBuilderField}
              />

              <SelectSmartList
                {...this.props}
                plan_module_info={this.state.plan_module_info}
                smart_list={this.state.smart_list}

                location_success={this.state.location_success}
                preset_success={this.state.preset_success}
                name_success={this.state.name_success}

                editListBuilderField={this.editListBuilderField}
              />
              <StartMarketing
                {...this.props}
                plan_module_info={this.state.plan_module_info}
                smart_list={this.state.smart_list}
                start_marketing={this.state.start_marketing}
                location_success={this.state.location_success}
                preset_success={this.state.preset_success}
                name_success={this.state.name_success}

                editListBuilderField={this.editListBuilderField}
              />
              <Buttons
                {...this.props}


                location_type={this.state.location_type}
                preset={this.state.preset}
                preset_object={this.state.preset_object}
                list_name={this.state.list_name}
                zip={this.state.zip}
                city={this.state.city}
                state={this.state.state}
                drawing_coordinates={this.state.drawing_coordinates}

                location_success={this.state.location_success}
                preset_success={this.state.preset_success}
                name_success={this.state.name_success}
                smart_success={this.state.smart_success}
                startBuilding={this.startBuilding}
              />
            </Wrapper>

          </KeyboardView>
        </Container>
        <Count
          {...this.props}

          location_type={this.state.location_type}
          preset={this.state.preset}
          preset_object={this.state.preset_object}
          list_name={this.state.list_name}
          zip={this.state.zip}
          city={this.state.city}
          state={this.state.state}
          drawing_coordinates={this.state.drawing_coordinates}

          location_success={this.state.location_success}
          preset_success={this.state.preset_success}
          name_success={this.state.name_success}
          smart_success={this.state.smart_success}
          startBuilding={this.startBuilding}
        />
      </Wrapper>
    )

  }
}

const mapStateToProps = ({ auth, native, settings, billing, filter, list }) => {
  const { token, user } = auth;
  const { device, platform, isMobile, isIphoneX, mobile_toggle_drawer } = native;
  const { states, colors } = settings;
  const { plan_modules, card_info } = billing;

  const { team_filters, filters, original_filters } = filter;
  const { get_list_count, get_list_count_loading, lists_limits, lists_refreshing } = list;

  return {
    token,
    user,
    device,
    platform,
    isMobile,
    isIphoneX,
    mobile_toggle_drawer,
    colors,
    plan_modules,
    team_filters,
    card_info,
    states,
    filters,
    original_filters,
    get_list_count,
    get_list_count_loading,
    lists_limits
  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    toggleModal,
    setModal,
    updateList,
    buildList,
    getTeamFilters,
    setActiveList,
    setFilters,
    setFeatureModal,
    getLists

  }
)(BuildList);
