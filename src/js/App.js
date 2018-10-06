import React from "react";
import axios from "axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: [],
            rooms: [],
            roomNum: "",
            selStaff: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/api/visits", {
            timestamp: new Date().toISOString(),
            staffId: this.state.selStaff,
            roomId: this.state.roomNum
        })
    }

    componentDidMount() {
        axios.get("/api/staff")
        .then(res => {
            axios.get("/api/rooms")
            .then(r => {
                this.setState({
                    staff: res.data,
                    rooms: r.data,
                    roomNum: r.data[0].id,
                    selStaff: res.data[0].id
                })
            })
        })
    }

    render() {
        const { staff, rooms } =this.state;

        return(
            <div>
                <h1>MEDifications</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                <label>Room #</label>
                <select onChange={this.handleChange} name="roomNum">{
                    rooms.map(room => {
                        return <option value={room.id} >{room.roomNum}</option>
                    })
                }</select>
                </div>
                <div className="form-group">
                <label>Staff Member</label>
                <select onChange={this.handleChange} name="selStaff">{
                    staff.map(s => {
                        return <option value={s.id} >{`${s.title} ${s.firstName} ${s.lastName}`}</option>
                    })
                }</select>
                </div>
                <button className="submit btn btn-info">Visit</button>
                </form>

            </div>
        )
    }
 };
