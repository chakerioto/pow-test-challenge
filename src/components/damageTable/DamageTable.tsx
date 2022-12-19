import './DamageTable.scss';

type DamageStringMap = Record<number, string>;
interface DamageTableProps {
    damage: DamageStringMap;
}

const DamageTable = ({ damage = {} }: DamageTableProps) => {
    return (
        <table className="d-table-container">
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Damage</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(damage).length
                    ? Object.keys(damage).map((el: string, index: number) => {
                          return (
                              <tr key={index}>
                                  <td>{el}</td>
                                  <td>{damage[`${parseInt(el)}`]}</td>
                              </tr>
                          );
                      })
                    : null}
            </tbody>
        </table>
    );
};

export default DamageTable;
