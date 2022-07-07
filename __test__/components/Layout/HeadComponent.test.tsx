import React from "react";
import { render } from "@testing-library/react";

import { HeadComponent } from "../../../components/Layout/HeadComponent";
import { defaultMeta, withMeta } from "../../fixtures";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Test HeadComponent", () => {
  test("should render default values in header and metadata", () => {
    render(<HeadComponent />, {
      container: document.head,
    });
    expect(document.title).toBe(defaultMeta.title);
    expect(
      document
        .querySelector("meta[name=description]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.description);
    expect(
      document
        .querySelector("meta[name=robots]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe("follow, index");
    expect(
      document
        .querySelector("meta[name=og-url]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(`${defaultMeta.deployedPage}/${defaultMeta.slug}`);
    expect(
      document
        .querySelector("meta[name=og-type]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.ogType);
    expect(
      document
        .querySelector("meta[name=site_name]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.siteName);

    expect(
      document
        .querySelector("meta[name=og-description]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.description);

    expect(
      document
        .querySelector("meta[name=og-title]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.title);
    expect(
      document
        .querySelector("meta[name=og-image]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe("");

    expect(
      document
        .querySelector("meta[aria-label=twitter-card]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.twitterCard);
    expect(
      document
        .querySelector("meta[aria-label=twitter-site]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.twitterUser);
    expect(
      document
        .querySelector("meta[aria-label=twitter-site]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.twitterUser);
    expect(
      document
        .querySelector("meta[aria-label=twitter-title]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.title);
    expect(
      document
        .querySelector("meta[aria-label=twitter-image]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.image);
    expect(
      document
        .querySelector("meta[aria-label=twitter-description]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(defaultMeta.description);
    expect(
      document
        .querySelector("meta[aria-label=twitter-date]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBeTruthy();

    // faltan links
  });
  test("should render meta values in header and metadata", () => {
    render(<HeadComponent metadata={withMeta} />, {
      container: document.head,
    });
    expect(document.title).toBe(withMeta.title);
    expect(
      document
        .querySelector("meta[name=description]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.description);
    expect(
      document
        .querySelector("meta[name=robots]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe("follow, index");
    expect(
      document
        .querySelector("meta[name=og-url]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(`${withMeta.deployedPage}/${withMeta.slug}`);
    expect(
      document
        .querySelector("meta[name=og-type]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.ogType);
    expect(
      document
        .querySelector("meta[name=site_name]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.siteName);

    expect(
      document
        .querySelector("meta[name=og-description]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.description);

    expect(
      document
        .querySelector("meta[name=og-title]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.title);
    expect(
      document
        .querySelector("meta[name=og-image]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe("");

    expect(
      document
        .querySelector("meta[aria-label=twitter-card]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.twitterCard);
    expect(
      document
        .querySelector("meta[aria-label=twitter-site]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.twitterUser);
    expect(
      document
        .querySelector("meta[aria-label=twitter-site]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.twitterUser);
    expect(
      document
        .querySelector("meta[aria-label=twitter-title]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.title);
    expect(
      document
        .querySelector("meta[aria-label=twitter-image]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.image);
    expect(
      document
        .querySelector("meta[aria-label=twitter-description]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBe(withMeta.description);
    expect(
      document
        .querySelector("meta[aria-label=twitter-date]")
        ?.attributes.getNamedItem("content")?.value,
    ).toBeTruthy();

    // faltan links
  });
});
