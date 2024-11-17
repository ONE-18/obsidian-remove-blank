const { Plugin, Notice } = require('obsidian');

class RemoveBlanksPlugin extends Plugin {
    async onload() {
        // Registrar el comando
        this.addCommand({
            id: 'borrar-blanks',
            name: 'Borrar blanks',
            editorCallback: (editor) => {
                try {
                    // Obtener el contenido actual del editor
                    const content = editor.getValue();
                    
                    // Dividir el contenido en líneas
                    const lines = content.split('\n');
                    
                    // Filtrar líneas vacías (considerando espacios y tabulaciones)
                    const nonEmptyLines = lines.filter(line => {
                        // Eliminar espacios en blanco al inicio y final
                        const trimmedLine = line.trim();
                        // Mantener la línea si no está vacía
                        return trimmedLine.length > 0;
                    });
                    
                    // Unir las líneas no vacías
                    const newContent = nonEmptyLines.join('\n');
                    
                    // Reemplazar el contenido del editor
                    editor.setValue(newContent);
                    
                    // Calcular cuántas líneas se eliminaron
                    const removedLines = lines.length - nonEmptyLines.length;
                    
                    // Mostrar notificación de éxito
                    new Notice(`Se eliminaron ${removedLines} líneas vacías`);
                } catch (error) {
                    // Mostrar notificación de error
                    new Notice('Error al procesar el archivo: ' + error.message);
                    console.error('Error en Remove Blanks Plugin:', error);
                }
            }
        });
    }

    onunload() {
        // Cleanup cuando el plugin se desactiva
    }
}

module.exports = RemoveBlanksPlugin;