import { Router, type IRouter } from "express";
import { z } from "zod/v4";

const router: IRouter = Router();

// Soxta ma'lumotlar ombori
const mockPhones = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 1200,
    description: "Eng so'nggi iPhone modeli, titanium korpus va kuchli A17 Pro chipiga ega.",
    image: "https://v-p-s.uz/wp-content/uploads/2023/10/iphone-15-pro-finish-select-202309-6-1-7in-blacktitanium.webp",
    featured: true,
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1100,
    description: "AI imkoniyatlariga ega flagman, 200MP kamera va S-Pen bilan.",
    image: "https://openshop.uz/uploads/products/photos/202401/lI5Y6YVzH1L86wO678O87B6786.jpg",
    featured: true,
    createdAt: new Date()
  },
  {
    id: 3,
    name: "Redmi Note 13 Pro",
    brand: "Xiaomi",
    price: 400,
    description: "Hamyonbop va kuchli, 200MP kamera va tezkor quvvatlanish.",
    image: "https://mi-uzbekistan.com/upload/iblock/58c/v2v65p3o98l688p98l98p98l98p98l.jpg",
    featured: false,
    createdAt: new Date()
  }
];

// 1. Barcha telefonlarni olish
router.get("/phones", async (req, res): Promise<void> => {
  res.json(mockPhones);
});

// 2. Brendlar ro'yxatini olish (Filtr uchun)
router.get("/phones/brands", async (_req, res): Promise<void> => {
  const brands = Array.from(new Set(mockPhones.map(p => p.brand)));
  res.json(brands);
});

// 3. Bitta telefon ma'lumotini ID orqali olish
router.get("/phones/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const phone = mockPhones.find(p => p.id === id);
  
  if (!phone) {
    res.status(404).json({ error: "Telefon topilmadi" });
    return;
  }
  res.json(phone);
});

// 4. Buyurtma berish (Vaqtincha har doim "OK" qaytaradi)
router.post("/orders", async (req, res): Promise<void> => {
  res.status(201).json({ id: Math.floor(Math.random() * 1000), status: "pending", ...req.body });
});

export default router;