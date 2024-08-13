import React, { useState } from 'react';

const App = () => {
  const ctStyle = {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: 'skyblue',
    textAlign: 'center',
    borderRadius: '7px',
    boxShadow: '0 4px 8px #0000001a',
  };

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  };

  const tbStyle = {
    display: 'grid',
    alignItems: 'center',
    borderRadius: '50px',
    marginTop: '15px',
  };

  const buttonStyle = {
    display: 'flex',
    marginBottom: '-55px',
    gap: '5px',
  };

  const [countries, setCountries] = useState([]);
  const [name, setName] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [bronze, setBronze] = useState('');

  //코드 초기화
  const resetForm = () => {
    setName('');
    setGold('');
    setSilver('');
    setBronze('');
  };

  // 코드 추가
  const handleSubmit = function (e) {
    e.preventDefault();

    if (!name || !gold || !silver || !bronze) {
      alert('모든 입력값을 채워주세요.');
      return;
    }

    const countryExists = countries.some((c) => c.name === name);
    if (countryExists) {
      alert('이미 존재하는 국가입니다.');
      return;
    }

    const newCountries = {
      id: new Date().getTime(),
      name: name,
      gold: gold,
      silver: silver,
      bronze: bronze,
    };
    setCountries([...countries, newCountries]);
    resetForm();
  };

  // 코드 업데이트
  const updateHandler = (event) => {
    event.preventDefault();

    if (!name || !gold || !silver || !bronze) {
      alert('모든 입력값을 채워주세요.');
      return;
    }

    const targetCountry = countries.find((c) => c.name === name);

    if (!targetCountry) {
      alert('해당 국가가 목록에 없습니다.');
      return;
    }

    const newCountries = countries.map((country) => {
      if (country.name === targetCountry.name) {
        return {
          ...country,
          gold,
          silver,
          bronze,
        };
      } else {
        return country;
      }
    });
    setCountries(newCountries);
    resetForm();
  };

  // 코드 삭제
  const deleteHandler = (id) => {
    const filterCountry = countries.filter((countryData) => {
      return countryData.id !== id;
    });
    setCountries(filterCountry);
  };

  return (
    <div>
      <div style={ctStyle}>
        <h1>2024 파리 올림픽</h1>
        <form onSubmit={handleSubmit} style={divStyle}>
          <div>
            <p>국가명</p>
            <input
              value={name}
              onChange={function (c) {
                setName(c.target.value);
              }}
              type='text'
              placeholder='국가 입력'
            />
          </div>
          <div>
            <p>금메달</p>
            <input
              value={gold}
              onChange={function (g) {
                setGold(g.target.value);
              }}
              type='number'
              placeholder='0'
            />
          </div>
          <div>
            <p>은메달</p>
            <input
              value={silver}
              onChange={function (s) {
                setSilver(s.target.value);
              }}
              type='number'
              placeholder='0'
            />
          </div>
          <div>
            <p>동메달</p>
            <input
              value={bronze}
              onChange={function (b) {
                setBronze(b.target.value);
              }}
              type='number'
              placeholder='0'
            />
          </div>
          <div style={buttonStyle}>
            <button type='submit'>국가 추가</button>
            <button type='button' onClick={updateHandler}>
              업데이트
            </button>
          </div>
        </form>
        {countries.length > 0 ? (
          <div style={tbStyle}>
            <table>
              <thead>
                <tr>
                  <th>국가명</th>
                  <th>금메달</th>
                  <th>은메달</th>
                  <th>동메달</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {countries
                  .sort((a, b) => b.gold - a.gold)
                  .map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.gold}</td>
                        <td>{data.silver}</td>
                        <td>{data.bronze}</td>
                        <td>
                          <button onClick={() => deleteHandler(data.id)}>
                            삭제
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>아직 추가된 국가가 없습니다. 메달을 추적하세요!</p>
        )}
      </div>
    </div>
  );
};

export default App;
