---
name: CLI
description: Build a small CLI project
---

<!-- .slide: class="center middle" -->

# An introduction to Clap and CLIs

---

## What is a CLI?

- **C**ommand-**L**ine **I**nterface

- A CLI is anything that you run in the terminal/on the command line

- There's tons of libraries to use for this in Rust! A lot of them serve
  different purposes

---

## Types of CLI libraries

<div>

### Argument parsing

```sh
$ mycommand myarg -f 4 --bool # -> myarg: true, f: 4, bool: true
```

</div>
<!-- .element: class="fragment" -->

<div>

### Command generation

```sh
$ mycommand --help # Usage: mycommand <MYARG>
```

</div>
<!-- .element: class="fragment" -->

<div>

### Formatting 

for fancy colors, bold/italics/strikethrough text, etc

</div>
<!-- .element: class="fragment" -->

<div>

### Error handling 

important in any Rust project, but especially in CLIs!

</div>
<!-- .element: class="fragment" -->

<div>

Other things for any project - testing, distribution, etc

</div>
<!-- .element: class="fragment" -->

---

<img src="https://raw.githubusercontent.com/clap-rs/clap/master/assets/clap.png" width=150 />

# Enter Clap
<!-- .slide: class="center" -->

---

## What is Clap?

- One of the most popular CLI libraries for Rust

- Very flexible - it'll grow together with your CLI!

<div>

## Let's start using Clap!

- Create a new project using `cargo new`:

```sh
cargo new mycoolproject # or whatever name you prefer
```

</div>
<!-- .element: class="fragment spacer" -->

...but how do we use Clap?
<!-- .element: class="fragment" -->

<div>

- Rust has a file where you can declare _dependencies_
  - Similar to `package.json`, `mix.exs`, `project.clj`, etc

- Let's go to [crates.io](https://crates.io)!

</div>
<!-- .element: class="fragment" -->

---

```toml
# in Cargo.toml, add:
[dependencies]
clap = { version = "4.4.6", features = ["derive"] }
```

## or

```sh
# in the terminal, run:
$ cargo add clap --features derive
```
<!-- .slide: class="center" -->

---

## Using Clap

- Clap lets you model your CLI interface **as data!**, using Rust structs and enums

- The magic word(s) is `#[derive(Parser)]`

- Even doc-comments get converted to help text automagically!

```rust
use clap::Parser;

#[derive(Parser)]
struct Arguments {
  #[arg(long)]
  myflag: String,
}
```

```sh
$ mycommand --myflag <VALUE>
```

---

# Live coding time!

Review the steps: https://github.com/shadows-withal/my-cool-first-cli/
<!-- .slide: class="center" -->

