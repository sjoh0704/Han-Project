const auctionTimer = (createdAt) => {
    if (!createdAt) {
        return "...";
    }

    let [time] = createdAt.split(".");
    let [date, hours] = time.split("T");
    let [year, month, day] = date.split("-").map((item) => Number(item));
    let [hour, min, sec] = hours.split(":").map((item) => Number(item));
    const _createdAt = new Date(year, month - 1, day, hour, min, sec);
    const now = new Date();

    let _date = `${date} ${hour}:${min}`;

    let gap = _createdAt - now;
    if (gap < 0) {
        return "마감";
    }

    let _hour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let _min = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    let _sec = Math.floor((gap % (1000 * 60)) / 1000);
    return _hour + "시간 " + _min + "분 " + _sec + "초";
};

export default auctionTimer;
