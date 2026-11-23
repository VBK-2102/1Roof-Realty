import React, { useEffect } from 'react';
import { VERIFIED_BUSINESS } from '../../data/verifiedBusiness';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = '1Roof Realty India (One Roof Realty LLP, AAK-3190) — Institutional-grade real estate consulting across Mumbai and Central India. Residential, commercial, and property registration.',
  canonical,
  type = 'website',
  image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  schema
}) => {
  useEffect(() => {
    // Set document title
    const formattedTitle = title.includes('1Roof Realty') 
      ? title 
      : `${title} | 1Roof Realty India`;
    document.title = formattedTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Default Organization / RealEstateAgent Schema
    const baseSchema = schema || {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': VERIFIED_BUSINESS.legalName,
      'alternateName': VERIFIED_BUSINESS.brandName,
      'description': description,
      'url': window.location.origin,
      'telephone': VERIFIED_BUSINESS.contacts.primaryPhone,
      'email': VERIFIED_BUSINESS.contacts.email,
      'foundingDate': '2017-08-16',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': VERIFIED_BUSINESS.offices[0].addressLine1,
        'addressLocality': 'Mulund East, Mumbai',
        'addressRegion': 'Maharashtra',
        'postalCode': '400081',
        'addressCountry': 'IN'
      }
    };

    // Inject JSON-LD
    const scriptId = 'json-ld-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(baseSchema);

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [title, description, canonical, type, image, schema]);

  return null;
};
