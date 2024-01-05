const btCadastrarClientes = document.querySelector("#cadastrarCliente");
const btFecharModal = document.querySelector("#btFecharModal");
const btSalvar = document.querySelector("#btSalvar");
const tbody = document.querySelector("#tbCliente>tbody")
const modal = document.querySelector(".modal");

const getLocalStorage = () => JSON.parse(localStorage.getItem("dbCliente")) ?? []; //se for vazio ou nulo, retorna um vetor vazio
const setLocalStorage = (dbCliente) => localStorage.setItem("dbCliente", JSON.stringify(dbCliente));

const validarCampos = () => {
    return document.getElementById("form").reportValidity();
}

const adicionarCliente = () => {
    if (validarCampos()) {
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        };

        const flag = document.getElementById('nome').dataset.flag;
        const indice = document.getElementById('nome').dataset.indice;

        if (flag == "velho") {
            atualizarTabela();
            atualizarCliente(indice, cliente);
            document.getElementById('nome').dataset.flag = "novo";
        } else {
            salvarCliente(cliente);
        }
    }
}

const salvarCliente = (cliente) => {
    const dbCliente = getLocalStorage();
    dbCliente.push(cliente);
    setLocalStorage(dbCliente);
    atualizarTabela(cliente);
    fecharModal();
}

const limparTabela = () => {
    const linhas = document.querySelectorAll("#tbCliente>tbody tr");
    linhas.forEach(linha => linha.parentNode.removeChild(linha));
}

const criarBtEditar = (cliente, indice) => {
    btEditar = document.createElement('button');
    btEditar.classList.add("botao");

    const imagemBtEditar = document.createElement('img');
        imagemBtEditar.setAttribute('src', 'img/pincel.png');
        btEditar.append(imagemBtEditar);


    btEditar.addEventListener("click", () => {
        document.getElementById('nome').dataset.indice = indice
        adicionarCliente();
        abrirModal();
        preencherCampos(cliente);
    })

    td = document.querySelectorAll("#botoes");
    td.forEach((e)=>{
        e.append(btEditar);
        
    })
    
}

const criarBtExcluir = (indice) => {
    btExcluir = document.createElement('button');
    btExcluir.classList.add("botao");

    const imagemBtExcluir = document.createElement('img');
        imagemBtExcluir.setAttribute('src', 'img/deletar.png');
        btExcluir.append(imagemBtExcluir);

    btExcluir.addEventListener("click", () => {
        if(confirm("Você confirma a exclusão?")){
            const dbCliente = getLocalStorage();
            dbCliente.splice(indice, 1);
            setLocalStorage(dbCliente);
            atualizarTabela();
        }else{
            return;
        }
    })

    td = document.querySelectorAll("#botoes");
    td.forEach((e)=>{
        e.append(btExcluir);
       
    });
}

const atualizarTabela = () => {
    const dbCliente = getLocalStorage();
    limparTabela();
    dbCliente.forEach((cliente, indice) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.celular}</td>
    <td>${cliente.cidade}</td>
    <td id="botoes">
    </td>
    `
        document.querySelector("#tbCliente>tbody").appendChild(novaLinha);

        criarBtEditar(cliente, indice);
        criarBtExcluir(indice);

    })
}

atualizarTabela();

const limparCampos = () => {
    const campos = document.querySelectorAll(".modal_field");
    for (let i = 0; i < campos.length; i++) {
        campos[i].value = "";
    }
}

const preencherCampos = (cliente) => {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('celular').value = cliente.celular;
    document.getElementById('cidade').value = cliente.cidade;
    document.getElementById('nome').dataset.flag = "velho" //
}

const atualizarCliente = (indice, cliente) => {
    const dbCliente = getLocalStorage();
    dbCliente[indice] = cliente;
    setLocalStorage(dbCliente);
    atualizarTabela(cliente);
    fecharModal();
}

const abrirModal = () => modal.classList.add("active");

const fecharModal = () => {
    limparCampos();
    modal.classList.remove("active");
}

btCadastrarClientes.addEventListener("click", abrirModal);
btFecharModal.addEventListener("click", fecharModal);

btSalvar.addEventListener("click", adicionarCliente);




