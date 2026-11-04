import { describe, expect, test } from "bun:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SignInButton } from "../src";

describe("SignInButton", () => {
  test("is a real link to the app's sign-in route, named for STEAMLabs ID", () => {
    const html = renderToStaticMarkup(<SignInButton />);
    expect(html).toStartWith("<a ");
    expect(html).toContain('href="/auth/signin"');
    expect(html).toContain("Sign in with STEAMLabs ID");
    expect(html).toContain("sla-sign-in-button sla-sign-in-button--light");
  });

  test("the logo is decoration: the words are the accessible name", () => {
    const html = renderToStaticMarkup(<SignInButton />);
    expect(html).toContain('class="sla-sign-in-button__mark" aria-hidden="true"');
    expect(html).not.toContain('aria-label="STEAMLabs Africa"');
  });

  test("dark uses the white logo on Clover Green; light the full-colour one", () => {
    expect(renderToStaticMarkup(<SignInButton variant="dark" />)).toContain("sla-sign-in-button--dark");
    expect(renderToStaticMarkup(<SignInButton variant="dark" />)).toContain("sla-logo-white");
    expect(renderToStaticMarkup(<SignInButton />)).toContain("sla-logo-full-color");
  });

  test("href, label and block", () => {
    const html = renderToStaticMarkup(<SignInButton href="/login?return_to=%2Fpay" label="Continue with STEAMLabs ID" block />);
    expect(html).toContain('href="/login?return_to=%2Fpay"');
    expect(html).toContain("Continue with STEAMLabs ID");
    expect(html).toContain("sla-sign-in-button--block");
  });

  test("asChild styles the app's own link", () => {
    const html = renderToStaticMarkup(
      <SignInButton asChild>
        <a href="/x">Mine</a>
      </SignInButton>,
    );
    expect(html).toContain('<a href="/x" class="sla-sign-in-button sla-sign-in-button--light">Mine</a>');
  });
});
