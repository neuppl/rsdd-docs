---
sidebar_position: 3
---

# BDDs and Variable Orders

Learn how to use Binary Decision Diagrams and define a variable ordering.

## Concept: Knowledge Representations

Broadly, there are many different ways to represent and compile knowledge bases. RSDD supports different "backends" that enable you to choose the one best suited for your problem.

### Binary Decision Diagrams and Variable Ordering

We'll start with a traditional form: [Binary Decision Diagrams](https://en.wikipedia.org/wiki/Binary_decision_diagram) (BDDs). In particular, we will use **Reduced Order Binary Decision Diagrams** (ROBDDs), which come with a fixed order and canonicity property.

## Getting a `Cnf` Object

First, we'll convert the string input we've received into a strongly-typed internal CNF representation.


```rust title="src/main.rs"
extern crate rsdd;

use std::{env, fs};

use rsdd::repr::cnf::Cnf;

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

    let cnf = Cnf::from_file(cnf_input);
}

```

## Creating a `BddManager`

In RSDD, the behaviour for most knowledge representation is split into two pieces:

- a `Ptr` type, which holds a bonafide Rust pointer to data itself and provides immutable data properties
- a manager, which operates on pointers (mutably or immutably)

Let's create a new function that creates a `BddManager` (for operating on `BddPtr`s):

```rust title="src/main.rs"
use rsdd::{
    builder::{bdd_builder::BddManager, cache::lru_app::BddApplyTable},
    repr::{cnf::Cnf, robdd::BddPtr},
};

fn compile_as_bdd(cnf: &Cnf) {
    let man = BddManager::<BddApplyTable<BddPtr>>::new_default_order_lru(cnf.num_vars());
    let bdd = man.from_cnf(cnf);
    println!("{:?}", bdd)
}

```

:::note

This part of the API is unstable, and is likely to change very soon.

:::

To break down what's happening here,

- the base data structure we are operating on is a `BddPtr`. These work like pointers: each `BddPtr` points to a real, in-memory BDD.
- we are creating a `BddManager`. Currently, `BddManager` is generic over its "ApplyTable", which caches apply operations. We are using the "default" LRU cache.
- the `::new_default_order_lru()` constructor automatically picks a variable ordering for us, which is linear from left to right. You can also specify a specific variable ordering when using `::new()`.
- the `BddManager::from_cnf()` function generates a `BddPtr` from a CNF

Let's now call this function!


```rust title="src/main.rs"
fn main() {
  // ...

  let cnf = Cnf::from_file(cnf_input);
  compile_as_bdd(&cnf);
}
```

```bash
$ cargo run example.cnf
... something very long
```

Neat!

## Varying Variable Orders

This section is coming soon! It will have a nice interactive demo :)
