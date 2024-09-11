// Catálogo de produtos
const produtos = [
    { id: 1, nome: 'Sela de Couro Tradicional', preco: 350.00, imagem: 'assets/sela.png' },
    { id: 2, nome: 'Sela Western Premium', preco: 450.00, imagem: 'assets/sela1.png' },
    { id: 3, nome: 'Arreio de Montaria Simples', preco: 120.00, imagem: 'assets/freio.png' }
  ];
  
  let carrinho = [];
  let total = 0.00;
  
  // Função para exibir produtos no catálogo
  function exibirCatalogo() {
    const catalogo = document.getElementById('catalogo');
    produtos.forEach(produto => {
      const produtoElement = document.createElement('div');
      produtoElement.classList.add('produto');
      
      produtoElement.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
      `;
      
      catalogo.appendChild(produtoElement);
    });
  }
  
  // Função para adicionar produtos ao carrinho
  function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
  }
  
  // Função para atualizar o carrinho de compras
  function atualizarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    carrinhoElement.innerHTML = '';
    
    if (carrinho.length === 0) {
      carrinhoElement.innerHTML = '<p>Seu carrinho está vazio.</p>';
      total = 0.00;
    } else {
      carrinho.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        carrinhoElement.appendChild(itemElement);
      });
    }
  
    atualizarTotal();
  }
  
  // Função para atualizar o total do carrinho
  function atualizarTotal() {
    total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.querySelector('.total span').textContent = total.toFixed(2);
  }
  
  // Função para finalizar a compra e enviar os dados para o WhatsApp
  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
      return;
    }
  
    // Cria a mensagem para enviar ao WhatsApp
    let mensagem = 'Resumo da Compra:'
    ;
    carrinho.forEach((item) => {
      mensagem += ` ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `\nTotal: R$ ${total.toFixed(2)}\n `;
    mensagem += '\n Qual será a forma de pagamento Aceitamos : PIX , DEBITO \n'
    // Codifica a mensagem para ser usada em uma URL
    const mensagemEncoded = encodeURIComponent(mensagem);
  
    // Número de telefone de destino (exemplo)
    const telefone = '5564996094976';  
    
    // Gera o link do WhatsApp com a mensagem
    const whatsappURL = `https://wa.me/${telefone}?text=${mensagemEncoded}`;
  
    // Redireciona o usuário para o WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpa o carrinho após finalizar a compra
    carrinho = [];
    atualizarCarrinho();
  }
  
  // Inicializa o catálogo ao carregar a página
  window.onload = exibirCatalogo;
  