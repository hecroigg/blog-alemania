import Image from "next/image";
import type { EditorialPhoto as Photo } from "@/lib/content/editorial-photos";
import { absoluteUrl } from "@/lib/site";

const edits: Record<string, { resized: string; cropped: string }> = {
  en: { resized: "Resized and converted to WebP", cropped: "Cropped and converted to WebP" },
  es: { resized: "Imagen reducida y convertida a WebP", cropped: "Imagen recortada y convertida a WebP" },
  de: { resized: "Verkleinert und in WebP umgewandelt", cropped: "Zugeschnitten und in WebP umgewandelt" },
  fr: { resized: "Redimensionnée et convertie en WebP", cropped: "Recadrée et convertie en WebP" },
  it: { resized: "Ridimensionata e convertita in WebP", cropped: "Ritagliata e convertita in WebP" },
  pt: { resized: "Redimensionada e convertida em WebP", cropped: "Recortada e convertida em WebP" },
  pl: { resized: "Zmieniono rozmiar i format na WebP", cropped: "Przycięto i zmieniono format na WebP" },
  uk: { resized: "Змінено розмір і формат на WebP", cropped: "Обрізано й перетворено у WebP" },
};

export function photoOpenGraph(photo: Photo, locale: string) {
  return {
    url: absoluteUrl(photo.src),
    width: photo.width,
    height: photo.height,
    alt: photo.alt[locale] ?? photo.alt.en,
  };
}

export function EditorialPhoto({ photo, locale }: { photo: Photo; locale: string }) {
  const edit = edits[locale] ?? edits.en;
  return (
    <figure className="editorial-photo">
      <Image
        src={photo.src}
        alt={photo.alt[locale] ?? photo.alt.en}
        width={photo.width}
        height={photo.height}
        unoptimized
      />
      <figcaption>
        <a href={photo.source}>{photo.author}</a> · <a href={photo.licenseUrl} rel="license">{photo.license}</a>
        {photo.license !== "Pexels License" && <> · {photo.cropped ? edit.cropped : edit.resized}</>}
      </figcaption>
    </figure>
  );
}
