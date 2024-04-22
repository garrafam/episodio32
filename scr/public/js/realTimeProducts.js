
const socket=io()
socket.on('connect', () => {
    console.log('Conectado al servidor Socket.IO');
    socket.emit('getProducts'); // Solicitar la lista de productos cuando se conecte
});


// Manejar evento productListUpdate
socket.on('productListUpdate', (productos) => {
    actualizarListaProductos(productos);
    console.log(productos)
});
function actualizarListaProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');   
    listaProductos.innerHTML = '';
    
    productos.forEach((producto) => {
        const li = document.createElement('li');
        li.textContent = `${producto.id} - ${producto.title}- ${producto.price}- ${producto.description} `;
        listaProductos.appendChild(li);
    });
}
const formularioProducto = document.getElementById('formulario-producto');
formularioProducto.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma convencional

    const title = document.getElementById('title').value;    
    const description  = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const status = document.getElementById('status').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;

    // Enviar datos al servidor para agregar el producto
   // socket.emit('addProduct', { title, description, price, thumbnail, status, code, stock});
   fetch('/api/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, price, thumbnail, status, code, stock})
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error al agregar producto');
    }
    return response.json();
})
.then(data => {
    console.log('Producto agregado:', data);
    socket.emit('getProducts'); 
    // Puedes realizar acciones adicionales aquí, como actualizar la lista de productos
})
.catch(error => {
    console.error('Error:', error);
});

    // Limpiar el formulario después de enviar los datos
    formularioProducto.reset();
});
const formularioActualizacionProducto = document.getElementById('formulario-actualizacion-producto');
formularioActualizacionProducto.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma convencional

    const pid = document.getElementById('pid').value;
    const title = document.getElementById('title_act').value; 
    const description = document.getElementById('description_act').value;
    const price = document.getElementById('price_act').value;
    const thumbnail = document.getElementById('thumbnail_act').value;
    const status = document.getElementById('status_act').value;
    const code = document.getElementById('code_act').value;
    const stock = document.getElementById('stock_act').value; 

    // Enviar datos al servidor utilizando un formulario POST
    fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, price, thumbnail, status, code, stock})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar producto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto actualizado:', data);
        socket.emit('getProducts')
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Limpiar el formulario después de enviar los datos
    formularioActualizacionProducto.reset();
});


const formularioEliminacionProductos = document.getElementById('formulario-eliminacion-producto');
formularioEliminacionProductos.addEventListener('submit', (event) => {
    
    console.log(pcid)
    const pid = document.getElementById('pcid').value;

    fetch(`/api/products/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al borrar producto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto BORRADO:', data);
        socket.emit('getProducts')
        formularioEliminacionProductos.reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });


    
})
