import {useState, useEffect} from 'react';

export default function timer(){
    const [second, setSecond] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        let number = null;
        
        if(isActive > 0 && second > 0){
            number = setInterval(() => {
                setSecond(second => second - 1);
            },
            1000
            );
        }
        else if (second == 0){
            clearInterval(number);
        }

        return () => clearInterval(number);

    },
    [isActive, second]
    );

    function Starting() {
        if(userInput > 0) {
            setSecond(parseInt(userInput));
        }
        setIsActive(true);
    }

    function StartTimeDif(t){
        setUserInput(t.target.value);
    }

    return (
        <div>
            <input type="number" value={userInput} onChange={StartTimeDif} />
            <button onClick={Starting}>Start!</button>
            <br /><br />
            <h1>You have {second} seconds left.</h1>
        </div>
    );

}


