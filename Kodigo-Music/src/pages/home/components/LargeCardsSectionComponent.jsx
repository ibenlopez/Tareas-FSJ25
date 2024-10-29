import React, { useEffect, useState } from 'react'
import '../../../assets/css/components/LargeCardsSectionComponent.css'
function LargeCardsSectionComponent({ dataSection }) {
  const [showAll, setShowAll] = useState(false);
  const [cardsPerRow, setCardsPerRow] = useState(1); // Tarjetas visibles por fila

  // Función para calcular cuántas tarjetas caben según el ancho de pantalla
  const calculateCardsPerRow = () => {

    const container = document.querySelector('.content-app');
    const aside = document.querySelector('aside');
    const cardsContainer = document.querySelectorAll('.large-cards-container');
    let containerWidth = container.offsetWidth - aside.offsetWidth;
    if (window.innerWidth <= 970) {
      containerWidth = container.offsetWidth;
    }
    cardsContainer.forEach((c) => {
      c.style.width = `${containerWidth - 32}px`;
    });
    const card = document.querySelector('.card-container');
    const cardWidth = card.offsetWidth + 50;
    const newCardsPerRow = Math.floor(containerWidth / cardWidth);

    setCardsPerRow(newCardsPerRow || 1); // Aseguramos al menos 1 tarjeta por fila

  };


  // Ejecutamos la función cuando el componente se monta y al cambiar el tamaño de la ventana
  useEffect(() => {
    const cardsContainer = document.querySelectorAll('.large-cards-container');

    if (cardsContainer.length > 0) {
      calculateCardsPerRow();
      //observer.disconnect(); // Detener el observador una vez que se encuentra el contenedor
    }
    // const observer = new MutationObserver(() => {

    // });
    // observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('resize', calculateCardsPerRow); // Escuchar cambios de tamaño

    return () => window.removeEventListener('resize', calculateCardsPerRow);
  }, []);


  const toggleShowAll = () => {

  };

  return (
    <>
      {
        <div className="large-cards-container" >
          <section className="header-cards-container">
            {/* Validamos que el header exista */}
            <h2 className="header-cards">{dataSection.header || "Sin título"}</h2>

            {/* Botón para mostrar/ocultar tarjetas */}

            {
              dataSection.cards.length > cardsPerRow ?
                <button className="toggle-button-large-cards" onClick={toggleShowAll}>
                  {showAll ? 'Mostrar menos' : 'Mostrar todo'}
                </button> : <></>
            }
          </section>

          {/* Validamos que `cards` exista y sea un array */}
          <div className="cards-container">
            {Array.isArray(dataSection.cards) &&
              dataSection.cards
                // Mostrar solo la primera fila (ejemplo: 4 tarjetas) si no está expandido
                .slice(0, showAll ? dataSection.cards.length : cardsPerRow).map((card) => (
                  <section className="card-container" key={card.id}>
                    <div className="image-container">
                      <img
                        src={card.workArt}
                        alt={card.workArtDescription || "Imagen"}
                        className="card-image"
                      />
                      <button
                        title="Reproducir"
                        className="play-button"
                      >
                        <span className="material-symbols-outlined">play_arrow</span>
                      </button>
                    </div>

                    {/* Información adicional */}
                    <p>{card.eyeBrown || ""}</p>
                    <h4>{card.title || "Sin título"}</h4>
                    <span>{card.subTitle || "Sin subtítulo"}</span>
                  </section>
                ))}
          </div>
        </div>
      }
    </>
  );
}

export default LargeCardsSectionComponent;