import {
  Body,
  Head,
  Heading,
  Img,
  Link,
  Text,
  Html,
  Hr,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  request: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  company,
  email,
  phone,
  request,
  message,
}) => (
  <Html lang="en">
    <Head>
      <title>New Contact Request – Sun Tag &amp; Title</title>
    </Head>
    <Body
      style={{
        backgroundColor: "#0a0a0f",
        color: "#e8e8f0",
        fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
        margin: "0",
        padding: "32px 16px",
      }}
    >
      {/* Header */}
      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <tbody>
          <tr>
            <td align="center" style={{ paddingBottom: "24px" }}>
              <Img
                src="https://suntagandtitle.com/logo.jpg"
                width="80"
                height="80"
                alt="Sun Tag & Title logo"
                style={{ borderRadius: "8px", display: "block" }}
              />
            </td>
          </tr>
          <tr>
            <td align="center">
              <Heading
                as="h1"
                style={{
                  color: "#c9a84c",
                  fontSize: "28px",
                  fontWeight: "800",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                Sun Tag &amp; Title
              </Heading>
              <Text
                style={{
                  color: "#8888aa",
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  margin: "0 0 24px",
                }}
              >
                Maryland Tag Agency · Columbia, MD
              </Text>
            </td>
          </tr>
        </tbody>
      </table>

      <Hr style={{ borderColor: "#2a2a3a", maxWidth: "600px", margin: "0 auto 32px" }} />

      {/* Body */}
      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <tbody>
          <tr>
            <td>
              <Heading
                as="h2"
                style={{
                  color: "#e8e8f0",
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: "0 0 16px",
                }}
              >
                New Contact Form Submission
              </Heading>

              <Text style={{ color: "#b0b0c8", fontSize: "15px", margin: "0 0 8px" }}>
                Hello,
              </Text>
              <Text style={{ color: "#b0b0c8", fontSize: "15px", margin: "0 0 8px" }}>
                You have received a new message from your website contact form.
              </Text>

              <Hr style={{ borderColor: "#2a2a3a", margin: "24px 0" }} />

              {/* Details table */}
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: "12px", width: "130px", verticalAlign: "top" }}>
                      <Text style={{ color: "#8888aa", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                        Service Request
                      </Text>
                    </td>
                    <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                      <Text style={{ color: "#c9a84c", fontSize: "14px", fontWeight: "600", margin: 0 }}>
                        {request}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                      <Text style={{ color: "#8888aa", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                        Name
                      </Text>
                    </td>
                    <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                      <Text style={{ color: "#e8e8f0", fontSize: "14px", margin: 0 }}>
                        {name}
                      </Text>
                    </td>
                  </tr>
                  {company && (
                    <tr>
                      <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                        <Text style={{ color: "#8888aa", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                          Company
                        </Text>
                      </td>
                      <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                        <Text style={{ color: "#e8e8f0", fontSize: "14px", margin: 0 }}>
                          {company}
                        </Text>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                      <Text style={{ color: "#8888aa", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                        Phone
                      </Text>
                    </td>
                    <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                      <Text style={{ color: "#e8e8f0", fontSize: "14px", margin: 0 }}>
                        <Link href={`tel:${phone}`} style={{ color: "#5b9bd5", textDecoration: "none" }}>
                          {phone}
                        </Link>
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                      <Text style={{ color: "#8888aa", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                        Email
                      </Text>
                    </td>
                    <td style={{ paddingBottom: "12px", verticalAlign: "top" }}>
                      <Text style={{ color: "#e8e8f0", fontSize: "14px", margin: 0 }}>
                        <Link href={`mailto:${email}`} style={{ color: "#5b9bd5", textDecoration: "none" }}>
                          {email}
                        </Link>
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Hr style={{ borderColor: "#2a2a3a", margin: "24px 0" }} />

              <Text style={{ color: "#8888aa", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>
                Message
              </Text>
              <Text
                style={{
                  color: "#e8e8f0",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  backgroundColor: "#12121c",
                  border: "1px solid #2a2a3a",
                  borderRadius: "6px",
                  padding: "16px",
                  margin: "0 0 24px",
                }}
              >
                {message}
              </Text>

              <Text style={{ color: "#b0b0c8", fontSize: "14px", margin: "0 0 24px" }}>
                Reply directly to this sender:{" "}
                <Link href={`mailto:${email}`} style={{ color: "#c9a84c", fontWeight: "600" }}>
                  {email}
                </Link>
              </Text>

              <Hr style={{ borderColor: "#2a2a3a", margin: "24px 0" }} />

              {/* Footer */}
              <Text style={{ color: "#555570", fontSize: "12px", textAlign: "center", margin: "0" }}>
                This message was sent via the contact form at{" "}
                <Link href="https://suntagandtitle.com" style={{ color: "#555570" }}>
                  suntagandtitle.com
                </Link>
              </Text>
              <Text style={{ color: "#555570", fontSize: "12px", textAlign: "center", margin: "4px 0 0" }}>
                10400 Shaker Dr Suite 8 · Columbia, MD 21046 · +1 (410) 417-8272
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Body>
  </Html>
);
