import Image, { type ImageProps } from "next/image"
import { optimizeImageProps } from "@/utils/image-optimizer"

interface SEOImageProps extends Omit<ImageProps, "alt"> {
  alt: string
  title?: string
  caption?: string
  loading?: "lazy" | "eager"
}

export function SEOImage({ alt, title, caption, loading = "lazy", ...props }: SEOImageProps) {
  // Оптимизируем параметры изображения
  const optimizedProps = optimizeImageProps(props)

  return (
    <figure className="relative">
      <Image
        {...optimizedProps}
        alt={alt} // Обязательный alt-текст для SEO
        title={title} // Опциональный title для дополнительной информации
        loading={props.priority ? "eager" : loading} // Используем eager для приоритетных изображений
      />
      {caption && <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>}
    </figure>
  )
}
