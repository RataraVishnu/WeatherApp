function Doubts({ data }) {

    console.log('idi doubt session')
    function Logs() {
        // console.log(data)
        let tempdata = {};
        if (data && typeof data === 'object') {
            const data1 = Object.entries(data);

            data1.forEach(([date, items]) => {
                const minTemps = items.map(item => item.main.temp_min);
                const maxTemps = items.map(item => item.main.temp_max);

                tempdata[date] = {
                    min: Math.min(...minTemps),
                    max: Math.max(...maxTemps)
                };
            });
        }
        console.log(tempdata)
    }
    Logs();
    return (
        <div>

        </div>
    )
}

export default Doubts;