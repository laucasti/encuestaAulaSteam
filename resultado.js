function descargarResultados() {
    // Recuperar todas las respuestas almacenadas
    let respuestas = JSON.parse(localStorage.getItem('respuestas')) || [];
    let resultados = {};

    // Contar las respuestas por pregunta y tipo
    respuestas.forEach(respuesta => {
        if (!resultados[respuesta.pregunta]) {
            // Inicializar el contador para la pregunta si no existe
            resultados[respuesta.pregunta] = { buena: 0, regular: 0, mala: 0 };
        }
        // Incrementar el contador según la respuesta
        resultados[respuesta.pregunta][respuesta.respuesta]++;
    });

    // Crear la hoja de cálculo
    let ws_data = [["Pregunta", "Buena", "Regular", "Mala"]];
    Object.keys(resultados).forEach(pregunta => {
        ws_data.push([
            `Pregunta ${pregunta}`,
            resultados[pregunta].buena,
            resultados[pregunta].regular,
            resultados[pregunta].mala
        ]);
    });

    // Crear el archivo Excel
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // Descargar el archivo
    let fecha = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    XLSX.writeFile(wb, `resultados_encuesta_${fecha}.xlsx`);
}