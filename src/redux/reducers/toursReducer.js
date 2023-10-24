import Matera from "../../assets/Matera.jpg";
import Lecce from "../../assets/Lecce.jpg";
import Bologna from "../../assets/Bologna.jpg";
import Orvieto from "../../assets/Orvieto.jpg";
import Siena from "../../assets/Siena.jpg";
import Assisi from "../../assets/Assisi.jpg";

const initialState = [
  {
    id: 300,
    city: "Matera",
    price: 299,
    price_per_child: 149,
    image: Matera,
    description:
      "Esplora Matera, una delle città più antiche del mondo, famosa per i suoi sassi e la sua storia millenaria.",
    duration: "3 giorni",
    images: [
      "https://images.pexels.com/photos/13803062/pexels-photo-13803062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.unsplash.com/photo-1596319682968-c8d4875a6f17?auto=format&fit=crop&q=80&w=1820&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1637779716473-5cdf52dd0bea?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    highlights: ["Visita ai Sassi di Matera", "Tour della Cattedrale di Matera", "Giro panoramico in bicicletta"],
    reviews: [
      { user: "Alice", rating: 5, comment: "Un viaggio indimenticabile a Matera!" },
      { user: "Bob", rating: 4, comment: "Matera è un vero gioiello nascosto." },
    ],
  },
  {
    id: 301,
    city: "Lecce",
    price: 399,
    price_per_child: 349,
    image: Lecce,
    description:
      "Scopri Lecce, la 'Firenze del Sud', con la sua straordinaria architettura barocca e il suo fascino storico.",
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
    reviews: [
      { user: "Eve", rating: 5, comment: "Lecce è una sorpresa meravigliosa." },
      { user: "Charlie", rating: 4, comment: "Il barocco di Lecce è spettacolare." },
    ],
  },
  {
    id: 302,
    city: "Bologna",
    price: 449,
    price_per_child: 399,
    image: Bologna,
    description: "Esplora Bologna, la città della gastronomia, con la sua cucina deliziosa e i suoi tesori storici.",
    duration: "3 giorni",
    images: [
      "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_headers/298939/2000x2000-0-70-6e494ab494de3c94c74c9160c068a62d.jpg",
      "https://plus.unsplash.com/premium_photo-1683140800115-bb76241765dc?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://cdn.pixabay.com/photo/2017/08/10/06/30/cooking-2619055_1280.jpg",
    ],
    highlights: ["Visita a Piazza Maggiore", "Tour delle Due Torri", "Lezioni di cucina bolognese"],
    reviews: [
      { user: "David", rating: 5, comment: "Bologna è un paradiso per il cibo." },
      { user: "Fiona", rating: 4, comment: "Mi sono innamorata delle torri di Bologna." },
    ],
  },
  {
    id: 303,
    city: "Orvieto",
    price: 789,
    price_per_child: 725,
    image: Orvieto,
    description:
      "Visita Orvieto, una città collinare con una cattedrale straordinaria e un affascinante sistema di gallerie sotterranee.",
    duration: "2 giorni",
    images: [
      "https://cdn.pixabay.com/photo/2014/04/21/11/50/orvieto-329073_1280.jpg",
      "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/157000/157342-Umbria.jpg",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    highlights: ["Visita alla Cattedrale di Orvieto", "Tour delle gallerie sotterranee", "Degustazione di vini locali"],
    reviews: [
      { user: "Grace", rating: 5, comment: "Orvieto è affascinante, in particolare le gallerie sotterranee." },
      { user: "Henry", rating: 4, comment: "La vista dalla cattedrale è mozzafiato." },
    ],
  },
  {
    id: 304,
    city: "Siena",
    price: 219,
    price_per_child: 169,
    image: Siena,
    description: "Visita Siena, famosa per il suo Palio e il suo centro storico medievale.",
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
    reviews: [
      { user: "Ivy", rating: 4, comment: "Il Palio è un'esperienza unica." },
      { user: "John", rating: 5, comment: "Siena ha una bellezza senza tempo." },
    ],
  },
  {
    id: 305,
    city: "Assisi",
    price: 329,
    price_per_child: 280,
    image: Assisi,
    description:
      "Visita Assisi, luogo di pellegrinaggio importante con la Basilica di San Francesco e la sua atmosfera spirituale.",
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
    reviews: [
      { user: "Karen", rating: 5, comment: "Assisi è un luogo di pace e riflessione." },
      { user: "Liam", rating: 4, comment: "La basilica è straordinaria." },
    ],
  },
];

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_OFFER":
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
