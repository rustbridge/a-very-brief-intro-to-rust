---
name: intro
description: the first half of the day intro
---

![ferris](/ferris.png)
# a very brief intro to rust
<!-- .slide: class="center" -->

---

## links

- link: look in the top right!
- github: https://github.com/RustBridge/a-very-brief-intro-to-rust

### PRs and issues welcome!

made by the RustBridge team and originally by @ag_dubs, who are, at best, advanced beginners in Rust
---

### This guide is an intro to Rust syntax. It doesn't touch on concepts at all.

### Concepts are more important, but sometimes you need a little boost to get to a point where the concepts make sense.

### This is that boost.

---

## install rust

The best way to install Rust is with [rustup](https://www.rustup.rs/). rustup is a Rust
version manager. To install it type:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

To keep your rust up-to-date with the latest stable version of rust,
type:

```
rustup update
```

To check which version of Rust you have type:

```
rustc --version
```

---

## setting up a project

There are many ways to setup a project in Rust, but this is the simplest.

1. Create a repository on Github
2. Clone the repository
3. `cd` into the repository directory
4. Type `cargo new`

This will create several files and folders for you automatically:

- `Cargo.toml`: metadata about your project and its dependencies

- `.gitignore`: ignores compiled files built by Rust

- `src/main.rs`: where your Rust code goes

???

## setting up a project

#### `lib.rs` vs `main.rs`

There are 2 main types of projects you can make in Rust: a library and an 
application (a binary).

If you are writing a <strong>library</strong>, it means you intend for your
code to be used in someone else's application as a crate or module.
If you want to do this, you should use a `lib.rs`.

If you are writing a <strong>not library</strong>, it means that you'd like
to write code that compiles into a binary that someone can run. If you
want to do this, you need to use a `main.rs`. Inside the `main.rs` you
should have a `main` function that looks like this:

```rust
fn main() {
  // your app code goes here
}
```
---

## cargo

Cargo is a tool that helps you use Rust. It does several things:

- Runs tasks: `cargo build` (compile your app), `cargo test` (test your app), `cargo run` (run your app)

- Start a project: `cargo new`, `cargo init`

Cargo is also the package manager for Rust. This means that you can
use Cargo to install and manage bits of other people's code, which is what we call dependencies.

- A package in Rust is called a Crate.

- You can find Crates on https://crates.io

- You list the Crates you want to use in the `Cargo.toml` file

- Your app keeps track of what crates you are using in the `Cargo.lock` file

---

## storing values

To get started using Rust you'll probably want to assign values so that
you can use them. To do this in Rust:

```
let name = "ashley";
let age = 30;
```

If you want to make a constant, you must specify a type:

```
const FAVENUM: u32 = 6;
```
---

## types

There are a lot of types, but just to get you started:

- `u32`: unsigned 32-bit integer

- `i32`: signed 32-bit integer

- `String` and/or `&str`: more on these below

- `bool`: a boolean

---

## dealing with strings

Strings in Rust are a lot more complicated than you might be used to if
you are coming from another language, in particular, interpreted languages
like Ruby or JavaScript. Here's some key points:

#### `&str` and `String`
- "my string" is not a `String`. It's a `str`. the difference between a `String` and a
  `str` is how they are allocated. Don't worry about that right now.

- Pretty much always use `str` with an `&`, as `&str`.

- You can turn a `&str` into a `String` by using `to_string()` or `String::from()`. You want
  to do this because `String` has a ton of awesome convenience methods.

---

## macros

Macros are an interesting part of Rust. You know something is a macro if its name has
a `!`. Macros are a piece of code that generates another piece of code.

- `println!` is the equivalent of `console.log` or `puts`. It prints printable things
  to standard output, which is usually just the console.

```rust
println!("i get printed on the screen");
println!("hello {}!", "world");
```

- `format!` is also a macro. It's most commonly used to template strings.

```rust
format!("my dogs are named: {} and {}", "mateo", "lu");
```

- `panic!` you can use this to end your program with a message.

```rust
panic!("aaaaaaaaaa");
```
---

## function signatures

```rust
pub fn say_hello(name: &str) -> String {
  let message = format!("hello, {}!", name);
  message
}
```

- put `pub` at the beginning if you want the function to be accessible outside the file
  as in a module or crate

- the keyword `fn` is how we know it is a function

- list parameters inside the parentheses in the style `parameter_name: Type`, separate by commas

- use the `->` to say what type the function returns

- return a value by omitting the semicolon (implicit return)

---

## `match` syntax

Rust has pattern matching and it's great!

```rust
match animal {
  "cat" => "Meow",
  "dog" => "Woof",
  _ => "<indecipherable>", // trailing comma!
}
```

- `_` is used as a catch-all for anything that doesn't match

- `match` supports trailing commas, and it's best practice to use them :)

---

## the `Option` type

Rust doesn't have `nil`/`null` so if you want to express that something might return
something or nothing, you need to use the `Option` type.

To write the `Option` type, write the word `Option`, followed by angle brackets with
a Type inside, e.g. `Option<u32>`.

For example, if a parameter is optional you'd write:

```rust
fn greeting(name: Option<&str>) -> String {
  let who = match name {
    Some(n) => n,
    None => "World",
  };
  format!("Hello, {}!", who)
}

greeting(Some("ashley"));
// "Hello, ashley!"

greeting(None);
// "Hello, World!"
```
---

## testing

Rust has unit testing built in! You can write tests in their own file or right
inline with your code.

To designate a test write `#[test]` above a code block with asserts:

```rust
fn say_hello(name: Option<&str>) -> String {
  let who = match name {
    Some(n) => n,
    None => "World",
  };
  format!("Hello, {}!", who)
}

#[test]
fn it_should_say_hello() {
  assert_eq!(say_hello(None), "Hello, World!".to_string());
  assert_eq!(say_hello(Some("World")), "Hello, World!".to_string());
  assert_eq!(say_hello(Some("ashley")), "Hello, ashley!".to_string());
}
```
---

# structs

A struct is a way to create a collection of values and behavior. You might be
used to calling these objects (or classes).

```rust
pub struct Dog {
    name: String,
    age: u32,
}

let Mateo = Dog {
    name: "Mateo".to_string(),
    age: 4,
}
```

---

# structs: impl blocks

```rust
impl Dog {
    pub fn new(name: &str, age: i32) -> Self {
        Self { name: name.to_string, age }
    }

    pub fn say_hi(&self) -> String {
        format!(
            "Hi! My name is {} and I'm {} years old. Woof!",
            self.name,
            self.age
        )
    }
}

let mateo = Dog::new("Mateo", 4);
let message = mateo.say_hi();
println!("{message}");
// "Hi! My name is Mateo and I'm 4 years old. Woof!"
```

---

# enums

Enums are "sets" of things that conceptually represent a single thing. We have
already used an enum... the `Option` type!

```rust
pub enum DogSize {
    Large,
    Small,
}

impl DogSize {
    pub fn food_portion(&self) -> String {
        match self {
            DogSize::Large => "1 scoop".to_string(),
            DogSize::Small => "1/2 scoop".to_string(),
        }
    }
}
```
---

# putting it all together

Update our `Dog` struct to include a `size` attribute and update our `say_hi` 
method to include `"Please feed me <amount>"`, where `amount` is based on the
dog's size.

---

## the `Result` type

`Result` is kind of like `Option` except instead of something or nothing, you
expect something that is Ok/successful (`Ok()`) or an Not Ok/an error (`Err()`).

To write the `Result` type, write the word `Result`, followed by angle brackets with
a Type and an Error Type inside, e.g. `Result<String, MyError>`.

For example:

```rust
fn check_portion(&self, amount: u32) -> Result<(), MyError> {
    let expected = self.food_portion();
    if amount == expected {
        Ok(())
    } else {
        Err(MyError)
    }
}
```

---

## error handling in Rust: `thiserror` and `anyhow`

- `thiserror`: i care about my errors. let me make my own easily 

- `anyhow`: i don't care about my errors as much, chuck them all together


---

# `thiserror`

- add `thiserror` as a library: `cargo add thiserror`

- import it into your project using `use`

```rust
use thiserror::Error;

#[derive(Debug, Error)]
enum DogError {
    #[error("incorrect food amount")]
    IncorrectFoodAmount,
}
```

---

# using our custom error

```rust
impl DogSize {
    fn check_portion(&self, amount: u32) -> Result<String, DogError> {
        let expected = self.food_portion();
        if amount == expected {
            Ok("Perfect".to_string())
        } else {
            Err(DogError::IncorrectFoodAmount)
        }
    }
}
```

---

# add more info to our error

```rust
#[derive(Debug, Error)]
enum DogError {
    #[error("incorrect food amount. expected: {expected:?} given: {given:?}")]
    IncorrectFoodAmount { expected: u32, given: u32 },
}
```

```rust
if amount == expected {
    Ok("Perfect".to_string())
} else {
    Err(DogError::IncorrectFoodAmount { expected, given: amount})
}
```

---

# the `?` operator

If a function returns an `Option` or a `Result` you can use the `?` operator
to "bubble" up any `None` or `Error` if they happen, but otherwise proceed
normally. This is different from `unwrap` because it won't panic immediately.

Here, `check_portion` returns a `Result` and so does the containing function
`feed`.

```rust
pub fn feed(&self, amount: u32) -> Result<(), DogError> {
    let msg = self.size.check_portion(amount)?;
    println!("{msg}");
    Ok(())
}
```

---

# handle the error!

To handle the error, we can match on our result and print the error. Note that
we use `eprintln!`.

Many libraries will include functionality that allow you to return a `Result`
from you main function and will do this for you.

```
match dog.feed(1) {
    Ok(_) => println!("A fed dog is a happy dog."),
    Err(e) => eprintln!("{}", e.to_string()),
}
```

---

## good resources

- The Rust Docs, https://doc.rust-lang.org/

- The Rust Book, https://doc.rust-lang.org/book/

- The Rust Play Ground, https://play.rust-lang.org/

- Rustlings, https://rustlings.cool

- Rust by Example, http://rustbyexample.com/

- Rust on exercism.io, http://exercism.io/languages/rust

---

![ferris](/ferris.png)

# go forth and write some Rust!
<!-- .slide: class="center" -->
