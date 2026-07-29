import type { Metadata } from "next";
import { Inbox, MailOpen, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { MessageStatusButton } from "@/components/admin/message-status-button";
import { IconTile } from "@/components/shared/icon-tile";
import { TechBadge } from "@/components/shared/tech-badge";
import { getPrisma } from "@/lib/backend/prisma";
import { requireAdminPagePermission } from "@/lib/backend/permissions";

export const metadata: Metadata = {
  title: "Admin Messages",
  description: "Review contact form messages stored in PostgreSQL.",
};

export default async function AdminMessagesPage() {
  await requireAdminPagePermission("messages.read");
  const prisma = getPrisma();
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell
      activePath="/admin/messages"
      requiredPermission="messages.read"
      title="Contact messages stored from the public form."
      description="Every valid contact form submission is now saved in PostgreSQL and can be reviewed from this protected admin module."
    >
      <section className="glass-panel rounded-lg p-5">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconTile icon={Inbox} iconClassName="size-5" tone="emerald" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Inbox
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                {messages.length} messages
              </h2>
            </div>
          </div>
          <TechBadge>
            <ShieldCheck className="size-3.5" />
            Protected API
          </TechBadge>
        </div>

        {messages.length > 0 ? (
          <div className="grid gap-3">
            {messages.map((message) => (
              <article
                className="rounded-md border border-border/70 bg-background/55 p-4"
                key={message.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold tracking-tight">
                        {message.subject ?? "No subject"}
                      </h3>
                      <span className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground">
                        {message.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {message.name} - {message.email}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {message.createdAt.toLocaleDateString("en-US")}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {message.message}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <MessageStatusButton
                    messageId={message.id}
                    status="READ"
                  />
                  <MessageStatusButton
                    messageId={message.id}
                    status="REPLIED"
                  />
                  <MessageStatusButton
                    messageId={message.id}
                    status="ARCHIVED"
                  />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-border/70 bg-background/55 p-5 text-sm leading-6 text-muted-foreground">
            <div className="flex gap-3">
              <IconTile icon={MailOpen} iconClassName="size-5" tone="slate" />
              <p>
                No contact messages yet. Submit the public contact form to test
                this inbox.
              </p>
            </div>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
