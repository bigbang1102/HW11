const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
function SumInfo({ color, size, counters }) {
    const sum = counters.reduce((acc, counter) => acc + counter.number, 0);
    console.log("sum:",sum)
    const stTitle = {
        color: color,
        fontSize: size === 'big' ? '50px' : '40px'
    };

    return (
        <div className='counters'>
            <h1 class="bts" style={stTitle}>Sum = {sum}</h1>
        </div>
    );
}

function Counter({ item: { id, number }, hdlUpdate, hdlRemoveCounter }) {
    return (
        <div className='counter'>
            <button class="btn" onClick={() => hdlUpdate(id, -1)}> - </button>
            <h3 class="ctc">{number}</h3>
            <button class="btn"onClick={() => hdlUpdate(id, 1)}> + </button>
            <button class="btn"onClick={() => hdlUpdate(id, -number)}> C </button>
            <button class="btn"onClick={() => hdlRemoveCounter(id)}> X </button>
        </div>
    );
}

function App() {
    const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);

    const hdlUpdate = (id, num) => {
        const cloneCounters = [...counters];
        let idx = cloneCounters.findIndex(el => el.id === id);
        if (cloneCounters[idx].number + num < 0) {
            return;
        }
        cloneCounters[idx].number += num;
        setCounters(cloneCounters);
    };

    const hdlAddCounter = () => {
        let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
        const cloneCounters = [...counters];
        cloneCounters.push({ id: newId, number: 0 });
        setCounters(cloneCounters);
    };

    const hdlRemoveCounter = id => {
        const updatedCounters = counters.filter(counter => counter.id !== id);
        setCounters(updatedCounters);
    };

    return (
        <>
            <h1 className='text-center'>Codecamp Academy 01</h1>
            <button className='text-center' onClick={hdlAddCounter}>
                Add Counter
            </button>
            <SumInfo color="red" size="big" counters={counters} />
            {counters.map(el => (
                <Counter
                    key={el.id}
                    item={el}
                    hdlUpdate={hdlUpdate}
                    hdlRemoveCounter={hdlRemoveCounter}
                />
            ))}
        </>
    );
}