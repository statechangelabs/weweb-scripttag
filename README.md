# Weweb ScriptTag Embedder

## Adding To Weweb

1. Open Weweb
2. Click on the puzzle piece icon
3. Click "Plugins"
4. Click "NPM"
5. Search for `scripttag`
6. Click Plus - you're done! 
   
## Adding any Embed to your site
1. Create any element
2. Give it a class of "scripttag"
3. Go to custom attributes and give it a "scripttag-src" of your target URL
4. Watch it appear on your page!

## Useful Scripts

1. `yarn build` will build using typescript pre-configured to node-compatible defaults
2. `yarn docs` will auto-generate a README.md that starts with TOP.md, then adds CLI documentation (via [commanderdoc](https://npmjs.com/package/commanderdoc)) for any tool you have set up, and then library documentation after that.
3. `yarn test` is pre-configured to test for typescript errors
4. `yarn watch` will watch the codebase for changes and rebuild (using [livelink](https://npmjs.com/package/@raydeck/livelink))

## Git code protections

1. `git commit` will be blocked on the `main` branch unless you set the environment variable `ALLOWMAIN=1` Branch commits and PRs are thus encouraged
2. `git commit` also tests messages for meeting the commitline standard conventions.
3. `git commit` blocks pushes that do not pass `yarn test` (as a base case, they must pass typescript compilation)
4. `npm publish` will always rebuild the code, the documentation, and push those changes back to the repository.
5. `npm publish` will only publish the lib and src directories - any others are no

## A note on "main"

I made a deliberate choice to change the primary branch from `master` to `main` for reasons that are obvious to some. This repository endeavors to make that just automatic.

PRs and feedback welcome via GitHub issues.


<a name="__climd"></a>

# Usage
```bash
npx template [options]
```

<a name="_librarymd"></a>

template - v1.0.0

# template - v1.0.0
