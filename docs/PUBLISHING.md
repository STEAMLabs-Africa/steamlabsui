# Publishing to npm and bun

**Goal:** anyone can run `npm install steamlabsui` or `bun add steamlabsui`.

Bun installs from the npm registry, so **one publish to npm serves both**. There's nothing separate to do for bun.

## The name

The package is **`steamlabsui`**: unscoped, the same as the repo, and free on npm when checked on 2026-10-11 (`npm view steamlabsui` returned 404). An unscoped name needs no npm organisation. (`stemalabui`, as typed in the request, is also free, but it reads as a typo, so it isn't used.)

The earlier name `@steamlabs/ui` would need an `@steamlabs` npm organisation first. If you'd rather have it, create the org and change `name` in `package.json`; nothing else changes.

## Decisions to make first

| Decision | Recommendation | Why |
|---|---|---|
| Licence | **MIT**, or keep `UNLICENSED` | The package and repo are public. `UNLICENSED` means nobody outside STEAMLabs may legally reuse it; MIT lets partners and schools use it. Your own apps can use it either way. |
| Who owns the npm account | A shared STEAMLabs Africa account with two-factor auth, plus a second maintainer | So publishing doesn't depend on one person's login. |
| First version | **1.0.0** (already set) | The API is settled; later changes follow semver. |

## One-time setup (you)

1. Create the npm account at npmjs.com/signup (for example `steamlabsafrica`) and turn on two-factor authentication.
2. Merge the pull request that adds the library, so `main` has version 1.0.0.

## First publish (manual, from your computer)

```sh
git clone https://github.com/STEAMLabs-Africa/steamlabsui && cd steamlabsui
bun install
bun run check                 # typecheck, build, 60+ tests
npm login                     # the STEAMLabs npm account
npm publish --dry-run         # lists the files that will ship; check it's only dist/, README, CHANGELOG
npm publish --access public   # or: bun publish --access public
git tag v1.0.0 && git push origin v1.0.0
```

`prepublishOnly` runs `bun run check` again, so a broken build can't be published. Pushing the `v1.0.0` tag also runs the release workflow, which sees 1.0.0 is already on npm and skips it.

## Check it worked

```sh
mkdir try-npm && cd try-npm && npm init -y && npm install steamlabsui react react-dom
node -e "import('steamlabsui/tokens').then(t => console.log(t.brand.clover.hex))"   # prints #3E9E49
cd .. && mkdir try-bun && cd try-bun && bun init -y && bun add steamlabsui
```

The package page will be at npmjs.com/package/steamlabsui.

## Every release after that (automatic)

`.github/workflows/release.yml` publishes when a version tag is pushed. It uses npm **trusted publishing**, so no npm token is stored in GitHub, and it adds a provenance badge on npm.

One-time: on npmjs.com, open the package's **Settings → Trusted publishing**, choose GitHub Actions, and enter organisation `STEAMLabs-Africa`, repository `steamlabsui`, workflow `release.yml`.

Then each release is:

```sh
# move "Unreleased" notes in CHANGELOG.md under the new version, then:
npm version minor            # or patch / major; updates package.json and makes the tag
git push origin main --follow-tags
```

The workflow checks the tag matches `package.json`, runs `bun run check`, and publishes.

| Change | Version bump |
|---|---|
| Bug fix, style fix | patch (1.0.1) |
| New component or new prop | minor (1.1.0) |
| Renamed or removed prop, class or token | major (2.0.0) |

## Using it in the apps

```sh
npm install steamlabsui      # website, steam-forms, African-educators, steamlabslms
bun add steamlabsui          # SLAP
```

```tsx
import "steamlabsui/styles.css";
import { Button, Field, Input } from "steamlabsui";
```

Move each app across one component at a time, starting with the ones every app duplicates (Button, Field, Card, Badge, Dialog, Toast), and delete the app's copy once its pages use the library. SLAP needs the most restyling because it uses the slate and indigo palette today.

## Docs site

`bun run docs` builds the docs into `docs-dist/index.html`, one self-contained file. Host it on GitHub Pages (Settings → Pages → GitHub Actions) or keep sharing the Claude artifact link.
