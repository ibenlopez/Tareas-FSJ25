import { useEffect, useState } from 'react';
import '../../assets/css/home.css'
import LargeCardsSectionCompone from './components/LargeCardsSectionComponent';
import { db } from '../../services/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ArtistCardsSectionComponent from './components/ArtistCardsSectionComponent';

function Home() {
  const [dataSections, setSections] = useState([]);

  useEffect(() => {
    const obtenerSections = async () => {
      const sectionsRaw = await getDocs(collection(db, "sections"));
      const sectionsList = sectionsRaw.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      for (const section of sectionsList) {
        const cards = await obtenerCards(section.id);
        section.cards = cards;
      }
      setSections(sectionsList);
    };

    const obtenerCards = async (idSection) => {
      const snapshot = await getDocs(collection(db, `sections/${idSection}/cards`));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    obtenerSections();  // Llama a la función al montar el componente
  }, []);

  return (
    <>
      <main>
        {
          dataSections.map((section, index) => (
            section.type == 'large-card' ? <LargeCardsSectionCompone dataSection={section} key={index} /> :
              section.type == 'artist-card' ? <ArtistCardsSectionComponent dataSection={section} key={index} /> : <></>
          ))
        }

      </main>
    </>
  )
}

export default Home;