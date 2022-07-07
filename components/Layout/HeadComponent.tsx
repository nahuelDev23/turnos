import Head from "next/head";
import { FC } from "react";

import { IMetadata } from "../../interface";

interface Props {
  metadata?: IMetadata;
}

export const HeadComponent: FC<Props> = ({ metadata }) => {
  const SEO = {
    title: metadata?.title || "Default title",
    description: metadata?.description || "Description",
    slug: metadata?.slug || "",
    // image: `https://website-carlosazaustre.vercel.app${metadata.image || '/assets/default-image.png'}`,
    date: metadata?.date || new Date().toISOString(),
    deployedPage: metadata?.deployedPage || "www.miweb.com",
    siteName: metadata?.siteName || "NahuelDev23",
    image: metadata?.image || "",
    twitterUser: metadata?.twitterUser || "@nahueldev23",
  };

  return (
    <Head>
      <meta content="follow, index" name="robots" />
      <title>{SEO.title}</title>
      <meta content={SEO.description} name="description" />
      <meta
        content={`${SEO.deployedPage}/${SEO.slug}`}
        name="og-url"
        property="og:url"
      />
      <meta content="website" name="og-type" property="og:type" />
      <meta
        content={`${SEO.siteName}`}
        name="site_name"
        property="og:site_name"
      />
      <meta
        content={SEO.description}
        name="og-description"
        property="og:description"
      />
      <meta content={SEO.title} name="og-title" property="og:title" />
      <meta content={SEO.image} name="og-image" property="og:image" />
      <meta
        aria-label="twitter-card"
        content="summary_large_image"
        name="twitter:card"
      />
      <meta
        aria-label="twitter-site"
        content={`${SEO.twitterUser}`}
        name="twitter:site"
      />
      <meta
        aria-label="twitter-title"
        content={SEO.title}
        name="twitter:title"
      />
      <meta
        aria-label="twitter-description"
        content={SEO.description}
        name="twitter:description"
      />
      <meta
        aria-label="twitter-image"
        content={SEO.image}
        name="twitter:image"
      />
      <meta
        aria-label="twitter-date"
        content={SEO.date}
        property="article:published_time"
      />
      <link href={`${SEO.siteName}/${SEO.slug}`} rel="canonical" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
  );
};
