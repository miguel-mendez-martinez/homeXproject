import React, {Component} from "react"

export default class skateHolder extends Component //Cosas sin cambiar del copypaste
{

    constructor(props) 
    {
        super(props)
        
        this.state = {  //Ver como qedan los campos
            id: this.props.match.params.id,
            image: null,
            size: 0,
            brand: '',
            price: 0
            
        }
    }

    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/DisplayAllSkates/${this.props.match.params.id}`)
        .then(res => {
            if(res.data)
            {            
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    this.state.image = res.data.photo
                    this.state.size = res.data.size
                    this.state.brand = res.data.brand
                    this.state.price = res.data.price                                                         
                }   
            }
            else
            {
                console.log("Record not found")
            }
            this.state.image.map(photo => //checkear el campo
            {
                return axios.get(`${SERVER_HOST}/DisplayAllSkates/photo/${photo.filename}`)
                .then(res => 
                {
                    if(res.data)
                    {            
                        if (res.data.errorMessage)
                        {
                            console.log(res.data.errorMessage)    
                        }
                        else
                        {           
                            document.getElementById(photo.filename).src = `data:;base64,${res.data.image}`                                                         
                        }   
                    }
                    else
                    {
                        console.log("Record not found")
                    }
                })
            })
        }) 
    }
    
    
    render() 
    {
        return (
            <tr>
                <td>{this.state.brand}</td>
                <td>{this.state.size}</td>
                <td>{this.state.price}</td>
                <td className="productPhotos">
                    {this.state.image.map(photo => <img key={photo.filename} id={photo.filename} alt=""/>)}
                </td>           
                <td>
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/modForm/" + this.props.match.params.id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/deleteForm/" + this.props.match.params.id}>Delete</Link> : null}   
                </td>  
                
            </tr>
        )
    }
}