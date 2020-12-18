import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Scroll,
  Form,
  Wrapper,
  KeyboardView,
  ModalContainer,
  Title,
  Row,
  Copy,
  Button
} from 'app/NativeComponents/common';
import { Header, PillButton } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  setModal,
  toggleModal,
  getBilling,
  saveCard,
  updatePlan,
  billingFieldChanged,

  openUrl,
  checkIfUserHasModule,
  dismissMobileKeyboard,
  loadFeatureInfo
} from 'app/NativeActions';

import Plans from './Plans';
import AnnualSwitch from './AnnualSwitch';
import BillingText from './BillingText';
import BillingCard from './BillingCard';

class GetFeature extends Component {

  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: props.feature_modal ? props.feature_modal.slug : ""})
    this.state = {
      selected_plan: null,
      frequency: this.props.plan_frequency,
      plan_module_info: plan_module_info,
      copy_info: null,
      copy_loading: true,

      page: "plan",

      address:{
        name: this.props.user.firstname ? this.props.user.firstname+" "+this.props.user.lastname : "",
        address: this.props.user.address ? this.props.user.address : "",
        address2: this.props.user.address2 ? this.props.user.address2 : "",
        city: this.props.user.address_city ? this.props.user.address_city : "",
        state: this.props.user.address_state ? this.props.user.address_state : "",
        zip: this.props.user.address_zip ? this.props.user.address_zip : ""
      }
    }
  }

  editAddressField({prop, value}){
    this.setState({
      address: {
        ...this.state.address,
        [prop]: value
      }
    })
  }


  componentDidMount(){
    if(!this.props.feature_modal){
      this.props.appRedirect({redirect: "dashboard"})
    }else{

      //get copy
      loadFeatureInfo(this.props.feature_modal.contentful_slug ? this.props.feature_modal.contentful_slug : this.props.feature_modal.slug)
      .then((data) => {
        if (data && data.items) {

          if(data.items.length > 0){
            this.setState({
              copy_info: data.items[0] ? data.items[0].fields ? data.items[0].fields : null : null,
              copy_loading: false
            });
          }
        }
        this.setState(() => ({copy_loading: false}));
      })
      .catch((err) => {
        this.setState(() => ({copy_loading: false}));
      });

      //get info from server
      this.props.getBilling({
        token: this.props.token,
        type: "plan_module_options",
        slug: this.props.feature_modal.slug,
        require_tier: this.props.feature_modal.require_tier ? this.props.feature_modal.require_tier : 1
      })


    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.current_plan_module_options !== this.props.current_plan_module_options && this.props.current_plan_module_options){
      if(this.props.current_plan_module_options.length > 0){
        let plan_selected = false;
        for(let i = 0; i<this.props.current_plan_module_options.length; i++){
          if(this.props.current_plan_module_options[i].default_plan == 1){
            plan_selected=true;
            this.selectPlan({selected_plan: this.props.current_plan_module_options[i], frequency: this.state.frequency})
          }
        }
        if(!plan_selected && this.props.current_plan_module_options.length > 0){
          plan_selected=true;
          this.selectPlan({selected_plan: this.props.current_plan_module_options[0], frequency: this.state.frequency})
        }
      }
    }
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{remove: "get-feature"}});
  }

  checkIfNeedsToSave(){

    return true;
  }

  getFeature(){
    if(this.props.card_info.has_card && this.props.card_info.bad_card == 0 && this.state.selected_plan){
      //sign up for plan with card
      this.props.updatePlan({
        token: this.props.token,
        plan: this.state.selected_plan.plan_id,
        frequency: this.state.frequency,
        slug: this.props.feature_modal.slug,
        type: "add_or_update_plan_module" });
    }
  }


  saveBilling(card_token, error) {

    if (card_token || error) {
      this.props.saveCard({
        token: this.props.token,
        card_token: card_token,
        error: error,
        plan: this.state.selected_plan ? this.state.selected_plan.plan_id : 0,
        frequency: this.state.frequency,
        type: "onboarding",
        slug: this.props.feature_modal.slug,
        device: this.props.platform,
        address: this.state.address
      });
    } else {
      const { number, expMonth, expYear, cvc } = this.props.card;
      this.props.saveCard({
        token: this.props.token,
        number,
        expMonth,
        expYear,
        cvc,
        plan: this.state.selected_plan ? this.state.selected_plan.plan_id : 0,
        frequency: this.state.frequency,
        type: "onboarding",
        slug: this.props.feature_modal.slug,
        device: this.props.platform,
        address: this.state.address
      });
    }
  }


  selectPlan({selected_plan, frequency}){
    this.setState({
      selected_plan: selected_plan,
      frequency: selected_plan ?
        selected_plan.enterprise == 1 ? "annually" :
          this.state.selected_plan ?
            this.state.selected_plan.enterprise == 1 ? this.props.plan_frequency
             : frequency : frequency : frequency
    })
  }

  togglePlanFrequency(frequency){
    this.setState({
      frequency: frequency
    })
  }

  getButtonText(){
    if(this.state.plan_module_info.has_module &&
      this.state.plan_module_info.canceled != 1 &&
      this.state.plan_module_info.paused != 1

    ){
      return "Update Account";
    }else if(
      this.state.plan_module_info.canceled == 1 ||
      this.state.plan_module_info.paused == 1

    ){
      return "Reactivate";
    }else{
      if(this.state.selected_plan){
        if(this.state.selected_plan.trial_length_days > 0){
          return "Start Your "+this.state.selected_plan.trial_length_days+" Day Free Trial";
        }
      }
    }

    return "Purchase Feature";
  }

  renderContinueButton(){
    if(this.state.selected_plan && this.props.card_info.has_card && this.props.card_info.bad_card == 0){
      return(
        <Wrapper>
          <BillingText
            {...this.props}
            plans={this.props.current_plan_module_options}
            togglePlanFrequency={this.togglePlanFrequency.bind(this)}
            selectPlan={this.selectPlan.bind(this)}
            selected_plan={this.state.selected_plan}
            frequency={this.state.frequency}
          />
          <Wrapper style={{padding:20, alignItems: "center", justifyContent: "center"}}>
            <PillButton
              onPress={
                this.props.card_info.has_card && this.props.card_info.bad_card == 0 ? ()=>{
                  this.getFeature()
                } : ()=>{}
              }
              primary={true}
            >
              {this.getButtonText()}
            </PillButton>

          </Wrapper>
        </Wrapper>
      )
    }else{
      return(
        <Wrapper style={{padding:20, alignItems: "center", justifyContent: "center"}}>
          <PillButton
            onPress={()=>{this.nextStep()}}
            primary={true}
          >
            Next: Billing Information
          </PillButton>

        </Wrapper>
      )
    }
  }

  nextStep(){
    if(this.state.selected_plan){
      this.setState({
        page: "billing"
      })
    }
  }

  prevStep(){
    this.setState({
      page: "plan"
    })
  }

  renderCopy(){
    if(!this.state.copy_loading && this.state.copy_info){
      return(
        <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20}}>
          <Title style={{textAlign: "center"}}>{this.state.copy_info.title}</Title>
          <Copy style={{textAlign: "center"}}>{this.state.copy_info.description}</Copy>
          <Row>
            <Button onPress={()=>{openUrl(this.state.copy_info.linkButtonLink)}}>
              <Copy style={{textAlign: "center"}}>{this.state.copy_info.linkButtonText}</Copy>
            </Button>
          </Row>
        </Wrapper>
      )
    }
  }

  render() {
    if(this.props.feature_modal){


      if(this.state.page == "plan"){
        return (

          <ModalContainer style={{maxWidth: 750}}>
            <Header
              title={"Get Feature"}
              leftButtonIcon={this.props.device === "desktop" ? "close" : "arrow-back"}
              leftButtonAction={()=>{
                this.handleBack();
              }}

              rightButtonTitle={this.props.card_info.has_card && this.props.card_info.bad_card == 0 ? this.getButtonText() : "Next: Billing Information"}
              rightButtonAction={this.props.card_info.has_card && this.props.card_info.bad_card == 0 ? ()=>{
                this.getFeature()
              } : ()=>{
                this.nextStep()
              }}

            />
            <KeyboardView style={{ maxWidth: 900}}>

              {this.renderCopy()}
              <Wrapper style={{alignItems: "center", justifyContent: "center", paddingBottom: 25}}>

                <Plans
                  {...this.props}
                  plan_module_info={this.state.plan_module_info}
                  togglePlanFrequency={this.togglePlanFrequency.bind(this)}
                  selectPlan={this.selectPlan.bind(this)}
                  selected_plan={this.state.selected_plan}
                  frequency={this.state.frequency}
                />

                <AnnualSwitch
                  {...this.props}
                  plans={this.props.current_plan_module_options}
                  togglePlanFrequency={this.togglePlanFrequency.bind(this)}
                  selectPlan={this.selectPlan.bind(this)}
                  selected_plan={this.state.selected_plan}
                  frequency={this.state.frequency}
                />
                {this.renderContinueButton()}
              </Wrapper>
            </KeyboardView>
          </ModalContainer>
        );
      }
    }

    if(this.state.page == "billing"){
      return(
        <ModalContainer style={{maxWidth: 750}}>
          <Header
            title={"Billing Information"}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={()=>{
              this.prevStep();
            }}
          />
          <KeyboardView style={{ maxWidth: 900}}>

            <Wrapper style={{alignItems: "center", justifyContent: "center", paddingBottom: 25}}>
              <BillingCard {...this.props}
                address={this.state.address}
                editAddressField={this.editAddressField.bind(this)}
                saveBilling={this.saveBilling.bind(this)}
                buttonText={this.getButtonText()}
              />
              <BillingText
                {...this.props}
                plans={this.props.current_plan_module_options}
                togglePlanFrequency={this.togglePlanFrequency.bind(this)}
                selectPlan={this.selectPlan.bind(this)}
                selected_plan={this.state.selected_plan}
                frequency={this.state.frequency}
              />
            </Wrapper>
          </KeyboardView>
        </ModalContainer>
      )
    }

    return <Wrapper />;
  }

}

const mapStateToProps = ({ auth, native, billing, settings }) => {
  const { token, user } = auth;
  const { device, isMobile, platform } = native;
  const { states, colors } = settings
  const { feature_modal, card_info, plan_frequency, current_plan_module_options, current_plan_module_coupon, loading_plan_module_options, plan_modules, card } = billing;
  return{
    token,
    user,
    device,
    platform,
    card,
    isMobile,
    feature_modal,

    card_info,
    plan_modules,
    plan_frequency,

    current_plan_module_options,
    current_plan_module_coupon,
    loading_plan_module_options,

    card,

    states,
    colors
  }
}


export default connect(mapStateToProps, {
  appRedirect,
  setModal,
  toggleModal,
  getBilling,
  saveCard,
  billingFieldChanged,
  updatePlan

})(GetFeature);
