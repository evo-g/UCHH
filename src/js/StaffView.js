import react from 'react';

export default class StaffView extends React.Componet {
    constructor(props) {
        super(props)
        this.state = {
            active: -1
        }

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({ active: e.target.name })
    }
    render() {
        const { array, staff } = this.props;

        return (
            <div>
                {staff.map(s => <div>
                    <button className="card" name={s.id} onClick={this.handleClick}>{`${s.title} ${s.firstName} ${s.lastName}`}</button>
                    {this.state.active == s.id ? array.filter(a => a.staffId == s.id).map(vis =>
                        <div className='card visita'>
                            <div><label>Timestamp: </label>{' ' + moment(vis.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            <div><label>Staff Member: </label>{` ${s.title} ${s.firstName} ${s.lastName}`}</div>
                            {/* <div><label>Room #: </label>{' ' + rm.roomNum}</div> */}
                        </div>) : <div></div>}
                </div>)}
            </div>
        )
    }
}
