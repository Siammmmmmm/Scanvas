import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "src/lib/firebase";

export async function saveLayerMetadata(data: {
  filename: string;
  totalLayers: number;
  tags?: string[];
}) {
  await addDoc(collection(db, "layers"), {
    ...data,
    uploadedAt: Timestamp.now(),
    visible: true,
  });
}

console.log('sup');
