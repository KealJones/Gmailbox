# Chrome Extension To Change Gmail into Inbox

Most of the heavy lifting was created and taken from: https://github.com/kallepersson/inboxtheme
Webpack boilerplate and structure for chrome extensions provided from: https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate

This extenstion is still in progress and will change alot until 1.0.0 release. It is useable in production but has much more to offer down the line, check the issues page to see features that are on the roadmap.

## Developing upon this extension or Trying before release
_I'll assume that you already read the [Webpack docs](https://webpack.github.io/docs) and the [Chrome Extension](https://developer.chrome.com/extensions/getstarted) docs._


1. Check if your Node.js version is >= 6.
2. Clone the repository.
3. Install [yarn](https://yarnpkg.com/lang/en/docs/install/).
4. Run `yarn`.
7. Run `npm run start`
8. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun.

## Contributing

1. **Please!! Do not create a pull request without an issue before discussing the problem.**
2. On your PR make sure that you are following the current codebase style.
3. Your PR must be single purpose. Resolve just one problem on your PR.
4. Make sure to commit in the same style that we are committing until now on the project / Run prettier: `prettier --config .prettierrc --write src/**/*`.
