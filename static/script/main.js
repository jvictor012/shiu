let audioContext;
let analyser;
let dataArray; // Declaradas aqui fora para serem globais
let dec = window.document.querySelector('#decib')

async function iniciarCaptura() {
    if (audioContext){
        console.warn("Áudio já ativo!");//evita que comece a gravação duas vezes
        return
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});//solicita permissão para acessar o microfone
        audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream) //transforma o stream de áudio em um AudioNode
        console.log("Captura de áudio iniciada com sucesso!", source);

        analyser = audioContext.createAnalyser(); //cria um analisador de áudio para processar o áudio capturado
        analyser.fftSize = 2048;

        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);   

        source.connect(analyser); //conecta a fonte de áudio ao analisador

        console.log("analisando...");
        renderizar(); //chama a função de renderização para processar o áudio em tempo real

    } catch (err) {
        console.error("O usuário negou o microfone ou erro de hardware", (err));
    }   
}

function renderizar() {
    analyser.getByteTimeDomainData(dataArray); //obtém os dados de áudio em tempo real

    //--------------------------calculo da amplitude-----------------------------------
    let somaquadrados = 0; 
    for (let i = 0; i < dataArray.length; i++){ // isso vai deixar o array com um ponto máximo de 127 e um ponto minimo de -128, sendo 0 o silêncio.
        let amplitude = (dataArray[i] - 128)/128;
        somaquadrados += amplitude * amplitude
    }

    // isso calcula a energia que o som fez. 
    let rms = Math.sqrt(somaquadrados / dataArray.length);

    // agora é só converter rms para decibeis 
    let db = 20 * Math.log10(Math.max(rms, 0.0001));
    let dbExibicao = Math.max(0, db + 100); 

    console.log(`${dbExibicao.toFixed(1)} dB`);
    dec.innerText = dbExibicao.toFixed(1);

    requestAnimationFrame(renderizar);

    //-----------------------fim do calculo da amplitude-------------------------------

}

// passo 1 - criar a porta de entrada com o audio AudioContext
// passo 2 - pedir a permissão do microfone do  user quando a função for chamada
// passo 3 - criar um novo contexto de audio
// passo 4 - transformar o audiosource em um AudioNode usando createmediastreamsource(stream)
