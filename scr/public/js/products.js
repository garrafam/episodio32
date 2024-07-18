

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el `carritoId` de una variable global inyectada por el servidor
    const carritoId = window.cid;

    console.log('Carrito ID:', carritoId); // Muestra el valor de 'carritoId'

    if (!carritoId) {
        alert('No se encontró el ID del carrito.');
        return;
    }

    try {

        // Usa carritoId para obtener la información del carrito
        fetch(`/api/cart/${carritoId}`)
            .then(response => response.json())
            .then(data => {
                // Maneja la respuesta del servidor
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching cart:', error);
            });
    } catch (error) {
        console.error('Error decoding token:', error);
        alert('Token inválido.');
    }
    
    // Usa carritoId para obtener la información del carrito


    document.querySelectorAll('.ingresoacarrito').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            
            fetch(`/api/carts/${carritoId}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.log('car',carritoId)
                    alert('Producto agregado al carrito!');
                } else {
                    alert('Error al agregar el producto al carrito.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al agregar el producto al carrito.123');
            });
        });
    });
});