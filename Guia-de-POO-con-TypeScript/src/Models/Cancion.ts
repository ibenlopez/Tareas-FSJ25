export class Cancion {
    titulo: string;
    genero: string;
    private _autor: string;

    constructor(titulo: string, genero: string) {
        this.titulo = titulo;
        this.genero = genero;
        this._autor = '';
    }

    // Métodos get y set para el autor
    get autor(): string {
        return this._autor;
    }

    set autor(value: string) {
        this._autor = value;
    }

    // Método para mostrar los datos de la canción
    mostrarDatos(element: HTMLDivElement): void {
        element.innerHTML = `<span>Título: ${this.titulo.trim()}</span>
        <span>Género: ${this.genero}</span>
        <span>Autor: ${this.autor}</span>`;
    }
}