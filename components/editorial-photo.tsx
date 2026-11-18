import Image from "next/image";
import type { EditorialPhoto as Photo } from "@/lib/content/editorial-photos";
import { absoluteUrl } from "@/lib/site";

const credits: Record<string, { label: string; resized: string; cropped: string }> = {
  en: { label: "Photo credits", resized: "Resized and converted to WebP", cropped: "Cropped and converted to WebP" },
  es: { label: "Créditos de la foto", resized: "Imagen reducida y convertida a WebP", cropped: "Imagen recortada y convertida a WebP" },
  de: { label: "Bildnachweis", resized: "Verkleinert und in WebP umgewandelt", cropped: "Zugeschnitten und in WebP umgewandelt" },
  fr: { label: "Crédit photo", resized: "Redimensionnée et convertie en WebP", cropped: "Recadrée et convertie en WebP" },
  it: { label: "Crediti fotografici", resized: "Ridimensionata e convertita in WebP", cropped: "Ritagliata e convertita in WebP" },
  pt: { label: "Créditos da fotografia", resized: "Redimensionada e convertida em WebP", cropped: "Recortada e convertida em WebP" },
  pl: { label: "Autor i licencja zdjęcia", resized: "Zmieniono rozmiar i format na WebP", cropped: "Przycięto i zmieniono format na WebP" },
  uk: { label: "Автор і ліцензія фото", resized: "Змінено розмір і формат на WebP", cropped: "Обрізано й перетворено у WebP" },
};

export function photoOpenGraph(photo: Photo, locale: string) {
  return {
    url: absoluteUrl(photo.src),
    width: photo.width,
    height: photo.height,
    alt: photo.alt[locale] ?? photo.alt.en,
  };
}

export function EditorialPhoto({ photo, locale, aboveFold = false }: {
  photo: Photo;
  locale: string;
  aboveFold?: boolean;
}) {
  const credit = credits[locale] ?? credits.en;
  return (
    <figure className="editorial-photo" data-portrait={photo.height > photo.width || undefined}>
      <Image
        src={photo.src}
        alt={photo.alt[locale] ?? photo.alt.en}
        width={photo.width}
        height={photo.height}
        loading={aboveFold ? "eager" : "lazy"}
        fetchPriority={aboveFold ? "high" : undefined}
        unoptimized
      />
      <figcaption>
        <details className="photo-credits">
          <summary aria-label={credit.label} title={credit.label}><span aria-hidden="true">ⓘ</span></summary>
          <div className="photo-credit-panel">
            <strong>{credit.label}</strong>
            <div><a href={photo.source}>{photo.author}</a> · <a href={photo.licenseUrl} rel="license">{photo.license}</a></div>
            {photo.license !== "Pexels License" && <small>{photo.cropped ? credit.cropped : credit.resized}</small>}
          </div>
        </details>
      </figcaption>
    </figure>
  );
}
