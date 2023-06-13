---
sidebar_position: 2
---

# Getting Started

There are various ways to use RSDD.

## RSDD as a Rust Crate

For users writing code in Rust, we recommend using RSDD as a crate.

### What you'll need

- [Rust](https://www.rust-lang.org/) installed locally

:::note

Need some help getting started with a Rust project? Try our [Basic Tutorial](category/tutorial-basics/)!

:::

### Using RSDD in an existing project

Add RSDD as a dependency in your `Cargo.toml`:

```toml title="Cargo.toml"
[dependencies]
rsdd = { git = "https://github.com/neuppl/rsdd" }
```

`rsdd` is now available as a top-level crate; access it with `extern crate rsdd`:

```rust title="src/main.rs"
extern crate rsdd;

use rsdd::repr::cnf::Cnf;
```

## Building RSDD from Source

:::note

This is not necessary to use the library; this is primarily targeted for developing the crate itself.

:::

RSDD follows the traditional Rust project setup.

```bash
$ git clone https://github.com/neuppl/rsdd.git
$ cd rsdd
$ cargo test
```

## Advanced: Using RSDD in JavaScript

RSDD has a WASM compilation target, which means that it can be run in the browser. In addition, our use of [wasm-pack](https://rustwasm.github.io/wasm-pack/) automatically generates TypeScript declarations for the WASM entrypoints.

More documentation on how exactly to do this is coming soon!
