const socket=io()
socket.on('connect', () => {
    console.log('Conectado al servidor Socket.IO');
    socket.emit('getProducts'); // Solicitar la lista de productos cuando se conecte
});
// Manejar evento productListUpdate
socket.on('productListUpdate', (productos) => {
    actualizarListaProductos(productos);
    console.log('hola son',productos)
    
});
function actualizarListaProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');   
    listaProductos.innerHTML = '';
    
    productos.forEach((producto) => {
        const li = document.createElement('li');
        li.textContent = `${producto._id} - ${producto.title}- ${producto.price}- ${producto.description}- ${producto.code}- ${producto.stock}- ${producto.status} `;
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
    
})
.catch(error => {
    console.error('Error:', error);
});

    // Limpiar el formulario después de enviar los datos
    formularioProducto.reset();
});
const formularioActualizacionProducto = document.getElementById('formulario-actualizacion-producto');
formularioActualizacionProducto.addEventListener('submit', (event) => {
  

    const pid = document.getElementById('pid').value;
    const title = document.getElementById('title_act').value; 
    const description = document.getElementById('description_act').value;
    const price = document.getElementById('price_act').value;
    const thumbnail = document.getElementById('thumbnail_act').value;
    const status = document.getElementById('status_act').value;
    const code = document.getElementById('code_act').value;
    const stock = document.getElementById('stock_act').value; 

    
    const updatedData = {
        title,
        description,
        price,
        thumbnail,
        status,
        code,
        stock
    };

    // Eliminar los campos vacíos del objeto updatedData
    for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key) && !updatedData[key]) {
            delete updatedData[key];
        }
    }

    // Enviar datos al servidor utilizando una solicitud PUT
    fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar producto');
        }
        return response.json();
    })
    .then(data => {
        
        socket.emit('getProducts')
              
    })
    .catch(error => {
        console.error('Error:', error);
    });
    formularioActualizacionProducto.reset();
    
});


const formularioEliminacionProductos = document.getElementById('formulario-eliminacion-producto');
formularioEliminacionProductos.addEventListener('submit', (event) => {
    
    
    const pid = document.getElementById('pcid').value;
    console.log(pid)
    fetch(`/api/products/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })

    .then(productoEliminado => {
        if (!productoEliminado) {
            throw new Error('Producto no encontrado o ya eliminado.');
        }
        console.log('Producto eliminado:', productoEliminado);
        socket.emit('getProducts')
        formularioEliminacionProductos.reset();
    })
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
        
    });

   

    
})
