const meuJogo = {
    jogadas: ["", "", "", "", "", "", "", "", ""],
    player1: 0,
    player2: 0,
    mensagemFim: document.getElementById("msg-end"),
    janelaModal: document.getElementById('modal'),
    opcoes: ['X', 'O'],
    valorAtual: 0,
    canPlay: true,
    sequenciasWin: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    clickBox(box) {
        if (!this.jogadas[box - 1] && this.canPlay) {
            document.querySelector(`#container div:nth-child(${box})`).innerHTML = this.opcoes[this.valorAtual];
            this.jogadas[box - 1] = this.opcoes[this.valorAtual];

            let ganhador = this.verificaVitoria(this.opcoes[this.valorAtual])
            if (ganhador) {
                this.canPlay = false;
                this.mudaCorDiv(ganhador, 'rgb(21, 102, 52)')
                setTimeout(() => {
                    this.finalizaJogo(this.opcoes[this.valorAtual], ganhador)
                }, 1000)
            } else {
                if(this.deuVelha()){
                   setTimeout( () => {this.msgVitoria(0)}, 200);
                }else{
                this.mudaValorAtual();
                }
            }
        }
    },

    mudaValorAtual() {
        this.valorAtual === 0 ? this.valorAtual = 1 : this.valorAtual = 0;
    },

    restart(aux = 1) {
        if (aux >= 10) {
            return this.mudaValorAtual();
        }
        document.querySelector(`#container div:nth-child(${aux})`).innerHTML = "";
        this.jogadas[aux - 1] = "";
        return this.restart(aux + 1)
    },

    verificaVitoria(char) {
        for (let i in this.sequenciasWin) {
            if (this.jogadas[this.sequenciasWin[i][0]] == char &&
                this.jogadas[this.sequenciasWin[i][1]] == char &&
                this.jogadas[this.sequenciasWin[i][2]] == char) {
                return this.sequenciasWin[i];
            }
        }
        return false;
    },

    finalizaJogo(player, sequencia) {
        this.canPlay = true;
        this.msgVitoria(player)
        this.mudaCorDiv(sequencia, 'white')
        this.restart()
    },

    mudaCorDiv(seq, cor) {
        for (let i of seq) {
            document.querySelector(`#container div:nth-child(${i + 1})`).style.color = cor;
        }
    },

    msgVitoria(player) {
        this.janelaModal.style.display = 'block';
        if (player === 'X') {
            this.mensagemFim.innerHTML = 'Player 1 venceu!';
            this.player1 += 1;
        } else if(player === 'O') {
            this.mensagemFim.innerHTML = 'Player 2 venceu!';
            this.player2 += 1;
        }else{
            this.mensagemFim.innerHTML = 'Deu velha!'
            this.restart();
        }
        this.mudaPlacar();
    },

    fechaModal() {
        this.janelaModal.style.display = 'none';
    },

    mudaPlacar() {
        document.getElementById('player1').innerHTML = this.player1;
        document.getElementById('player2').innerHTML = this.player2;
    },

    zeraPlacar() {
        this.player2 = 0;
        this.player1 = 0;
        this.restart()
        this.mudaPlacar()
    },

    deuVelha(){
        for(let i in this.jogadas){
            if(!this.jogadas[i]){
                return false;
            }
        }
        return true;
    }
}
