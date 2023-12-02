// src/pagamento/dto/create-pagamento.dto.ts

export class CreatePagamentoDto {
  valor: number;
  data_pagamento?: Date; // Opcional, já que você tem um valor padrão
  tipo: string;
  status: string;
  numero_parcelas?: number; // Opcional, pode ser null
  id_pedido: number; // Necessário para associar o pagamento a um pedido
}
