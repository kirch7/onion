function loadWebAssembly(filename, imports = {}) {
  return fetch(filename)
        .then(response => response.arrayBuffer())
        .then(buffer => WebAssembly.compile(buffer))
        .then(module => {
            imports.env = imports.env || {}
            Object.assign(imports.env, {
                memoryBase: 0,
                tableBase: 0,
                memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
                table: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' })
            });
            return new WebAssembly.Instance(module, imports);
        });
}

document.write('<div id="input_div"></div>');
document.write('<div id="time"></div>');
document.write('<div id="output"></div>');

input_div.innerHTML += '<input name="layers" type="number" maxlenghth="7" id="layers" class="number" value="0" autofocus></input>'
input_div.innerHTML += '<button onclick="run()">Run</button>';


function run() {
    loadWebAssembly('./onion.wasm').then(instance => {
	const { onion } = instance.exports;
	const layers = document.getElementById("layers").value;
	const beg = performance.now();
	const result = onion(layers);
	const end = performance.now();
	
	time.innerHTML = 'Processed in ';
	time.innerHTML += '<strong>' + `${end - beg} ms` + '</strong>';
	time.innerHTML += '<br/><br/>';
	
        output.innerHTML = `onion(${layers}) \t = ${result}`;
        output.innerHTML += `<br/>`;
    });
}
