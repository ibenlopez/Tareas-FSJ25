export class CabeceraPagina {
    private titulo: string;
    private color: string;
    private fuente: string;
    public alineacion: string;

    constructor(titulo: string, color: string, fuente: string, alineacion: string) {
        this.titulo = titulo;
        this.color = color;
        this.fuente = fuente;
        this.alineacion = alineacion;
    }

    // Método 1: Obtener título, color y fuente
    public obtenerPropiedades(): { titulo: string, color: string, fuente: string} {
        return {
            titulo: this.titulo,
            color: this.color,
            fuente: this.fuente
        };
    }

    // Método 2: Definir cómo debe aparecer el título (centrado, derecha, izquierda)
    public definirAlineacion(alineacion: string): string {
        switch (alineacion) {
            case 'center':
                this.alineacion = 'Centrado';
                break;
            case 'right':
                this.alineacion = 'Derecha';
                break;
            default:
                this.alineacion = 'Izquierda';
                break;
        }
        return alineacion;
    }

    // Método 3: Imprimir todas las propiedades
    public imprimirPropiedades(element: HTMLDivElement): void {
        element.innerHTML = `<span>Título: ${this.titulo.trim()}</span>
        <span>Color: <div style="background-color: ${this.color}"></div>${this.color}</span>
        <span>Fuente: ${this.fuente}</span>
        <span>Alineación: ${this.alineacion}</span>`;
    }
}
