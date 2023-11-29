import { useState, useEffect } from 'react';
import exercisesData from '../../data/db.json'; // Assicurati di impostare il percorso corretto

export default function Table(props) {
  const [exercise, setExercise] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('exerciseData')) || exercisesData.exercises;
      setExercise(storedData);
      setDataLoaded(true);
    }, []);
    
    useEffect(() => {
      if (dataLoaded) {
        localStorage.setItem('exerciseData', JSON.stringify(exercise));
      }
    }, [exercise, dataLoaded]);

    const onChangeInput = (e, i) => {
      const updatedData = exercise.map((ex) =>
        ex.index === i ? { ...ex, [e.target.name]: e.target.value } : ex
      );
      setExercise(updatedData);
    };


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ripetizioni</th>
            <th>Intensità</th>
            <th>Peso</th>
          </tr>
        </thead>
        <tbody>
          {exercise.map((data, i) => (
            <tr key={data.index}>
              {Object.keys(data).map((element) =>
                element !== 'index' ? (
                  element === 'peso' ? (
                    <td key={element}>
                      <input
                        name="peso"
                        type="text"
                        value={data[element]}
                        onChange={(e) => onChangeInput(e, i)}
                        placeholder="Peso"
                      />
                    </td>
                  ) : (
                    <td key={element}>{data[element]}</td>
                  )
                ) : (
                  <></>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
