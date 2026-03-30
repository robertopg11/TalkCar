import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

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

    // Validar extensión .png
    if (!file.name.toLowerCase().endsWith(".png")) {
      return NextResponse.json(
        { error: "Solo se permiten archivos .png" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear un nombre único para el archivo
    const uniqueName = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, "_")}`;
    const path = join(process.cwd(), "public", "uploads", uniqueName);

    // Asegurarse de que el directorio existe (por si acaso)
    await mkdir(join(process.cwd(), "public", "uploads"), { recursive: true });

    // Guardar el archivo
    await writeFile(path, buffer);
    
    const imageUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error en upload:", error);
    return NextResponse.json(
      { error: "Error al subir la imagen" },
      { status: 500 }
    );
  }
}
