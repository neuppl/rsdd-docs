---
sidebar_position: 2
---

# Getting Started

There are various ways to use RSDD.

## RSDD as a Rust Crate

For users writing code in Rust, we recommend using RSDD as a crate.

### What you'll need

- [Rust](https://www.rust-lang.org/) installed locally

### Use RSDD in a new project

First, use `cargo init` to generate a Rust project skeleton:

```bash
$ cargo init
```

...



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

## Advanced: Using RSDD in JavaScript
