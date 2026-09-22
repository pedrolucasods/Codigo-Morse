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
        let frequency_elements = document.querySelector('.frequency-elements')
        frequency_elements.replaceChildren()
        if(textField.value){
            responseField.value = ''
            const letter = translate()
            responseField.value += letter
            create_frequency(responseField.value)
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


function create_frequency(text_morse){
    let frequency_elements = document.querySelector('.frequency-elements')
    for(const caracter of text_morse){
        let element_freq = document.createElement('div')
        if(caracter == '.'){
            element_freq.classList.add('dit')
        }else if(caracter == '-'){
            element_freq.classList.add('dah')
        }else if(caracter == '/'){
            element_freq.classList.add('silence')
        }
        frequency_elements.appendChild(element_freq)
    }
    resize_frequency()
}

function resize_frequency(){
    const frequencyElements = document.querySelector('.frequency-elements')
    const availableWidth = frequencyElements.clientWidth - 10
    const gapWidth = 6
    const baseWidths = {
        dit: window.innerWidth * 0.013,
        dah: window.innerWidth * 0.035,
        silence: window.innerWidth * 0.045
    }
    const elementsWidth = [...frequencyElements.children].reduce((total, element) => {
        return total + baseWidths[element.className]
    }, 0)
    const gapsWidth = Math.max(frequencyElements.children.length - 1, 0) * gapWidth
    const totalWidth = elementsWidth + gapsWidth
    const scale = totalWidth > availableWidth ? availableWidth / totalWidth : 1

    frequencyElements.style.setProperty('--frequency-gap', `${gapWidth * scale}px`)
    frequencyElements.style.setProperty('--dit-width', `${baseWidths.dit * scale}px`)
    frequencyElements.style.setProperty('--dah-width', `${baseWidths.dah * scale}px`)
    frequencyElements.style.setProperty('--silence-width', `${baseWidths.silence * scale}px`)
}

window.addEventListener('resize', resize_frequency)
