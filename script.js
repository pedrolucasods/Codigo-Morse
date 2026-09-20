document.addEventListener('DOMContentLoaded',()=>{
    const textField = document.getElementById('text-field')
    const responseField = document.getElementById('response-field')

    document.querySelectorAll('input[type="range"]').forEach((range) => {
        const updateRangeFill = () => {
            const min = Number(range.min) || 0
            const max = Number(range.max) || 100
            const value = Number(range.value) || 0
            const percent = ((value - min) / (max - min)) * 100
            range.style.setProperty('--value', `${percent}%`)
        }

        range.addEventListener('input', updateRangeFill)
        updateRangeFill()
    })

    textField.addEventListener('input',async ()=>{
        if(textField.value){
            responseField.value = ''
            const letter = translate()
            responseField.value += letter
        }else{
            responseField.value = ''
        }

        
    })
})

function translate(){
    const tableMorse = {
        'A': '.-',     'B': '-...',   'C': '-.-.',   'D': '-..',    'E': '.',
        'F': '..-.',   'G': '--.',    'H': '....',   'I': '..',     'J': '.---',
        'K': '-.-',    'L': '.-..',   'M': '--',     'N': '-.',     'O': '---',
        'P': '.--.',   'Q': '--.-',   'R': '.-.',    'S': '...',    'T': '-',
        'U': '..-',    'V': '...-',   'W': '.--',    'X': '-..-',   'Y': '-.--',
        'Z': '--..',
        '0': '-----',  '1': '.----',  '2': '..---',  '3': '...--',  '4': '....-',
        '5': '.....',  '6': '-....',  '7': '--...',  '8': '---..',  '9': '----.',
        ' ': '/'
    };
    const textField = document.getElementById('text-field')
    const valueText = (textField.value).toUpperCase()
    if(valueText == ''){
        return
    }

    let response_text = ''
    for(const caracter of valueText){
        for(const key_morse of Object.keys(tableMorse)){
            if(caracter == key_morse){
                response_text +=tableMorse[key_morse]
            }
        }
    }

    return response_text

}