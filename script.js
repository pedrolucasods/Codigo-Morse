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
            show_values_input_range()
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

function show_values_input_range(){
    const input_speed = document.getElementById('input-speed')
    const input_tone = document.getElementById('input-tone')
    const input_volume = document.getElementById('input-volume')

    const h5_speed = document.getElementById('value-speed')
    h5_speed.textContent = `${input_speed.value} WPM`
    const h5_tone = document.getElementById('value-tone')
    h5_tone.textContent = `${input_tone.value}Hz`
    const h5_volume = document.getElementById('value-volume')
    h5_volume.textContent = `${input_volume.value}%`
}