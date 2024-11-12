interface Item {
    heading: string;
    productId: string;
    button?: string;
    credits: string;
    validity: string;
    price?: number;
    type: string;
}

export const prices: Item[] = [
  {
    heading: "AI Mastering",
    productId: "",
    credits: "Credits",
    validity: "Validity",
    type:""
  },
  {
    heading: "",
    type: "Standard",
    price: 999,
    productId: "7",
    button: "Add to cart",
    credits: "1",
    validity: "."
  },
  {
    heading: "",
    type: "Professional",
    price: 5999,
    productId: "8",
    button: "Add to cart",
    credits: "10 Songs",
    validity: "1 Year"
  },
  {
    heading: "",
    type: "Pro",
    price: 9999,
    productId: "9",
    button: "Add to cart",
    credits: "Unlimited",
    validity: "1 Year"
  },
  {
    heading:
      "For Labels (50+ Songs/Album) - 5999/- ",
    productId: "",
    button: "",
    credits: "Unlimited",
      validity: "1 Year",
    type:""
  }
];