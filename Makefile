all: src/lib.rs Cargo.toml
	cargo build --release --target wasm32-unknown-unknown
	wasm-gc target/wasm32-unknown-unknown/release/onion.wasm onion.wasm
