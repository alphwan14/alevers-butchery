"use client";

import { useEffect, useMemo, useState } from "react";
export const dynamic = "force-dynamic";
import { getFirebase } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  Timestamp,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

type Product = {
  id?: string;
  name: string;
  price: number;
  category: "Goat" | "Beef" | "Chicken" | "Offer";
  imageUrl?: string;
  createdAt?: Timestamp;
};

export default function AdminPage() {
  const router = useRouter();
  const [userReady, setUserReady] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ name: "", price: 0, category: "Goat" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Auth guard
  useEffect(() => {
    const { auth } = getFirebase();
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUserReady(true);
    });
    return () => unsub();
  }, [router]);

  // Firestore converter for strong typing
  const productConverter = useMemo<FirestoreDataConverter<Product>>(
    () => ({
      toFirestore: (p: Product) => ({
        name: p.name,
        price: p.price,
        category: p.category,
        imageUrl: p.imageUrl,
        createdAt: p.createdAt ?? Timestamp.now(),
      }),
      fromFirestore: (snap: QueryDocumentSnapshot<DocumentData>) => {
        const data = snap.data() as {
          name: string;
          price: number;
          category: Product["category"];
          imageUrl?: string;
          createdAt?: Timestamp;
        };
        return {
          id: snap.id,
          name: data.name,
          price: data.price,
          category: data.category,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt ?? Timestamp.now(),
        };
      },
    }),
    []
  );

  // Load data
  useEffect(() => {
    if (!userReady) return;
    (async () => {
      const { db } = getFirebase();
      const col = collection(db, "products").withConverter(productConverter);
      const snap = await getDocs(col);
      const items = snap.docs.map((d) => d.data());
      setProducts(items);
    })();
  }, [userReady, productConverter]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { db, storage } = getFirebase();
      let imageUrl: string | undefined = form.imageUrl;
      if (file) {
        const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      if (form.id) {
        await updateDoc(doc(db, "products", form.id), {
          name: form.name,
          price: form.price,
          category: form.category,
          imageUrl,
        });
      } else {
        await addDoc(collection(db, "products"), {
          name: form.name,
          price: form.price,
          category: form.category,
          imageUrl,
          createdAt: Timestamp.now(),
        });
      }

      const col = collection(db, "products").withConverter(productConverter);
      const snap = await getDocs(col);
      const items = snap.docs.map((d) => d.data());
      setProducts(items);
      setForm({ name: "", price: 0, category: "Goat" });
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p: Product) => {
    setForm(p);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const { db } = getFirebase();
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (!userReady) return null;

  return (
    <main className="px-4 py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            const { auth } = getFirebase();
            return signOut(auth);
          }}
          className="rounded-lg bg-[#8B0000] px-4 py-2 text-white hover:bg-[#660000]"
        >
          Logout
        </button>
      </div>

      <section className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white border border-[#D2B48C] p-4">
          <h2 className="font-semibold">Add / Edit Product</h2>
          <div className="mt-3 grid gap-3">
            <label className="text-sm">Name
              <input
                className="mt-1 w-full rounded-lg border border-[#D2B48C] px-3 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="text-sm">Price (KSh)
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-[#D2B48C] px-3 py-2"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </label>
            <label className="text-sm">Category
              <select
                className="mt-1 w-full rounded-lg border border-[#D2B48C] px-3 py-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}
              >
                <option>Goat</option>
                <option>Beef</option>
                <option>Chicken</option>
                <option>Offer</option>
              </select>
            </label>
            <label className="text-sm">Image
              <input
                type="file"
                accept="image/*"
                className="mt-1 w-full"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            <button
              onClick={handleSave}
              disabled={loading}
              className="mt-2 rounded-lg bg-[#8B0000] px-4 py-2 text-white hover:bg-[#660000] disabled:opacity-60"
            >
              {loading ? "Saving..." : form.id ? "Update" : "Save"}
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-[#D2B48C] p-4">
          <h2 className="font-semibold">Products</h2>
          <div className="mt-3 grid gap-3">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">KSh {p.price} — {p.category}</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded border px-3 py-1" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="rounded border px-3 py-1 text-red-700" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


