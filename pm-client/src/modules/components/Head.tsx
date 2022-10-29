import * as React from 'react';
import { useLocation } from 'react-router-dom';

// #major-version-switch
const HOST = 'https://raspbaby.ddns.net';

interface HeadProps {
  card?: string;
  children?: React.ReactNode;
  description: string;
  disableAlternateLocale?: boolean;
  largeCard?: boolean;
  title: string;
  type?: string;
}

export default function Head (props: HeadProps) {

  const {
    card = '/static/social-previews/default-preview.jpg',
    children,
    description = ('strapline'),
    disableAlternateLocale = false,
    largeCard = true,
    title = ('headTitle'),
    type = 'website',
  } = props;
  const router = useLocation();

  const preview = card.startsWith('http') ? card : `${HOST}${card}`;

  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />
      {/* https://twitter.com/MUI_hq */}
      <meta name="twitter:site" content="@MUI_hq" />
      {/* #major-version-switch */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={preview} />
      {/* Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      {/* #major-version-switch */}
      <meta property="og:url" content={`${HOST}${router.pathname}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={preview} />
      <meta property="og:ttl" content="604800" />
      {/* #major-version-switch */}
      <meta name="docsearch:version" content="master" />
      {children}
    </head>
  );
}