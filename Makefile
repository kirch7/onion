all: src/lib.rs Cargo.toml
	cargo +nightly build --release --target wasm32-unknown-unknown
	wasm-gc target/wasm32-unknown-unknown/release/onion.wasm onion.wasm
