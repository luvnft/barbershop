import { setHours, setMinutes, format, addMinutes } from 'date-fns'

export function generateDayTimeList(date: Date): string[] {
    const startTime = setMinutes(setHours(date, 9), 0); //set tempo de início de trabalho por exemplo, das 9 da manhã
    const endTime = setMinutes(setHours(date, 21), 0); //set tempo de encerramento do expediente ex 21h
    const interval = 45; // intervalo em minutos
    const timeList: string[] = [];
    let currentTime = startTime; // tempo atual
    
    while (currentTime <= endTime) {
        timeList.push(format(currentTime, "HH:mm"));
        currentTime = addMinutes(currentTime, interval)
    }
    return timeList;
}