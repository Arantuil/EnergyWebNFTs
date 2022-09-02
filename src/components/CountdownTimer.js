import { useEffect, useState } from "react";

function CountdownTimer() {
    const calculateTimeLeft = () => {
        const difference = +new Date(2022, 8, 17, 21) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
    return (
        <div className='font-bold text-base md:text-lg'>
            <h2 id='gradienttimer'>{timerComponents.length ? timerComponents : <span>Tubby Turtles has launched!🎉</span>}</h2>
        </div>
    );
}

export default CountdownTimer;