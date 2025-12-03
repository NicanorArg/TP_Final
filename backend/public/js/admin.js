// ==================== FUNCIONES GLOBALES ====================

// Cambiar estado de libro
async function cambiarEstadoProducto(id, activar) {
    const accion = activar ? 'activar' : 'desactivar';
    
    if (!confirm(`¿Está seguro que desea ${accion} este producto?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/productos/${id}/estado`, {
            method: 'PATCH'
        });
        
        if (response.ok) {
            alert(`Producto ${activar ? 'activado' : 'desactivado'} exitosamente`);
            location.reload();
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Error al cambiar el estado del producto');
        console.error(error);
    }
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modalConfirmar').style.display = 'none';
}

// Preview de imagen al seleccionar archivo
document.addEventListener('DOMContentLoaded', function() {
    const inputImagen = document.getElementById('imagen');
    if (inputImagen) {
        inputImagen.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    let preview = document.querySelector('.preview-image');
                    if (!preview) {
                        preview = document.createElement('div');
                        preview.className = 'preview-image';
                        inputImagen.parentElement.appendChild(preview);
                    }
                    preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

console.log('Admin JS cargado correctamente :)');