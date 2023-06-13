---
sidebar_position: 5
---

# Model Counting

Perform (weighted) model counting over finite fields.

## Code

A walkthrough is coming soon!

```rust title="src/main.rs"
fn model_count_sdd(cnf: &Cnf) -> f64 {
    let dtree = DTree::from_cnf(cnf, &VarOrder::linear_order(cnf.num_vars()));
    let vtree = VTree::from_dtree(&dtree).unwrap();

    let man = CompressionSddManager::new(vtree);
    let sdd = man.from_cnf(cnf);

     let mut params = WmcParams::new(RealSemiring::zero(), RealSemiring::one());

    for v in 0..man.get_vtree_manager().num_vars() + 1 {
        params.set_weight(
            VarLabel::new_usize(v),
            RealSemiring::zero(),
            RealSemiring::one(),
        )
    }

    let model_count = sdd.wmc(man.get_vtree_manager(), &params);
    model_count.0
}
```

```bash
$ cargo run -- example.cnf
model count: 1
```
