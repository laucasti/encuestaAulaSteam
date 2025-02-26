function descargarResultados() {
    let respuestas = JSON.parse(localStorage.getItem('respuestas')) || [];
    let resultados = {};

    // Contar respuestas
    respuestas.forEach(respuesta => {
        if (!resultados[respuesta.pregunta]) {
            resultados[respuesta.pregunta] = { buena: 0, regular: 0, mala: 0 };
        }
        resultados[respuesta.pregunta][respuesta.respuesta]++;
    });

    // Convertir a hoja de cálculo
    let ws_data = [["Pregunta", "Buena", "Regular", "Mala"]];
    Object.keys(resultados).forEach(pregunta => {
        ws_data.push([
            `Pregunta ${pregunta}`,
            resultados[pregunta].buena,
            resultados[pregunta].regular,
            resultados[pregunta].mala
        ]);
    });

    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // Descargar el archivo
    let fecha = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `resultados_encuesta_${fecha}.xlsx`);
}