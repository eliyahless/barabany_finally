import type * as React from "react"
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components"

interface FormTemplateProps {
  name: string
  phone: string
  date: string
  source: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export const FormTemplate: React.FC<FormTemplateProps> = ({
  name,
  phone,
  date,
  source,
  utmSource,
  utmMedium,
  utmCampaign,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Новая заявка с сайта Не Школа</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Новая заявка с сайта</Heading>

          <Section style={section}>
            <Text style={text}>
              <strong>Имя:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Телефон:</strong> {phone}
            </Text>
            <Text style={text}>
              <strong>Дата:</strong> {date}
            </Text>
            <Text style={text}>
              <strong>Источник:</strong> {source}
            </Text>

            {(utmSource || utmMedium || utmCampaign) && (
              <>
                <Hr style={hr} />
                <Text style={text}>
                  <strong>UTM метки:</strong>
                </Text>
                {utmSource && (
                  <Text style={text}>
                    <strong>Source:</strong> {utmSource}
                  </Text>
                )}
                {utmMedium && (
                  <Text style={text}>
                    <strong>Medium:</strong> {utmMedium}
                  </Text>
                )}
                {utmCampaign && (
                  <Text style={text}>
                    <strong>Campaign:</strong> {utmCampaign}
                  </Text>
                )}
              </>
            )}
          </Section>

          <Hr style={hr} />
          <Text style={footer}>© {new Date().getFullYear()} Не Школа. Все права защищены.</Text>
        </Container>
      </Body>
    </Html>
  )
}

// Стили для email-шаблона
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
}

const h1 = {
  color: "#ff5500",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  textAlign: "center" as const,
}

const section = {
  padding: "20px",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "20px 0",
}
