import type { Schema, Attribute } from '@strapi/strapi';

export interface SectionsContentSection extends Schema.Component {
  collectionName: 'components_sections_content_sections';
  info: {
    displayName: 'Content Section';
    description: 'Structured content sections for articles';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText & Attribute.Required;
    media: Attribute.Media;
    layout: Attribute.Enumeration<
      [
        'standard',
        'wide',
        'full-width',
        'two-column',
        'media-left',
        'media-right',
        'media-center'
      ]
    > &
      Attribute.DefaultTo<'standard'>;
    backgroundColor: Attribute.String;
    anchor: Attribute.String;
    callToAction: Attribute.Component<'shared.call-to-action'>;
  };
}

export interface SharedCallToAction extends Schema.Component {
  collectionName: 'components_shared_call_to_actions';
  info: {
    displayName: 'Call to Action';
    description: 'Buttons and links for user engagement';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['primary', 'secondary', 'tertiary', 'link']> &
      Attribute.DefaultTo<'primary'>;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    icon: Attribute.String;
  };
}

export interface SharedReference extends Schema.Component {
  collectionName: 'components_shared_references';
  info: {
    displayName: 'Reference';
    description: 'Citations and sources for articles';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String;
    authors: Attribute.String;
    publisher: Attribute.String;
    publishDate: Attribute.Date;
    description: Attribute.Text;
    referenceType: Attribute.Enumeration<
      [
        'Website',
        'Book',
        'Journal',
        'Article',
        'Research Paper',
        'Video',
        'Podcast',
        'Interview',
        'Other'
      ]
    > &
      Attribute.DefaultTo<'Website'>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    description: 'Search Engine Optimization metadata';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaKeywords: Attribute.Text;
    metaRobots: Attribute.String & Attribute.DefaultTo<'index, follow'>;
    canonicalURL: Attribute.String;
    ogTitle: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogDescription: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    ogImage: Attribute.Media;
    twitterTitle: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    twitterDescription: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    twitterImage: Attribute.Media;
    twitterCardType: Attribute.Enumeration<
      ['summary', 'summary_large_image', 'app', 'player']
    > &
      Attribute.DefaultTo<'summary_large_image'>;
    structuredData: Attribute.JSON;
  };
}

export interface SharedSocialLink extends Schema.Component {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    description: 'Links to social media profiles';
  };
  attributes: {
    platform: Attribute.Enumeration<
      [
        'Twitter',
        'Facebook',
        'Instagram',
        'LinkedIn',
        'YouTube',
        'GitHub',
        'Website',
        'Medium',
        'TikTok',
        'Other'
      ]
    > &
      Attribute.Required;
    url: Attribute.String & Attribute.Required;
    username: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'sections.content-section': SectionsContentSection;
      'shared.call-to-action': SharedCallToAction;
      'shared.reference': SharedReference;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
