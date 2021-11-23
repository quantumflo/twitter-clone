import DOMPurify from 'dompurify';

export const truncateText = (text, lines) => {
    if (!text)
        return ''
    let n = 0, i = 0
    let length = text.length
    for (i = 0; i < length; i++)
        if (text[i] === '\n')
            if (n++ >= lines - 1)
                break
    return text.slice(0, i) + ((length > i + 1) ? ' ...' : '')
}

export function numFormatter(num) {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(2) + 'K'; 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; 
    } else if (num < 1000) {
        return num; 
    }
}


export function filterInput(input = '', type = 'custom', {
    min_length: min = 1,
    max_length: max = 70,
    regex: reg = null,
    identifier = null
} = {}) {
    identifier = identifier || `input {${type}}`
    input = input.toString().trim()
    let regexes = {
        username: RegExp(`^[_a-zA-Z0-9]{${min},${max}}$`),
        password: RegExp(`^\\S{${min},${max}}$`),
        name: RegExp(`^.{${min},${max}}$`),
    }
    if (!reg) {
        reg = regexes[type]
    }
    if (reg) {
        if (!reg.test(input)) {
            throw Error(`${identifier} must match regex: ${reg} (range between ${min} and ${max} characters)`)
        }
    }
    if (type === 'html')
        input = DOMPurify.sanitize(input, { ALLOWED_TAGS: ['b'] }).trim()
    if (input.length > max || input.length < min) {
        throw Error(`${identifier} must be minimum ${min} and maximum ${max} characters`)
    }
    if (input.includes('\n')) 
        input = input.replace(/\n+/g, '\n').trim()
        
    return input;
}