import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Fonts from "../../../Theme/Fonts";

const TimerSoal = (props) => {
    const [timerCount, setTimer] = useState(props.length ?? 0);

    useEffect(() => {
        let isDelay = false;
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                if (lastTimerCount <= 0) {
                    if (!isDelay) {
                        isDelay = true;
                        props.onDelay();
                        return 5;
                    } else {
                        isDelay = false;
                        clearInterval(interval);
                        props.onFinish();
                        return lastTimerCount;
                    }
                }
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, []);

    return <Text style={{ ...Fonts.primaryColor25Bold }}>{timerCount}</Text>;
};

TimerSoal.propTypes = {
    length: PropTypes.number.isRequired,
    onDelay: PropTypes.func,
    onFinish: PropTypes.func,
};
export default TimerSoal;
