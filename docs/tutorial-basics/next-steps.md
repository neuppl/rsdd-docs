---
sidebar_position: 7
---

# Next Steps

Congrats! But, there's much more to do!

(the rest of this section is coming soon)

## Final Code

```rust title="src/main.rs"
extern crate rsdd;

use std::{env, fs};

use rsdd::{
    builder::{bdd_builder::BddManager, cache::lru_app::BddApplyTable, sdd_builder::{CompressionSddManager, SddBuilder}},
    repr::{cnf::Cnf, robdd::{BddPtr, DDNNFPtr}, vtree::VTree, var_label::VarLabel, var_order::{VarOrder}, wmc::WmcParams, dtree::DTree}, util::semiring::{RealSemiring, Semiring},
};

fn compile_as_bdd(cnf: &Cnf) {
    let man = BddManager::<BddApplyTable<BddPtr>>::new_default_order_lru(cnf.num_vars());
    let bdd = man.from_cnf(cnf);

    println!("{:?}", bdd)
}

fn compile_as_sdd(cnf: &Cnf) {
    let order: Vec<VarLabel> = (0..cnf.num_vars())
        .map(|x| VarLabel::new(x as u64))
        .collect();

    let rl_vtree = VTree::right_linear(&order);
    let ll_vtree = VTree::left_linear(&order);

    compile_as_sdd_with_vtree(cnf, rl_vtree);
    compile_as_sdd_with_vtree(cnf, ll_vtree);
}

fn compile_as_sdd_with_vtree(cnf: &Cnf, vtree: VTree) {
    let man = CompressionSddManager::new(vtree);
    let sdd = man.from_cnf(cnf);

    println!("# nodes: {}", sdd.num_child_nodes())
}

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

    compile_as_bdd(&cnf);
    compile_as_sdd(&cnf);

    println!("model count: {}", model_count_sdd(&cnf))
}

```
