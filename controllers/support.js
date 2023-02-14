class Support{
    isChar(char){
        return (/[a-zA-Z]/).test(char);
    }

    isNum(num){
        return (/[0-9]/).test(num);
    }
}

export default Support;