import Italy from "../../assets/Italy.jpg";
import Greece from "../../assets/Greece.jpg";
import Ireland from "../../assets/Ireland.jpg";
import Dubai from "../../assets/Dubai.jpg";
import France from "../../assets/France.jpg";
import Spain from "../../assets/Spain.jpg";

const initialState = [
  {
    id: 1,
    title: "ROMA",
    price: "A partire da 299€",
    imageSrc: Italy,
  },
  {
    id: 2,
    title: "VENEZIA",
    price: "A partire da 399€",
    imageSrc: Greece,
  },
  {
    id: 3,
    title: "FIRENZE",
    price: "A partire da 449€",
    imageSrc: Ireland,
  },
  {
    id: 4,
    title: "AMALFI",
    price: "A partire da 789€",
    imageSrc: Dubai,
  },
  {
    id: 5,
    title: "CINQUE TERRE",
    price: "A partire da 219€",
    imageSrc: France,
  },
  {
    id: 6,
    title: "TAORMINA",
    price: "A partire da 329€",
    imageSrc: Spain,
  },
];

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TOUR":
      const { id, title, price } = action.payload;
      return state.map((tour) => (tour.id === id ? { ...tour, title, price } : tour));
    default:
      return state;
  }
};

export default toursReducer;
