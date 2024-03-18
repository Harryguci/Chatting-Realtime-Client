const FormatTime = (time: string): string => {
    let str = time;
    str = str.replace('T', ' ').substring(0, 16);

    return str;
}

export default FormatTime;
