const initialState = [
  {
    id: 500,
    name: "Deluxe 5-Star Package",
    destination: "Amalfi",
    region: "Campania",
    type_offer: "deluxe",
    description:
      "Vivi un'esperienza di puro lusso sulla rinomata Costiera Amalfitana per 5 indimenticabili giorni. Il tuo soggiorno sarà all'interno di un raffinato hotel a 5 stelle, dove sarai coccolato con servizi impeccabili e comfort senza pari. Concediti una cena gastronomica preparata dai migliori chef, dove ogni piatto è un'opera d'arte culinaria. Inoltre, avrai l'opportunità di esplorare questa affascinante regione costiera in un tour privato su misura. Ammira i pittoreschi paesaggi costieri, scopri villaggi incantevoli e vivi l'autentico spirito della Costiera Amalfitana. Questa vacanza rappresenta il connubio perfetto tra relax, lusso e scoperta, creando ricordi indimenticabili lungo uno dei tratti di costa più belli al mondo.",
    price: 2000,
    price_per_child: 1500,
    duration: "5 giorni",
    includedServices: [
      "Soggiorno in hotel a 5 stelle con vista sul mare",
      "Cena gourmet in un ristorante stellato Michelin",
      "Tour privato lungo la costa con guida esperta",
      "Trasferimenti privati da e per l'aeroporto",
    ],
    image:
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/4f/39/7f11caced1d47fec9d0bfd42beb27cfa93d6252dfa35eff102b6a2cfb85a.jpeg",
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/4b/35/53d67b03108b44383bc6d084c8c720d2049d43c3d418e6b2d55ae5dc23be.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/a1/da/6de3b3bfbb12543314d7889c6c67115bdd5dd6ea7b7b45e851898017d077.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/4f/39/7f11caced1d47fec9d0bfd42beb27cfa93d6252dfa35eff102b6a2cfb85a.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/2c/7a/096195e2dc5430f97df7e64a0ac1141b6e09d5ffe73553b476bc01ecd940.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/95/e3/eb8ade93b400a9b183f6c257eda1c09b5b12296279b91fdd82ee3adbcb29.jpeg",
    ],
    reviews: [
      {
        author: "Maria Rossi",
        comment: "È stata un'esperienza indimenticabile! Il servizio è impeccabile e il cibo è delizioso.",
        rating: 5,
      },
      {
        author: "Luigi Bianchi",
        comment: "Il tour della Costiera Amalfitana è stato incredibile. I panorami sono mozzafiato.",
        rating: 4,
      },
    ],
    availability: [
      {
        startDate: "2024-06-15",
        endDate: "2024-06-20",
        availableSeats: 10,
      },
      {
        startDate: "2024-07-10",
        endDate: "2024-07-15",
        availableSeats: 8,
      },
    ],
  },
];

const deluxeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_DELUXE":
      const updatedOffer = action.payload;
      const updatedStateOffer = state.map((deluxe) => {
        if (deluxe.id === updatedOffer.id) {
          return { ...deluxe, ...updatedOffer };
        }
        return deluxe;
      });
      return updatedStateOffer;
    case "ADD_REVIEW":
      const { deluxeId, user, rating, comment } = action.payload;
      const updatedStateReview = state.map((deluxe) => {
        if (deluxe.id === deluxeId) {
          return {
            ...deluxe,
            reviews: [...deluxe.reviews, { user, rating, comment }],
          };
        }
        return deluxe;
      });
      return updatedStateReview;
    default:
      return state;
  }
};

export default deluxeReducer;
