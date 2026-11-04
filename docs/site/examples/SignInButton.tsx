import * as React from "react";
import { SignInButton } from "../../../src";
import type { Example } from "../types";

export const example: Example = {
  id: "sign-in-button",
  name: "SignInButton",
  category: "Actions",
  summary:
    "The one \"Sign in with STEAMLabs ID\" button every STEAMLabs app uses: a real link to the app's sign-in route (from @steamlabs-africa/id-check), which opens the STEAMLabs ID page as a full page.",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <SignInButton />
      <SignInButton variant="dark" />
    </div>
  ),
  code: `<SignInButton />
<SignInButton variant="dark" />`,
  props: [
    { name: "href", type: "string", default: '"/auth/signin"', description: "The app's own sign-in route." },
    { name: "variant", type: '"light" | "dark"', default: '"light"', description: "White with the full-colour logo, or Clover Green with the white logo." },
    { name: "block", type: "boolean", default: "false", description: "Full width of its container." },
    { name: "label", type: "string", default: '"Sign in with STEAMLabs ID"', description: "The words on the button." },
    { name: "asChild", type: "boolean", default: "false", description: "Style your own link element, such as a router link." },
  ],
};
