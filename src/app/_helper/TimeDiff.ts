function TimeDiff(time1: number, time2: number): string {
    let diff = Math.abs(time2 - time1); // Result in milliseconds
    
    // let ms = diff % 1000;
    let ss = Math.floor(diff / 1000) % 60;
    let mm = Math.floor(diff / 1000 / 60) % 60;
    let hh = Math.floor(diff / 1000 / 60 / 60);

    let txt = mm > 0 ? `${mm}m` : `${ss}s`;
    if (hh > 0) txt = `${hh}h`;

    return txt;
}
export default TimeDiff;
