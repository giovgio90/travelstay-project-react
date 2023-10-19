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
    id: 1,
    name: "Camera Standard",
    price: 99,
    description: "Comfortable room with all basic amenities.",
    image: Standard,
  },
  {
    id: 2,
    name: "Camera Deluxe",
    price: 149,
    description: "Spacious and luxurious room with a great view.",
    image: Deluxe,
  },
  {
    id: 3,
    name: "Executive Suite",
    price: 249,
    description: "A suite with premium amenities and services.",
    image: Executive,
  },
  {
    id: 4,
    name: "Suite famiglia",
    price: 199,
    description: "Perfect for families with additional space and features.",
    image: Family,
  },
  {
    id: 5,
    name: "Suite vista mare",
    price: 299,
    description: "Enjoy stunning ocean views from your suite.",
    image: Ocean,
  },
  {
    id: 6,
    name: "Suite presidenziale",
    price: 499,
    description: "Experience luxury at its finest in our presidential suite.",
    image: Presidential,
  },
  {
    id: 7,
    name: "Cabina accogliente",
    price: 79,
    description: "A cozy cabin in the woods, perfect for a peaceful getaway.",
    image: Cozy,
  },
  {
    id: 8,
    name: "Con vista sulle montagne",
    price: 199,
    description: "Escape to the mountains in our serene mountain view retreat.",
    image: Mountain,
  },
];

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ROOM":
      const { roomId, name, price } = action.payload;
      return state.map((room) => (room.id === roomId ? { ...room, name, price } : room));
    default:
      return state;
  }
};

export default roomReducer;
