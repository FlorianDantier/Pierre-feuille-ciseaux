import {Component} from "react"
import Table from "react-bootstrap/Table"
import ConvertStats from "../ConvertStats"


class Stats extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        console.log(this.props.Statistiques)
        let Tabstatistiques = ConvertStats.convertStats2([... this.props.Statistiques], this.props.user)
        console.log('Result convert stats : ',Tabstatistiques)
        Tabstatistiques = Tabstatistiques.map((e,i) =>
            <tr key={i}>
                <td className={e.won === 'Gagné' ? 'alert-success' : 'alert-danger'}>{i}</td>
                <td className={e.won === 'Gagné' ? 'alert-success' : 'alert-danger'}>{e.opponent}</td>
                <td className={e.won === 'Gagné' ? 'alert-success' : 'alert-danger'}>{e.won}</td>
            </tr>
        )

        return <Table striped bordered hover>
            <thead>
            <tr>
                <th className="">#</th>
                <th>Adversaire</th>
                <th>Victoire/Défaite</th>
            </tr>
            </thead>
            <tbody>
            {Tabstatistiques}
            </tbody>
        </Table>
    }
}

export default Stats