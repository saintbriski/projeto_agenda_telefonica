const form = document.getElementById('form-agenda');
const checkimage = document.querySelector('form img');
const formInputs = document.querySelectorAll('form input');
const inputTelFormulario = document.getElementById('tel-formulario');
const inputNomeFormulario = document.getElementById('nome-formulario');
const telefone = [];
const nome = []; 

let linhas = ''; 

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const numeroTelefone = inputTelFormulario.value.replace(/\D/g, '');
    const numeroDeTelefoneFormatado = formataNumeroTelefone(numeroTelefone);
    inputTelFormulario.value = numeroDeTelefoneFormatado; 

    if (numeroTelefone.length < 11) {
        alert('O número de telefone deve conter no mínimo 11 dígitos.');
        return; 
    }

    adicionaLinha();
    atualizaTabela();
    checkimage.style.display = 'block';
});

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        checkimage.style.display = 'none'; 
    })
});

inputTelFormulario.addEventListener('blur', function() {
    const numeroTelefone = inputTelFormulario.value.replace(/\D/g, '');
    const numeroDeTelefoneFormatado = formataNumeroTelefone(numeroTelefone);
    inputTelFormulario.value = numeroDeTelefoneFormatado; 
});

inputNomeFormulario.addEventListener('input', function () {
    const nomeDigitado = inputNomeFormulario.value;

    if (!/^[A-Za-zÁáÉéÍíÓóÚúÂâÊêÎîÔôÛûÃãÕõÇçÀàÈèÌìÒòÙùÄäËëÏïÖöÜüÿÑñ ]+$/.test(nomeDigitado)) {
        inputNomeFormulario.setCustomValidity('O campo deve conter somente letras.');
    } else {
        inputNomeFormulario.setCustomValidity('');
    }
});

function formataNumeroTelefone(numeroTelefone) {
    const ddd = numeroTelefone.slice(0, 2);
    let primeiraParte = numeroTelefone.slice(2, 7);
    let segundaParte = numeroTelefone.slice(7);

    if (numeroTelefone.length > 10) {
        segundaParte = numeroTelefone.slice(-4);
    } 

    let numeroFormatado = `(${ddd}) ${primeiraParte}`;

    if (segundaParte.length > 0) {
        numeroFormatado += `-${segundaParte}`;
    }

    return numeroFormatado; 
};

function adicionaLinha() {
    const inputNomeFormulario = document.getElementById('nome-formulario');
    const inputTelFormulario = document.getElementById('tel-formulario');

    if (telefone.includes(inputTelFormulario.value)) {
        alert(`O telefone: ${inputTelFormulario.value} já foi inserido`);
    } else {
        telefone.push(inputTelFormulario.value);
        nome.push(inputNomeFormulario.value);

        let linha ='<tr>';
        linha += `<td>${inputNomeFormulario.value}</td>`;
        linha += `<td>${inputTelFormulario.value}</td>`;
        linha += `</tr>`;
        
        linhas += linha;
    }

    inputNomeFormulario.value = '';
    inputTelFormulario.value = '';
};

function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
};

