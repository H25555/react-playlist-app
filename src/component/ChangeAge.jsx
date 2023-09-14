import { useState } from "react";

function ChangeAge(){
    const [age, setAge] = useState(18);
    return(
        <div>
            <h1>{age}</h1>
            <button onClick={() => setAge(age +1)}> Increase </button>
            <button onClick={() => setAge(age -1)}> Decrease </button>
        </div>
    )
}
export default ChangeAge;