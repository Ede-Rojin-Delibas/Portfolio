-- CreateTable
CREATE TABLE "ProjectHighlight" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectHighlight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectHighlight" ADD CONSTRAINT "ProjectHighlight_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
