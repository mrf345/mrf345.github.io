<p align='center'>
    <a href='https://github.com/mrf345/mrf345.github.io/actions' target='_blank' style='margin-right: 2%'>
        <img alt='Actions Status' src='https://github.com/mrf345/mrf345.github.io/workflows/Build/badge.svg' />
    </a>
    <a href='https://coveralls.io/github/mrf345/mrf345.github.io?branch=testing'>
        <img src='https://coveralls.io/repos/github/mrf345/mrf345.github.io/badge.svg?branch=testing' alt='Coverage Status' />
    </a>
    <a href="https://standardjs.com">
        <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide">
    </a>
</p>

#### My portfolio and resume
- The Website UI is built to be customizable and configurable. Just update `./src/config.json` with your github details and info.
- The resume template is partially customizable by `./src/config.json`, but manual changes to `./cv/cv_source.md` might still be needed.

##### Built with:
- `React`
- `Redux`
- `Redux-Saga`
- `React-Redux`
- `React-Bootstrap`
- `React-Router`
- `React-FontAwesome`
- `React-Scroll`
- `whatwg-fetch`
- `Create-React-App`
- `SASS`
- `mdpdf`


##### TODO:
- [ ] Add more test coverage
- [ ] Make resume template fully customizable by `config.json`
- [x] Add route not found container
- [x] Add containers wrapper for a loading overlay component
- [x] Add global error handler
- [x] Add initial containers test coverage
- [x] Add generating and building resume template script
- [x] Add state management for `Github API V3` calls with `Redux-Saga`
- [x] Add initial configuration and customization with `JSON` file
