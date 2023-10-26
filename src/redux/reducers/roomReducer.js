import Standard from "../../assets/rooms/Standard.jpg";
import Deluxe from "../../assets/rooms/Deluxe.jpg";
import Executive from "../../assets/rooms/Executive.jpg";
import Family from "../../assets/rooms/Family.jpg";
import Ocean from "../../assets/rooms/Ocean.jpg";
import Presidential from "../../assets/rooms/Presidential.jpg";
import Cozy from "../../assets/rooms/Cozy.jpeg";
import Mountain from "../../assets/rooms/Mountain.jpg";

const initialState = [
  {
    id: 80,
    name: "Camera Standard",
    destination: "Bologna",
    region: "Emilia-Romagna",
    offer: "room",
    price: 49,
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/d8/32/45a3b4fc2357f57f5b94e68db303aa7fc492c28dd612b6683b0b1791789a.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/b5/84/85120cd81885251681f871d9a53ddf69c80d13f6f576a6a05dedd7f22842.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/6d/ac/13dc507b75d0ac0b44bfbcbb0bfba7358cf6ad0172fc4ca72bcf7cdd1f90.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/71/2c/1c57e60a246f197e007b0ef587ba4bf834f6b458ce773e0befb6a11e35e4.jpeg",
    ],
    description:
      "Una camera standard con due camere da letto, un bagno e tutti i comfort di base. Ideale per una vacanza a Bologna. La camera include connessione WiFi gratuita.",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi gratuito"],
    price_per_adult: 49,
    price_per_child: 40,
    image: Standard,
    reviews: [
      {
        user: "Mario",
        rating: 4,
        comment: "Un soggiorno piacevole e comodo.",
      },
      {
        user: "Luigi",
        rating: 5,
        comment: "Servizio eccellente e camera pulita.",
      },
    ],
    host: "Laura",
  },
  {
    id: 81,
    name: "Soggiorno Deluxe",
    destination: "Roma",
    region: "Lazio",
    offer: "room",
    price: 59,
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/89/0f/5d2d413ed33926c3c8d09b8d11cf3ad3a09f4d94df4fa23be8fcc30da61d.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/46/27/928b8a9b08fe01567078b37ee767418648f10007a93aeb11164ce4b2dac6.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/hotelier-images/56/b5/1c2614ffc0d5ecd4f15cc87eb44107b065c07a0557c7d6f98120255720db.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/hotelier-images/b3/04/11eefe371c8164cb8cae2089bec2b4b7a3c00b70f4aa5b1a83e24a68a86b.jpeg",
    ],
    description:
      "Una camera deluxe spaziosa e lussuosa con tre camere da letto, due bagni e una vista panoramica eccezionale su Roma. La camera offre una connessione WiFi gratuita e una vista panoramica. Ospitato da Marco.",
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["WiFi gratuito", "Vista panoramica"],
    price_per_adult: 59,
    price_per_child: 50,
    image: Deluxe,
    reviews: [
      {
        user: "Carla",
        rating: 5,
        comment: "Molto spaziosa e vista mozzafiato.",
      },
      {
        user: "Giulia",
        rating: 4,
        comment: "Buon rapporto qualità-prezzo.",
      },
      {
        user: "Antonio",
        rating: 5,
        comment: "Esperienza indimenticabile!",
      },
    ],
    host: "Marco",
  },
  {
    id: 82,
    name: "Executive Suite",
    destination: "Milano",
    region: "Lombardia",
    offer: "room",
    price: 99,
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/cb/52/c84477d95ec703a1d1d8eea2107643881939caf04fb81cb26ee8a3e312e8.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/33/3d/4920a9ca32aaeb4445b63b49ce14d9f9b5002012419ce1322cfe224c1abe.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/24/75/b4cda5fc8701248ccae52fcbc45e7cccf518f8ff598dc5ac938421bccfa4.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/26/8e/78943ad2807124159c69eaad3baa96db1a1c57c24fe71c85df36808525b1.jpeg",
    ],
    description:
      "Una suite esecutiva di lusso con due camere da letto, un bagno e servizi premium a Milano. La suite offre connessione WiFi gratuita e colazione inclusa. Prezzo per adulti: €99, prezzo per bambini: €80. Ospitato da Francesca.",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi gratuito", "Colazione inclusa"],
    price_per_adult: 99,
    price_per_child: 80,
    image: Executive,
    reviews: [
      {
        user: "Silvia",
        rating: 4,
        comment: "Suite molto elegante e colazione deliziosa.",
      },
      {
        user: "Paolo",
        rating: 5,
        comment: "Servizio impeccabile e suite confortevole.",
      },
      {
        user: "Giovanna",
        rating: 4,
        comment: "Buona posizione nel centro di Milano.",
      },
    ],
    host: "Francesca",
  },
  {
    id: 83,
    name: "Suite famiglia",
    destination: "Firenze",
    region: "Toscana",
    offer: "room",
    price: 69,
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/94/13/32f93b4b33b85fa5c0daeb6c03e340486b8053288aacbf9cfd8133273da7.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/15/07/1dd31e989e8799d9221c21ed063a998f16117bb0e8c2944d99b7bc221cf4.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/10/55/109a6701511db16941e8fdd73d2e7adcd46cd81dd567f27809a3be088931.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/b0/8a/b67899e3b2cdb15b611c1e2bd7c29af2d7db2fa1865aac784ef8db546d20.jpeg",
    ],
    description:
      "Una suite perfetta per le famiglie con due camere da letto, due bagni, WiFi gratuito e piscina a Firenze.",
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["WiFi gratuito", "Piscina"],
    price_per_adult: 69,
    price_per_child: 60,
    image: Family,
    reviews: [
      {
        user: "Marta",
        rating: 5,
        comment: "Vacanza fantastica per la mia famiglia.",
      },
      {
        user: "Roberto",
        rating: 4,
        comment: "Piscina è un vantaggio!",
      },
    ],
    host: "Alessio",
  },
  {
    id: 84,
    name: "Suite vista mare",
    destination: "Napoli",
    region: "Campania",
    offer: "room",
    price: 79,
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/hotelier-images/10/88/1782009311e195d43b16a62890fec5841d643b541e0f9b240941d19ce4a2.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/hotelier-images/37/6d/8af91e1675f0585f0209504a536117b96212e7035adeb6a7265655abec44.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/hotelier-images/b5/ca/d0e177a09d63c4d615dfe3a29920d9be46407c06748cedc69bdeae1b4a29.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/hotelier-images/ed/c8/7280856c1a9c8eacfd9078d5ecad2e4dc7f002dc73a5f12fc9c792985af5.jpeg",
    ],
    description:
      "Una suite con vista mozzafiato sull'oceano a Napoli. La suite offre una camera da letto, un bagno, WiFi gratuito e vista mare.",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi gratuito", "Vista mare"],
    price_per_adult: 79,
    price_per_child: 70,
    image: Ocean,
    reviews: [
      {
        user: "Francesco",
        rating: 5,
        comment: "Vista mare incredibile e relax totale.",
      },
      {
        user: "Maria",
        rating: 4,
        comment: "Bella posizione, ma prezzo un po' alto.",
      },
    ],
    host: "Giulia",
  },
  {
    id: 85,
    name: "Suite presidenziale",
    destination: "Venezia",
    region: "Veneto",
    offer: "room",
    price: 129,
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/fe/67/eb44266f1a12981ea424e48d1f4efb8571e35d751abffb64ff1f020de98e.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/b0/68/fe6f5abe31b60ef1e491befc444e935354e59ea8f2591785e90e8597bec7.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/70/e5/2b3491e007a8703b55de092844711fea7985225e095e1ced1d713b60239e.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/92/2b/595ceee5fd63315d18460184037238067802b19d5be4922cd037d88f5602.jpeg",
    ],
    description:
      "Vivi il lusso nella nostra suite presidenziale a Venezia. La suite offre tre camere da letto, tre bagni, WiFi gratuito e servizio in camera.",
    bedrooms: 3,
    bathrooms: 3,
    amenities: ["WiFi gratuito", "Servizio in camera"],
    price_per_adult: 129,
    price_per_child: 110,
    image: Presidential,
    reviews: [
      {
        user: "Lorenzo",
        rating: 5,
        comment: "Esperienza di lusso a Venezia.",
      },
      {
        user: "Anna",
        rating: 4,
        comment: "Servizio in camera è stato eccezionale.",
      },
      {
        user: "Giorgio",
        rating: 5,
        comment: "Vista mozzafiato dai balconi.",
      },
    ],
    host: "Roberto",
  },
  {
    id: 86,
    name: "Cabina accogliente",
    destination: "Verona",
    region: "Veneto",
    offer: "room",
    price: 39,
    images: [
      "https://a0.muscache.com/im/pictures/a1c61297-ff05-4a87-aa80-2d55cfa56fd6.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/ecd6c305-72c5-41d2-a860-836ebc994480.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/monet/Select-528948/original/9c55e504-9b2b-41dd-a8c5-f93744bf7677?im_w=1200",
      "https://a0.muscache.com/im/pictures/152b04dc-501d-4b72-8823-770cb4081bed.jpg?im_w=960",
    ],
    description:
      "Una cabina accogliente nel bosco a Verona, ideale per una fuga tranquilla. La cabina offre una camera da letto, un bagno, WiFi gratuito e giardino privato.",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi gratuito", "Giardino privato"],
    price_per_adult: 39,
    price_per_child: 30,
    image: Cozy,
    reviews: [
      {
        user: "Antonella",
        rating: 4,
        comment: "Un rifugio perfetto per la pace e il relax.",
      },
      {
        user: "Luca",
        rating: 5,
        comment: "Molto pulito e ben curato.",
      },
      {
        user: "Elisa",
        rating: 4,
        comment: "Ambiente accogliente e padrona di casa gentile.",
      },
    ],
    host: "Sara",
  },
  {
    id: 87,
    name: "Con vista sulle montagne",
    destination: "Torino",
    region: "Piemonte",
    offer: "room",
    price: 59,
    images: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/83/96/d8c9b1a17b20cfb40eddf5cd9ba374e94157f7a584a93705f10893df8d5c.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/b9/80/9fc06699006f6ba8ea262b8dcc773ef95925d335edf8983416584767fd4b.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/02/3e/6ddcf4813344d81516d9e911dc53417430f7524d3a0dce24690844a0c017.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partner-images/42/5c/e6058249030d6de4cd2f0c20bf255757340a0cb23b550ba27b1694b163d3.jpeg",
    ],
    description:
      "Scappa alle montagne nel nostro rifugio con vista sulle montagne sereno a Torino. Il rifugio offre due camere da letto, un bagno, WiFi gratuito e vista sulle montagne.",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi gratuito", "Vista montagne"],
    price_per_adult: 59,
    price_per_child: 50,
    image: Mountain,
    reviews: [
      {
        user: "Paola",
        rating: 5,
        comment: "Vista mozzafiato sulle montagne.",
      },
      {
        user: "Simone",
        rating: 4,
        comment: "Pace e tranquillità garantite.",
      },
      {
        user: "Roberta",
        rating: 4,
        comment: "Bella esperienza nel complesso.",
      },
    ],
    host: "Luigi",
  },
];

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ROOM":
      const updatedOffer = action.payload;
      const updatedStateOffer = state.map((room) => {
        if (room.id === updatedOffer.id) {
          return { ...room, ...updatedOffer };
        }
        return room;
      });
      return updatedStateOffer;
    case "ADD_REVIEW":
      const { roomId, user, rating, comment } = action.payload;
      const updatedStateReview = state.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            reviews: [...room.reviews, { user, rating, comment }],
          };
        }
        return room;
      });
      return updatedStateReview;
    default:
      return state;
  }
};

export default roomReducer;
