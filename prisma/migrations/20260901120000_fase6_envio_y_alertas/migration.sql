-- AlterTable: fase 6, datos de envío y alertas de Mercado Pago
ALTER TABLE "Pedido" ADD COLUMN "mpAlerta" TEXT;
ALTER TABLE "Pedido" ADD COLUMN "mpAlertaEn" TIMESTAMP(3);
ALTER TABLE "Pedido" ADD COLUMN "paqueteria" TEXT;
ALTER TABLE "Pedido" ADD COLUMN "guia" TEXT;
ALTER TABLE "Pedido" ADD COLUMN "enviadoEn" TIMESTAMP(3);
ALTER TABLE "Pedido" ADD COLUMN "avisoEnvioEn" TIMESTAMP(3);
