
document.addEventListener('DOMContentLoaded', function() {
    // Obtén el parámetro 'cid' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const carritoId = urlParams.get('cid');
    console.log('URLSearchParams:', window.location.search); // Verificar los parámetros de la URL
            console.log('CID:', carritoId); // Mostrar el valor de '
    if (!carritoId) {
        alert('No se encontró el ID del carrito en la URL.');
        return;
    }
    
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