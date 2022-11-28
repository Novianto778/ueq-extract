import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './index.css';
import { utils, writeFile } from 'xlsx';

function App() {
    const [input, setInput] = useState('');

    const covertData = (data) => {
        const array = data.split(',');
        const newArr = array.map((item) => +item.substring(1, 2));
        return newArr;
    };

    const handleExport = async (data) => {
        // console.log(start_date, end_date);
        const array = data.split(',');
        const newArr = array.map((item) => +item.substring(1, 2));
        // const headings = [
        //     [
        //         'ID TRANSAKSI',
        //         'TANGGAL',
        //         'NAMA',
        //         'NO HP',
        //         'ALAMAT',
        //         'TIPE MOTOR',
        //         'LAMA SEWA',
        //         'TANGGAL MULAI',
        //         'TANGGAL SELESAI',
        //         'TOTAL',
        //         'DISKON',
        //         'STATUS',
        //     ],
        // ];
        // const newData: any[] = [];
        // const newData = allKegiatan.map((item, index) => {
        //   return [
        //     index + 1,
        //     item.kode_kegiatan,
        //     item.nama_kegiatan,
        //     item.sks,
        //     item.dasar_penilaian,
        //     item.parent_id,
        //     item.keterangan,
        //   ];
        // });
        console.log(newArr);

        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        // utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, newArr, {
            origin: 'A2',
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, `test.xlsx`);
    };

    return (
        <div className="">
            <input type="text" onChange={(e) => setInput(e.target.value)} />
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b"></thead>
                                <tbody>
                                    <tr class="border-b">
                                        {covertData(input).map(
                                            (item, index) => (
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
