import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import SDDRightVersusLeftLinear from '../components/Demos/SDDRightVersusLeftLinear';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started with RSDD
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="(work-in-progress) homepage for the rsdd (Rust Decision Diagrams) library.">
      <HomepageHeader />
      <main>
        <div className='container mt-8'>
          <div className='max-w-prose'>
            <h2>What's RSDD?</h2>
            <p>Glad you asked! RSDD is a new knowledge compilation and decision diagram library. One of its standout features is being written in Rust: this provides compile-time memory safety guarantees without sacrificing the performance of low-level code.</p>
            <p>RSDD has some unique features, including:</p>
            <ul>
              <li>an SDD compiler that specializes for right-linear vtree fragments; we believe this makes RSDD the <a href="https://github.com/neuppl/are-we-sdd-yet">fastest SDD compiler</a></li>
              <li>support for various knowledge compilers: BDDs, SDDs, and Bayesian Networks</li>
              <li>utilities for operating on d-DNNFs, including model counting and marginal MAP</li>
              <li>an (in-progress) WebAssembly compilation target</li>
            </ul>
            <p>In addition, ambitious goals are on the roadmap, including:</p>
            <ul>
              <li>alternative compilation strategies that do not rely on strict canonicity</li>
              <li>garbage collection for internal data structures</li>
              <li>parallelism</li>
              <li>FFI bindings for other languages (ex Python, Julia, C)</li>
              <li>end-to-end documentation and examples (this website!)</li>
            </ul>
            <p>RSDD (and this website) is in early-stage active development; this website is incomplete, and the API is still subject to change. However, we'd love for you to use it! If you have further questions, contact <a href="https://www.khoury.northeastern.edu/home/sholtzen/">Steven Holtzen</a> at <a href="mailto:s.holtzen@northeastern.edu">s.holtzen@northeastern.edu</a>.</p>
            <hr />

            <h2>Demo: Comparing vtrees</h2>
            <p>
              One advantage of RSDD is its WebAssembly compilation target, made easy with Rust's WASM ecosystem. This means that you can run RSDD in the browser! Throughout the documentation for the library, we'll include interactive demos that showcase RSDD's features. Here is one example, which compares the succicntness of two SDDs for the same CNF, but with a different vtree.
            </p>
          </div>
          <SDDRightVersusLeftLinear />
        </div>
      </main>
    </Layout>
  );
}
