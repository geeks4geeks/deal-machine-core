import moment from "moment";

export const numberWithCommas = x => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "";
};

export const checkIfTrust = ({ owner }) => {
  var word_array = ["trust"];
  var word_found = false;
  for (var i = 0; i < word_array.length; i++) {
    var og_word = word_array[i];
    var word = " " + og_word;
    const lower_owner = owner.owner_name.toLowerCase();
    if (lower_owner.endsWith(word)) {
      word_found = true;
    }
    word = " " + og_word + " ";
    if (lower_owner.indexOf(word) != -1) {
      word_found = true;
    }
    word = og_word + " ";
    if (lower_owner.startsWith(word)) {
      word_found = true;
    }
  }
  if (word_found == true) {
    return true;
  } else {
    return false;
  }
};

export const formatAddress = ({ address }) => {
  var address_line1 = " ";
  var address_line2 = " ";

  if (address.address2) {
    address_line1 =
      toTitleCase(address.address) + " " + toTitleCase(address.address2);
    address_line2 =
      toTitleCase(address.address_city) +
      ", " +
      address.address_state +
      " " +
      address.address_zip;
  } else {
    address_line1 = toTitleCase(address.address);
    address_line2 =
      toTitleCase(address.address_city) +
      ", " +
      address.address_state +
      " " +
      address.address_zip;
  }

  if (
    address_line1 == undefined ||
    address_line1 == "undefined" ||
    address_line1 == "undefined," ||
    address_line1 == "undefined, " ||
    address_line1 == "undefined,  " ||
    address_line1 == null
  ) {
    address_line1 = "";
  } else {
    address_line1 = address_line1.trim();
  }

  if (
    address_line2 == undefined ||
    address_line2 == "undefined" ||
    address_line2 == "undefined," ||
    address_line2 == "undefined, " ||
    address_line2 == "undefined,  " ||
    address_line2 == null
  ) {
    address_line2 = "";
  } else {
    address_line2 = address_line2.trim();
  }
  return { line1: address_line1, line2: address_line2 };
};

export const toTitleCase = str => {
  if (str) {
    str = str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return str;
  }
};

export const numberFormat = (number, decimals, dec_point, thousands_sep) => {
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep == "undefined" ? "," : thousands_sep,
    dec = typeof dec_point == "undefined" ? "." : dec_point,
    toFixedFix = function(n, prec) {
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      var k = Math.pow(10, prec);
      return Math.round(n * k) / k;
    },
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

const isUpperCase = str => {
  if (str) {
    return str == str.toUpperCase();
  }
  return "";
};

const formatSuffix = str => {
  if (str == undefined) {
    return "";
  } else if (str.includes("Iii")) {
    return str.replace("Iii", "");
  } else if (str.includes("Llc")) {
    return str.toUpperCase();
  } else if (str.includes("Inc")) {
    return str.toUpperCase();
  } else {
    return str;
  }
};

export const ownerNameFormat = (str, info) => {
  return str;
};

export const renderPrice = (price, format = null) => {

  if (parseInt(price) < 100) {
    if (parseInt(price) <= 0) {
      return "$0.00";
    } else {
      return price + "¢";
    }
  } else {
    if(format === "no_decimal"){
      return "$" + numberWithCommas(parseInt(price / 100));
    }
    return "$" + numberWithCommas(parseFloat(price / 100).toFixed(2));
  }
};

export const checkIfAllAddressesAreToggled = (addresses, owner) => {
  var count = 0;
  if (owner.use_owner_address == 1) {
    count++;
  }

  if (addresses) {
    if (addresses.length > 0) {
      for (var i = 0; i < addresses.length; i++) {
        if (addresses[i].address_send_mail == 1) {
          count++;
        }
      }
      if (count < addresses.length + 1) {
        var leftovers = addresses.length + 1 - count;
        return leftovers;
      } else {
        return false;
      }
    }
  }

  return false;
};

export const formatUsPhone = phone => {
  if (phone) {
    var phoneTest = new RegExp(
      /^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/
    );
    phone = phone.trim();
    var results = phoneTest.exec(phone);
    if (results != null && results.length > 8) {
      return (
        "(" +
        results[3] +
        ") " +
        results[4] +
        "-" +
        results[5] +
        (typeof results[8] != "undefined" ? " x" + results[8] : "")
      );
    } else {
      return phone;
    }
  }

  return phone;
};


export const skipTrace = ({props, properties = [], total_property_count = 1, onSuccess = ()=>{}}) => {
  const skip_trace_price = props.pricing.skip_trace_price;
  const pricing_tier_name = props.pricing.pricing_tier_name;
  const corporate_skip_trace_price = props.pricing.corporate_skip_trace_price;

  if(props.user.team_clearance_level > 1 || parseInt(props.user.can_enhanced_search) === 1){


    if(total_property_count > 1){
      //TODO make sure to check dealcredits and prompt for card if there is none


      checkForDealCredits({
        props: props,
        deal_credits: props.deal_credits,
        amount_to_spend: skip_trace_price*total_property_count,
        type: "bulk_edit",
        callback: () =>{

          const new_list_name = `Bulk Skip Trace on ${moment().format("M/DD/YYYY [@] h:mm a")}`

          props.setModal({
            title: 'Are you sure you want to skip trace '+total_property_count+' leads?',
            description: "By skip tracing these leads, you'll be using "+renderPrice(skip_trace_price*total_property_count)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this.",
            icon: "check-circle",
            submit: 'Skip Trace Leads',
            onPress: ()=>{
              props.updateLead({
                token: props.token,
                type: "skip_trace_leads",
                select_all: props.selected_all_in_account ? 1 : 0,
                total_count: total_property_count,
                filters: props.applied_filters,
                filter_lists: props.filter_lists,
                deal_ids: properties.map((property)=>{
                    return property.deal.id;
                }).join(),
                new_list_name,
                onSuccess:onSuccess
              })
            },
            cancel: 'Nevermind. Cancel Action.',
            onCancel: ()=>{}
          });
          props.toggleModal({show: true, type: "normal"});
      }});


    }else{

      if(parseInt(properties[0].deal.did_skip_trace) !== 1) {
        if(parseInt(props.user.has_skip_traced) === 0){
          props.setModal({
            title: "Ready to search?",
            description:
              "Skip tracing helps you connect with owners faster by showing phone numbers, emails, and additional address locations where the owner receives mail. \n \nEach skip trace will cost " +
              renderPrice(skip_trace_price)+ " on the "+pricing_tier_name,
            icon: "search",
            submit: "Use Skip Trace",
            onPress: () => {
              checkForDealCredits({
                props: props,
                deal_credits: props.deal_credits,
                amount_to_spend: properties[0].owner_status_info.corp_owner == 1 ? corporate_skip_trace_price : skip_trace_price,
                type: properties[0].owner_status_info.corp_owner == 1 ? "corporate_skip_trace" : "skip_trace",
                callback: () =>{
                  props.updateOwnerInfo({
                    token: props.token,
                    deal_id: properties[0].deal.id,
                    type: "skip_trace"
                  })
                }
              });
            },
            cancel: "Not right now.",
            onCancel: () => {}
          });
          props.toggleModal({ show: true, type: "normal" });

        }else{
          checkForDealCredits({
            props: props,
            deal_credits: props.deal_credits,
            amount_to_spend: properties[0].owner_status_info.corp_owner == 1 ? corporate_skip_trace_price : skip_trace_price,
            type: properties[0].owner_status_info.corp_owner == 1 ? "corporate_skip_trace" : "skip_trace",
            callback: () =>{
              props.updateOwnerInfo({
                token: props.token,
                deal_id: properties[0].deal.id,
                type: "skip_trace"
              })
            }
          });
        }
      }


    }

  }else{

    props.setModal({
      title: "You do not have permissions to use skip tracing.",
      description: "Talk to your team leader to get the permissions you need.",
      icon: "error",
      submit: 'Dismiss',
      onPress: ()=>{
      },
      cancel: '',
      onCancel: ()=>{}
    });
    props.toggleModal({show: true, type: "normal"});

  }


};

export const getStateName = abbr => {
  const states = [
    {
      name: "Alabama",
      abbr: "AL"
    },
    {
      name: "Alaska",
      abbr: "AK"
    },
    {
      name: "American Samoa",
      abbr: "AS"
    },
    {
      name: "Arizona",
      abbr: "AZ"
    },
    {
      name: "Arkansas",
      abbr: "AR"
    },
    {
      name: "California",
      abbr: "CA"
    },
    {
      name: "Colorado",
      abbr: "CO"
    },
    {
      name: "Connecticut",
      abbr: "CT"
    },
    {
      name: "Delaware",
      abbr: "DE"
    },
    {
      name: "District Of Columbia",
      abbr: "DC"
    },
    {
      name: "Florida",
      abbr: "FL"
    },
    {
      name: "Georgia",
      abbr: "GA"
    },
    {
      name: "Guam",
      abbr: "GU"
    },
    {
      name: "Hawaii",
      abbr: "HI"
    },
    {
      name: "Idaho",
      abbr: "ID"
    },
    {
      name: "Illinois",
      abbr: "IL"
    },
    {
      name: "Indiana",
      abbr: "IN"
    },
    {
      name: "Iowa",
      abbr: "IA"
    },
    {
      name: "Kansas",
      abbr: "KS"
    },
    {
      name: "Kentucky",
      abbr: "KY"
    },
    {
      name: "Louisiana",
      abbr: "LA"
    },
    {
      name: "Maine",
      abbr: "ME"
    },
    {
      name: "Maryland",
      abbr: "MD"
    },
    {
      name: "Massachusetts",
      abbr: "MA"
    },
    {
      name: "Michigan",
      abbr: "MI"
    },
    {
      name: "Minnesota",
      abbr: "MN"
    },
    {
      name: "Mississippi",
      abbr: "MS"
    },
    {
      name: "Missouri",
      abbr: "MO"
    },
    {
      name: "Montana",
      abbr: "MT"
    },
    {
      name: "Nebraska",
      abbr: "NE"
    },
    {
      name: "Nevada",
      abbr: "NV"
    },
    {
      name: "New Hampshire",
      abbr: "NH"
    },
    {
      name: "New Jersey",
      abbr: "NJ"
    },
    {
      name: "New Mexico",
      abbr: "NM"
    },
    {
      name: "New York",
      abbr: "NY"
    },
    {
      name: "North Carolina",
      abbr: "NC"
    },
    {
      name: "North Dakota",
      abbr: "ND"
    },
    {
      name: "Ohio",
      abbr: "OH"
    },
    {
      name: "Oklahoma",
      abbr: "OK"
    },
    {
      name: "Oregon",
      abbr: "OR"
    },
    {
      name: "Pennsylvania",
      abbr: "PA"
    },
    {
      name: "Puerto Rico",
      abbr: "PR"
    },
    {
      name: "Rhode Island",
      abbr: "RI"
    },
    {
      name: "South Carolina",
      abbr: "SC"
    },
    {
      name: "South Dakota",
      abbr: "SD"
    },
    {
      name: "Tennessee",
      abbr: "TN"
    },
    {
      name: "Texas",
      abbr: "TX"
    },
    {
      name: "Utah",
      abbr: "UT"
    },
    {
      name: "Vermont",
      abbr: "VT"
    },
    {
      name: "Virgin Islands",
      abbr: "VI"
    },
    {
      name: "Virginia",
      abbr: "VA"
    },
    {
      name: "Washington",
      abbr: "WA"
    },
    {
      name: "West Virginia",
      abbr: "WV"
    },
    {
      name: "Wisconsin",
      abbr: "WI"
    },
    {
      name: "Wyoming",
      abbr: "WY"
    },
    {
      name: "Armed Forces",
      abbr: "AE"
    },
    {
      name: "Armed Forces America",
      abbr: "AA"
    },
    {
      name: "Armed Forces Pacific",
      abbr: "AP"
    }
  ];

  for (var i = 0; i < states.length; i++) {
    if (states[i].abbr == abbr) {
      return states[i].name;
    }
  }
  return "Not Selected";
};

export const renderTeamStatus = (member) =>{
  if(member.team_owner == 1){
    return "Team Leader";
  }
  switch(parseInt(member.team_clearance_level)){
    case 0:
      return "DealFinder";
    default:
    case 1:
      return "Partner";
    case 2:
      return "Admin";
  }
}

export const renderDate = (date_created, just_date) => {
  if (date_created) {
    var date = new Date();
    var offsetInHours = date.getTimezoneOffset() / 60;
    if (just_date) {
      return moment(date_created)
        .subtract(offsetInHours, "hours")
        .format("MMM Do, YYYY");
    } else {
      return moment(date_created)
        .subtract(offsetInHours, "hours")
        .format("MMM Do, YYYY h:mm a");
    }
  } else {
    return "";
  }
};

export const startMailers = ({props, properties = [], total_property_count = 1, onSuccess=()=>{}}) =>{

  //get actual mailer price later
  const mailer_price = props.pricing.mailer_price;
  const ballpoint_price = props.pricing.ballpoint_price;
  const pricing_tier_name = props.pricing.pricing_tier_name;

  if(properties.length > 0 || total_property_count > 1){
    if(props.user.team_clearance_level > 1 || parseInt(props.user.can_approve_mail) === 1){

      if(parseInt(props.user.team_set_signature) !== 1){

        //trigger signature onboarding
        props.toggleOnboarding(true)
        props.appRedirect({redirect: "goForward", payload: {add: "onboarding-signature"}});

      }else{
        if(total_property_count > 1){

          //TODO make sure to check dealcredits and prompt for card if there is none
          checkForDealCredits({
            props: props,
            deal_credits: props.deal_credits,
            amount_to_spend: mailer_price*total_property_count,
            type: "bulk_edit",
            callback: () =>{


              const new_list_name = `Started mailers on ${moment().format("M/DD/YYYY [@] h:mm a")}`

              props.setModal({
                title: 'Are you sure you want to start mailers/campaigns for '+total_property_count+' leads?',
                description: "By starting mailers/campaigns, you'll be starting or resuming the mailing sequence for all "+total_property_count+" leads. You'll be using "+renderPrice(mailer_price*total_property_count)+" of your DealCredit. You will be charged for more credit if you don't have enough. You cannot undo this. Mailers will be sent to the queue within the hour.",
                icon: "check-circle",
                submit: 'Start Mailers',
                onPress: ()=>{

                  //trigger add to list
                  props.updateLead({
                    token: props.token,
                    type: "start_mailers",
                    select_all: props.selected_all_in_account ? 1 : 0,
                    filters: props.applied_filters,
                    filter_lists: props.filter_lists,
                    total_count: properties.length,
                    deal_ids: properties.map((property)=>{
                        return property.deal.id;
                    }).join(),
                    new_list_name,
                    onSuccess:onSuccess
                  })
                },
                cancel: 'Nevermind. Cancel Action.',
                onCancel: ()=>{}
              });
              props.toggleModal({show: true, type: "normal"});

            }})

        }else if(properties.length == 1){

          if(parseInt(props.user.has_sent_mail) === 0){

            props.setModal({
              title: "Start Mailing?",
              description: "Build trust and connect with this owner by sending a mailer. Stand out and make it personal -- your mail will feature the picture you added of the property, as well as your headshot and signature. \n\n Each piece of mail will cost "+renderPrice(mailer_price)+" on the "+pricing_tier_name,
              icon: "mail",
              submit: 'Start Mailers.',
              onPress: ()=>{
                checkForDealCredits({
                  props: props,
                  deal_credits: props.deal_credits,
                  amount_to_spend: properties[0].deal.mail_template_type === "handwritten" ? ballpoint_price : mailer_price,
                  type: "mailers",
                  callback: ()=>{
                    props.updateLead({
                      token: props.token,
                      type: "start_mailers",
                      deal_ids: properties[0].deal.id
                    })
                  }
                });
              },
              cancel: 'Not right now.',
              onCancel: ()=>{}
            });
            props.toggleModal({show: true, type: "normal"});
          }else{
            checkForDealCredits({
              props: props,
              deal_credits: props.deal_credits,
              amount_to_spend: properties[0].deal.mail_template_type === "handwritten" ? ballpoint_price : mailer_price,
              type: "mailers",
              callback: ()=>{
                props.updateLead({
                  token: props.token,
                  type: "start_mailers",
                  deal_ids: properties[0].deal.id
                })
              }
            });
          }

        }
      }

    }else{
      props.setModal({
        title: "You do not have permissions to do start mailers.",
        description: "Talk to your team leader to get the permissions you need.",
        icon: "error",
        submit: 'Dismiss',
        onPress: ()=>{
        },
        cancel: '',
        onCancel: ()=>{}
      });
      props.toggleModal({show: true, type: "normal"});

    }
  }

}

export const checkForDealCredits = ({
  props,
  deal_credits,
  amount_to_spend = 0,
  type,
  total_purchase_amount,
  callback
}) => {


    var show_prompt = false;
    var prompt_title = "";
    var prompt_message = "";
    var submit_title = "Continue";
    var cancel_title = "Cancel Purchase";
    var reload_amount = renderPrice(deal_credits.default_credit_reload.cents);

    switch (type) {
      case "mailers":
      default:
        if (
          (parseInt(deal_credits.deal_credits_remaining.cents) - parseInt(deal_credits.total_deal_credits_queued.cents)) >= 0 &&
          (parseInt(deal_credits.deal_credits_remaining.cents) - parseInt(amount_to_spend) - parseInt(deal_credits.total_deal_credits_queued.cents)) <= 0
        ) {

          //check if there is a card on file:
            //if not redirect to card enter page


          show_prompt = true;
          prompt_title = "Reloading DealCredit";
          prompt_message =
            "When mailers are sent, your account will automatically be reloaded " +
            reload_amount +
            " and " +
            reload_amount +
            " will be charged to your card.";
        }

      break;

      case "bulk_edit":
        show_prompt = false;
        checkIfTeamHasCard({props, onSuccess: ()=>{
          callback();
        }});
        return;

      break;

      case "skip_trace":
      case "corporate_skip_trace":

        if (
          (parseInt(deal_credits.deal_credits_remaining.cents) - parseInt(amount_to_spend)) <= 0
        ) {

          //check if there is a card on file:
            //if not redirect to card enter page


          show_prompt = true;
          prompt_title = "Reloading DealCredit";
          prompt_message =
            "By pressing continute, your account will automatically be reloaded " +
            reload_amount +
            " and " +
            reload_amount +
            " will be charged to your card.";
        }

      break;
    }

  if(show_prompt){
    checkIfTeamHasCard({props, onSuccess: ()=>{

      props.setModal({
        title: prompt_title,
        description: prompt_message,
        icon: "fiber-smart-record",
        submit: submit_title,
        onPress: () => {
          callback();
        },
        cancel: cancel_title,
        onCancel: () => {}
      });
      props.toggleModal({ show: true, type: "normal" });
    }})
    return;

  } else {
    callback();
    return;
  }
};

export const getCampaignInfo = ({ campaign_id, campaigns }) => {
  for (var i = 0; i < campaigns.length; i++) {
    if (campaigns[i].id == campaign_id) {
      return campaigns[i];
    }
  }

  return null;
};

export const getTemplateInfo = ({ template_id, templates }) => {
  for (var i = 0; i < templates.length; i++) {
    if (templates[i].id == template_id) {
      return templates[i];
    }
  }
  return null;
};

const renderRepeatingMailText = deal => {
  if (
    parseInt(deal.times_mailed) >= parseInt(deal.resend_limit) &&
    deal.resend_limit != 0 &&
    deal.approved == 1
  ) {
    return deal.deal_status_title + " - Cycle Complete";
  } else if (deal.resend_freq > 0 && deal.status == 1 && deal.approved == 1) {
    if (deal.times_mailed == 1) {
      return (
        deal.deal_status_title +
        " - Sent 1 time\nLast sent " +
        moment(deal.sent_date).format("MMMM Do")
      );
    } else {
      return (
        deal.deal_status_title +
        " - Sent " +
        deal.times_mailed +
        " times\nLast sent " +
        moment(deal.sent_date).format("MMMM Do")
      );
    }
  } else if (deal.resend_freq > 0 && deal.status == 0 && deal.approved == 1) {
    return deal.deal_status_title + " - In Sending Queue";
  }
};

const renderCampaignText = deal => {
  if (deal.campaign_complete == 1) {
    return (
      deal.deal_status_title +
      "\n" +
      deal.campaign_title +
      " - Campaign Complete"
    );
  } else if (deal.status == 1) {
    return (
      deal.deal_status_title +
      "\n" +
      deal.campaign_title +
      " - Step " +
      deal.campaign_step +
      " of " +
      deal.number_of_steps +
      "\nLast sent " +
      moment(deal.sent_date).format("MMMM Do")
    );
  } else if (deal.status == 0 && deal.approved == 1) {
    return (
      deal.deal_status_title +
      "\n" +
      deal.campaign_title +
      " - Step " +
      deal.campaign_step +
      " of " +
      deal.number_of_steps +
      "\nIn Sending Queue"
    );
  } else if (deal.status == 0 && deal.approved == 0) {
    return (
      deal.deal_status_title +
      "\n" +
      deal.campaign_title +
      " - Campaign Not Started"
    );
  }
};

export const getStatus = (deal, type = "string") => {
  var status_string = "";
  var icon;
  var color = "#31cce5";

  if (
    deal.approved == 1 &&
    deal.archived != 1 &&
    deal.closed != 1
  ) {
    if (deal.campaign_id != 0) {
      icon = "flag";
      status_string = renderCampaignText(deal);
    } else if (deal.resend_freq > 0) {
      icon = deal.deal_status_icon;
      status_string = renderRepeatingMailText(deal);
    } else if (deal.status == 1) {
      icon = deal.deal_status_icon;

      if (deal.sent_date) {
        status_string =
          deal.deal_status_title +
          "\nMail Sent " +
          moment(deal.sent_date).format("MMMM Do");
      } else {
        status_string = deal.deal_status_title + "\nMail Sent";
      }
    } else {
      icon = deal.deal_status_icon;

      if (deal.resend_freq == 0) {
        status_string = deal.deal_status_title;
      }

      if (deal.times_mailed == 1) {
        status_string += "\nSent " + deal.times_mailed + " time";
      } else if (deal.times_mailed > 0) {
        status_string += "\nSent " + deal.times_mailed + " times";
      } else {
        icon = deal.deal_status_icon;

        status_string = deal.deal_status_title + "\nIn Sending Queue";
      }
    }
  }
  if (deal.paused == 1 && deal.archived != 1 && deal.closed != 1) {
    icon = "pause";
    if (deal.campaign_id != 0) {
      if (deal.deal_status_slug == "marketing_complete") {
        status_string = deal.deal_status_title;
      } else {
        status_string = deal.deal_status_title + "\nCampaign Paused";
      }
    } else {
      status_string = deal.deal_status_title + "\nMailers Paused";
    }
  } else if (
    deal.approved == 1 &&
    deal.archived != 1 &&
    deal.closed != 1 &&
    deal.status == 0
  ) {
    icon = deal.deal_status_icon;

    if (deal.resend_freq == 0) {
      status_string = deal.deal_status_title;
    }

    if (deal.times_mailed == 1) {
      status_string += "\nSent " + deal.times_mailed + " time";
    } else if (deal.times_mailed > 0) {
      status_string += "\nSent " + deal.times_mailed + " times";
    } else {
      icon = deal.deal_status_icon;
      status_string = deal.deal_status_title + "\nIn Sending Queue";
    }
  } else if (
    deal.approved != 1 &&
    deal.archived != 1 &&
    deal.closed != 1 &&
    deal.status == 0
  ) {
    icon = deal.deal_status_icon;
    color = "#fff";
    if (deal.campaign_id == 0) {
      status_string = deal.deal_status_title + "\nMailers not started";
    } else {
      status_string = deal.deal_status_title + "\nCampaign not started";
    }
  } else if (deal.archived != 1 && deal.closed == 1) {
    icon = deal.deal_status_icon;

    color = "#28F29E";

    status_string = deal.deal_status_title;
  } else if (deal.status == 2 && deal.archived != 1) {
    icon = "error";
    color = "#B24C63";
    status_string = "Failed to find owner";
  } else if (deal.archived == 1) {
    status_string = deal.deal_status_icon;

    color = "#B24C63";

    status_string = deal.deal_status_title;
  } else if (deal.status == 1) {
    status_string = deal.deal_status_icon;
    status_string = deal.deal_status_title;

    if (deal.sent_date) {
      status_string +=
        "\nMail Sent " + moment(deal.sent_date).format("MMMM Do");
    } else {
      status_string += "\nMail Sent";
    }
  }

  // if(deal.deal_status_title){
  //   status_string = deal.deal_status_title;
  //   icon = "insert-chart"
  // }

  if (type == "icon") {
    return icon;
  } else if (type == "color") {
    return color;
  }
  return status_string;
};

// export const getDealStatusIcon = (status_id) => {
//
//   var icon;
//
//   if(status_id == 1){
//     icon = "snooze";
//   }else if(status_id == 2){
//     icon = "contact_mail";
//   }else if(status_id == 3){
//     icon = "today";
//   }else if(status_id == 4){
//     icon = "money_off";
//   }else if(status_id == 5){
//     icon = "attach_money";
//   }else if(status_id == 6){
//     icon = "contact_phone";
//   }else if(status_id == 7){
//     icon = "mood";
//   }else if(status_id == 8){
//     icon = "mood_bad";
//   }else if(status_id == 9){
//     icon = "sentiment_dissatisfied";
//   }else if(status_id == 10){
//     icon = "not_interested";
//   }else if(status_id == 11){
//     icon = "domain_disabled";
//   }else if(status_id == 12){
//     icon = "phone_missed";
//   }else if(status_id == 13){
//     icon = "delete_outline";
//   }else{
//     icon = "";
//   }
//   return icon;
// }

export const textStyleFromContentful = (contentfulStyle) => {
  const textStyle = {};

  if (!contentfulStyle || !contentfulStyle.fields) {
    return textStyle;
  }

  if (contentfulStyle.fields.fontColor) {
    textStyle['color'] = contentfulStyle.fields.fontColor;
  }
  if (contentfulStyle.fields.backgroundColor) {
    textStyle['backgroundColor'] = contentfulStyle.fields.backgroundColor;
  }

  const lineStyleArray = [];
  if (contentfulStyle.fields.underline) {
    lineStyleArray.push('underline');
  }
  if (contentfulStyle.fields.lineThrough) {
    lineStyleArray.push('line-through');
  }
  if (lineStyleArray.length > 0) {
    textStyle['textDecorationLine'] = lineStyleArray.join(' ');
  }

  if (contentfulStyle.fields.fontWeight) {
    textStyle['fontWeight'] = contentfulStyle.fields.fontWeight;
  }
  if (contentfulStyle.fields.italic) {
    textStyle['fontStyle'] = 'italic';
  }
  if (contentfulStyle.fields.fontSize) {
    textStyle['fontSize'] = contentfulStyle.fields.fontSize;
  }
  if (contentfulStyle.fields.textAlign) {
    textStyle['textAlign'] = contentfulStyle.fields.textAlign;
  }

  return textStyle;
};

export const formatDateTimeToLocal = (dateTime) => {
  return moment.parseZone(dateTime).local().format('dddd, MMMM Do @ h:mma');
};

const checkIfTeamHasCard = ({props, onSuccess = ()=>{}}) =>{
  if(parseInt(props.card_info.has_card) === 0){

    props.toggleOnboarding(true);
    props.appRedirect({redirect: "goForward", payload:{add: "add-card"}})

  }else if(parseInt(props.card_info.bad_card) === 1){

    props.appRedirect({redirect: "goForward", payload:{add: "update-card"}});

  }else{
    onSuccess()
  }

}
