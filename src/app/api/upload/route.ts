import { NextResponse } from "next/server";
import { env } from "talkcar/env";
import { createHash } from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se ha subido ningún archivo" },
        { status: 400 }
      );
    }

    // Cloudinary Signed Upload via REST API (Zero-dependency)
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = env.CLOUDINARY_API_SECRET;
    const apiKey = env.CLOUDINARY_API_KEY;
    const cloudName = env.CLOUDINARY_CLOUD_NAME;

    // Generar firma: sha1("timestamp={timestamp}{apiSecret}")
    const signature = createHash("sha1")
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    // Preparar el cuerpo para Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    cloudinaryFormData.append("signature", signature);

    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    if (!res.ok) {
      const errorData = await res.json() as { error: { message: string } };
      console.error("Cloudinary error:", errorData);
      return NextResponse.json(
        { error: "Fallo al subir a Cloudinary" },
        { status: 500 }
      );
    }

    const data = await res.json() as { secure_url: string };
    
    return NextResponse.json({ imageUrl: data.secure_url });
  } catch (error) {
    console.error("Error en upload:", error);
    return NextResponse.json(
      { error: "Error al subir la imagen" },
      { status: 500 }
    );
  }
}
