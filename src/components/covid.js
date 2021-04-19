import React,{useState, useEffect} from  "react";
import api from '../services/api';
import "./covid-style.css";

function Covid() {

  const [casos, setCasos] = useState([]);
  const [paises, setPaises] = useState([]);

  async function listPaises() {
    const response = await api.get("/cases?country");
    var arr = [];
    Object.keys(response.data).forEach(element => {
        arr.push(element)
    });
    setPaises(arr)
}

  useEffect(() => {
    listPaises();
  },[])

  async function listCasos(pais) {
    const response = await api.get(`/cases?country=${pais}`);
    setCasos(response.data.All)
  }

  return (
      <div>
        <div className="search-country">
          <h3>Selecione o país: </h3>

          <select onChange={(event) => {
            listCasos(event.target.value)
            }}>
              {paises.map((item) => {
                  return <option value={item}>{item}</option>
              })}
          </select>
              <strong>{`Cases confimados: ${casos ? casos.confirmed : ' '}`}</strong>
              <strong>{`Pessoas recuperadas: ${casos ? casos.recovered : ' '}`}</strong>
              <strong>{`Mortes confirmadas: ${casos ? casos.deaths : ' '}`}</strong>
        </div>
      </div>
  );
}
export default Covid;