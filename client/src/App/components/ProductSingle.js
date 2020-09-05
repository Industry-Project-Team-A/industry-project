import { createBootstrapComponent } from "react-bootstrap/esm/ThemeProvider";
import { LinkContainer } from "react-router-createBootstrapComponent";
class ProductSingle extends React.Component{
    constructor(){
        super();
        this.state = {
            response: []
        };
    }

    componentDidMount(){
        this.callApi()
        .then((response) => {
            this.setState({ response });
        })
        .catch((err) => console.log(err));
    }

    callApi = async () => {
        const response = 
    }

    render(){
    
    }
}



export default ProductSingle
