function executaCalculadora(){

  document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o elemento HTML com o id "resultado" e armazena em "resultado"
    const resultado = document.querySelector("#resultado");

    // Seleciona todos os botões na página e armazena em "botoes"
    const botoes = document.querySelectorAll("button");

    // Variáveis para rastrear o número atual, o primeiro operando, o operador e reiniciar o cálculo
    let numeroAtual = "";
    let primeiroOperando = null;
    let operador = null;
    let reiniciar = false;

    // Função para atualizar o resultado exibido na tela
    function atualizarResultado(limpar = false) {
      if (limpar) {
        resultado.innerText = "0";
      } else {
        resultado.innerText = numeroAtual.replace(".", ",");
      }
    }

    // Itera sobre todos os botões e adiciona um evento de clique
    botoes.forEach((botao) => {
      botao.addEventListener("click", () => {
        const textoBotao = botao.innerText;

        // Verifica se o texto do botão é um número ou uma vírgula
        if (/^[0-9,]+$/.test(textoBotao)) {
          if (reiniciar) {
            numeroAtual = textoBotao;
            reiniciar = false;
          } else {
            // Verifica se já existe uma vírgula na string "numeroAtual"
            if (textoBotao === "," && numeroAtual.includes(",")) {
              return; // Se já existe uma vírgula, não faça nada
            }
            numeroAtual += textoBotao;
          }
          atualizarResultado();
        } else if (textoBotao === "C") {
          // Limpa todos os valores
          numeroAtual = "";
          primeiroOperando = null;
          operador = null;
          atualizarResultado(true);
        } else if (textoBotao === "±") {
          // Inverte o sinal do número atual, se o número atual estiver vazio, usa o primeiro operando
          numeroAtual = (parseFloat(numeroAtual || primeiroOperando) * -1).toString();
          atualizarResultado();
        } else if (textoBotao === "%") {
          // Calcula o percentual do número atual
          let resultadoPercentual = parseFloat(numeroAtual) / 100;
          if (["+", "-"].includes(operador)) {
            resultadoPercentual = resultadoPercentual * (primeiroOperando || 1);
          }
          // Formata o resultado e atualiza "numeroAtual"
          // Condição para verificar se o resultado percentual tem mais de 2 casas decimais
          if (resultadoPercentual.toString().split(".")[1] && resultadoPercentual.toString().split(".")[1].length > 2) {
            numeroAtual = resultadoPercentual.toFixed(2).toString();
          } else {
            numeroAtual = resultadoPercentual.toString();
          }
          atualizarResultado();
        } else if (["+", "-", "*", "÷"].includes(textoBotao)) {
          // Verifica se já existe um operador e, se não, armazena o operador e o primeiro operando
          if (numeroAtual && !operador) {
            primeiroOperando = parseFloat(numeroAtual.replace(",", "."));
            numeroAtual = "";
            operador = textoBotao;
          }
        } else if (textoBotao === "=") {
          // Realiza o cálculo quando o botão de igual é pressionado
          if (numeroAtual && operador) {
            let segundoOperando = parseFloat(numeroAtual.replace(",", "."));
            let valorResultado;

            if (operador === "÷" && segundoOperando === 0) {
              // Lida com a divisão por zero
              numeroAtual = "Error ×͜×";
            } else {
              // Realiza a operação com base no operador
              switch (operador) {
                case "-":
                  valorResultado = primeiroOperando - segundoOperando;
                  break;
                case "*":
                  valorResultado = primeiroOperando * segundoOperando;
                  break;
                case "+":
                  valorResultado = primeiroOperando + segundoOperando;
                  break;
                case "÷":
                  valorResultado = primeiroOperando / segundoOperando;
                  break;
              }

              // Formata o resultado e atualiza "numeroAtual"
              if (valorResultado.toString().split(".")[1] && valorResultado.toString().split(".")[1].length > 2) {
                numeroAtual = parseFloat(valorResultado.toFixed(2)).toString();
              } else {
                numeroAtual = valorResultado.toString();
              }
            }

            // Limpa operador e primeiro operando, define "reiniciar" para true e atualiza o resultado
            operador = null;
            primeiroOperando = null;
            reiniciar = true;
            atualizarResultado();
          }
        }
      });
    });
  });

}

executaCalculadora()