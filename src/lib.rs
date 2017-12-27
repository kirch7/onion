#[no_mangle]
pub extern "C" fn onion(layers: usize) -> usize {
    match layers {
        0 => 1,
        l => 6 * l + onion(l - 1),
    }
}
