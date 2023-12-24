import * as moment from "moment";

export const getOrderId = () => {
    const uniqueNumber = Math.floor(10000 + Math.random() * 90000);
    const now = moment();
    const year = now.format("YY");
    const month = now.format("MM");
    const day = now.format("DD");
    const hour = now.format("HH");
    const minutes = now.format("mm");
    const second = now.format("ss");
    const unique = `NEK-${year}${month}-${day}${hour}${minutes}${second}-${uniqueNumber}`;
    return unique;
}