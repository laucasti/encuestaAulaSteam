document.querySelectorAll('.carita').forEach(carita => {
    carita.addEventListener('click', function() {
        // Remover la selección de otras caritas en la misma pregunta
        document.querySelectorAll(`.carita[data-pregunta="${this.dataset.pregunta}"]`).forEach(c => {
            c.classList.remove('selected');
        });
        // Seleccionar la carita clickeada
        this.classList.add('selected');
    });
});

function guardarRespuestas() {
    // Recuperar respuestas existentes o inicializar un array vacío
    let respuestas = JSON.parse(localStorage.getItem('respuestas')) || [];

    // Recorrer cada pregunta y guardar la respuesta seleccionada
    document.querySelectorAll('.pregunta').forEach((pregunta, index) => {
        let seleccionada = pregunta.querySelector('.selected');
        if (seleccionada) {
            // Agregar la respuesta al array de respuestas
            respuestas.push({
                pregunta: index + 1, // Número de la pregunta (1, 2, 3)
                respuesta: seleccionada.dataset.respuesta // "buena", "regular", "mala"
            });
        }
    });

    // Guardar el array actualizado en localStorage
    localStorage.setItem('respuestas', JSON.stringify(respuestas));
    alert('Respuestas guardadas correctamente.');
}