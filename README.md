# RSDD Docs

This website provides user-facing docs for the [Rust Decision Diagram Library (RSDD)](https://github.com/neuppl/rsdd). It's still quite a work-in-progress, so don't expect too much yet!

It's built with:

- [Docusaurus 2](https://docusaurus.io/)
- [Tailwind](https://tailwindcss.com/)
- [vis.js](https://visjs.org/)
- the WebAssembly build target of [RSDD]((https://github.com/neuppl/rsdd)), currently from [39aadfb](https://github.com/neuppl/rsdd/commit/39aadfb9a7394e25396144a52616bfdabf78ed74)

Some items on the roadmap:

- fleshing out most of the existing content on the site:
  - a nice homepage, with neat examples
  - fleshing out intro, intermediate, and advanced tutorials
  - documenting quirks, compilation targets, etc.
- developing more interactive demos and comparisons
- versioning documentation (which is doable with Docusaurus)

## Usage

### Development Setup

The workflow for this project is pretty similar to most Node projects; we've developed this with Node 18.

To serve the website in *development mode* locally:

```
$ npm install
$ npm start
```

However, note that this is *not* what gets built for the final deploy; Docusaurus instead does some SSR. You can locally test the build process like so:

```
$ npm run build
```

**Note**: this still isn't a perfect match for CD. For example, Actions runners have case-sensitive filesystems, but the default webpack resolve on macOS is case-insensitive - a huge source of bugs!

### Rebuilding wasm-rsdd

If you want to update `rsdd`, you need to build it from source.

```
$ git clone git@github.com:pmall-neu/rsdd.git
$ cd rsdd
$ cargo build
$ wasm-pack build
```

The last command will generate a `pkg` directory in `rsdd`. Copy the contents of that directory into the `static/rsdd` folder here!

More docs coming soon!

## Licensing and Attribution

This repository is MIT licensed.
