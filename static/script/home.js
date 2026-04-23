const filtro = document.querySelector('.filtro').value; 
async function carregar_produtos() {
    const resposta = await fetch('/api/produtos');
    const dados = await resposta.json();
    const lista = document.querySelector('.minha-lista');

    dados.forEach(produto => {
        const item = document.createElement('li');
        if (filtro == "0"){
            item.textContent = `Nome: ${produto.nome} - Categoria ${produto.categoria} - ${produto.barulho} dB`
            lista.appendChild(item)
        } else if (filtro == "1"){
            if (produto.categoria == "Utensílios de Cozinha"){
                item.textContent = `Nome: ${produto.nome} - Categoria ${produto.categoria} - ${produto.barulho} dB`
                lista.innerHTML = ''
                lista.appendChild(item)
            }
        }else if(filtro == "2"){
            if (produto.categoria == "Casa e Construção"){
                item.textContent = `Nome: ${produto.nome} - Categoria ${produto.categoria} - ${produto.barulho} dB`
                lista.appendChild(item)
            }
        }else if(filtro=="3"){
            if (produto.categoria == "Tecnologia e Eletrônicos"){
                item.textContent = `Nome: ${produto.nome} - Categoria ${produto.categoria} - ${produto.barulho} dB`
                lista.appendChild(item)
            }
        }else if(filtro == "4"){
            if (produto.categoria == "Esportes"){
                item.textContent = `Nome: ${produto.nome} - Categoria ${produto.categoria} - ${produto.barulho} dB`
                lista.appendChild(item)
            }
        }
    });
}
carregar_produtos();