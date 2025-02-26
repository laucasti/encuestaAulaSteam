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
    let respuestas = JSON.parse(localStorage.getItem('respuestas')) || [];
    let todasRespondidas = true; // Verificar si todas las preguntas tienen respuesta

    document.querySelectorAll('.pregunta').forEach((pregunta, index) => {
        let seleccionada = pregunta.querySelector('.selected');
        if (seleccionada) {
            respuestas.push({
                pregunta: index + 1,
                respuesta: seleccionada.dataset.respuesta
            });
        } else {
            todasRespondidas = false;
        }
    });

    if (!todasRespondidas) {
        Swal.fire({
            icon: 'warning',
            title: 'Faltan respuestas',
            text: 'Por favor responde todas las preguntas antes de enviar.',
            confirmButtonColor: '#6c757d'
        });
        return;
    }

    localStorage.setItem('respuestas', JSON.stringify(respuestas));

    Swal.fire({
        icon: 'success',
        title: 'Respuestas guardadas',
        text: '¡Gracias por completar la encuesta!',
        confirmButtonColor: '#6c757d'
    });
}
