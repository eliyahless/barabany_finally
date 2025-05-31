import Script from "next/script"

interface BreadcrumbItem {
  name: string
  item: string
}

interface BreadcrumbsSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbsSchema({ items }: BreadcrumbsSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  return (
    <Script
      id="breadcrumbs-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}
