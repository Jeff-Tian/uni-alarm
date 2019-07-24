# uni-alarm

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[![Git commit with emojis!](https://img.shields.io/badge/gitmoji-git%20commit%20with%20emojis!-brightgreen.svg)](https://gitmoji.js.org)

Demo of react component development with typescript using nwb.

[build-badge]: https://img.shields.io/travis/jeff-tian/uni-alarm/master.png?style=flat-square
[build]: https://travis-ci.org/jeff-tian/uni-alarm

[npm-badge]: https://img.shields.io/npm/v/uni-alarm.png?style=flat-square
[npm]: https://www.npmjs.org/package/uni-alarm

[coveralls-badge]: https://img.shields.io/coveralls/jeff-tian/uni-alarm/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/jeff-tian/uni-alarm

## `npm run` Scripts

`package.json` is configured with `"scripts"` we can use with `npm run` while developing the project.

Command | Description |
--- | ---
`npm start` | start a development server for the demo app
`npm test` | run tests
`npm run test:coverage` | run tests and produce a code coverage report in `coverage/`
`npm run test:watch` | start a test server and re-run tests on every change
`npm run build` | prepare for publishing to npm
`npm run clean` | delete built resources


The initial project is set up so you can successfully run each of these commands and get some meaningful output, albeit for a component which does nothing more than render a welcome message.

## Running the Demo App

The project skeleton includes a demo app in `demo/src/index.tsx`.

Running `npm start` will start a development server for the demo app. Every time you make a change to the demo app or the component, it will refresh the current compilation status.

## Testing

nwb provides a default testing setup which uses Karma to run tests written with Mocha and Expect in the headless PhantomJS browser.

> The [Testing documentation](/docs/Testing.md) provides an in-depth overview of what nwb's default testing setup provides (and how to configure things to your liking if you want to), but we'll stick to editing the initial test provided in the React component project skeleton, in `tests/index-test.js`.

`npm run test:watch` automatically re-runs tests on every change to provide a quick feedback loop while developing, whether you're writing tests up-front, in parallel with implementation or after the fact.

If you're into Test Driven Development, it will give you the flow you want as you write breaking tests followed by implementations which satisfy them.

The following example tests were implemented after the `LoadingButton` component was written, adding one `it()` block at a time and tweaking each test based on feedback from re-runs - for example, I wasn't sure how a `disabled={true}` prop would be represented in the resulting HTML, so I used `.toContain('')` to see what would happen.

> **Note 1:** Testing against static HTML output is a brittle way to assert what your components are returning from their `render()` methods, but it's handy for our demonstration purposes.

> **Note 2:** We're importing the [expect](https://github.com/mjackson/expect/) library below, but it's not included in `package.json` - nwb handles the expect dependency for you so you can get started with testing without having to make a decision. Other assertion and spy libraries are available :)

```js
import expect from 'expect'
import React from 'react'
import {renderToStaticMarkup as render} from 'react-dom/server'

import LoadingButton from 'src/'

describe('LoadingButton', () => {
  it('renders a button with type="button"', () => {
    expect(render(<LoadingButton>Test</LoadingButton>))
      .toContain('<button type="button">Test</button>')
  })
  it('disables the button when loading=true', () => {
    expect(render(<LoadingButton loading>Test</LoadingButton>))
      .toContain('<button disabled="" type="button">Test</button>')
  })
  it('disables the button when loading=true even if disabled=false', () => {
    expect(render(<LoadingButton disabled={false} loading>Test</LoadingButton>))
      .toContain('<button disabled="" type="button">Test</button>')
  })
  it('passes other props through', () => {
    expect(render(<LoadingButton className="test">Test</LoadingButton>))
      .toContain('<button type="button" class="test">Test</button>')
  })
})
```

### Code Coverage Reporting

Once your tests are working, you can generate a code coverage report by running `npm run test:coverage`:

![](resources/react-component-test-coverage.png)

Code coverage percentages on their own are fairly meaningless, but running coverage also produces an HTML report in `coverage/html/` showing coverage statistics for each file and annotating your code to show which pieces were and weren't touched during a test run.

![](resources/react-component-test-coverage-html.png)

This HTML report is handy for finding out what your tests *aren't* covering, and deciding which uncovered areas you'd feel more comfortable having some tests for.

### Continuous Integration (CI) Testing

If you use [GitHub](https://github.com/) for your project's source code hosting, it's pre-configured for running tests on [Travis CI](https://travis-ci.org/) and posting code coverage results to [coveralls](https://coveralls.io/) and [codecov.io](https://codecov.io/) after successful test runs.

If you log in to Travis CI and enable it for your GitHub project, your tests will be run on every subsequent commit and automatically run against Pull Requests.

## Building and Publishing

nwb provides a default setup which keeps your source code repository free from distracting built resources (which can also be confusing for potential contributors) and makes your code usable as part of a standard Node.js development setup, by module bundlers and directly in the browser via `<script>` tag.

### Preparing for Publishing

`npm run build` will prepare the component for publishing, creating:

- A CommonJS build in `lib/`
- An ES modules build in `es/` (enabled by default / without configuration)
- UMD development and production builds in `umd/` (if configuration is provided)

The CommonJS build preserves CommonJS interop using the [`add-module-exports`](https://github.com/59naga/babel-plugin-add-module-exports) plugin, to avoid people using your npm packages via CommonJS `require()` having to tag a `.default` onto every `require()` call.

Any `propTypes` declared by class components or stateless function components will be wrapped with an `if (process.env.NODE_ENV !== 'production')` environment check by default, so they'll be automatically stripped from the production build of apps which use them.

By default nwb will also create a production build of the demo React app in `demo/dist/`, ready for deployment to wherever you want to host the demo (e.g. [Surge](http://surge.sh/) for simple deployment, [GitHub Pages](https://pages.github.com/) for more involved deployment tied in with source control). The demo is configured so it can be served from any directory, so you shouldn't need to configure anything no matter where you're hosting it.

![](resources/react-component-build.png)

`.gitignore` is configured to ignore these build directories to avoid/prevent checking built resources into source control, since npm acts as the canonical source for published, versioned builds and [unpkg](https://unpkg.com) makes it easy to provide access to the UMD build.

For example, if you were to publish this example project to npm as `react-loading-button`, the latest version of its UMD build would be available from `https://unpkg.com/react-loading-button/umd/react-loading-button.js` without having to configure anything.

### Publishing to npm

Once you've built your project, it's ready for publishing to npm using whatever your preferred process for doing that is, with the simplest being manually running `publish`:

```
npm publish
```

`package.json` is pre configured with a [`"files"` whitelist](https://docs.npmjs.com/files/package.json#files) which will only include `lib/`, `es/` and `umd/` directories in the npm package, in addition to the usual npm metadata like `package.json` and `README.md`.

## Libraries

We've demonstrated using nwb to develop and publish a single reusable React component, but the same tooling also applies to developing component libraries (such as [React Bootstrap](http://react-bootstrap.github.io/)) and other React libraries (such as [React Router](https://github.com/reactjs/react-router)).

The main difference with libraries is that the entry point (`src/index.js` by default when using nwb) usually imports and re-exports everything the library provides, for users performing top-level imports or using the UMD build.

To make this easier, nwb uses the Babel `stage-1` preset by default when building `react-component` projects, which allows you to use [export extensions](http://babeljs.io/docs/plugins/transform-export-extensions/) to import and re-export modules using a single `export` statement.

For example, this is a snippet of how [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap) re-exports its components using export extensions:

```js
export Accordion from './Accordion'
export Alert from './Alert'
export Badge from './Badge'
export Breadcrumb from './Breadcrumb'
export BreadcrumbItem from './BreadcrumbItem'
```

## Build Configuration

### Config File

You can use [npm build configuration](/docs/Configuration.md#npm-build-configuration) in `nwb.config.js` to tweak your project's build.

#### UMD Externals

The React component build uses [`npm.umd.externals` config](/docs/Configuration.md#externals-object) to make UMD builds use React via a global `React` variable rather than bundling it.

If you have other dependencies users will need to make available globally to use your UMD build, you will need to add suitable configuration for them.

e.g. if your component uses React Router, you'll also need to map the 'react-router' import to the global variable exported by React Router's own UMD build:

```js
module.exports = {
  npm: {
    umd: {
      global: 'ReactSomeComponent',
      externals: {
        'react': 'React',
        'react-router': 'ReactRouter'
      }
    }
  }
}
```

### Feature Toggles

Pass flags when running the build to toggle certain features off.

> Add feature toggle flags to the `"build"` script in `package.json` if you always want to use them.
>
> You can also pass flags to the `npm run build` command if you just want to try them out.
>
> You need to pass a `--` argument to indicate all additional arguments should be passed to the command itself, for example:
>
> ```sh
> npm run build -- --no-demo
> ```

#### `--copy-files`

Enables copying of any non-JavaScript files present in `src/` when transpiling to `lib/` and `es/` during a build.

This is a quick (and dirty - please [create an issue](https://github.com/insin/nwb/issues/new) if there are better ways nwb could help you distribute CSS) hack if you're publishing components which import CSS co-located in `src/` and expect users to have Webpack configured to handle this.

> **Note:** This feature is [implemented by Babel](https://babeljs.io/docs/usage/cli/#babel-copy-files), If you disable both CommonJS and ES Module builds, Babel won't be called and nothing will be copied.

> **Note:** The default `package.json` [`"files"` config](https://docs.npmjs.com/files/package.json#files) for a `react-component` project will also publish a top-level `css/` directory to npm if present - consider using relative requires to this directory if you want to avoid publishing duplicated CSS in `lib/` and `es/`.

#### `--no-demo`

Disables building the demo app.

Use this if you want to develop against the demo app using nwb's development server, but have your own setup for demonstrating your module.

> If you don't need the demo app at all, you can delete `demo/`.

#### `--[keep-]proptypes`

Disables `propTypes` wrapping/stripping.

Use this if your module needs to use `propTypes` at runtime (e.g. for masking `props`), or you think its users might need them.
