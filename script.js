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
    let respuestas = [];
    document.querySelectorAll('.pregunta').forEach((pregunta, index) => {
        let seleccionada = pregunta.querySelector('.selected');
        if (seleccionada) {
            respuestas.push({
                pregunta: index + 1,
                respuesta: seleccionada.dataset.respuesta
            });
        }
    });

    // Guardar en localStorage
    localStorage.setItem('respuestas', JSON.stringify(respuestas));
    alert('Respuestas guardadas correctamente.');
}