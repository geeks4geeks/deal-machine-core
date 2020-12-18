import { AppConfig } from 'app/NativeActions';

const contentful = require('contentful/dist/contentful.browser.min.js');

const client = contentful.createClient({
  space: AppConfig().contentful_space,
  accessToken: AppConfig().contentful_token
});

export const loadDashboardVideoTutorial = () => {
  return client.getEntries({
    content_type: 'dashboardTutorialVideo'
  });
};

export const loadDashboardSuccessSteps = () => {
  return client.getEntries({
    content_type: 'dashboardSuccessSteps'
  });
};

export const loadDashboardUpcomingWebinars = () => {
  return client.getEntries({
    content_type: 'dashboardWebinar',
    order: 'fields.startAt',
    'fields.startAt[gt]': new Date().toISOString(),
    limit: 3
  });
};

export const loadDashboardCaseStudies = () => {
  return client.getEntries({
    content_type: 'dashboardCaseStudy'
  });
};


export const loadPlanOnboardingInfo = (slug) => {
  return client.getEntries({
    content_type: 'onboardingPlanModule',
    'fields.slug[in]': slug,
    limit: 1,
  });
};
export const loadOnboardingText = (slug) => {
  return client.getEntries({
    content_type: 'onboardingText',
    'fields.slug[in]': slug,
    limit: 1,
  });
};


export const loadFeatureInfo = (slug) => {
  return client.getEntries({
    content_type: 'getFeatureSection',
    'fields.slug[in]': slug,
    limit: 1,
  });
};
