class ItemWrap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {items:this.props.items}
        this.change_state = this.change_state.bind(this);
    }

    componentDidMount(){
        console.log(this.state);
    }
    change_state(i){
        var items = this.state.items.slice();
        items[i]["selected"] = 1 - items[i]["selected"];
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken",token);
        formData.append("add",items[i]["selected"]);
        formData.append("place_id",items[i]["place_id"]);
        fetch("", {method:"POST", body:formData}).then((response)=>response.json()).then((resp)=>console.log(resp));

        this.setState({items:items});
        console.log("change-state", this.state.items);
    }

    render() {
        return (
            <div>
                <h2>Choose places you have visited recently</h2>
                <button className={"btn btn-lg btn-primary"}
                onClick={()=>window.location.href="/rec"}>Recommend places</button>
                <div className="row d-flex">
                {this.state.items.map((item, index)=>
                    <Item change_state={this.change_state} item={item} index={index}
                    key={index}/>)
                }
                    </div>
            </div>
        )
    }
}

class RecWrap extends React.Component{
    constructor(props) {
        super(props);
        this.change_state = this.change_state.bind(this);
    }

    componentDidMount(){
        console.log(this.state);
    }

    change_state(i){
        console.log("change-state");
    }

    render() {
        return (
            <div>
                <h2>These places are very near</h2>
                <div className="row d-flex">
                {this.props.items.map((item, index)=>
                    <Item change_state={this.change_state} item={item} index={index}
                    key={index}/>)
                }
                </div>

                <h2>Your friends visit these places</h2>
                <div className="row d-flex">
                {this.props.itemsf.map((item, index)=>
                    <Item change_state={this.change_state} item={item} index={index}
                    key={index}/>)
                }
                </div>

                <h2>You frequently go here</h2>
                <div className="row d-flex">
                {this.props.myitems.map((item, index)=>
                    <Item change_state={this.change_state} item={item} index={index}
                    key={index}/>)
                }
                </div>

            </div>
        )
    }
}


class Item extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
    }
    get_class(){
        var c = "item"
        if(this.props.item.selected){
            c += " item-select"
        }
        return c
    }

    render(){
        return(
            <div className={"col-md-3"}>
                <div className={this.get_class()} onClick={()=>this.props.change_state(this.props.index)}>
                    <h2> {this.props.item.name} {this.props.item.place_id} </h2>
                    <p> {this.props.item.desc} </p>
                    <span className={"id-span"}>
                        {this.props.item.loc_id}
                    </span>
                </div>
            </div>
        )
    }

}
