import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { emailAnalytics } from "@/lib/db/schema";
import { createHmac } from "crypto";

// Resend webhook handler for email events
export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text();

    // Verify webhook signature when secret is configured
    const secret = process.env.RESEND_WEBHOOK_SECRET;
    const signatureHeader = request.headers.get("resend-signature") || "";

    if (secret) {
      const expected = createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");
      // Header may come as plain hex or prefixed (e.g., "sha256=<hex>")
      const provided = signatureHeader.replace(/^sha256=/i, "").trim();

      // Constant-time string comparison to avoid timing attacks
      const constantTimeEqual = (a: string, b: string) => {
        if (a.length !== b.length) return false;
        let result = 0;
        for (let i = 0; i < a.length; i++) {
          result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
      };

      if (!constantTimeEqual(expected, provided)) {
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    } else {
      // In local dev without secret, allow processing but warn
      console.warn(
        "RESEND_WEBHOOK_SECRET not set; skipping signature verification"
      );
    }

    const body = JSON.parse(rawBody);

    // Verify webhook signature (add this for security)
    // const signature = request.headers.get('resend-signature');

    const { type, data } = body;

    // Map Resend events to our analytics
    const eventMapping: Record<string, string> = {
      "email.sent": "sent",
      "email.delivered": "delivered",
      "email.delivery_delayed": "delayed",
      "email.bounced": "bounced",
      "email.complained": "complained",
      "email.opened": "opened",
      "email.clicked": "clicked",
    };

    const eventType = eventMapping[type];
    if (!eventType) {
      return NextResponse.json(
        { message: "Event type not tracked" },
        { status: 200 }
      );
    }

    // Extract campaign name from tags or subject
    const campaignName =
      data.tags?.find((tag: any) => tag.name === "campaign")?.value ||
      "unknown";

    // Store email analytics
    await db.insert(emailAnalytics).values({
      emailId: data.email_id,
      recipientEmail: data.to[0], // Assuming single recipient
      campaignName,
      eventType,
      eventData: {
        subject: data.subject,
        from: data.from,
        tags: data.tags,
        click_url: data.click?.url, // For click events
        user_agent: data.click?.user_agent,
        ip: data.click?.ip,
      },
      ipAddress: data.click?.ip || data.ip,
      userAgent: data.click?.user_agent || data.user_agent,
    });

    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });
  } catch (error) {
    console.error("Resend webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
