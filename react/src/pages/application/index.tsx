import { useParams } from "wouter";

const Application = () => {

    const location = useParams()

    console.log(location)
    return (
        <div>
        <h1>Application</h1>
        </div>
    );
}

export default Application;