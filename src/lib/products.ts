import bat from "@/assets/bat.jpg";
import ball from "@/assets/ball.jpg";
import stumps from "@/assets/stumps.jpg";
import kitbag from "@/assets/kitbag.jpg";
import helmet from "@/assets/helmet.jpg";
import gloves from "@/assets/gloves.jpg";
import pads from "@/assets/pads.jpg";

export type Category = "Bats" | "Balls" | "Stumps" | "Kit Bags" | "Protection";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  note: string;
}

export const CATEGORIES: Category[] = ["Bats", "Balls", "Stumps", "Kit Bags", "Protection"];

export const PRODUCTS: Product[] = [
  { id: "sovereign-willow", name: "The Sovereign", category: "Bats", price: 24999, image: bat, note: "Grade 1 English willow · 11 grains" },
  { id: "regent-willow", name: "The Regent", category: "Bats", price: 15499, image: bat, note: "Kashmir willow · mid sweet spot" },
  { id: "crown-ball", name: "Crown Test Ball", category: "Balls", price: 1899, image: ball, note: "Four-piece alum-tanned leather" },
  { id: "club-ball", name: "Club Red · Six Pack", category: "Balls", price: 4499, image: ball, note: "Hand-stitched seam, match grade" },
  { id: "ash-stumps", name: "Ash Stumps & Bails", category: "Stumps", price: 3299, image: stumps, note: "Seasoned ash, brass ferrules" },
  { id: "pavilion-bag", name: "Pavilion Duffle", category: "Kit Bags", price: 8999, image: kitbag, note: "Full-grain leather, brass hardware" },
  { id: "heritage-helmet", name: "Heritage Helmet", category: "Protection", price: 6799, image: helmet, note: "Steel grille, crest in gold" },
  { id: "laurel-gloves", name: "Laurel Gloves", category: "Protection", price: 3999, image: gloves, note: "Pittards leather palm" },
  { id: "guardian-pads", name: "Guardian Pads", category: "Protection", price: 5499, image: pads, note: "Lightweight cane, knee roll" },
];

export const formatPrice = (n: number) => "₹" + n.toLocaleString("en-IN");
