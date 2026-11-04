"use client";

import { useState } from "react";
import { FileText, ClipboardList, Package, DollarSign, Calendar as CalendarIcon, Users, Plus, Trash2, Download, Truck, CreditCard, ChevronLeft, ChevronRight, Minus } from "lucide-react";
import jsPDF from "jspdf";

interface SalgadoItem {
  id: number;
  nome: string;
  valorAssadoFrito: number;
  valorCongelado: number;
  tipoPreparo: "frito" | "assado" | "unidade";
}

const CARDAPIO_INICIAL: SalgadoItem[] = [
  { id: 1, nome: "Azeitona empanada de calabresa", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 2, nome: "Azeitona empanada de presunto", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 3, nome: "Bolinha de queijo prato", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 4, nome: "Bolinho de aipim c/ carne moída", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 5, nome: "Coxinha de frango", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "frito" },
  { id: 6, nome: "Coxinha de frango c/ catupiry", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 7, nome: "Croquete de lombo", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 8, nome: "Delícia de alho poró c/ muçarela", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 9, nome: "Delícia de muçarela c/ presunto", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "frito" },
  { id: 10, nome: "Empadão grande (frango com catupiry)", valorAssadoFrito: 9500.00, valorCongelado: 9500.00, tipoPreparo: "unidade" },
  { id: 11, nome: "Empadinha de frango", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "assado" },
  { id: 12, nome: "Empadinha de palmito", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "assado" },
  { id: 13, nome: "Empadinha de queijo", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "assado" },
  { id: 14, nome: "Enroladinho de salsicha", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "assado" },
  { id: 15, nome: "Esfirra de carne", valorAssadoFrito: 90.00, valorCongelado: 78.00, tipoPreparo: "assado" },
  { id: 16, nome: "Esfirra de frango", valorAssadoFrito: 90.00, valorCongelado: 78.00, tipoPreparo: "assado" },
  { id: 17, nome: "Espetinho de frango com bacon", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 18, nome: "Folhado de alho poró", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "assado" },
  { id: 19, nome: "Folhado de frango", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "assado" },
  { id: 20, nome: "Kibe", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "frito" },
  { id: 21, nome: "Mini cachorro quente", valorAssadoFrito: 300.00, valorCongelado: 300.00, tipoPreparo: "unidade" },
  { id: 22, nome: "Mini hambúrguer", valorAssadoFrito: 300.00, valorCongelado: 300.00, tipoPreparo: "unidade" },
  { id: 23, nome: "Mini pizza (calabresa)", valorAssadoFrito: 580.00, valorCongelado: 580.00, tipoPreparo: "unidade" },
  { id: 24, nome: "Mini pizza (frango)", valorAssadoFrito: 580.00, valorCongelado: 580.00, tipoPreparo: "unidade" },
  { id: 25, nome: "Mini pizza (marguerita)", valorAssadoFrito: 580.00, valorCongelado: 580.00, tipoPreparo: "unidade" },
  { id: 26, nome: "Mini pizza (presunto)", valorAssadoFrito: 580.00, valorCongelado: 580.00, tipoPreparo: "unidade" },
  { id: 27, nome: "Mini pizza buffet", valorAssadoFrito: 280.00, valorCongelado: 280.00, tipoPreparo: "unidade" },
  { id: 28, nome: "Pão de queijo", valorAssadoFrito: 90.00, valorCongelado: 78.00, tipoPreparo: "assado" },
  { id: 29, nome: "Pastelzinho de carne (assado)", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "assado" },
  { id: 30, nome: "Pastelzinho de carne (frito)", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 31, nome: "Pastelzinho de frango (assado)", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "assado" },
  { id: 32, nome: "Pastelzinho de queijo (frito)", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 33, nome: "Pastelzinho napolitano (frito)", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 34, nome: "Quiche 4 queijos c/ damasco", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "assado" },
  { id: 35, nome: "Quiche de bacon c/ milho", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "assado" },
  { id: 36, nome: "Quiche de frango", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "assado" },
  { id: 37, nome: "Quiche de frango c/ alho poró", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "assado" },
  { id: 38, nome: "Risole de alho poró c/ requeijão", valorAssadoFrito: 95.00, valorCongelado: 83.00, tipoPreparo: "frito" },
  { id: 39, nome: "Risole de carne", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "frito" },
  { id: 40, nome: "Risole de frango", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "frito" },
  { id: 41, nome: "Risole de milho", valorAssadoFrito: 85.00, valorCongelado: 73.00, tipoPreparo: "frito" }
];

interface PedidoItem {
  id: number;
  nomeCompleto: string;
  quantidade: number;
  valorUnitario: number;
}

interface PedidoCadastrado {
  id: number;
  cliente: string;
  telefone: string;
  dataEntrega: string;
  horario: string;
  total: number;
  status: string;
  pagamento: string;
  itens: string;
}

interface EventoCalendario {
  id: number;
  data: string;
  titulo: string;
  horario: string;
}

interface ClienteCadastrado {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
}

export default function NormaApp() {
  const [abaAtiva, setAbaAtiva] = useState<string>("orcamentos");
  const [cardapio, setCardapio] = useState<SalgadoItem[]>(CARDAPIO_INICIAL);

  const [novoSalNome, setNovoSalNome] = useState<string>("");
  const [novoSalVlrFrito, setNovoSalVlrFrito] = useState<number>(95);
  const [novoSalVlrCong, setNovoSalVlrCong] = useState<number>(83);
  const [novoSalTipo, setNovoSalTipo] = useState<"frito" | "assado" | "unidade">("frito");

  const adicionarNovoSalgado = () => {
    if (!novoSalNome) return;
    const novoItem: SalgadoItem = {
      id: Date.now(),
      nome: novoSalNome,
      valorAssadoFrito: Number(novoSalVlrFrito) || 95,
      valorCongelado: Number(novoSalVlrCong) || 83,
      tipoPreparo: novoSalTipo
    };
    setCardapio([...cardapio, novoItem]);
    setEstoqueUnidades({ ...estoqueUnidades, [novoSalNome]: 50 });
    setNovoSalNome("");
    alert("Novo salgado cadastrado com sucesso!");
  };

  const [cliente, setCliente] = useState<string>("Antonio");
  const [telefoneCliente, setTelefoneCliente] = useState<string>("(31) 99202-3753");
  const [dataEntrega, setDataEntrega] = useState<string>("2026-10-10");
  const [horarioEntrega, setHorarioEntrega] = useState<string>("08:00");
  const [numeroOrcamento, setNumeroOrcamento] = useState<string>("43");
  const [dataLimite, setDataLimite] = useState<string>("2026-10-09");

  const [produtoSelecionado, setProdutoSelecionado] = useState<string>("");
  const [modoPreparo, setModoPreparo] = useState<"assado_frito" | "congelado">("assado_frito");
  const [quantidadeDigitada, setQuantidadeDigitada] = useState<number>(25);

  const [itensPedido, setItensPedido] = useState<PedidoItem[]>([
    { id: 1, nomeCompleto: "Quiche de frango (assado)", quantidade: 25, valorUnitario: 0.95 },
    { id: 2, nomeCompleto: "Esfirra de carne (assado)", quantidade: 25, valorUnitario: 0.90 },
    { id: 3, nomeCompleto: "Kibe (frito)", quantidade: 25, valorUnitario: 0.85 },
    { id: 4, nomeCompleto: "Delícia de muçarela c/ presunto (frito)", quantidade: 19, valorUnitario: 0.85 },
    { id: 5, nomeCompleto: "Coxinha de frango (frito)", quantidade: 30, valorUnitario: 0.85 }
  ]);

  const [formaEntrega, setFormaEntrega] = useState<string>("Retirada pelo Cliente");
  const [taxaEntrega, setTaxaEntrega] = useState<number>(0);
  const [condicaoPagamento, setCondicaoPagamento] = useState<string>("50% no fechamento do pedido e o restante na entrega.");

  const [pedidos, setPedidos] = useState<PedidoCadastrado[]>([
    {
      id: 43,
      cliente: "Antonio",
      telefone: "(31) 99202-3753",
      dataEntrega: "10/10/2026",
      horario: "08:00",
      total: 109.15,
      status: "Aprovado",
      pagamento: "50% Sinal",
      itens: "Quiche de frango (25 un)"
    }
  ]);

  const excluirPedido = (id: number) => {
    if (confirm("Deseja realmente excluir este pedido?")) {
      setPedidos(pedidos.filter(p => p.id !== id));
    }
  };

  const [estoqueUnidades, setEstoqueUnidades] = useState<{ [key: string]: number }>({
    "Coxinha de frango": 75,
    "Empadinha de frango": 50,
    "Pão de queijo": 120,
    "Kibe": 30
  });

  const atualizarEstoque = (nome: string, qtd: number) => {
    setEstoqueUnidades({ ...estoqueUnidades, [nome]: Math.max(0, qtd) });
  };

  const [mesAtual, setMesAtual] = useState<number>(9);
  const [anoAtual, setAnoAtual] = useState<number>(2026);

  const [eventosCalendario, setEventosCalendario] = useState<EventoCalendario[]>([
    { id: 1, data: "2026-10-10", titulo: "Pedido #43 Antonio", horario: "08:00" }
  ]);
  const [novoEvData, setNovoEvData] = useState<string>("2026-10-15");
  const [novoEvTitulo, setNovoEvTitulo] = useState<string>("");
  const [novoEvHorario, setNovoEvHorario] = useState<string>("10:00");

  const adicionarEventoCalendario = () => {
    if (!novoEvTitulo || !novoEvData) return;
    setEventosCalendario([...eventosCalendario, { id: Date.now(), data: novoEvData, titulo: novoEvTitulo, horario: novoEvHorario }]);
    setNovoEvTitulo("");
    alert("Evento adicionado ao calendário com sucesso!");
  };

  const excluirEventoCalendario = (id: number) => {
    setEventosCalendario(eventosCalendario.filter(ev => ev.id !== id));
  };

  const [clientesLista, setClientesLista] = useState<ClienteCadastrado[]>([
    { id: 1, nome: "Antonio", telefone: "(31) 99202-3753", endereco: "Rua Engenheiro Carlos Goulart, 1000 - Buritis" },
    { id: 2, nome: "Marcell Pessoa", telefone: "(31) 99235-3710", endereco: "Av. Professor Mário Werneck, 500 - Buritis" }
  ]);
  const [novoClienteNome, setNovoClienteNome] = useState<string>("");
  const [novoClienteTel, setNovoClienteTel] = useState<string>("");
  const [novoClienteEnd, setNovoClienteEnd] = useState<string>("");

  const adicionarCliente = () => {
    if (!novoClienteNome) return;
    setClientesLista([...clientesLista, { id: Date.now(), nome: novoClienteNome, telefone: novoClienteTel, endereco: novoClienteEnd }]);
    setNovoClienteNome("");
    setNovoClienteTel("");
    setNovoClienteEnd("");
  };

  const adicionarItem = () => {
    if (!produtoSelecionado) return;
    const itemBase = cardapio.find(p => p.nome === produtoSelecionado);
    if (!itemBase) return;

    let precoCento = modoPreparo === "congelado" ? itemBase.valorCongelado : itemBase.valorAssadoFrito;
    let sufixo = "";
    if (itemBase.tipoPreparo !== "unidade") {
      sufixo = modoPreparo === "congelado" ? " (congelado)" : ` (${itemBase.tipoPreparo})`;
    }

    setItensPedido([...itensPedido, {
      id: Date.now(),
      nomeCompleto: itemBase.nome + sufixo,
      quantidade: Number(quantidadeDigitada) || 25,
      valorUnitario: precoCento / 100
    }]);
    setProdutoSelecionado("");
  };

  const removerItem = (id: number) => {
    setItensPedido(itensPedido.filter(item => item.id !== id));
  };

  const subtotalItens = itensPedido.reduce((acc, item) => acc + (item.quantidade * item.valorUnitario), 0);
  const totalGeral = subtotalItens + (formaEntrega === "Entregue pela Norma Salgaderia" ? Number(taxaEntrega) || 0 : 0);
  const totalQuantidade = itensPedido.reduce((acc, item) => acc + Number(item.quantidade), 0);

  const salvarComoPedido = () => {
    if (!cliente || itensPedido.length === 0) {
      alert("Preencha o nome do cliente e adicione itens.");
      return;
    }
    const dataIso = dataEntrega || "2026-10-10";
    const novoPedido: PedidoCadastrado = {
      id: Number(numeroOrcamento),
      cliente,
      telefone: telefoneCliente,
      dataEntrega: dataIso.split('-').reverse().join('/'),
      horario: horarioEntrega || "00:00",
      total: totalGeral,
      status: "Pendente de Confirmação",
      pagamento: condicaoPagamento.includes("50%") ? "Sinal Pendente" : "Aguardando Pagamento",
      itens: itensPedido.map(i => `${i.nomeCompleto} (${i.quantidade} un)`).join(', ')
    };

    setEventosCalendario([...eventosCalendario, {
      id: Date.now(),
      data: dataIso,
      titulo: `Pedido #${numeroOrcamento} ${cliente}`,
      horario: horarioEntrega || "08:00"
    }]);

    setPedidos([novoPedido, ...pedidos]);
    setAbaAtiva("pedidos");
    alert("Orçamento convertido em Pedido e sincronizado no Calendário!");
  };

  const atualizarStatusPedido = (id: number, novoStatus: string) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, status: novoStatus } : p));
  };

  const exportarPDF = () => {
    if (!cliente) return;
    const doc = new jsPDF();

    // CABEÇALHO PREDOMINANTE AMARELO (#F2AC32)
    doc.setFillColor(242, 172, 50);
    doc.rect(0, 0, 210, 36, "F");

    // Linha de acabamento em roxo escuro (#551844) na base do cabeçalho
    doc.setFillColor(85, 24, 68);
    doc.rect(0, 36, 210, 2, "F");

    // LOGO DA EMPRESA (Emblema com a identidade visual da Norma Salgaderia)
    doc.setFillColor(85, 24, 68);
    doc.roundedRect(158, 6, 38, 24, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("NORMA", 177, 15, { align: "center" });
    doc.setFontSize(7.5);
    doc.setTextColor(242, 172, 50);
    doc.text("SALGADERIA", 177, 21, { align: "center" });
    doc.setFontSize(6);
    doc.setTextColor(220, 220, 220);
    doc.text("LOGO.SVG", 177, 25, { align: "center" });

    // Título e Subtítulo no Cabeçalho (Textos em Roxo Escuro para perfeito contraste no fundo amarelo)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(85, 24, 68);
    doc.text("NORMA SALGADERIA", 14, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 15, 45);
    doc.text("CNPJ: 35.851.474/0001-21  |  Tel: (31) 99202-3753  |  @normasalgaderia", 14, 27.5);

    // Título do Orçamento
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(85, 24, 68);
    doc.text(`ORÇAMENTO Nº ${numeroOrcamento}`, 14, 48);

    // Cartão de Informações do Cliente & Entrega
    doc.setFillColor(252, 250, 247);
    doc.setDrawColor(230, 225, 215);
    doc.roundedRect(14, 53, 182, 32, 2, 2, "FD");

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`Cliente:`, 18, 62);
    doc.setFont("helvetica", "bold");
    doc.text(`${cliente}`, 34, 62);

    doc.setFont("helvetica", "normal");
    doc.text(`Contato:`, 18, 70);
    doc.setFont("helvetica", "bold");
    doc.text(`${telefoneCliente || "-"}`, 34, 70);

    doc.setFont("helvetica", "normal");
    doc.text(`Data de Entrega:`, 112, 62);
    doc.setFont("helvetica", "bold");
    doc.text(`${dataEntrega ? dataEntrega.split('-').reverse().join('/') : "-"} às ${horarioEntrega || "-"}`, 142, 62);

    doc.setFont("helvetica", "normal");
    doc.text(`Modalidade:`, 112, 70);
    doc.setFont("helvetica", "bold");
    doc.text(`${formaEntrega}`, 136, 70);

    // DESTAQUE DA DATA LIMITE DE FECHAMENTO
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(14, 90, 182, 12, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(180, 83, 9);
    doc.setFontSize(9.5);
    doc.text(`Data limite para o fechamento do pedido: ${dataLimite ? dataLimite.split('-').reverse().join('/') : "-"}`, 18, 98);

    // Tabela de Itens
    let y = 108;
    doc.setFillColor(85, 24, 68);
    doc.roundedRect(14, y, 182, 8, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Quant.", 18, y + 5.5);
    doc.text("Tipo de Salgado / Item", 42, y + 5.5);
    doc.text("Vlr. Unit.", 135, y + 5.5);
    doc.text("Valor Total", 168, y + 5.5);

    y += 9;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);

    itensPedido.forEach((item, index) => {
      const vlrTotalItem = item.quantidade * item.valorUnitario;
      if (index % 2 === 0) {
        doc.setFillColor(250, 248, 245);
        doc.rect(14, y - 1, 182, 8, "F");
      }
      doc.text(String(item.quantidade), 18, y + 5);
      doc.text(item.nomeCompleto.substring(0, 48), 42, y + 5);
      doc.text(`R$ ${item.valorUnitario.toFixed(2).replace('.', ',')}`, 135, y + 5);
      doc.text(`R$ ${vlrTotalItem.toFixed(2).replace('.', ',')}`, 168, y + 5);
      y += 8.5;
    });

    if (formaEntrega === "Entregue pela Norma Salgaderia" && Number(taxaEntrega) > 0) {
      doc.text("1", 18, y + 5);
      doc.text("Taxa de Entrega", 42, y + 5);
      doc.text(`R$ ${Number(taxaEntrega).toFixed(2).replace('.', ',')}`, 135, y + 5);
      doc.text(`R$ ${Number(taxaEntrega).toFixed(2).replace('.', ',')}`, 168, y + 5);
      y += 8.5;
    }

    // Linha Total Geral
    y += 2;
    doc.setDrawColor(210, 205, 195);
    doc.line(14, y, 196, y);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(85, 24, 68);
    doc.setFontSize(10.5);
    doc.text(`Total Geral (${totalQuantidade} unidades):`, 42, y);
    doc.text(`R$ ${totalGeral.toFixed(2).replace('.', ',')}`, 168, y);

    // Condições de pagamento e Observações Automáticas
    y += 10;
    doc.setFillColor(245, 242, 235);
    doc.roundedRect(14, y, 182, 38, 2, 2, "F");

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(85, 24, 68);
    doc.text("Condições de Pagamento:", 18, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(`${condicaoPagamento}  |  Pix: 31992023753`, 62, y);

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(85, 24, 68);
    doc.text("Observação e Entrega:", 18, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    y += 5;

    const temCongelado = itensPedido.some(i => i.nomeCompleto.toLowerCase().includes("congelado"));
    const temPronto = itensPedido.some(i => i.nomeCompleto.toLowerCase().includes("assado") || i.nomeCompleto.toLowerCase().includes("frito"));

    let textoObservacao = "Os salgados serão entregues prontos para consumo, em embalagens próprias.";
    if (temCongelado && temPronto) {
      textoObservacao = "Os salgados serão entregues prontos para consumo/congelados, em embalagens próprias.";
    } else if (temCongelado) {
      textoObservacao = "Os salgados serão entregues congelados, em embalagens próprias.";
    }

    doc.text(textoObservacao, 18, y);

    if (formaEntrega === "Retirada pelo Cliente") {
      y += 5;
      doc.text("Tolerância máxima para retirada de 15 minutos após o horário agendado.", 18, y);
    }

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Norma Salgaderia — (31) 99202-3753 | @normasalgaderia", 105, 285, { align: "center" });

    doc.save(`Orcamento_${cliente.replace(/\s+/g, '_')}_${numeroOrcamento}.pdf`);
  };

  return (
    <div className="flex h-screen bg-[#F9F8F6] font-sans text-gray-800">
      <aside className="w-64 bg-[#551844] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10 flex justify-center items-center">
          <div className="bg-[#F2AC32] p-4 rounded-xl w-full flex justify-center shadow-inner">
            <img src="/LOGO.svg" alt="Norma Salgaderia Logo" className="h-12 w-auto object-contain" />
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1.5">
          <button onClick={() => setAbaAtiva("orcamentos")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${abaAtiva === "orcamentos" ? "bg-[#F2AC32] text-[#551844] font-semibold" : "hover:bg-white/10"}`}>
            <FileText size={18} /> Orçamentos
          </button>
          <button onClick={() => setAbaAtiva("pedidos")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${abaAtiva === "pedidos" ? "bg-[#F2AC32] text-[#551844] font-semibold" : "hover:bg-white/10"}`}>
            <ClipboardList size={18} /> Pedidos & Status
          </button>
          <button onClick={() => setAbaAtiva("estoque")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${abaAtiva === "estoque" ? "bg-[#F2AC32] text-[#551844] font-semibold" : "hover:bg-white/10"}`}>
            <Package size={18} /> Estoque & Salgados
          </button>
          <button onClick={() => setAbaAtiva("financeiro")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${abaAtiva === "financeiro" ? "bg-[#F2AC32] text-[#551844] font-semibold" : "hover:bg-white/10"}`}>
            <DollarSign size={18} /> Financeiro
          </button>
          <button onClick={() => setAbaAtiva("calendario")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${abaAtiva === "calendario" ? "bg-[#F2AC32] text-[#551844] font-semibold" : "hover:bg-white/10"}`}>
            <CalendarIcon size={18} /> Calendário
          </button>
          <button onClick={() => setAbaAtiva("clientes")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${abaAtiva === "clientes" ? "bg-[#F2AC32] text-[#551844] font-semibold" : "hover:bg-white/10"}`}>
            <Users size={18} /> Clientes
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {abaAtiva === "orcamentos" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <header className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#551844]">Novo Orçamento</h2>
                <p className="text-sm text-gray-500">CNPJ: 35.851.474/0001-21 | Tel: (31) 99202-3753</p>
              </div>
              <div className="flex gap-2">
                <button onClick={exportarPDF} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-700 transition-colors text-sm">
                  <Download size={16} /> Baixar PDF
                </button>
                <button onClick={salvarComoPedido} className="bg-[#25D366] text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-green-600 transition-colors text-sm shadow-sm">
                  <ClipboardList size={16} /> Gerar Pedido
                </button>
              </div>
            </header>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Nome do Cliente</label>
                <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Contato / WhatsApp</label>
                <input type="text" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Orçamento Nº</label>
                <input type="text" value={numeroOrcamento} onChange={(e) => setNumeroOrcamento(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Data de Entrega</label>
                <input type="date" value={dataEntrega} onChange={(e) => setDataEntrega(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Horário de Entrega</label>
                <input type="time" value={horarioEntrega} onChange={(e) => setHorarioEntrega(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 font-semibold mb-1">Data Limite Fechamento</label>
                <input type="date" value={dataLimite} onChange={(e) => setDataLimite(e.target.value)} className="w-full border border-amber-300 bg-amber-50/50 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#551844] mb-4 flex items-center gap-2"><Package size={20} className="text-[#F2AC32]" /> Itens do Pedido</h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="md:col-span-5">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">SELECIONE A VARIAÇÃO</label>
                  <select value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 bg-white text-sm focus:outline-none focus:border-[#F2AC32]">
                    <option value="">Escolha o salgado...</option>
                    {cardapio.map((p, idx) => (
                      <option key={idx} value={p.nome}>{p.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">TIPO DE PREPARO</label>
                  <select value={modoPreparo} onChange={(e) => setModoPreparo(e.target.value as any)} className="w-full border border-gray-200 rounded-lg p-2.5 bg-white text-sm focus:outline-none focus:border-[#F2AC32]">
                    <option value="assado_frito">Assado / Frito (Pronto)</option>
                    <option value="congelado">Congelado</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">QUANTIDADE</label>
                  <input type="number" min="1" value={quantidadeDigitada} onChange={(e) => setQuantidadeDigitada(parseInt(e.target.value) || 1)} className="w-full border border-gray-200 rounded-lg p-2.5 bg-white text-center text-sm font-medium focus:outline-none focus:border-[#F2AC32]" />
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button onClick={adicionarItem} className="w-full bg-[#551844] text-white p-2.5 rounded-lg hover:bg-[#3d1131] transition-colors flex items-center justify-center gap-1 font-medium text-sm">
                    <Plus size={18} /> Adicionar
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {itensPedido.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
                    <div className="flex-1 font-medium text-gray-800">{item.nomeCompleto}</div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-400">Qtd:</label>
                        <input type="number" min="1" value={item.quantidade} onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setItensPedido(itensPedido.map(i => i.id === item.id ? { ...i, quantidade: isNaN(val) ? 0 : val } : i));
                        }} className="w-20 border border-gray-200 rounded-lg p-1 text-center font-medium" />
                      </div>
                      <div className="w-28 text-right font-semibold text-[#551844]">
                        R$ {(item.quantidade * item.valorUnitario).toFixed(2).replace('.', ',')}
                      </div>
                      <button onClick={() => removerItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="text-lg font-semibold text-[#551844] flex items-center gap-2"><Truck size={20} className="text-[#F2AC32]" /> Forma de Entrega</h3>
                <select value={formaEntrega} onChange={(e) => setFormaEntrega(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]">
                  <option value="Retirada pelo Cliente">Cliente vem retirar (Tolerância de 15 min)</option>
                  <option value="Entregue pela Norma Salgaderia">Entregue pela Norma Salgaderia</option>
                </select>
                {formaEntrega === "Entregue pela Norma Salgaderia" && (
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
                    <label className="block text-xs font-bold text-amber-800 uppercase">Taxa de Entrega (R$)</label>
                    <input type="number" min="0" value={taxaEntrega} onChange={(e) => setTaxaEntrega(parseFloat(e.target.value) || 0)} className="w-full border border-amber-300 rounded-lg p-2 bg-white font-medium text-amber-900" />
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="text-lg font-semibold text-[#551844] flex items-center gap-2"><CreditCard size={20} className="text-[#F2AC32]" /> Condição de Pagamento</h3>
                <select value={condicaoPagamento} onChange={(e) => setCondicaoPagamento(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#F2AC32]">
                  <option value="50% no fechamento do pedido e o restante na entrega.">50% no fechamento do pedido e o restante na entrega.</option>
                  <option value="Pagamento 100% Antecipado via Pix.">Pagamento 100% Antecipado via Pix.</option>
                  <option value="Pagamento 100% na Entrega.">Pagamento 100% na Entrega.</option>
                </select>
                <input type="text" value="Pix: 31992023753" disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-500 text-sm" />
              </div>
            </div>

            {itensPedido.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Subtotal Salgados: R$ {subtotalItens.toFixed(2).replace('.', ',')}</p>
                  {formaEntrega === "Entregue pela Norma Salgaderia" && Number(taxaEntrega) > 0 && (
                    <p className="text-sm text-gray-500">Taxa de Entrega: R$ {Number(taxaEntrega).toFixed(2).replace('.', ',')}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Total Geral do Orçamento</div>
                  <div className="text-4xl font-bold text-[#F2AC32]">
                    R$ {totalGeral.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {abaAtiva === "pedidos" && (
          <div className="max-w-5xl mx-auto space-y-6">
            <header className="mb-6">
              <h2 className="text-3xl font-bold text-[#551844]">Gestão de Pedidos</h2>
              <p className="text-sm text-gray-500">Acompanhe o status operacional e financeiro de cada pedido confirmado.</p>
            </header>

            <div className="space-y-4">
              {pedidos.map((ped) => (
                <div key={ped.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg text-[#551844]">Pedido #{ped.id} — {ped.cliente}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ped.status === "Aprovado" ? "bg-green-100 text-green-800" :
                          ped.status === "Pendente de Confirmação" ? "bg-amber-100 text-amber-800" :
                            ped.status === "Entregue" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                        }`}>
                        {ped.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600"><strong>Itens:</strong> {ped.itens}</p>
                    <p className="text-xs text-gray-400">Entrega: {ped.dataEntrega} às {ped.horario} | Contato: {ped.telefone}</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Total</div>
                      <div className="text-xl font-bold text-[#F2AC32]">R$ {ped.total.toFixed(2).replace('.', ',')}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <select
                        value={ped.status}
                        onChange={(e) => atualizarStatusPedido(ped.id, e.target.value)}
                        className="border border-gray-200 rounded-lg p-2 text-xs bg-gray-50 font-medium focus:outline-none focus:border-[#F2AC32]">
                        <option value="Pendente de Confirmação">Pendente de Confirmação</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Entregue">Entregue</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                      <button onClick={() => excluirPedido(ped.id)} className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors" title="Excluir pedido">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === "estoque" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <header className="mb-6">
              <h2 className="text-3xl font-bold text-[#551844]">Estoque & Cadastro de Salgados</h2>
              <p className="text-sm text-gray-500">Cadastre novos salgados ao cardápio e controle o estoque unitário.</p>
            </header>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-semibold text-[#551844] flex items-center gap-2"><Plus size={20} className="text-[#F2AC32]" /> Cadastrar Novo Tipo de Salgado</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input type="text" placeholder="Nome do Salgado" value={novoSalNome} onChange={(e) => setNovoSalNome(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
                <input type="number" placeholder="Vlr Cento Frito/Assado (R$)" value={novoSalVlrFrito} onChange={(e) => setNovoSalVlrFrito(parseFloat(e.target.value) || 0)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
                <input type="number" placeholder="Vlr Cento Congelado (R$)" value={novoSalVlrCong} onChange={(e) => setNovoSalVlrCong(parseFloat(e.target.value) || 0)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
                <select value={novoSalTipo} onChange={(e) => setNovoSalTipo(e.target.value as any)} className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#F2AC32]">
                  <option value="frito">Frito</option>
                  <option value="assado">Assado</option>
                  <option value="unidade">Unidade</option>
                </select>
              </div>
              <button onClick={adicionarNovoSalgado} className="bg-[#551844] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3d1131] transition-colors flex items-center gap-2">
                <Plus size={16} /> Salvar Novo Salgado
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-semibold text-[#551844] mb-2">Controle de Estoque (Unidades)</h3>
              {cardapio.map((item) => {
                const qtdAtual = estoqueUnidades[item.nome] || 0;
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100/50 transition-colors">
                    <div>
                      <h4 className="font-bold text-[#551844]">{item.nome}</h4>
                      <p className="text-xs text-gray-500 capitalize">Tipo: {item.tipoPreparo} | Cento: R$ {item.valorAssadoFrito.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => atualizarEstoque(item.nome, qtdAtual - 1)}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors" title="Dar baixa (remover 1 unidade)">
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={qtdAtual}
                        onChange={(e) => atualizarEstoque(item.nome, parseInt(e.target.value) || 0)}
                        className="w-20 text-center font-bold text-lg border border-gray-200 rounded-lg p-1.5 bg-white text-[#551844]"
                      />
                      <span className="text-xs text-gray-500">un</span>
                      <button
                        onClick={() => atualizarEstoque(item.nome, qtdAtual + 1)}
                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors" title="Adicionar 1 unidade">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {abaAtiva === "financeiro" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <header className="mb-6">
              <h2 className="text-3xl font-bold text-[#551844]">Financeiro & Faturamento</h2>
              <p className="text-sm text-gray-500">Controle de recebimentos, sinais e faturamento B2B.</p>
            </header>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-xs text-gray-500">Receita Total Confirmada</p>
                <p className="text-2xl font-bold text-green-600">R$ 109,15</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-xs text-gray-500">Sinais a Receber</p>
                <p className="text-2xl font-bold text-amber-600">R$ 54,58</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-xs text-gray-500">Faturamento B2B Empresas</p>
                <p className="text-2xl font-bold text-[#551844]">R$ 0,00</p>
              </div>
            </div>
          </div>
        )}

        {abaAtiva === "calendario" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <header className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#551844]">Calendário de Entregas & Eventos</h2>
                <p className="text-sm text-gray-500">Visualização mensal completa e cadastro de eventos manuais.</p>
              </div>
              <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border">
                <button onClick={() => {
                  if (mesAtual === 0) { setMesAtual(11); setAnoAtual(anoAtual - 1); } else { setMesAtual(mesAtual - 1); }
                }} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20} /></button>
                <span className="font-bold text-[#551844] w-36 text-center">
                  {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][mesAtual]} {anoAtual}
                </span>
                <button onClick={() => {
                  if (mesAtual === 11) { setMesAtual(0); setAnoAtual(anoAtual + 1); } else { setMesAtual(mesAtual + 1); }
                }} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20} /></button>
              </div>
            </header>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-semibold text-[#551844] flex items-center gap-2"><Plus size={20} className="text-[#F2AC32]" /> Adicionar Novo Evento no Calendário</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" placeholder="Título do Evento / Compromisso" value={novoEvTitulo} onChange={(e) => setNovoEvTitulo(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
                <input type="date" value={novoEvData} onChange={(e) => setNovoEvData(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
                <input type="time" value={novoEvHorario} onChange={(e) => setNovoEvHorario(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
              </div>
              <button onClick={adicionarEventoCalendario} className="bg-[#551844] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3d1131] transition-colors flex items-center gap-2">
                <Plus size={16} /> Adicionar Evento
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-xs text-gray-400">
                <span>DOM</span><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {(() => {
                  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
                  const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
                  const diasArray = [];
                  for (let i = 0; i < primeiroDia; i++) {
                    diasArray.push(<div key={`empty-${i}`} className="h-28 bg-gray-50/50 rounded-xl border border-transparent"></div>);
                  }
                  for (let dia = 1; dia <= totalDias; dia++) {
                    const mesStr = String(mesAtual + 1).padStart(2, '0');
                    const diaStr = String(dia).padStart(2, '0');
                    const dataFormatada = `${anoAtual}-${mesStr}-${diaStr}`;

                    const eventosDoDia = eventosCalendario.filter(ev => ev.data === dataFormatada);
                    const temEventos = eventosDoDia.length > 0;

                    diasArray.push(
                      <div key={dia} className={`h-28 p-2 rounded-xl border flex flex-col justify-between overflow-y-auto ${temEventos ? 'bg-amber-50/70 border-amber-300 shadow-xs' : 'bg-white border-gray-100'}`}>
                        <span className={`text-xs font-bold ${temEventos ? 'text-amber-800' : 'text-gray-700'}`}>{dia}</span>
                        <div className="space-y-1">
                          {eventosDoDia.map(ev => (
                            <div key={ev.id} className="bg-[#551844] text-white p-1 rounded text-[10px] leading-tight flex justify-between items-center group">
                              <span className="truncate">{ev.horario} - {ev.titulo}</span>
                              <button onClick={() => excluirEventoCalendario(ev.id)} className="text-white/70 hover:text-white ml-1">×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return diasArray;
                })()}
              </div>
            </div>
          </div>
        )}

        {abaAtiva === "clientes" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <header className="mb-6">
              <h2 className="text-3xl font-bold text-[#551844]">Cadastro de Clientes</h2>
              <p className="text-sm text-gray-500">Gerencie as informações de contato e endereço de seus clientes.</p>
            </header>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-semibold text-[#551844]">Adicionar Novo Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" placeholder="Nome do Cliente" value={novoClienteNome} onChange={(e) => setNovoClienteNome(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
                <input type="text" placeholder="Telefone / WhatsApp" value={novoClienteTel} onChange={(e) => setNovoClienteTel(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
                <input type="text" placeholder="Endereço Completo" value={novoClienteEnd} onChange={(e) => setNovoClienteEnd(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#F2AC32]" />
              </div>
              <button onClick={adicionarCliente} className="bg-[#551844] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3d1131] transition-colors flex items-center gap-2">
                <Plus size={16} /> Salvar Cliente
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <h3 className="text-lg font-semibold text-[#551844] mb-2">Clientes Cadastrados</h3>
              {clientesLista.map((cli) => (
                <div key={cli.id} className="p-4 bg-gray-500/10 rounded-xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-[#551844]">{cli.nome}</h4>
                    <p className="text-xs text-gray-600">Tel: {cli.telefone} | Endereço: {cli.endereco}</p>
                  </div>
                  <button onClick={() => setClientesLista(clientesLista.filter(c => c.id !== cli.id))} className="text-red-400 hover:text-red-600 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
