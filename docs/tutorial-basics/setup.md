---
sidebar_position: 2
---

# Setup and Boilerplate

Setup the barebones Rust tooling to start a project with RSDD.

## Create a new Rust project

If you haven't already, please install [Rust](https://www.rust-lang.org/); we recommend using [Rustup](https://rustup.rs/).

Now, use Cargo to generate a new Rust project.

```bash
$ cargo new rsdd-tutorial
$ cd rsdd-tutorial
$ ls
Cargo.toml  src
```

If you run `cargo run` now, it will run the boilerplate code in `src/main.rs`.

```bash
$ cargo run
  Finished dev [unoptimized + debuginfo] target(s) in 0.05s
  Running `target/debug/rsdd-tutorial`
Hello, world!
```

## Install `rsdd` and `clap`

First, add `rsdd` to your `Cargo.toml`. Since it's currently not published on [crates.io](https://crates.io/), we'll use the git repository as the source.

```bash
$ cargo add rsdd --git https://github.com/neuppl/rsdd
```

This is all you need to use `rsdd`! We can re-compile the starter and run it:

```bash
$ cargo run
Hello, world!
```

:::note

This step might take a while if it's your first time using Rust, or if you haven't updated your index in a while. That's okay!

:::

## Reading in a CNF file

For the rest of the tutorial, we'll be operating on CNFs in the [DIMACS format](https://www.domagoj-babic.com/uploads/ResearchProjects/Spear/dimacs-cnf.pdf). Let's create a test file for us to work with:

```text title="example.cnf"
p cnf 6 3
1 2 3 4 0
-2 -3 4 5 0
-4 -5 6 6 0
```

Now, we'll update our hello world program to read in a file from standard input, and print it out.

```rust title="src/main.rs"
extern crate rsdd;

use std::{env, fs};

fn main() {
  let args: Vec<String> = env::args().collect();

  if args.is_empty() {
    panic!("No file provided");
  }

  let path = &args[1];

  let cnf_input = match fs::read_to_string(path) {
    Ok(s) => s,
    Err(err) => panic!("Error reading file: {}", err),
  };

  print!("{}", cnf_input);
}
```

```bash
$ cargo run example.cnf
p cnf 6 3
1 2 3 4 0
-2 -3 4 5 0
-4 -5 6 6 0
```

We're now ready to use `rsdd`!
