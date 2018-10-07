import React from "react";
import axios from "axios";
import moment from 'moment';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: [],
            rooms: [],
            visits: [],
            roomNum: "",
            selStaff: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { selStaff, roomNum } = this.state;
        axios.post("/api/visits", {
            timestamp: new Date().toISOString(),
            staffId: selStaff,
            roomId: roomNum
        })
            .then(() => {
                axios.get("/api/visits")
                    .then(response => {
                        this.setState({visits: response.data})
                    })
            })
    }

    componentDidMount() {
        axios.get("/api/staff")
            .then(res => {
                axios.get("/api/rooms")
                    .then(r => {
                        axios.get('/api/visits')
                            .then(re => {
                                this.setState({
                                    staff: res.data,
                                    rooms: r.data,
                                    roomNum: r.data[0].id,
                                    selStaff: res.data[0].id,
                                    visits: re.data
                                })
                            })
                    })
            })
    }

    render() {
        const { staff, rooms, visits } = this.state;

        return (
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
                <div>{visits.map(vis => {
                    const doc = staff.find(member => member.id == vis.staffId);
                    const rm = rooms.find(r => r.id == vis.roomId);
                    return <div className='card'>
                        <div className='card-body'>
                            <div><label>Timestamp: </label>{' ' + moment(vis.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            <div><label>Staff Member: </label>{` ${doc.title} ${doc.firstName} ${doc.lastName}`}</div>
                            <div><label>Room #: </label>{' ' + rm.roomNum}</div>
                        </div>
                    </div>
                })}</div>
            </div>
        )
    }
};
