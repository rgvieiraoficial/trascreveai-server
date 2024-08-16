-- CreateTable
CREATE TABLE "SessionTasks" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "summary" TEXT,
    "status" INTEGER NOT NULL,
    "stage" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "SessionTasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "messaging_product_id" TEXT,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sessionTaskId" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionTasks" ADD CONSTRAINT "SessionTasks_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sessionTaskId_fkey" FOREIGN KEY ("sessionTaskId") REFERENCES "SessionTasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
