import Matera from "../../assets/Matera.jpg";
import Lecce from "../../assets/Lecce.jpg";
import Bologna from "../../assets/Bologna.jpg";
import Orvieto from "../../assets/Orvieto.jpg";
import Siena from "../../assets/Siena.jpg";
import Assisi from "../../assets/Assisi.jpg";

const initialState = [
  {
    id: 300,
    destination: "Matera",
    region: "Basilicata",
    tax: 10,
    price: 299,
    offer: "tour",
    price_per_child: 149,
    image: Matera,
    description:
      "Matera è una città unica e affascinante, con una storia millenaria e una caratteristica distintiva: i suoi 'sassi'. I sassi di Matera sono un complesso di antiche abitazioni scavate nella roccia, che conferiscono a questa città un'atmosfera unica e un aspetto senza tempo.",
    duration: "3 giorni",
    images: [
      "https://images.pexels.com/photos/13803062/pexels-photo-13803062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1596319682968-c8d4875a6f17?auto=format&fit=crop&q=80&w=1820&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1637779716473-5cdf52dd0bea?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    highlights: ["Visita ai Sassi di Matera", "Tour della Cattedrale di Matera", "Giro panoramico in bicicletta"],
    highlights_description: [
      "Esplora le affascinanti abitazioni scavate nella roccia che rendono Matera un luogo unico al mondo.",
      "Scopri l'importanza storica e culturale di questo magnifico edificio.",
      "Ammira i panorami spettacolari della città e dei dintorni durante un'escursione in bicicletta.",
    ],
    reviews: [
      { user: "Alice", rating: 5, comment: "Un viaggio indimenticabile a Matera!" },
      { user: "Bob", rating: 4, comment: "Matera è un vero gioiello nascosto." },
    ],
  },
  {
    id: 301,
    destination: "Lecce",
    region: "Puglia",
    tax: 8,
    price: 399,
    offer: "tour",
    price_per_child: 349,
    image: Lecce,
    description:
      "Lecce è una città straordinaria, famosa per la sua architettura barocca, che offre un'esperienza unica nel cuore del sud Italia. Questo viaggio di 4 giorni ti permetterà di esplorare il centro storico di Lecce, ammirare il suo incredibile patrimonio architettonico e assaporare la cucina salentina.",
    duration: "4 giorni",
    images: [
      "https://content.skyscnr.com/m/5aded11f644e81ae/original/GettyImages-121977418.jpg?crop=1224px:647px&quality=100&position=attention",
      "https://images.placesonline.com/photos/424010403211225_Lecce_229232398-min.jpeg?quality=95&w=800&scale=both",
      "https://www.bindidessert.it/wp-content/uploads/elementor/thumbs/0658_pasticciotto_crema_amarena_bassa-1-q0w09glpqfcc62ltoxwmtasnqahfa7egy6u0e1ck6o.jpg",
    ],
    highlights: [
      "Visita al Centro Storico di Lecce",
      "Tour dell'Anfiteatro Romano",
      "Degustazione di cucina salentina",
    ],
    highlights_description: [
      "Esplora il maestoso centro storico di Lecce e ammira l'architettura barocca.",
      "Scopri la storia romana di Lecce attraverso una visita all'antico anfiteatro.",
      "Assapora i piatti tipici della regione, tra cui il pasticciotto e altre specialità locali.",
    ],
    reviews: [
      { user: "Eve", rating: 5, comment: "Lecce è una sorpresa meravigliosa." },
      { user: "Charlie", rating: 4, comment: "Il barocco di Lecce è spettacolare." },
    ],
  },
  {
    id: 302,
    destination: "Bologna",
    region: "Emilia-Romagna",
    tax: 10,
    price: 449,
    offer: "tour",
    price_per_child: 399,
    image: Bologna,
    description:
      "Bologna è una città situata nella regione dell'Emilia-Romagna, Italia, ed è famosa per essere un paradiso culinario con la sua cucina deliziosa e i suoi tesori storici. Questo viaggio di 3 giorni ti darà l'opportunità di esplorare le delizie gastronomiche di Bologna, scoprire la sua ricca storia e imparare a cucinare alcune delle specialità locali.",
    duration: "3 giorni",
    images: [
      "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_headers/298939/2000x2000-0-70-6e494ab494de3c94c74c9160c068a62d.jpg",
      "https://plus.unsplash.com/premium_photo-1683140800115-bb76241765dc?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://cdn.pixabay.com/photo/2017/08/10/06/30/cooking-2619055_1280.jpg",
    ],
    highlights: ["Visita a Piazza Maggiore", "Tour delle Due Torri", "Lezioni di cucina bolognese"],
    highlights_description: [
      "Esplora il centro storico di Bologna e scopri la bellezza di Piazza Maggiore.",
      "Ammira le iconiche torri di Bologna e goditi una vista panoramica sulla città.",
      " Impara a cucinare piatti tradizionali dell'Emilia-Romagna e assapora la cucina locale.",
    ],
    reviews: [
      { user: "David", rating: 5, comment: "Bologna è un paradiso per il cibo." },
      { user: "Fiona", rating: 4, comment: "Mi sono innamorata delle torri di Bologna." },
    ],
  },
  {
    id: 303,
    destination: "Orvieto",
    region: "Umbria",
    tax: 11,
    price: 789,
    offer: "tour",
    price_per_child: 725,
    image: Orvieto,
    description:
      "Orvieto è una pittoresca destinazione situata nella regione dell'Umbria, nel cuore dell'Italia. Questa affascinante città collinare è celebre per la sua straordinaria cattedrale e il suo sistema di gallerie sotterranee che si estendono sotto le antiche strade. Un viaggio a Orvieto è un'esperienza indimenticabile, perfetta per esploratori culturali e amanti dell'arte.",
    duration: "2 giorni",
    images: [
      "https://cdn.pixabay.com/photo/2014/04/21/11/50/orvieto-329073_1280.jpg",
      "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/157000/157342-Umbria.jpg",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    highlights: ["Visita alla Cattedrale di Orvieto", "Tour delle gallerie sotterranee", "Degustazione di vini locali"],
    highlights_description: [
      "Ammira l'architettura gotica e i mosaici all'interno di questa cattedrale straordinaria, tra le più belle d'Italia.",
      "Esplora il mondo segreto nascosto sotto le strade di Orvieto e scopri la sua storia sotterranea.",
      " Assapora i deliziosi vini umbri durante una degustazione guidata. Questa regione è rinomata per i suoi vini prelibati, e questa esperienza ti permetterà di gustarne alcuni dei migliori.",
    ],
    reviews: [
      { user: "Grace", rating: 5, comment: "Orvieto è affascinante, in particolare le gallerie sotterranee." },
      { user: "Henry", rating: 4, comment: "La vista dalla cattedrale è mozzafiato." },
    ],
  },
  {
    id: 304,
    destination: "Siena",
    region: "Toscana",
    tax: 10,
    price: 219,
    offer: "tour",
    price_per_child: 169,
    image: Siena,
    description:
      "Siena è una città incantevole situata nella regione della Toscana, Italia. Questa destinazione è famosa per il suo Palio, una celebre corsa di cavalli che si svolge nella spettacolare Piazza del Campo, nonché per il suo meraviglioso centro storico medievale. Un viaggio a Siena è un'immersione nella storia, nella cultura e nella bellezza architettonica.",
    duration: "2 giorni",
    images: [
      "https://cdn.pixabay.com/photo/2014/07/29/15/55/italy-404667_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/06/19/00/35/siena-2417791_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/08/19/20/43/races-1606177_1280.jpg",
    ],
    highlights: [
      "Visita a Piazza del Campo",
      "Tour della Cattedrale di Siena",
      "Partecipazione al Palio (se disponibile)",
    ],
    highlights_description: [
      "Ammira l'incantevole piazza medievale, cuore della vita sociale e culturale di Siena.",
      "Esplora questa straordinaria cattedrale gotica, ammirando i suoi tesori artistici e architettonici.",
      "Se il tuo viaggio coincide con la data del Palio, immergiti nell'atmosfera unica di questa corsa di cavalli.",
    ],
    reviews: [
      { user: "Ivy", rating: 4, comment: "Il Palio è un'esperienza unica." },
      { user: "John", rating: 5, comment: "Siena ha una bellezza senza tempo." },
    ],
  },
  {
    id: 305,
    destination: "Assisi",
    region: "Umbria",
    tax: 13,
    price: 329,
    offer: "tour",
    price_per_child: 280,
    image: Assisi,
    description:
      "Assisi è un luogo di grande importanza spirituale situato nella regione dell'Umbria, Italia. Questa affascinante destinazione è famosa per la Basilica di San Francesco e l'atmosfera di profonda spiritualità che circonda la città. Un viaggio di 3 giorni ad Assisi ti condurrà in un viaggio di pace interiore e contemplazione, permettendoti di esplorare luoghi significativi e di riflettere sulla spiritualità.",
    duration: "3 giorni",
    images: [
      "https://images.unsplash.com/photo-1607703617873-0294acaf1496?auto=format&fit=crop&q=80&w=1776&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591696733913-0fb44ba902d2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://cdn.pixabay.com/photo/2018/09/23/12/13/assisi-3697311_1280.jpg",
    ],
    highlights: [
      "Visita alla Basilica di San Francesco",
      "Tour del centro storico di Assisi",
      "Momenti di riflessione e spiritualità",
    ],
    highlights_description: [
      "Esplora questa straordinaria basilica e rifletti sulla spiritualità e l'eredità di San Francesco.",
      "Perditi tra le strade medievali e scopri il lato storico e culturale della città.",
      "Sperimenta la pace e la tranquillità di Assisi, ideali per la meditazione e la riflessione.",
    ],
    reviews: [
      { user: "Karen", rating: 5, comment: "Assisi è un luogo di pace e riflessione." },
      { user: "Liam", rating: 4, comment: "La basilica è straordinaria." },
    ],
  },
];

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TOUR":
      const updatedOffer = action.payload;
      const updatedStateOffer = state.map((tour) => {
        if (tour.id === updatedOffer.id) {
          return { ...tour, ...updatedOffer };
        }
        return tour;
      });
      return updatedStateOffer;
    case "ADD_REVIEW":
      const { tourId, user, rating, comment } = action.payload;
      const updatedStateReview = state.map((tour) => {
        if (tour.id === tourId) {
          return {
            ...tour,
            reviews: [...tour.reviews, { user, rating, comment }],
          };
        }
        return tour;
      });
      return updatedStateReview;
    default:
      return state;
  }
};

export default toursReducer;
